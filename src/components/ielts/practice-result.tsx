import { View } from 'react-native';

import { MiraMark } from '@/components/mira';
import { Text } from '@/components/ui';

export type PracticeResultProps = {
  kicker: string;
  correct: number;
  total: number;
  headline: string;
  xp: number;
  pattern: string;
};

/**
 * Drill score. No IELTS skill band — vocab and grammar are support, not papers.
 */
export function PracticeResult({
  kicker,
  correct,
  total,
  headline,
  xp,
  pattern,
}: PracticeResultProps) {
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
            <Text variant="caption" tone="muted" className="mt-0.5">
              +{xp} XP
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row gap-3 px-6 py-5">
        <MiraMark size={34} />
        <View className="flex-1">
          <Text variant="kicker" tone="subtle" className="mb-2">
            One pattern worth naming
          </Text>
          <Text variant="bodySm">{pattern}</Text>
        </View>
      </View>
    </View>
  );
}
