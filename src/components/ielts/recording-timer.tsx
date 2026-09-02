import { View } from 'react-native';

import { Text } from '@/components/ui';
import { formatClock } from '@/lib/speaking';
import { cn } from '@/lib/cn';

export type RecordingTimerProps = {
  elapsedMs: number;
  /** Soft or hard cap shown after the slash. */
  limitMs?: number;
  /** Count down to zero instead of up. */
  remaining?: boolean;
  warnBelowMs?: number;
  /** Inverse when the clock sits on an ink panel. */
  tone?: 'default' | 'inverse';
};

/** Clock for prep, recording, or a speaking cap. Format matches the listening drill. */
export function RecordingTimer({
  elapsedMs,
  limitMs,
  remaining = false,
  warnBelowMs = 10_000,
  tone = 'default',
}: RecordingTimerProps) {
  const shown = remaining && limitMs !== undefined ? Math.max(0, limitMs - elapsedMs) : elapsedMs;
  const urgent = remaining && limitMs !== undefined ? shown <= warnBelowMs : false;
  const numberTone = urgent ? 'onPrimary' : tone === 'inverse' ? 'onInverse' : 'default';
  const mutedTone = urgent ? 'onPrimary' : tone === 'inverse' ? 'onInverseMuted' : 'muted';

  return (
    <View className={cn('flex-row items-baseline gap-2', urgent && 'bg-primary px-2 py-1')}>
      <Text variant="displaySm" tone={numberTone}>
        {formatClock(shown)}
      </Text>
      {limitMs !== undefined && !remaining ? (
        <Text variant="label" tone={mutedTone}>
          / {formatClock(limitMs)}
        </Text>
      ) : null}
    </View>
  );
}
