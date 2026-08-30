import { Pause, Play, Volume2, VolumeX } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Tag, Text } from '@/components/ui';
import { formatClock } from '@/lib/listening';
import { control, iconSize, useTheme } from '@/theme';

export type AudioPlayerProps = {
  durationMs: number;
  positionMs: number;
  playing: boolean;
  speed: number;
  muted?: boolean;
  onPlayPause: () => void;
  onCycleSpeed: () => void;
  onToggleMute?: () => void;
};

/**
 * Ink playback bar from the listening drill. Timing is real; the source is mock.
 */
export function AudioPlayer({
  durationMs,
  positionMs,
  playing,
  speed,
  muted = false,
  onPlayPause,
  onCycleSpeed,
  onToggleMute,
}: AudioPlayerProps) {
  const { colors } = useTheme();
  const progress = durationMs <= 0 ? 0 : Math.min(1, positionMs / durationMs);
  const Icon = playing ? Pause : Play;

  return (
    <View className="flex-row items-center gap-3.5 bg-inverse-surface px-4 py-3.5">
      <Pressable
        onPress={onPlayPause}
        accessibilityRole="button"
        accessibilityLabel={playing ? 'Pause' : 'Play'}
        className="items-center justify-center bg-primary active:opacity-80"
        style={{ width: control.md, height: control.md }}
      >
        <Icon size={iconSize.lg} color={colors.onPrimary} strokeWidth={2.25} />
      </Pressable>

      <View className="flex-1">
        <View className="h-1 bg-on-inverse-muted">
          <View className="h-1 bg-on-inverse" style={{ width: `${progress * 100}%` }} />
        </View>
        <View className="mt-1.5 flex-row justify-between">
          <Text variant="caption" tone="onInverseMuted">
            {formatClock(positionMs)}
          </Text>
          <Text variant="caption" tone="onInverseMuted">
            {formatClock(durationMs)}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onCycleSpeed}
        accessibilityRole="button"
        accessibilityLabel={`Speed ${speed} times`}
      >
        <Tag label={`${Number.isInteger(speed) ? speed.toFixed(1) : String(speed)}×`} tone="onInverse" />
      </Pressable>

      {onToggleMute ? (
        <Pressable
          onPress={onToggleMute}
          accessibilityRole="button"
          accessibilityLabel={muted ? 'Unmute' : 'Mute'}
          hitSlop={8}
        >
          {muted ? (
            <VolumeX size={iconSize.lg} color={colors.onInverseMuted} strokeWidth={2} />
          ) : (
            <Volume2 size={iconSize.lg} color={colors.onInverseMuted} strokeWidth={2} />
          )}
        </Pressable>
      ) : null}
    </View>
  );
}
