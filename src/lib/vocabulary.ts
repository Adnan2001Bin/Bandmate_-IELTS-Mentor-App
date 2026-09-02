import type { SrsBox, VocabProgress } from '@/types';

export { isAnswerCorrect } from './listening';

/** Day 1 learn, then 2 / 4 / 7 / 14 — APP_DESCRIPTION §9. */
export const SRS_GAPS_DAYS = [1, 2, 4, 7, 14] as const;

export function todayStamp(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function addDays(stamp: string, days: number): string {
  const date = new Date(`${stamp}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function isDue(dueAt: string, today = todayStamp()): boolean {
  return dueAt <= today;
}

export function isKnown(progress: VocabProgress | undefined): boolean {
  return (progress?.box ?? 0) >= 2 && !progress?.difficult;
}

export function gradeProgress(
  current: VocabProgress | undefined,
  wordId: string,
  knew: boolean,
  today = todayStamp(),
): VocabProgress {
  if (!knew) {
    return {
      wordId,
      box: 0,
      dueAt: addDays(today, 1),
      forgotten: (current?.forgotten ?? 0) + 1,
      difficult: true,
    };
  }

  const nextBox = Math.min(4, (current?.box ?? 0) + 1) as SrsBox;
  const gap = SRS_GAPS_DAYS[nextBox] ?? 14;

  return {
    wordId,
    box: nextBox,
    dueAt: addDays(today, gap),
    forgotten: current?.forgotten ?? 0,
    difficult: false,
  };
}

export function blankExample(example: string, headword: string): string {
  const pattern = new RegExp(headword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  return example.replace(pattern, '______');
}
