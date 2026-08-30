import type { Band } from './ielts';

export type ListeningSection = 1 | 2 | 3 | 4;

export type ListeningDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ListeningAccent = 'british' | 'american' | 'australian' | 'canadian';

export type ListeningQuestionType =
  | 'multipleChoice'
  | 'matching'
  | 'formCompletion'
  | 'sentenceCompletion'
  | 'noteCompletion'
  | 'tableCompletion'
  | 'flowChartCompletion'
  | 'mapLabeling'
  | 'diagramLabeling';

export type ListeningMode = 'practice' | 'timed';

export type ListeningChoice = {
  id: string;
  label: string;
};

export type ListeningQuestion = {
  id: string;
  number: number;
  type: ListeningQuestionType;
  prompt: string;
  /** Official-style limit, e.g. "NO MORE THAN TWO WORDS AND/OR A NUMBER". */
  constraint?: string;
  options?: readonly ListeningChoice[];
  fieldLabel?: string;
  /** Map / diagram letter the question is asking about. */
  location?: string;
  correct: string | readonly string[];
  explanation: string;
  miraCorrect: string;
  miraWrong: string;
  replayAtMs: number;
};

export type ListeningMapPin = {
  letter: string;
  x: number;
  y: number;
  label?: string;
};

export type ListeningVisual =
  | { kind: 'form'; title: string }
  | { kind: 'map'; title: string; pins: readonly ListeningMapPin[] }
  | { kind: 'diagram'; title: string; parts: readonly { letter: string; label: string }[] }
  | {
      kind: 'table';
      headers: readonly string[];
      rows: readonly (readonly (string | { questionId: string })[])[];
    }
  | { kind: 'flow'; steps: readonly (string | { questionId: string })[] }
  | { kind: 'notes'; heading: string; lines: readonly (string | { questionId: string })[] };

export type ListeningGroup = {
  id: string;
  type: ListeningQuestionType;
  instruction: string;
  visual?: ListeningVisual;
  questions: ListeningQuestion[];
};

export type ListeningTranscriptLine = {
  atMs: number;
  speaker?: string;
  text: string;
};

export type ListeningSetSummary = {
  id: string;
  title: string;
  section: ListeningSection;
  difficulty: ListeningDifficulty;
  accent: ListeningAccent;
  questionCount: number;
  minutes: number;
  recommended?: boolean;
};

export type ListeningSet = ListeningSetSummary & {
  audioDurationMs: number;
  groups: ListeningGroup[];
  transcript: readonly ListeningTranscriptLine[];
};

export type ListeningMistake = {
  questionId: string;
  number: number;
  prompt: string;
  given: string;
  correct: string;
  explanation: string;
};

export type ListeningResult = {
  setId: string;
  mode: ListeningMode;
  correct: number;
  total: number;
  band: Band;
  xp: number;
  pattern: string;
  mistakes: ListeningMistake[];
  answers: Record<string, string>;
};
