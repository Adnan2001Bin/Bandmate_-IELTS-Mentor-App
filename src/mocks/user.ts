import type { UserProfile } from '@/services/contracts';

/**
 * The reference learner from the design deck: targeting 7.0, 34 days out,
 * held back by writing and fluency rather than knowledge.
 */
export const mockUserProfile: UserProfile = {
  user: {
    id: 'user_1',
    name: 'Adnan',
    email: 'adnan@example.com',
  },
  study: {
    targetBand: 7,
    testDate: '2026-09-28',
    testType: 'academic',
    goal: 'migration',
    dailyMinutes: 18,
  },
  diagnostic: {
    overall: 6,
    skills: { listening: 6.5, reading: 6, writing: 5.5, speaking: 6 },
    summary:
      'Your vocabulary is already band 7. Fluency is what is holding you at 6 — you restart sentences instead of finishing them. That is a habit, not a knowledge gap.',
    completedAt: '2026-08-14T09:12:00.000Z',
  },
  streakDays: 13,
  xp: 2040,
};
