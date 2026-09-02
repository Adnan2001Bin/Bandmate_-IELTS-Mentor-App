import type { MentorAction, MentorMessage, MentorPrompt } from '@/types';

export const MENTOR_THREAD_ID = 'thread_mira';

export const SESSION_HREF = '/session';
export const SPEAKING_HREF = '/practice/speaking';
export const SPEAKING_TOPIC_HREF = '/practice/speaking/hometown';
export const WRITING_HREF = '/practice/writing';
export const WRITING_TASK_HREF = '/practice/writing/t2-opinion';
export const VOCAB_HREF = '/practice/vocabulary';
export const VOCAB_SET_HREF = '/practice/vocabulary/education';
export const GRAMMAR_HREF = '/practice/grammar';
export const GRAMMAR_LESSON_HREF = '/practice/grammar/articles';
export const LISTENING_HREF = '/practice/listening';
export const READING_HREF = '/practice/reading';
export const PLAN_HREF = '/mira/plan';
export const PLAN_CHANGE_HREF = '/plan-change';

export const mentorPrompts: readonly MentorPrompt[] = [
  {
    id: 'prompt-speaking',
    label: 'Speaking 5.5 → 7',
    text: 'My speaking score is usually 5.5. How can I reach 7?',
  },
  {
    id: 'prompt-writing',
    label: 'Fix my writing',
    text: 'My writing is 5.5. What should I practise?',
  },
  {
    id: 'prompt-vocab',
    label: 'Stop saying “very”',
    text: 'I keep using very. Which vocabulary should I do today?',
  },
  {
    id: 'prompt-grammar',
    label: 'Articles',
    text: 'I keep writing “the society”. Help me with articles.',
  },
  {
    id: 'prompt-today',
    label: 'What today?',
    text: 'What should I practise today?',
  },
];

export const mentorEntries: readonly MentorAction[] = [
  { id: 'entry-session', label: 'Today’s session', href: SESSION_HREF, kind: 'session' },
  { id: 'entry-speaking', label: 'Speaking practice', href: SPEAKING_HREF, kind: 'speaking' },
  { id: 'entry-writing', label: 'Writing review', href: WRITING_HREF, kind: 'writing' },
  { id: 'entry-vocab', label: 'Vocabulary help', href: VOCAB_SET_HREF, kind: 'vocabulary' },
  { id: 'entry-grammar', label: 'Grammar help', href: GRAMMAR_LESSON_HREF, kind: 'grammar' },
];

function action(id: string, label: string, href: string, kind: MentorAction['kind']): MentorAction {
  return { id, label, href, kind };
}

export const seedMiraMessage = (): MentorMessage => ({
  id: 'mira-seed',
  role: 'mira',
  body: 'You are not here to collect tips. Speaking is the gap — fluency, not words. Today’s 18 minutes start with a Part 2 cue card. Ask me about a score, a skill, or what to do now.',
  createdAt: '2026-08-14T09:20:00.000Z',
  status: 'sent',
  actions: [
    action('seed-session', 'Open today’s session', SESSION_HREF, 'session'),
    action('seed-plan', 'See the 18 minutes', PLAN_HREF, 'plan'),
  ],
});

export const mentorReplies = {
  speaking: {
    body: 'Target 7.0. You sit at 6.0 overall; speaking is 6.0 and fluency is the leak — you restart instead of finishing.\n\nToday: 6 min live speaking, Part 2 cue card. I interrupt when you stall. Do not collect more vocabulary first. The half-band is in finishing the sentence.',
    actions: [
      action('speak-session', 'Open today’s session', SESSION_HREF, 'session'),
      action('speak-set', 'Open speaking set', SPEAKING_TOPIC_HREF, 'speaking'),
    ],
  },
  writing: {
    body: 'Writing is 5.5 — cohesion, not ideas. Three paragraphs that actually hold, not a longer essay.\n\nToday already has an 8-minute Task 2 rebuild. If you skip speaking, swap it on the bench. I will mark live. This is an AI estimated band for practice, not an official score.',
    actions: [
      action('write-task', 'Open Task 2', WRITING_TASK_HREF, 'writing'),
      action('write-lib', 'Writing library', WRITING_HREF, 'writing'),
    ],
  },
  vocabulary: {
    body: 'You reached for “very” nine times this week. That is the cheapest half-band on the table — a precise adjective, not a longer list of words.\n\nEducation is tagged Today. Four headwords. Then the 1 / 2 / 4 / 7 / 14-day clock. I am not a thesaurus.',
    actions: [
      action('vocab-set', 'Open Education set', VOCAB_SET_HREF, 'vocabulary'),
      action('vocab-lib', 'Vocabulary library', VOCAB_HREF, 'vocabulary'),
    ],
  },
  grammar: {
    body: 'You write “the society” and “the nature” when you mean society and nature in general. Articles, six minutes, four items. Mira names the pattern — she does not say “Correct!”.',
    actions: [
      action('gram-lesson', 'Open Articles', GRAMMAR_LESSON_HREF, 'grammar'),
      action('gram-lib', 'Grammar library', GRAMMAR_HREF, 'grammar'),
    ],
  },
  listening: {
    body: 'Listening is 6.5 — maintenance, not the gap. Today’s chain already has a 4-minute Section 3 set so the score does not slip while we spend time on speaking. Do not start a full paper tonight.',
    actions: [action('listen-lib', 'Listening library', LISTENING_HREF, 'listening')],
  },
  reading: {
    body: 'Reading is 6.0 and on the bench, not in today’s 18 minutes. If you would rather read than write, swap the featured brief. True / False / Not Given is the short set.',
    actions: [
      action('read-lib', 'Reading library', READING_HREF, 'reading'),
      action('read-swap', 'Change today’s plan', PLAN_CHANGE_HREF, 'plan'),
    ],
  },
  plan: {
    body: 'Eighteen minutes, speaking-led.\n\n6 min live speaking — fluency, Part 2.\n8 min writing T2 — cohesion.\n4 min listening — keep the 6.5.\n\nI cut this from your test date, not from a question bank. Open the session, or read the mix.',
    actions: [
      action('plan-session', 'Open today’s session', SESSION_HREF, 'session'),
      action('plan-view', 'Study plan', PLAN_HREF, 'plan'),
    ],
  },
  band: {
    body: 'Current estimated 6.0. Target 7.0. About four weeks if the fluency habit actually moves.\n\nWeak: fluency, writing cohesion, articles.\nHeld: pronunciation, listening.\n\nToday is speaking, then a written fix. I will not give you a new overall band in this chat — that is the mock, later.',
    actions: [
      action('band-session', 'Open today’s session', SESSION_HREF, 'session'),
      action('band-speak', 'Open speaking set', SPEAKING_HREF, 'speaking'),
    ],
  },
  greeting: {
    body: 'Ask me about a score, a skill, or today’s 18 minutes. I already know you are 6.0 aiming at 7.0, and that fluency is the leak.',
    actions: [
      action('hi-session', 'Open today’s session', SESSION_HREF, 'session'),
      action('hi-speak', 'Speaking 5.5 → 7', SPEAKING_HREF, 'speaking'),
    ],
  },
  other: {
    body: 'I am not a search box. Ask about speaking, writing, a word, articles, or what the 18 minutes are for. I already have your bands.',
    actions: [
      action('other-session', 'Open today’s session', SESSION_HREF, 'session'),
      action('other-plan', 'Study plan', PLAN_HREF, 'plan'),
    ],
  },
} as const;
