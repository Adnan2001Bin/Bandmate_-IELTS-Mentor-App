export type VocabCategoryId =
  | 'education'
  | 'environment'
  | 'technology'
  | 'health'
  | 'society'
  | 'government'
  | 'crime'
  | 'economy'
  | 'travel'
  | 'work'
  | 'science';

export type VocabCategorySummary = {
  id: VocabCategoryId;
  title: string;
  wordCount: number;
  knownCount: number;
  dueCount: number;
  difficultCount: number;
  recommended?: boolean;
};

export type VocabWord = {
  id: string;
  categoryId: VocabCategoryId;
  headword: string;
  meaning: string;
  example: string;
  synonyms: readonly string[];
  antonyms: readonly string[];
  ieltsContext: string;
};

export type VocabWordFlag = {
  due: boolean;
  known: boolean;
  difficult: boolean;
};

export type VocabCategory = VocabCategorySummary & {
  blurb: string;
  words: readonly VocabWord[];
  flags: Record<string, VocabWordFlag>;
};

export type VocabQuizKind = 'meaning' | 'gap' | 'synonym';

export type VocabQuizItem = {
  id: string;
  wordId: string;
  kind: VocabQuizKind;
  prompt: string;
  options: readonly string[];
  correct: string;
  why: string;
};

export type SrsBox = 0 | 1 | 2 | 3 | 4;

export type VocabProgress = {
  wordId: string;
  box: SrsBox;
  dueAt: string;
  forgotten: number;
  difficult: boolean;
};

export type VocabReviewGrade = 'knew' | 'missed';

export type VocabQuizResult = {
  categoryId: VocabCategoryId;
  correct: number;
  total: number;
  xp: number;
  pattern: string;
  answers: Record<string, string>;
  mistakes: readonly { wordId: string; given: string; correct: string; why: string }[];
};

export type VocabReviewResult = {
  reviewed: number;
  knew: number;
  missed: number;
  xp: number;
  pattern: string;
};

export type VocabOverview = {
  dueCount: number;
  knownCount: number;
  difficultCount: number;
  total: number;
};
