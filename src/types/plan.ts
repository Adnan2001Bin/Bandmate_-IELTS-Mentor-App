import type { Band, PracticeArea, Skill } from './ielts';

export type PlanTaskStatus = 'pending' | 'done' | 'skipped';

export type PracticeStatus = 'recommended' | 'gap' | 'maintenance' | 'support';

export type PlanTask = {
  id: string;
  area: PracticeArea;
  title: string;
  reason: string;
  minutes: number;
  tags: readonly string[];
  status: PlanTaskStatus;
};

export type MiraFlag = {
  title: string;
  body: string;
  ctaLabel: string;
  minutes: number;
  area: PracticeArea;
};

export type TodayPlan = {
  date: string;
  /** Days into the habit, not the calendar. */
  dayNumber: number;
  daysToTest: number;
  targetBand: Band;
  headline: string;
  headlineBody: string;
  sessionTitle: string;
  totalMinutes: number;
  tasks: PlanTask[];
  forecast: Band;
  forecastDelta: number;
  mocksDone: number;
  mocksTotal: number;
  flag: MiraFlag;
  streakDays: number;
};

export type SessionDebrief = {
  sessionNumber: number;
  minutes: number;
  completed: number;
  total: number;
  xp: number;
  streakDays: number;
  liftSkill: Skill | null;
  liftBand: Band | null;
  pattern: string;
  next: { title: string; minutes: number } | null;
};

export type PracticeHubItem = {
  area: PracticeArea;
  label: string;
  description: string;
  band: Band | null;
  target: Band | null;
  status: PracticeStatus;
};

export type PracticeHub = {
  items: PracticeHubItem[];
  mistakeCount: number;
};
