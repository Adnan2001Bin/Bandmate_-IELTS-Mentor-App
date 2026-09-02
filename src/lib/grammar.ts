import { isAnswerCorrect } from './listening';

export { isAnswerCorrect };

export function grammarXp(correct: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  return Math.round((correct / total) * 24) + 6;
}
