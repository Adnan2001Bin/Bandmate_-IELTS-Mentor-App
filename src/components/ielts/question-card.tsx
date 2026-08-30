import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

export type QuestionCardProps = {
  kicker?: string;
  prompt: string;
  constraint?: string;
  children?: ReactNode;
};

/** Prompt plus the answer surface. The type of input is the child's job. */
export function QuestionCard({ kicker, prompt, constraint, children }: QuestionCardProps) {
  return (
    <View className="gap-4">
      {kicker ? (
        <Text variant="kicker" tone="subtle">
          {kicker}
        </Text>
      ) : null}
      <Text variant="h3">{prompt}</Text>
      {constraint ? (
        <Text variant="caption" tone="muted">
          {constraint}
        </Text>
      ) : null}
      {children}
    </View>
  );
}
