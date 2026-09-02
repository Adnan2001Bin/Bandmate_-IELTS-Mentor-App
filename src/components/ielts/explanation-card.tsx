import { View } from 'react-native';

import { Text } from '@/components/ui';
import { rule, useTheme } from '@/theme';

export type ExplanationCardProps = {
  kicker?: string;
  body: string;
  given?: string;
  expected?: string;
};

/**
 * Why the answer is the answer. Names the pattern. Never says “Correct!”.
 */
export function ExplanationCard({
  kicker = 'Why',
  body,
  given,
  expected,
}: ExplanationCardProps) {
  const { colors } = useTheme();
  const missed = Boolean(given && expected && given !== expected);

  return (
    <View
      className="gap-1 py-3 pl-3"
      style={{ borderLeftWidth: rule.emphasis, borderLeftColor: colors.primary }}
    >
      <Text variant="kicker" tone="subtle">
        {kicker}
      </Text>
      {missed ? (
        <Text variant="bodySm" className="mt-1">
          You chose {given}. The line wants {expected}.
        </Text>
      ) : null}
      <Text variant="bodySm" tone="muted" className="mt-1">
        {body}
      </Text>
    </View>
  );
}
