import { View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';

export type WordCounterProps = {
  words: number;
  minWords: number;
  characters: number;
  saved?: boolean;
  className?: string;
};

/** Sticky count. Under-length is accent; on-length is ink. */
export function WordCounter({ words, minWords, characters, saved, className }: WordCounterProps) {
  const short = words < minWords;

  return (
    <View className={cn('flex-row items-end justify-between gap-3', className)}>
      <View>
        <Text variant="h3" tone={short ? 'accent' : 'default'}>
          {words}
          <Text variant="bodySm" tone="muted">
            {' '}
            / {minWords}
          </Text>
        </Text>
        <Text variant="kicker" tone={short ? 'accent' : 'subtle'}>
          Words
        </Text>
      </View>
      <View className="items-end">
        <Text variant="caption" tone="muted">
          {characters} characters
        </Text>
        <Text variant="caption" tone="subtle">
          {saved ? 'Saved' : 'Saving…'}
        </Text>
      </View>
    </View>
  );
}
