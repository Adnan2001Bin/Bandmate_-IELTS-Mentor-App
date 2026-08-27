import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { duration, useTheme } from '@/theme';

export type SkeletonProps = {
  width?: number | `${number}%`;
  height?: number;
};

/** A loading placeholder. Pulses opacity rather than sweeping a gradient. */
export function Skeleton({ width = '100%', height = 16 }: SkeletonProps) {
  const { colors } = useTheme();
  const pulse = useSharedValue(0.45);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: duration.slow, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, [pulse]);

  const style = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return <Animated.View style={[{ width, height, backgroundColor: colors.border }, style]} />;
}
