import { create } from 'zustand';

import type { GrammarResult } from '@/types';

type AttemptState = {
  lessonId: string | null;
  index: number;
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  result: GrammarResult | null;
  start: (lessonId: string) => void;
  setAnswer: (id: string, value: string) => void;
  markChecked: (id: string) => void;
  setIndex: (index: number) => void;
  setResult: (result: GrammarResult) => void;
  reset: () => void;
};

const empty = {
  lessonId: null as string | null,
  index: 0,
  answers: {} as Record<string, string>,
  checked: {} as Record<string, boolean>,
  result: null as GrammarResult | null,
};

export const useGrammarAttemptStore = create<AttemptState>((set) => ({
  ...empty,
  start: (lessonId) => set({ ...empty, lessonId }),
  setAnswer: (id, value) => set((state) => ({ answers: { ...state.answers, [id]: value } })),
  markChecked: (id) => set((state) => ({ checked: { ...state.checked, [id]: true } })),
  setIndex: (index) => set({ index }),
  setResult: (result) => set({ result }),
  reset: () => set(empty),
}));
