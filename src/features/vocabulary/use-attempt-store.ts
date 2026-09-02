import { create } from 'zustand';

import type { VocabQuizResult, VocabReviewGrade, VocabReviewResult, VocabWord } from '@/types';

type QuizState = {
  categoryId: string | null;
  index: number;
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  result: VocabQuizResult | null;
  startQuiz: (categoryId: string) => void;
  setAnswer: (id: string, value: string) => void;
  markChecked: (id: string) => void;
  setIndex: (index: number) => void;
  setResult: (result: VocabQuizResult) => void;
};

type ReviewState = {
  reviewWords: readonly VocabWord[];
  reviewIndex: number;
  revealed: boolean;
  grades: Record<string, VocabReviewGrade>;
  reviewResult: VocabReviewResult | null;
  startReview: (words: readonly VocabWord[]) => void;
  setRevealed: (revealed: boolean) => void;
  setGrade: (wordId: string, grade: VocabReviewGrade) => void;
  setReviewIndex: (index: number) => void;
  setReviewResult: (result: VocabReviewResult) => void;
};

const emptyQuiz = {
  categoryId: null as string | null,
  index: 0,
  answers: {} as Record<string, string>,
  checked: {} as Record<string, boolean>,
  result: null as VocabQuizResult | null,
};

const emptyReview = {
  reviewWords: [] as readonly VocabWord[],
  reviewIndex: 0,
  revealed: false,
  grades: {} as Record<string, VocabReviewGrade>,
  reviewResult: null as VocabReviewResult | null,
};

export const useVocabAttemptStore = create<QuizState & ReviewState>((set) => ({
  ...emptyQuiz,
  ...emptyReview,
  startQuiz: (categoryId) =>
    set({
      ...emptyQuiz,
      categoryId,
    }),
  setAnswer: (id, value) => set((state) => ({ answers: { ...state.answers, [id]: value } })),
  markChecked: (id) => set((state) => ({ checked: { ...state.checked, [id]: true } })),
  setIndex: (index) => set({ index }),
  setResult: (result) => set({ result }),
  startReview: (reviewWords) =>
    set({
      ...emptyReview,
      reviewWords,
    }),
  setRevealed: (revealed) => set({ revealed }),
  setGrade: (wordId, grade) => set((state) => ({ grades: { ...state.grades, [wordId]: grade } })),
  setReviewIndex: (reviewIndex) => set({ reviewIndex, revealed: false }),
  setReviewResult: (reviewResult) => set({ reviewResult }),
}));
