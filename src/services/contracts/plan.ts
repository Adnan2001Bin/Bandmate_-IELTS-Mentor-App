import type { MiraFlag, PlanTask, SessionDebrief, TodayPlan } from '@/types';

export type PlanService = {
  getTodayPlan(): Promise<TodayPlan>;
  completeTask(taskId: string): Promise<TodayPlan>;
  skipToday(): Promise<TodayPlan>;
  /** Replaces the featured (first pending) task with one from the bench. */
  swapFeatured(taskId: string): Promise<TodayPlan>;
  getDebrief(): Promise<SessionDebrief>;
  getBench(): Promise<PlanTask[]>;
  getFlag(): Promise<MiraFlag>;
};
