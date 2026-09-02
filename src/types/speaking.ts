import type { Band, CriterionScore, PracticeArea, SpeakingCriterion } from './ielts';

/** Session behaviour. Topic pick and random live on the library, not here. */
export type SpeakingMode = 'practice' | 'examiner' | 'challenge';

export type SpeakingPart = 1 | 2 | 3;

export type SpeakingTopicSummary = {
  id: string;
  title: string;
  theme: string;
  minutes: number;
  recommended?: boolean;
};

export type SpeakingCoaching = {
  live: string;
  short: string;
  held: string;
};

export type SpeakingPart1Question = {
  id: string;
  part: 1;
  prompt: string;
  targetMs: number;
  coaching: SpeakingCoaching;
  script: SpeakingScript;
};

export type SpeakingPart2Cue = {
  id: string;
  part: 2;
  title: string;
  bullets: readonly string[];
  prepMs: number;
  speakMs: number;
  coaching: SpeakingCoaching;
  script: SpeakingScript;
};

export type SpeakingPart3Question = {
  id: string;
  part: 3;
  prompt: string;
  targetMs: number;
  coaching: SpeakingCoaching;
  script: SpeakingScript;
};

export type SpeakingTurn = SpeakingPart1Question | SpeakingPart2Cue | SpeakingPart3Question;

export type SpeakingScript = {
  you: string;
  better: string;
  why: string;
};

export type SpeakingTopic = SpeakingTopicSummary & {
  intro: string;
  part1: readonly SpeakingPart1Question[];
  part2: SpeakingPart2Cue;
  part3: readonly SpeakingPart3Question[];
  challengePart3: readonly SpeakingPart3Question[];
};

export type SpeakingAnswer = {
  questionId: string;
  durationMs: number;
};

export type SpeakingTranscriptLine = {
  id: string;
  atMs: number;
  speaker: 'you' | 'examiner';
  text: string;
  better?: string;
  why?: string;
};

export type SpeakingFix = {
  id: string;
  title: string;
  body: string;
};

export type SpeakingMetrics = {
  totalMs: number;
  wpm: number;
  pauseCount: number;
  fillerCount: number;
};

export type SpeakingRecommendation = {
  id: string;
  area: PracticeArea;
  label: string;
  reason: string;
};

export type SpeakingEvaluation = {
  topicId: string;
  mode: SpeakingMode;
  band: Band;
  criteria: readonly CriterionScore<SpeakingCriterion>[];
  pattern: string;
  twoFixes: readonly [SpeakingFix, SpeakingFix];
  strengths: readonly string[];
  weaknesses: readonly string[];
  metrics: SpeakingMetrics;
  transcript: readonly SpeakingTranscriptLine[];
  recommendations: readonly SpeakingRecommendation[];
  xp: number;
};
