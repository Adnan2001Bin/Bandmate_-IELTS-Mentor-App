import type { Band, StudyGoal, TestType } from '@/types';

export const TARGET_OPTIONS: readonly { band: Band; label: string; description: string }[] = [
  {
    band: 6,
    label: 'Most undergraduate courses',
    description: 'No individual band below 5.5',
  },
  {
    band: 7,
    label: 'Skilled migration, most PR points',
    description: 'No individual band below 6.5',
  },
  {
    band: 7.5,
    label: 'Competitive postgrad, licensing',
    description: 'Nursing and medical boards sit here',
  },
  {
    band: 8,
    label: 'Top-tier and specialist routes',
    description: 'Rarely required — check your body first',
  },
];

export const TEST_TYPE_OPTIONS: readonly { value: TestType; label: string }[] = [
  { value: 'academic', label: 'Academic' },
  { value: 'general', label: 'General Training' },
];

export const STUDY_GOAL_OPTIONS: readonly { value: StudyGoal; label: string; description: string }[] = [
  {
    value: 'university',
    label: 'University admission',
    description: 'An offer letter or a visa depends on this score.',
  },
  {
    value: 'migration',
    label: 'Skilled migration',
    description: 'Points-based residency, where every half band counts.',
  },
  {
    value: 'licensing',
    label: 'Professional licensing',
    description: 'Nursing, medical or engineering registration.',
  },
  {
    value: 'work',
    label: 'Work or promotion',
    description: 'An employer or a role has asked for proof.',
  },
  {
    value: 'other',
    label: 'Something else',
    description: "Tell Mira later — it won't change the plan much.",
  },
];

export const TIME_SLOTS: readonly { minutes: number; label: string; description: string }[] = [
  {
    minutes: 10,
    label: 'Ten minutes',
    description: 'A commute or a coffee. Slower, but it still counts.',
  },
  {
    minutes: 20,
    label: 'Twenty minutes',
    description: 'What most people can actually keep up. My default.',
  },
  {
    minutes: 40,
    label: 'Forty minutes',
    description: 'One full skill drill plus review, most days.',
  },
  {
    minutes: 60,
    label: 'An hour or more',
    description: "You're close to the test, or you have the room for it.",
  },
];

export function timeSlotsFor(current: number): readonly { minutes: number; label: string; description: string }[] {
  if (TIME_SLOTS.some((slot) => slot.minutes === current)) {
    return TIME_SLOTS;
  }
  return [
    {
      minutes: current,
      label: `${current} minutes`,
      description: 'What you set during onboarding.',
    },
    ...TIME_SLOTS,
  ];
}
