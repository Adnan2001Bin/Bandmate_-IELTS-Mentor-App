import type { Band } from '@/types';

/** Scale a short set onto the 40-question listening conversion, then snap to a half band. */
export function estimateListeningBand(correct: number, total: number): Band {
  if (total <= 0) {
    return 4;
  }

  const raw = (correct / total) * 40;
  const table: readonly [number, Band][] = [
    [39, 9],
    [37, 8.5],
    [35, 8],
    [32, 7.5],
    [30, 7],
    [26, 6.5],
    [23, 6],
    [18, 5.5],
    [16, 5],
    [13, 4.5],
  ];

  for (const [min, band] of table) {
    if (raw >= min) {
      return band;
    }
  }

  return 4;
}

export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function isAnswerCorrect(given: string, correct: string | readonly string[]): boolean {
  const value = normalizeAnswer(given);
  if (!value) {
    return false;
  }

  const accepted = typeof correct === 'string' ? [correct] : correct;
  return accepted.some((item) => normalizeAnswer(item) === value);
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function flattenQuestions<T>(set: { groups: readonly { questions: readonly T[] }[] }): T[] {
  return set.groups.flatMap((group) => [...group.questions]);
}
