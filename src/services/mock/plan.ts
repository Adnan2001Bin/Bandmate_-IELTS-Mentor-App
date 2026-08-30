import { daysUntil, toIsoDate } from '@/lib/date';
import { mockBenchTasks, mockPlanTasks } from '@/mocks/plan';
import { mockUserProfile } from '@/mocks/user';
import type { PlanTask, SessionDebrief, TodayPlan } from '@/types';
import type { PlanService } from '../contracts';
import { delay } from './latency';
import { mockProfileService } from './profile';

let tasks: PlanTask[] = mockPlanTasks.map((task) => ({ ...task }));
const sessionNumber = 12;

function featured(list: PlanTask[]): PlanTask | undefined {
  return list.find((task) => task.status === 'pending');
}

async function assemble(): Promise<TodayPlan> {
  const profile = await mockProfileService.getProfile();
  const study = profile.study;
  const target = study.targetBand.toFixed(1);
  const lead = featured(tasks);
  const remaining = tasks.filter((task) => task.status === 'pending');

  return {
    date: toIsoDate(new Date()),
    dayNumber: profile.streakDays,
    daysToTest: daysUntil(study.testDate),
    targetBand: study.targetBand,
    headline: `Your speaking is the only thing between you and ${target}.`,
    headlineBody:
      'Yesterday you paused 14 times in a two-minute answer. Let\'s fix fluency today — I\'ll interrupt you when you stall.',
    sessionTitle: lead?.title ?? 'Today\'s session',
    totalMinutes: remaining.reduce((sum, task) => sum + task.minutes, 0),
    tasks: tasks.map((task) => ({ ...task })),
    forecast: profile.diagnostic?.overall ?? mockUserProfile.diagnostic!.overall,
    forecastDelta: 0.5,
    mocksDone: 3,
    mocksTotal: 6,
    flag: {
      title: 'You keep reaching for "very"',
      body: 'Nine times this week, where a precise adjective would score. It\'s the cheapest half-band on the table.',
      ctaLabel: 'Fix it — 3 min',
      minutes: 3,
      area: 'vocabulary',
    },
    streakDays: profile.streakDays,
  };
}

export const mockPlanService: PlanService = {
  async getTodayPlan() {
    await delay();
    return assemble();
  },

  async completeTask(taskId) {
    await delay(250);
    tasks = tasks.map((task) => (task.id === taskId ? { ...task, status: 'done' } : task));
    return assemble();
  },

  async skipToday() {
    await delay(200);
    tasks = tasks.map((task) => (task.status === 'pending' ? { ...task, status: 'skipped' } : task));
    return assemble();
  },

  async swapFeatured(taskId) {
    await delay(200);
    const incoming = mockBenchTasks.find((task) => task.id === taskId);

    if (!incoming) {
      return assemble();
    }

    const current = featured(tasks);

    if (!current) {
      tasks = [{ ...incoming, status: 'pending' }, ...tasks];
      return assemble();
    }

    tasks = tasks.map((task) => (task.id === current.id ? { ...incoming, status: 'pending' } : task));
    return assemble();
  },

  async getDebrief() {
    await delay();
    const profile = await mockProfileService.getProfile();
    const done = tasks.filter((task) => task.status === 'done');
    const next = featured(tasks);

    const debrief: SessionDebrief = {
      sessionNumber,
      minutes: done.reduce((sum, task) => sum + task.minutes, 0) || profile.study.dailyMinutes,
      completed: done.length,
      total: tasks.length,
      xp: done.length * 70,
      streakDays: profile.streakDays,
      liftSkill: 'speaking',
      liftBand: 6,
      pattern:
        'Both of your misses were restart habits — you began a sentence, then abandoned it. Tomorrow\'s speaking set is only that.',
      next: next ? { title: next.title, minutes: next.minutes } : null,
    };

    return debrief;
  },

  async getBench() {
    await delay(200);
    return mockBenchTasks.map((task) => ({ ...task }));
  },

  async getFlag() {
    await delay(150);
    const plan = await assemble();
    return plan.flag;
  },
};
