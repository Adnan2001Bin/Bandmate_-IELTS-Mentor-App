import type { Band, TestType } from './ielts';

export type ReadingDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ReadingQuestionType =
  | 'multipleChoice'
  | 'trueFalseNotGiven'
  | 'yesNoNotGiven'
  | 'matchingHeadings'
  | 'matchingInformation'
  | 'matchingSentenceEndings'
  | 'sentenceCompletion'
  | 'summaryCompletion'
  | 'diagramLabeling';

export type ReadingMode = 'practice' | 'timed';

export type ReadingParagraph = {
  id: string;
  letter?: string;
  text: string;
};

export type ReadingChoice = {
  id: string;
  label: string;
};

export type ReadingQuestion = {
  id: string;
  number: number;
  type: ReadingQuestionType;
  prompt: string;
  constraint?: string;
  options?: readonly ReadingChoice[];
  fieldLabel?: string;
  correct: string | readonly string[];
  explanation: string;
  miraCorrect: string;
  miraWrong: string;
  /** Paragraph that holds the evidence — highlighted on check / review. */
  locateParagraphId: string;
};

export type ReadingGroup = {
  id: string;
  type: ReadingQuestionType;
  instruction: string;
  visual?: {
    kind: 'diagram';
    title: string;
    parts: readonly { letter: string; label: string }[];
  };
  questions: ReadingQuestion[];
};

export type ReadingSavedItem = {
  setId: string;
  setTitle: string;
  questionId: string;
  number: number;
  prompt: string;
};

export type ReadingSetSummary = {
  id: string;
  title: string;
  testType: TestType;
  difficulty: ReadingDifficulty;
  questionCount: number;
  minutes: number;
  recommended?: boolean;
};

export type ReadingSet = ReadingSetSummary & {
  passageTitle: string;
  paragraphs: readonly ReadingParagraph[];
  groups: ReadingGroup[];
};

export type ReadingMistake = {
  questionId: string;
  number: number;
  prompt: string;
  given: string;
  correct: string;
  explanation: string;
};

export type ReadingResult = {
  setId: string;
  mode: ReadingMode;
  correct: number;
  total: number;
  band: Band;
  xp: number;
  pattern: string;
  mistakes: ReadingMistake[];
  answers: Record<string, string>;
};
