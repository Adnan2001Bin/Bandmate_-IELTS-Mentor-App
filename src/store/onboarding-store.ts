import { create } from 'zustand';

import type { Band, DiagnosticResult, StudyGoal, StudyProfile, TestType } from '@/types';

/** Every answer is optional while the flow is in progress. */
export type OnboardingDraft = {
  goal: StudyGoal | null;
  targetBand: Band | null;
  testDate: string | null;
  testType: TestType;
  dailyMinutes: number | null;
};

type OnboardingState = {
  draft: OnboardingDraft;
  diagnostic: DiagnosticResult | null;
  setDraft: (patch: Partial<OnboardingDraft>) => void;
  setDiagnostic: (result: DiagnosticResult | null) => void;
  reset: () => void;
  /** Null until every required answer is present. */
  toStudyProfile: () => StudyProfile | null;
};

const emptyDraft: OnboardingDraft = {
  goal: null,
  targetBand: null,
  testDate: null,
  testType: 'academic',
  dailyMinutes: null,
};

/**
 * Answers live here while the learner moves through the steps, so going back
 * does not lose them. Nothing is persisted: the flow runs once, and the
 * finished profile goes to the profile service rather than staying in a store.
 */
export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  draft: emptyDraft,
  diagnostic: null,

  setDraft(patch) {
    set((state) => ({ draft: { ...state.draft, ...patch } }));
  },

  setDiagnostic(diagnostic) {
    set({ diagnostic });
  },

  reset() {
    set({ draft: emptyDraft, diagnostic: null });
  },

  toStudyProfile() {
    const { goal, targetBand, testDate, testType, dailyMinutes } = get().draft;

    if (!goal || !targetBand || !testDate || !dailyMinutes) {
      return null;
    }

    return { goal, targetBand, testDate, testType, dailyMinutes };
  },
}));
