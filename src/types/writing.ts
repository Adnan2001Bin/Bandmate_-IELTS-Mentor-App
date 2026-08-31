import type { Band, CriterionScore, TestType, WritingCriterion } from './ielts';

export type WritingTaskKind = 'task1' | 'task2';

export type WritingMode = 'timed' | 'untimed';

export type WritingMethod = 'typed' | 'handwritten';

export type WritingTask1Chart =
  | 'lineGraph'
  | 'barChart'
  | 'pieChart'
  | 'table'
  | 'process'
  | 'map'
  | 'mixed';

export type WritingLetterTone = 'formal' | 'semiFormal' | 'informal';

export type WritingTask2Type =
  | 'opinion'
  | 'discussion'
  | 'advantages'
  | 'problemSolution'
  | 'twoPart'
  | 'agreeDisagree';

export type WritingVisual =
  | {
      kind: 'line';
      title: string;
      xLabels: readonly string[];
      series: readonly { label: string; points: readonly number[] }[];
    }
  | {
      kind: 'bar';
      title: string;
      items: readonly { label: string; value: number }[];
    }
  | {
      kind: 'pie';
      title: string;
      slices: readonly { label: string; percent: number }[];
    }
  | {
      kind: 'table';
      title: string;
      headers: readonly string[];
      rows: readonly (readonly string[])[];
    }
  | {
      kind: 'process';
      title: string;
      steps: readonly string[];
    }
  | {
      kind: 'map';
      title: string;
      pins: readonly { letter: string; label: string }[];
    }
  | {
      kind: 'mixed';
      title: string;
      bars: readonly { label: string; value: number }[];
      note: string;
    };

export type WritingTaskSummary = {
  id: string;
  title: string;
  kind: WritingTaskKind;
  testType: TestType;
  minutes: number;
  minWords: number;
  chart?: WritingTask1Chart;
  letterTone?: WritingLetterTone;
  essayType?: WritingTask2Type;
  recommended?: boolean;
};

export type WritingTask = WritingTaskSummary & {
  instruction: string;
  prompt: string;
  visual?: WritingVisual;
  /** Mock handwriting extract — not a real OCR result. */
  ocrSample: string;
};

export type WritingDraft = {
  taskId: string;
  body: string;
  remainingMs: number;
  updatedAt: string;
};

export type WritingLiveFlag = {
  id: string;
  label: string;
};

export type WritingSentenceFeedback = {
  id: string;
  excerpt: string;
  kind: 'grammar' | 'vocabulary' | 'coherence' | 'task';
  wrong: string;
  right: string;
  reason: string;
};

export type WritingRewriteChange = {
  what: string;
  why: string;
};

export type WritingRewrite = {
  original: string;
  improved: string;
  changes: readonly WritingRewriteChange[];
};

export type WritingRecommendation = {
  id: string;
  area: 'grammar' | 'vocabulary' | 'writing';
  label: string;
  reason: string;
};

export type WritingMistake = {
  id: string;
  taskId: string;
  taskTitle: string;
  wrong: string;
  right: string;
  reason: string;
};

export type WritingEvaluation = {
  taskId: string;
  mode: WritingMode;
  method: WritingMethod;
  body: string;
  wordCount: number;
  band: Band;
  criteria: readonly CriterionScore<WritingCriterion>[];
  strengths: readonly string[];
  weaknesses: readonly string[];
  sentences: readonly WritingSentenceFeedback[];
  rewrite: WritingRewrite;
  recommendations: readonly WritingRecommendation[];
  mistakes: readonly WritingMistake[];
  pattern: string;
  xp: number;
};

export type WritingRewriteCheck = {
  ok: boolean;
  note: string;
};
