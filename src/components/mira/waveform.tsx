import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/theme';

const BAR_COUNT = 34;
const BAR_DURATION = 620;

/** Fixed heights keep the shape looking like speech rather than a sine wave. */
const SHAPE = [0.3, 0.55, 0.9, 0.45, 0.7, 1, 0.35, 0.6, 0.85, 0.4, 0.75, 0.5];

export type WaveformProps = {
  /** Bars settle flat when false. */
  active: boolean;
  height?: number;
  tone?: 'accent' | 'ink';
};

/** The listening indicator. Bars only — no gradients, no circles. */
export function Waveform({ active, height = 56, tone = 'accent' }: WaveformProps) {
  const { colors } = useTheme();
  const color = tone === 'accent' ? colors.primary : colors.text;

  return (
    <View className="w-full flex-row items-center justify-between" style={{ height }}>
      {Array.from({ length: BAR_COUNT }, (_, index) => (
        <Bar
          key={index}
          active={active}
          color={color}
          maxHeight={height * (SHAPE[index % SHAPE.length] ?? 0.5)}
          delay={(index % SHAPE.length) * 60}
        />
      ))}
    </View>
  );
}

function Bar({
  active,
  color,
  maxHeight,
  delay,
}: {
  active: boolean;
  color: string;
  maxHeight: number;
  delay: number;
}) {
  const scale = useSharedValue(0.16);

  useEffect(() => {
    if (!active) {
      scale.value = withTiming(0.16, { duration: 240 });
      return;
    }

    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: BAR_DURATION, easing: Easing.inOut(Easing.quad) }),
        -1,
        true,
      ),
    );
  }, [active, delay, scale]);

  const style = useAnimatedStyle(() => ({ height: maxHeight * scale.value }));

  return <Animated.View style={[{ width: 3, backgroundColor: color }, style]} />;
}
