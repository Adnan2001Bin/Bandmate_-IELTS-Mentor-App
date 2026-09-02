import type { Band, SpeakingMode, SpeakingTopic, SpeakingTurn } from '@/types';

export { formatClock } from './listening';
export { snapBand } from './writing';

export function flattenTurns(topic: SpeakingTopic, mode: SpeakingMode): SpeakingTurn[] {
  const part3 = mode === 'challenge' ? topic.challengePart3 : topic.part3;
  return [...topic.part1, topic.part2, ...part3];
}

export function partLabel(part: 1 | 2 | 3): string {
  return `Part ${part}`;
}

export function estimatePace(elapsedMs: number): number {
  if (elapsedMs < 1_000) {
    return 0;
  }
  return Math.min(148, Math.round(96 + elapsedMs / 900));
}

export function estimatePauses(elapsedMs: number): number {
  return Math.floor(elapsedMs / 8_000);
}

export function speakingXp(band: Band, mode: SpeakingMode): number {
  const base = Math.round(band * 8);
  if (mode === 'challenge') {
    return base + 12;
  }
  if (mode === 'examiner') {
    return base + 6;
  }
  return base;
}
