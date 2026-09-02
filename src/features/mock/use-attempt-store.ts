import { create } from 'zustand';

import type { MockReport } from '@/types';

type AttemptState = {
  mockId: string | null;
  sectionIndex: number;
  sectionStartedAt: number | null;
  report: MockReport | null;
  start: (mockId: string) => void;
  startSection: () => void;
  nextSection: () => void;
  setReport: (report: MockReport) => void;
  reset: () => void;
};

export const useMockAttemptStore = create<AttemptState>((set) => ({
  mockId: null,
  sectionIndex: 0,
  sectionStartedAt: null,
  report: null,
  start: (mockId) =>
    set({
      mockId,
      sectionIndex: 0,
      sectionStartedAt: Date.now(),
      report: null,
    }),
  startSection: () => set({ sectionStartedAt: Date.now() }),
  nextSection: () =>
    set((state) => ({
      sectionIndex: state.sectionIndex + 1,
      sectionStartedAt: Date.now(),
    })),
  setReport: (report) => set({ report }),
  reset: () => set({ mockId: null, sectionIndex: 0, sectionStartedAt: null, report: null }),
}));
