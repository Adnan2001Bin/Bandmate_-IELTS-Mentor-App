import { View } from 'react-native';

import { MiraMark } from '@/components/mira';
import { Text } from '@/components/ui';
import { rule, useTheme } from '@/theme';

export type MentorPhase = 'thinking' | 'typing';

export type MentorStatusProps = {
  phase: MentorPhase;
};

const COPY: Record<MentorPhase, { kicker: string; line: string }> = {
  thinking: { kicker: 'Listening', line: 'Reading your bands, not the internet.' },
  typing: { kicker: 'Writing it down', line: 'One thing to do next. Not a paragraph of tips.' },
};

/**
 * Mock AI states. No tokens. The mark pulses while the mock delay is running.
 */
export function MentorStatus({ phase }: MentorStatusProps) {
  const { colors } = useTheme();
  const copy = COPY[phase];

  return (
    <View className="flex-row gap-3 py-3">
      <MiraMark size={28} pulsing />
      <View
        className="flex-1 pl-3"
        style={{ borderLeftWidth: rule.emphasis, borderLeftColor: colors.primary }}
      >
        <Text variant="kicker" tone="subtle" className="mb-2">
          {copy.kicker}
        </Text>
        <Text variant="bodySm" tone="muted">
          {copy.line}
        </Text>
      </View>
    </View>
  );
}
