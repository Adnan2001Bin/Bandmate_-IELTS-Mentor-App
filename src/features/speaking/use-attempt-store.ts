import { create } from 'zustand';

import type { SpeakingEvaluation, SpeakingMode } from '@/types';

type AttemptState = {
  topicId: string | null;
  mode: SpeakingMode;
  fromRandom: boolean;
  index: number;
  answers: Record<string, number>;
  evaluation: SpeakingEvaluation | null;
  start: (input: { topicId: string; mode: SpeakingMode; fromRandom?: boolean }) => void;
  setIndex: (index: number) => void;
  recordAnswer: (questionId: string, durationMs: number) => void;
  setEvaluation: (evaluation: SpeakingEvaluation) => void;
  reset: () => void;
};

const empty = {
  topicId: null,
  mode: 'practice' as const,
  fromRandom: false,
  index: 0,
  answers: {} as Record<string, number>,
  evaluation: null as SpeakingEvaluation | null,
};

export const useSpeakingAttemptStore = create<AttemptState>((set) => ({
  ...empty,
  start: ({ topicId, mode, fromRandom = false }) =>
    set({
      topicId,
      mode,
      fromRandom,
      index: 0,
      answers: {},
      evaluation: null,
    }),
  setIndex: (index) => set({ index }),
  recordAnswer: (questionId, durationMs) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: durationMs } })),
  setEvaluation: (evaluation) => set({ evaluation }),
  reset: () => set(empty),
}));
