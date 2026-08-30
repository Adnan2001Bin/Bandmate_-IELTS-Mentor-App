import { create } from 'zustand';

import type { ListeningMode, ListeningResult } from '@/types';

type AttemptState = {
  setId: string | null;
  mode: ListeningMode;
  index: number;
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  remainingMs: number;
  result: ListeningResult | null;
  start: (input: { setId: string; mode: ListeningMode; remainingMs: number }) => void;
  setAnswer: (questionId: string, value: string) => void;
  markChecked: (questionId: string) => void;
  setIndex: (index: number) => void;
  setRemainingMs: (ms: number) => void;
  setResult: (result: ListeningResult) => void;
  reset: () => void;
};

const empty = {
  setId: null,
  mode: 'practice' as const,
  index: 0,
  answers: {} as Record<string, string>,
  checked: {} as Record<string, boolean>,
  remainingMs: 0,
  result: null as ListeningResult | null,
};

export const useListeningAttemptStore = create<AttemptState>((set) => ({
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
