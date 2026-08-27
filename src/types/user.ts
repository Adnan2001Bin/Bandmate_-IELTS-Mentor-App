import type { Band, SkillBands, TestType } from './ielts';

export type User = {
  id: string;
  name: string;
  email: string;
};

/** Everything onboarding captures, and everything the plan is derived from. */
export type StudyGoal = 'university' | 'migration' | 'licensing' | 'work' | 'other';

export type StudyProfile = {
  targetBand: Band;
  /** ISO date. The plan is back-dated from here. */
  testDate: string;
  testType: TestType;
  goal: StudyGoal;
  /** Minutes the user can give per day. */
  dailyMinutes: number;
};

export type DiagnosticResult = {
  overall: Band;
  skills: SkillBands;
  /** Mira's one-line read on what is actually holding the user back. */
  summary: string;
  completedAt: string;
};

export type AuthSession = {
  user: User;
  token: string;
  /** False until onboarding and the diagnostic are done. */
  hasCompletedOnboarding: boolean;
};
