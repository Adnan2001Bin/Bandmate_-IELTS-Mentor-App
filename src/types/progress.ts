import type { Band, PracticeArea, Skill } from './ielts';

export type TrajectoryPoint = {
  id: string;
  label: string;
  band: Band;
  projected?: boolean;
};

export type ProgressAnalytics = {
  practiceMinutesWeek: number;
  testsCompleted: number;
  questionsAnswered: number;
  accuracyPct: number;
  vocabularyHeld: number;
  speakingSessions: number;
  writingSubmissions: number;
  writingAverage: Band;
  speakingAverage: Band;
};

export type ProgressSnapshot = {
  current: Band;
  target: Band;
  forecast: Band;
  forecastDelta: number;
  streakDays: number;
  xp: number;
  skills: Record<Skill, Band>;
  trajectory: readonly TrajectoryPoint[];
  analytics: ProgressAnalytics;
};

export type HistoryKind = 'mock' | 'practice' | 'session';

export type HistoryEntry = {
  id: string;
  kind: HistoryKind;
  title: string;
  at: string;
  band: Band | null;
  area: PracticeArea | 'mock';
};

export type Weakness = {
  id: string;
  title: string;
  area: PracticeArea;
  cost: 'high' | 'medium' | 'held';
  evidence: string;
  fix: string;
  href: string;
};

export type LeagueMember = {
  id: string;
  name: string;
  xp: number;
  streakDays: number;
  you?: boolean;
};
