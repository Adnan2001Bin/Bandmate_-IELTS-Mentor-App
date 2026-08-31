import type { Band, WritingLiveFlag } from '@/types';

export { formatClock } from './listening';

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) {
    return 0;
  }
  return trimmed.split(/\s+/).length;
}

export function snapBand(value: number): Band {
  const clamped = Math.min(9, Math.max(4, value));
  return (Math.round(clamped * 2) / 2) as Band;
}

const WEAK = [
  { id: 'very', pattern: /\bvery\b/gi, label: '“very”' },
  { id: 'important', pattern: /\bimportant\b/gi, label: '“important”' },
  { id: 'good', pattern: /\bgood\b/gi, label: '“good”' },
  { id: 'bad', pattern: /\bbad\b/gi, label: '“bad”' },
  { id: 'thing', pattern: /\bthings?\b/gi, label: '“thing(s)”' },
] as const;

/** Cheap live flags for the editor — not a grammar engine. */
export function liveFlags(text: string): WritingLiveFlag[] {
  const flags: WritingLiveFlag[] = [];

  for (const item of WEAK) {
    const count = text.match(item.pattern)?.length ?? 0;
    if (count >= 2) {
      flags.push({
        id: item.id,
        label: `You have used ${item.label} ${count} times. Swap one.`,
      });
    }
  }

  if (/\btechnology have\b/i.test(text)) {
    flags.push({
      id: 'have',
      label: '“Technology have” — the subject is singular. Use “has”.',
    });
  }

  return flags;
}

export function firstParagraph(text: string): string {
  const block = text.trim().split(/\n{2,}/)[0]?.trim() ?? '';
  return block || text.trim();
}
