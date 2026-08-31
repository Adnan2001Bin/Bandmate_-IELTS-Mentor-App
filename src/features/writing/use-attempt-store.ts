import { create } from 'zustand';

import type { WritingEvaluation, WritingMethod, WritingMode } from '@/types';

type AttemptState = {
  taskId: string | null;
  mode: WritingMode;
  method: WritingMethod;
  body: string;
  remainingMs: number;
  pages: number;
  evaluation: WritingEvaluation | null;
  start: (input: {
    taskId: string;
    mode: WritingMode;
    method: WritingMethod;
    remainingMs: number;
    body?: string;
  }) => void;
  setBody: (body: string) => void;
  setRemainingMs: (ms: number) => void;
  addPage: () => void;
  removePage: () => void;
  setEvaluation: (evaluation: WritingEvaluation) => void;
  reset: () => void;
};

const empty = {
  taskId: null,
  mode: 'timed' as const,
  method: 'typed' as const,
  body: '',
  remainingMs: 0,
  pages: 0,
  evaluation: null as WritingEvaluation | null,
};

export const useWritingAttemptStore = create<AttemptState>((set) => ({
  ...empty,
  start: ({ taskId, mode, method, remainingMs, body = '' }) =>
    set({
      taskId,
      mode,
      method,
      remainingMs,
      body,
      pages: method === 'handwritten' ? 1 : 0,
      evaluation: null,
    }),
  setBody: (body) => set({ body }),
  setRemainingMs: (remainingMs) => set({ remainingMs }),
  addPage: () => set((state) => ({ pages: Math.min(3, state.pages + 1) })),
  removePage: () => set((state) => ({ pages: Math.max(0, state.pages - 1) })),
  setEvaluation: (evaluation) => set({ evaluation }),
  reset: () => set(empty),
}));
