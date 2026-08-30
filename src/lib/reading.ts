import type { Band, ReadingQuestion } from '@/types';

import { estimateListeningBand } from './listening';

export { flattenQuestions, formatClock, isAnswerCorrect } from './listening';

/** Same 40-question conversion as listening, scaled from a short passage set. */
export function estimateReadingBand(correct: number, total: number): Band {
  return estimateListeningBand(correct, total);
}

export function formatAnswerKey(question: ReadingQuestion, key: string): string {
  const option = question.options?.find((item) => item.id === key);
  return option?.label ?? key;
}
