import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { Text } from './text';

export type StatCellProps = {
  label: string;
  value: string;
  /** Rendered under the value, for units or deltas. */
  detail?: string;
  tone?: 'default' | 'accent';
  className?: string;
};

/** A number and its label. Designed to sit inside a ruled grid. */
export function StatCell({ label, value, detail, tone = 'default', className }: StatCellProps) {
  return (
    <View className={cn('gap-1 py-3', className)}>
      <Text variant="kicker" tone="subtle">
        {label}
      </Text>
      <Text variant="numeral" tone={tone === 'accent' ? 'accent' : 'default'}>
        {value}
      </Text>
      {detail ? (
        <Text variant="caption" tone="muted">
          {detail}
        </Text>
      ) : null}
    </View>
  );
}
