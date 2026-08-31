import { View } from 'react-native';

import { Text } from '@/components/ui';
import { rule, useTheme } from '@/theme';
import type { WritingSentenceFeedback as Feedback } from '@/types';

const KIND_LABEL = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  coherence: 'Coherence',
  task: 'Task',
} as const;

export type SentenceFeedbackProps = {
  item: Feedback;
};

/** One flagged sentence: excerpt, wrong → right, why. Not a red X. */
export function SentenceFeedback({ item }: SentenceFeedbackProps) {
  const { colors } = useTheme();

  return (
    <View
      className="gap-1 py-3 pl-3"
      style={{ borderLeftWidth: rule.emphasis, borderLeftColor: colors.primary }}
    >
      <Text variant="kicker" tone="subtle">
        {KIND_LABEL[item.kind]}
      </Text>
      <Text variant="bodySm">{item.excerpt}</Text>
      <Text variant="bodySm" className="mt-1">
        You wrote {item.wrong}. Prefer {item.right}.
      </Text>
      <Text variant="caption" tone="muted" className="mt-1">
        Why: {item.reason}
      </Text>
    </View>
  );
}
