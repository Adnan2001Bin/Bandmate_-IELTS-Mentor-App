import { View } from 'react-native';

import { Text } from '@/components/ui';
import { formatClock } from '@/lib/listening';
import { cn } from '@/lib/cn';

export type TestTimerProps = {
  remainingMs: number;
  /** Accent the clock when time is short. */
  warnBelowMs?: number;
};

/** Sticky countdown for timed papers. Practice mode does not render this. */
export function TestTimer({ remainingMs, warnBelowMs = 60_000 }: TestTimerProps) {
  const urgent = remainingMs <= warnBelowMs;

  return (
    <View className={cn('px-2 py-1', urgent && 'bg-primary')}>
      <Text variant="label" tone={urgent ? 'onPrimary' : 'default'}>
        {formatClock(remainingMs)}
      </Text>
    </View>
  );
}
