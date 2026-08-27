import { daysUntil } from '@/lib/date';

/**
 * Half a band is roughly five weeks of consistent daily work. This is a rule of
 * thumb, not a promise, and it exists so the app can say "that is not enough
 * time" out loud instead of selling an unreachable target.
 */
const DAYS_PER_HALF_BAND = 35;

export const MIN_LEAD_DAYS = 7;

export type Feasibility = {
  days: number;
  /** Realistic band gain in the time available, in half-band steps. */
  realisticGain: number;
  /** Shown under the date field. */
  note: string;
  /** True when the date is missing, past, or too close to plan around. */
  tooSoon: boolean;
};

export function assessTestDate(testDate: string | null): Feasibility | null {
  if (!testDate) {
    return null;
  }

  const days = daysUntil(testDate);

  if (days < MIN_LEAD_DAYS) {
    return {
      days,
      realisticGain: 0,
      tooSoon: true,
      note:
        days < 0
          ? 'That date has already passed.'
          : 'That is too close to build a plan around. Pick a date at least a week away.',
    };
  }

  const realisticGain = Math.floor(days / DAYS_PER_HALF_BAND) * 0.5;

  if (realisticGain < 0.5) {
    return {
      days,
      realisticGain,
      tooSoon: false,
      note: `${days} days away — enough to sharpen what you have, not to move a band.`,
    };
  }

  return {
    days,
    realisticGain,
    tooSoon: false,
    note: `${days} days away — enough for +${realisticGain.toFixed(1)}.`,
  };
}
