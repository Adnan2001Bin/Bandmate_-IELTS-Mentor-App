import { View } from 'react-native';

import { ProgressBar, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Band, SpeakingCriterion, WritingCriterion } from '@/types';

const FLOOR = 4;
const CEILING = 9;
const toRatio = (band: number) => (band - FLOOR) / (CEILING - FLOOR);

export const WRITING_CRITERION_LABEL: Record<WritingCriterion, string> = {
  taskResponse: 'Task response',
  coherenceCohesion: 'Coherence & cohesion',
  lexicalResource: 'Lexical resource',
  grammaticalRange: 'Grammar',
};

export const SPEAKING_CRITERION_LABEL: Record<SpeakingCriterion, string> = {
  fluencyCoherence: 'Fluency & coherence',
  lexicalResource: 'Lexical resource',
  grammaticalRange: 'Grammar',
  pronunciation: 'Pronunciation',
};

const CRITERION_LABEL: Record<WritingCriterion | SpeakingCriterion, string> = {
  ...WRITING_CRITERION_LABEL,
  ...SPEAKING_CRITERION_LABEL,
};

export type CriterionRowProps = {
  criterion: WritingCriterion | SpeakingCriterion;
  /** Override the default label (Task Achievement on Task 1). */
  label?: string;
  band: Band;
  note?: string;
  target?: Band;
  className?: string;
};

/** One writing criterion: bar is now, optional rule is target. Shortfall is accent. */
export function CriterionRow({
  criterion,
  label,
  band,
  note,
  target,
  className,
}: CriterionRowProps) {
  const short = target !== undefined && target - band >= 1;
  const title = label ?? CRITERION_LABEL[criterion];

  return (
    <View className={cn('border-t border-divider py-3', className)}>
      <View className="flex-row items-center gap-3">
        <Text variant="label" className="w-[108px]" numberOfLines={2}>
          {title}
        </Text>
        <ProgressBar
          value={toRatio(band)}
          target={target !== undefined ? toRatio(target) : undefined}
          height={18}
          tone={short ? 'accent' : 'ink'}
          className="flex-1"
          accessibilityLabel={`${title} band ${band}`}
        />
        <Text variant="h3" className="w-8 text-right">
          {band.toFixed(1)}
        </Text>
      </View>
      {note ? (
        <Text variant="caption" tone="muted" className="mt-2">
          {note}
        </Text>
      ) : null}
    </View>
  );
}
