import type {
  VocabCategory,
  VocabCategorySummary,
  VocabOverview,
  VocabProgress,
  VocabQuizItem,
  VocabQuizResult,
  VocabReviewResult,
  VocabWord,
} from '@/types';

export type VocabReviewInput = {
  wordId: string;
  knew: boolean;
};

export type VocabQuizSubmitInput = {
  categoryId: string;
  answers: Record<string, string>;
};

export type VocabularyService = {
  getOverview(): Promise<VocabOverview>;
  listCategories(): Promise<VocabCategorySummary[]>;
  getCategory(id: string): Promise<VocabCategory>;
  getWord(id: string): Promise<VocabWord>;
  getQuiz(categoryId: string): Promise<readonly VocabQuizItem[]>;
  submitQuiz(input: VocabQuizSubmitInput): Promise<VocabQuizResult>;
  listDue(): Promise<readonly VocabWord[]>;
  listDifficult(): Promise<readonly VocabWord[]>;
  review(input: VocabReviewInput): Promise<VocabProgress>;
  finishReview(grades: readonly VocabReviewInput[]): Promise<VocabReviewResult>;
  markDifficult(wordId: string): Promise<VocabProgress>;
};
