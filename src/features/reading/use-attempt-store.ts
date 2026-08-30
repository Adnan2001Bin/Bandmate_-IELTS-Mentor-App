import { create } from 'zustand';

import type { ReadingMode, ReadingResult } from '@/types';

type AttemptState = {
  setId: string | null;
  mode: ReadingMode;
  index: number;
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  remainingMs: number;
  result: ReadingResult | null;
  start: (input: { setId: string; mode: ReadingMode; remainingMs: number }) => void;
  setAnswer: (questionId: string, value: string) => void;
  markChecked: (questionId: string) => void;
  setIndex: (index: number) => void;
  setRemainingMs: (ms: number) => void;
  setResult: (result: ReadingResult) => void;
  reset: () => void;
};

const empty = {
  setId: null,
  mode: 'practice' as const,
  index: 0,
  answers: {} as Record<string, string>,
  checked: {} as Record<string, boolean>,
  remainingMs: 0,
  result: null as ReadingResult | null,
};

export const useReadingAttemptStore = create<AttemptState>((set) => ({
  ...empty,
  start: ({ setId, mode, remainingMs }) =>
    set({
      setId,
      mode,
      index: 0,
      answers: {},
      checked: {},
      remainingMs,
      result: null,
    }),
  setAnswer: (questionId, value) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: value } })),
  markChecked: (questionId) =>
    set((state) => ({ checked: { ...state.checked, [questionId]: true } })),
  setIndex: (index) => set({ index }),
  setRemainingMs: (remainingMs) => set({ remainingMs }),
  setResult: (result) => set({ result }),
  reset: () => set(empty),
}));
