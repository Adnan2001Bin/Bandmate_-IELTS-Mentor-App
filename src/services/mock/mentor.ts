import { daysUntil } from '@/lib/date';
import { greetingFor, matchMentorIntent } from '@/lib/mentor';
import { storage, storageKeys } from '@/lib/storage';
import {
  MENTOR_THREAD_ID,
  mentorEntries,
  mentorPrompts,
  mentorReplies,
  seedMiraMessage,
} from '@/mocks/mentor';
import { mockPlanTasks } from '@/mocks/plan';
import { mockUserProfile } from '@/mocks/user';
import type { MentorMessage, MentorThread } from '@/types';
import { ServiceError } from '../api/errors';
import type { MentorSendInput, MentorService } from '../contracts';
import { delay } from './latency';

let cache: MentorThread | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

type StoredThread = {
  id: string;
  messages: MentorMessage[];
};

async function loadThread(): Promise<MentorThread> {
  if (cache) {
    return cache;
  }
  const stored = await storage.get<StoredThread>(storageKeys.mentorThread);
  cache = {
    id: stored?.id ?? MENTOR_THREAD_ID,
    messages: stored?.messages?.length ? stored.messages : [seedMiraMessage()],
    prompts: [...mentorPrompts],
  };
  return cache;
}

async function saveThread(next: MentorThread): Promise<void> {
  cache = next;
  const stored: StoredThread = { id: next.id, messages: next.messages };
  await storage.set(storageKeys.mentorThread, stored);
}

function lastMira(messages: MentorThread['messages']): MentorMessage | undefined {
  return [...messages].reverse().find((item) => item.role === 'mira' && item.status === 'sent');
}

export const mockMentorService: MentorService = {
  async getHome() {
    await delay();
    const profile = mockUserProfile;
    const study = profile.study;
    const diagnostic = profile.diagnostic;
    const thread = await loadThread();
    const mira = lastMira(thread.messages);
    const pending = mockPlanTasks.filter((task) => task.status === 'pending');
    const minutes = pending.reduce((sum, task) => sum + task.minutes, 0);
    const overall = diagnostic?.overall ?? 6;
    const target = study.targetBand;

    return {
      greeting: greetingFor(profile.user.name),
      headline: `Your speaking is the only thing between you and ${target.toFixed(1)}.`,
      body: 'Yesterday you paused 14 times in a two-minute answer. Ask me about that, or open today’s session.',
      contextLine: `${overall.toFixed(1)} now · ${target.toFixed(1)} target · ${daysUntil(study.testDate)} days · fluency is the leak`,
      currentBand: overall,
      targetBand: target,
      daysToTest: daysUntil(study.testDate),
      prompts: [...mentorPrompts],
      entries: [...mentorEntries],
      plan: {
        title: 'Eighteen minutes, speaking-led',
        minutes,
        why: 'I cut this from your test date. Fluency gets the first block. Writing cohesion is the written fix. Listening is maintenance so 6.5 does not slip.',
        tasks: pending.map((task) => ({
          title: task.title,
          minutes: task.minutes,
          area: task.area,
          reason: task.reason,
        })),
      },
      lastMira: mira ? { body: mira.body, at: mira.createdAt } : null,
      hasHistory: thread.messages.some((item) => item.role === 'user'),
    };
  },

  async getThread() {
    await delay();
    const thread = await loadThread();
    return { id: thread.id, messages: [...thread.messages], prompts: [...mentorPrompts] };
  },

  async send({ text }: MentorSendInput) {
    const trimmed = text.trim();
    if (!trimmed) {
      throw new ServiceError('validation', 'Type something first.');
    }

    const intent = matchMentorIntent(trimmed);

    // Thinking, then typing. Long enough that the chat status line is visible.
    await delay(700);
    if (intent === 'offline') {
      await delay(400);
      throw new ServiceError('timeout', 'I did not get that. Try again.');
    }
    await delay(500);

    const packed = mentorReplies[intent];
    const user: MentorMessage = {
      id: newId('user'),
      role: 'user',
      body: trimmed,
      createdAt: nowIso(),
      status: 'sent',
    };
    const mira: MentorMessage = {
      id: newId('mira'),
      role: 'mira',
      body: packed.body,
      createdAt: nowIso(),
      status: 'sent',
      actions: [...packed.actions],
    };

    const latest = await loadThread();
    await saveThread({ ...latest, messages: [...latest.messages, user, mira], prompts: [...mentorPrompts] });
    return mira;
  },
};
