import { Mic, Square } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Waveform } from '@/components/mira';
import { Text } from '@/components/ui';
import { control, iconSize, useTheme } from '@/theme';

import { RecordingTimer } from './recording-timer';

export type RecorderStatus = 'idle' | 'recording' | 'stopped';

export type SpeakingRecorderProps = {
  status: RecorderStatus;
  elapsedMs: number;
  limitMs?: number;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
};

/**
 * Mock mic. The clock is real; there is no capture URI yet — same honesty as
 * listening audio. Expo audio can replace the clock without changing this layout.
 */
export function SpeakingRecorder({
  status,
  elapsedMs,
  limitMs,
  onStart,
  onStop,
  disabled = false,
}: SpeakingRecorderProps) {
  const { colors } = useTheme();
  const live = status === 'recording';
  const label = live ? 'Stop' : status === 'stopped' ? 'Record again' : 'Start recording';

  return (
    <View className="bg-inverse-surface px-4 py-5">
      <Waveform active={live} height={56} tone="accent" />

      <View className="mt-5 flex-row items-end justify-between">
        <RecordingTimer elapsedMs={elapsedMs} limitMs={limitMs} tone="inverse" />
        <Text variant="kicker" tone="onInverseMuted">
          {live ? 'Recording' : status === 'stopped' ? 'Recorded' : 'Ready'}
        </Text>
      </View>

      <Pressable
        onPress={live ? onStop : onStart}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        className="mt-5 flex-row items-center justify-center bg-primary active:opacity-80"
        style={{ height: control.lg, opacity: disabled ? 0.4 : 1 }}
      >
        {live ? (
          <Square size={iconSize.lg} color={colors.onPrimary} strokeWidth={2.25} fill={colors.onPrimary} />
        ) : (
          <Mic size={iconSize.lg} color={colors.onPrimary} strokeWidth={2.25} />
        )}
        <Text variant="label" tone="onPrimary" className="ml-2">
          {label}
        </Text>
      </Pressable>

      <Text variant="caption" tone="onInverseMuted" className="mt-3">
        The clock is real. The microphone is not wired.
      </Text>
    </View>
  );
}
