import { View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Band } from '@/types';

export type BandScoreProps = {
  value: Band | number;
  /** Signed half-band move, e.g. 0.5. Hidden when omitted. */
  delta?: number;
  size?: 'md' | 'lg';
  className?: string;
};

/** The product's number. Size is the only variation — never a ring. */
export function BandScore({ value, delta, size = 'md', className }: BandScoreProps) {
  const shown = typeof value === 'number' ? value.toFixed(1) : String(value);

  return (
    <View className={cn('flex-row items-end gap-2', className)}>
      <Text variant={size === 'lg' ? 'displaySm' : 'h1'}>{shown}</Text>
      {delta !== undefined && delta !== 0 ? (
        <Text variant="label" tone="accent" className="pb-1">
          {delta > 0 ? '+' : ''}
          {delta.toFixed(1)}
        </Text>
      ) : null}
    </View>
  );
}
