import { View } from 'react-native';

import { BandScore } from './band-score';
import { Text } from '@/components/ui';
import type { Band } from '@/types';

export type ResultCardProps = {
  kicker: string;
  correct: number;
  total: number;
  headline: string;
  detail?: string;
  xp: number;
  streakDays: number;
  band: Band;
  bandLabel?: string;
};

/** Score block for a finished paper — numeral first, proof underneath. */
export function ResultCard({
  kicker,
  correct,
  total,
  headline,
  detail,
  xp,
  streakDays,
  band,
  bandLabel = 'Listening',
}: ResultCardProps) {
  return (
    <View>
      <View className="border-b-2 border-divider px-6 pb-5 pt-6">
        <Text variant="kicker" tone="subtle">
          {kicker}
        </Text>
        <View className="mt-2 flex-row items-end gap-3.5">
          <Text variant="displayLg">
            {correct}
            <Text variant="displaySm" tone="subtle">
              /{total}
            </Text>
          </Text>
          <View className="pb-1.5">
            <Text variant="label">{headline}</Text>
            {detail ? (
              <Text variant="caption" tone="muted" className="mt-0.5">
                {detail}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      <View className="flex-row border-b-2 border-divider">
        <View className="flex-1 border-r border-divider px-4 py-3.5">
          <Text variant="h2">+{xp}</Text>
          <Text variant="kicker" tone="subtle" className="mt-1">
            XP
          </Text>
        </View>
        <View className="flex-1 border-r border-divider px-4 py-3.5">
          <Text variant="h2">{streakDays}</Text>
          <Text variant="kicker" tone="subtle" className="mt-1">
            Day streak
          </Text>
        </View>
        <View className="flex-1 px-4 py-3.5">
          <BandScore value={band} size="md" />
          <Text variant="kicker" tone="subtle" className="mt-1">
            {bandLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
