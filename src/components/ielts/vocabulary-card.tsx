import { Pressable, View } from 'react-native';

import { Tag, Text } from '@/components/ui';
import type { VocabWord } from '@/types';

export type VocabularyCardProps = {
  word: VocabWord;
  due?: boolean;
  known?: boolean;
  difficult?: boolean;
  onPress?: () => void;
};

/** One headword in a set. Meaning is a line, not a paragraph. */
export function VocabularyCard({ word, due, known, difficult, onPress }: VocabularyCardProps) {
  const inner = (
    <View className="py-3">
      <View className="flex-row items-start justify-between gap-3">
        <Text variant="h3" className="flex-1">
          {word.headword}
        </Text>
        <View className="flex-row gap-1">
          {due ? <Tag label="Due" tone="accent" /> : null}
          {difficult ? <Tag label="Hard" tone="accent" /> : null}
          {known && !difficult ? <Tag label="Held" tone="ink" /> : null}
        </View>
      </View>
      <Text variant="bodySm" tone="muted" className="mt-1">
        {word.meaning}
      </Text>
    </View>
  );

  if (!onPress) {
    return inner;
  }

  return (
    <Pressable onPress={onPress} accessibilityRole="button" className="active:opacity-80">
      {inner}
    </Pressable>
  );
}
