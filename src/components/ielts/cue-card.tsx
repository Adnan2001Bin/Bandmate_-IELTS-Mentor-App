import { View } from 'react-native';

import { InkPanel, Text } from '@/components/ui';

export type CueCardProps = {
  title: string;
  bullets: readonly string[];
};

/** Part 2 prompt. Inverted so it is the one object on the desk. */
export function CueCard({ title, bullets }: CueCardProps) {
  return (
    <InkPanel>
      <Text variant="kicker" tone="onInverseMuted">
        Cue card
      </Text>
      <Text variant="h3" tone="onInverse" className="mt-2">
        {title}
      </Text>
      <Text variant="kicker" tone="onInverseMuted" className="mt-5">
        You should say
      </Text>
      <View className="mt-2 gap-2">
        {bullets.map((line) => (
          <Text key={line} variant="bodySm" tone="onInverse">
            — {line}
          </Text>
        ))}
      </View>
    </InkPanel>
  );
}
