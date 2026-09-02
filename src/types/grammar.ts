export type GrammarLessonId =
  | 'tenses'
  | 'articles'
  | 'prepositions'
  | 'agreement'
  | 'conditionals'
  | 'relative'
  | 'complex'
  | 'passive'
  | 'modals'
  | 'comparatives'
  | 'conjunctions';

export type GrammarLessonSummary = {
  id: GrammarLessonId;
  title: string;
  minutes: number;
  questionCount: number;
  recommended?: boolean;
};

export type GrammarItem = {
  id: string;
  prompt: string;
  options: readonly string[];
  correct: string;
  why: string;
};

export type GrammarLesson = GrammarLessonSummary & {
  kicker: string;
  body: readonly string[];
  pattern: string;
  questions: readonly GrammarItem[];
};

export type GrammarResult = {
  lessonId: GrammarLessonId;
  correct: number;
  total: number;
  xp: number;
  pattern: string;
  answers: Record<string, string>;
  mistakes: readonly { questionId: string; given: string; correct: string; why: string }[];
};
