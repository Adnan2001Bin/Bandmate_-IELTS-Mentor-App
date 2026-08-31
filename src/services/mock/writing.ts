import { countWords, firstParagraph, liveFlags, snapBand } from '@/lib/writing';
import { storage, storageKeys } from '@/lib/storage';
import { mockWritingTasks } from '@/mocks/writing';
import type {
  Band,
  CriterionScore,
  WritingCriterion,
  WritingDraft,
  WritingEvaluation,
  WritingMistake,
  WritingSentenceFeedback,
  WritingTask,
} from '@/types';
import { ServiceError } from '../api/errors';
import type { WritingService } from '../contracts';
import { delay } from './latency';

function summaryOf(task: WritingTask) {
  return {
    id: task.id,
    title: task.title,
    kind: task.kind,
    testType: task.testType,
    minutes: task.minutes,
    minWords: task.minWords,
    chart: task.chart,
    letterTone: task.letterTone,
    essayType: task.essayType,
    recommended: task.recommended,
  };
}

async function loadDrafts(): Promise<Record<string, WritingDraft>> {
  return (await storage.get<Record<string, WritingDraft>>(storageKeys.writingDrafts)) ?? {};
}

function shift(band: Band, delta: number): Band {
  return snapBand(band + delta);
}

function buildSentences(body: string, taskId: string): WritingSentenceFeedback[] {
  const flags = liveFlags(body);
  const items: WritingSentenceFeedback[] = [];

  if (/\btechnology have\b/i.test(body)) {
    items.push({
      id: `${taskId}-have`,
      excerpt: 'Technology have changed…',
      kind: 'grammar',
      wrong: 'have',
      right: 'has',
      reason: '“Technology” is singular, so the verb is “has”.',
    });
  }

  if (flags.some((flag) => flag.id === 'very')) {
    items.push({
      id: `${taskId}-very`,
      excerpt: 'This is very good for students.',
      kind: 'vocabulary',
      wrong: 'very good',
      right: 'significant',
      reason: '“Very good” is a filler pair. Name the benefit.',
    });
  }

  if (flags.some((flag) => flag.id === 'important')) {
    items.push({
      id: `${taskId}-important`,
      excerpt: 'This is important for society.',
      kind: 'vocabulary',
      wrong: 'important',
      right: 'essential / substantial',
      reason: 'You leaned on “important”. Pick a word that fits the claim.',
    });
  }

  if (items.length === 0 && countWords(body) >= 80) {
    items.push({
      id: `${taskId}-cohesion`,
      excerpt: firstParagraph(body).slice(0, 140) || 'Your opening.',
      kind: 'coherence',
      wrong: 'a sudden new idea',
      right: 'a sentence that points back',
      reason: 'The opening is clear. The jump into the next point is not. Add one link.',
    });
  }

  return items;
}

function evaluate(task: WritingTask, body: string): Omit<
  WritingEvaluation,
  'taskId' | 'mode' | 'method' | 'body' | 'xp'
> {
  const words = countWords(body);
  const short = words < task.minWords;
  const veryShort = words < Math.round(task.minWords * 0.6);

  let taskBand: Band = task.kind === 'task1' ? 6.5 : 6;
  let cohesion: Band = 6.5;
  let lexical: Band = 6.5;
  let grammar: Band = 6;

  if (veryShort) {
    taskBand = shift(taskBand, -1.5);
    cohesion = shift(cohesion, -1);
    lexical = shift(lexical, -1);
    grammar = shift(grammar, -1);
  } else if (short) {
    taskBand = shift(taskBand, -0.5);
  }

  const flags = liveFlags(body);
  if (flags.some((flag) => flag.id === 'very' || flag.id === 'important')) {
    lexical = shift(lexical, -0.5);
  }
  if (flags.some((flag) => flag.id === 'have')) {
    grammar = shift(grammar, -0.5);
  }
  if (words >= task.minWords + 40 && flags.length === 0) {
    lexical = shift(lexical, 0.5);
    grammar = shift(grammar, 0.5);
  }

  const criteria: CriterionScore<WritingCriterion>[] = [
    {
      criterion: 'taskResponse',
      band: taskBand,
      note: short
        ? `Under length (${words} / ${task.minWords}). Examiners treat that as incomplete.`
        : task.kind === 'task1'
          ? 'The overview is there. A number from the visual would lock the comparison.'
          : 'The position is visible. One paragraph still explains less than it claims.',
    },
    {
      criterion: 'coherenceCohesion',
      band: cohesion,
      note: 'Main ideas are clear. The join between the second and third blocks is the leak.',
    },
    {
      criterion: 'lexicalResource',
      band: lexical,
      note:
        flags.some((flag) => flag.id === 'very' || flag.id === 'important')
          ? 'Repeated soft adjectives. Swap two of them; do not collect a thesaurus.'
          : 'Range is enough for the task. One precise verb would do more than another adjective.',
    },
    {
      criterion: 'grammaticalRange',
      band: grammar,
      note: flags.some((flag) => flag.id === 'have')
        ? 'Subject–verb agreement failed on a simple sentence. That is a cheap miss.'
        : 'Sentences are safe. One complex sentence that stays grammatical would raise this.',
    },
  ];

  const band = snapBand(
    criteria.reduce((sum, item) => sum + item.band, 0) / criteria.length,
  );

  const sentences = buildSentences(body, task.id);
  const opening = firstParagraph(body) || 'Technology is very good for students.';
  const mistakes: WritingMistake[] = sentences.map((item) => ({
    id: item.id,
    taskId: task.id,
    taskTitle: task.title,
    wrong: item.wrong,
    right: item.right,
    reason: item.reason,
  }));

  const pattern = short
    ? `You stopped at ${words} words. The band is being pulled by length, not by a clever idea. Finish the last paragraph before you polish adjectives.`
    : flags.length >= 2
      ? 'The pattern is soft vocabulary under pressure — “very”, “important”, “good”. Tomorrow is only that swap, not another full essay.'
      : 'One cohesion leak and a safe grammar range. Do not collect a second essay of the same shape until you fix the join.';

  return {
    wordCount: words,
    band,
    criteria,
    strengths: short
      ? ['You addressed the topic.']
      : [
          'The position / overview can be found without hunting.',
          'The piece has a beginning, a middle, and an end.',
        ],
    weaknesses: short
      ? [`Short of ${task.minWords} words.`, 'The last idea is named, not developed.']
      : [
          'A paragraph that announces more than it proves.',
          flags.length > 0 ? 'Repeated soft words under time.' : 'Transitions that jump.',
        ],
    sentences,
    rewrite: {
      original: opening.slice(0, 280),
      improved:
        task.kind === 'task1'
          ? 'Harbour overtook Ridgeway after 2020: cycle trips rose from 12 to 34 thousand while Ridgeway slipped. That comparison is the overview.'
          : 'Public libraries still matter because they offer quiet, trained help, and books that are not behind a paywall — not because nostalgia is an argument.',
      changes: [
        {
          what: 'Replaced a vague claim with a reason.',
          why: 'Task response is development, not a slogan.',
        },
        {
          what: 'Cut “very” / “good” if they were there.',
          why: 'Lexical resource is precision, not volume.',
        },
      ],
    },
    recommendations: [
      { id: 'rec-grammar', area: 'grammar', label: 'Articles and agreement', reason: 'The cheap grammar misses sit here.' },
      { id: 'rec-vocab', area: 'vocabulary', label: 'Swap the filler adjectives', reason: '“Very” and “important” are the week’s leak.' },
      { id: 'rec-write', area: 'writing', label: 'Task 2 conclusions', reason: 'End with a position, not a new idea.' },
    ],
    mistakes,
    pattern,
  };
}

export const mockWritingService: WritingService = {
  async listTasks() {
    await delay();
    return mockWritingTasks.map(summaryOf);
  },

  async getTask(id) {
    await delay();
    const task = mockWritingTasks.find((item) => item.id === id);
    if (!task) {
      throw new ServiceError('notFound', 'That writing task is not in the library.');
    }
    return task;
  },

  async listDrafts() {
    await delay(150);
    return Object.values(await loadDrafts()).map((draft) => ({
      taskId: draft.taskId,
      body: draft.body,
      remainingMs: draft.remainingMs,
    }));
  },

  async getDraft(taskId) {
    await delay(150);
    const drafts = await loadDrafts();
    const draft = drafts[taskId];
    if (!draft) {
      return null;
    }
    return { taskId: draft.taskId, body: draft.body, remainingMs: draft.remainingMs };
  },

  async saveDraft(input) {
    const drafts = await loadDrafts();
    drafts[input.taskId] = {
      taskId: input.taskId,
      body: input.body,
      remainingMs: input.remainingMs,
      updatedAt: new Date().toISOString(),
    };
    await storage.set(storageKeys.writingDrafts, drafts);
  },

  async clearDraft(taskId) {
    const drafts = await loadDrafts();
    delete drafts[taskId];
    await storage.set(storageKeys.writingDrafts, drafts);
  },

  async submit({ taskId, body, mode, method }) {
    await delay(1600);
    const task = mockWritingTasks.find((item) => item.id === taskId);
    if (!task) {
      throw new ServiceError('notFound', 'That writing task is not in the library.');
    }

    const scored = evaluate(task, body);
    const drafts = await loadDrafts();
    delete drafts[taskId];
    await storage.set(storageKeys.writingDrafts, drafts);

    return {
      ...scored,
      taskId,
      mode,
      method,
      body,
      xp: Math.max(20, scored.wordCount),
    };
  },

  async simulateOcr(taskId) {
    await delay(900);
    const task = mockWritingTasks.find((item) => item.id === taskId);
    if (!task) {
      throw new ServiceError('notFound', 'That writing task is not in the library.');
    }
    return task.ocrSample;
  },

  async checkRewrite({ original, attempt }) {
    await delay(350);
    const words = countWords(attempt);
    const copied = attempt.trim() === original.trim();

    if (copied) {
      return { ok: false, note: 'That is the original. Change the claim, not the punctuation.' };
    }
    if (words < 18) {
      return { ok: false, note: 'Too short. One developed sentence, not a slogan.' };
    }
    if (/\bvery\b/i.test(attempt) && /\bvery\b/i.test(original)) {
      return { ok: false, note: '“Very” is still there. Cut it.' };
    }
    return {
      ok: true,
      note: 'You moved it. Read it once more for a verb that is doing real work, then stop.',
    };
  },
};
