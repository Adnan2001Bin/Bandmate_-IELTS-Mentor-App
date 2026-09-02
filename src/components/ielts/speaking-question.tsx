import { View } from 'react-native';

import { Text } from '@/components/ui';
import { partLabel } from '@/lib/speaking';
import type { SpeakingPart } from '@/types';

export type SpeakingQuestionProps = {
  part: SpeakingPart;
  prompt: string;
  indexLabel?: string;
};

/** Part 1 / Part 3 prompt. Part 2 uses CueCard. */
export function SpeakingQuestion({ part, prompt, indexLabel }: SpeakingQuestionProps) {
  return (
    <View className="gap-2">
      <Text variant="kicker" tone="subtle">
        {partLabel(part)}
        {indexLabel ? ` · ${indexLabel}` : ''}
      </Text>
      <Text variant="h2">{prompt}</Text>
    </View>
  );
}
