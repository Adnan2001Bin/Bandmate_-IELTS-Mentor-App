import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { cn } from '@/lib/cn';
import { duration, rule, useTheme } from '@/theme';

export type ProgressBarProps = {
  /** Progress from 0 to 1; values outside the range are clamped. */
  value: number;
  /** Draws a rule at this position, for "where you need to be". */
  target?: number;
  height?: number;
  tone?: 'accent' | 'ink';
  className?: string;
  accessibilityLabel?: string;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export function ProgressBar({
  value,
  target,
  height = 10,
  tone = 'accent',
  className,
  accessibilityLabel,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const progress = useSharedValue(0);
  const resolved = clamp(value);

  useEffect(() => {
    progress.value = withTiming(resolved, { duration: duration.normal });
  }, [progress, resolved]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(resolved * 100) }}
      className={cn('relative w-full', className)}
      style={{ height, backgroundColor: colors.border }}
    >
      <Animated.View
        style={[
          { height, backgroundColor: tone === 'accent' ? colors.primary : colors.inverseSurface },
          fillStyle,
        ]}
      />

      {target === undefined ? null : (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: `${clamp(target) * 100}%`,
            top: -3,
            bottom: -3,
            width: rule.section,
            // Always the opposite of the fill, so the marker stays visible even
            // once progress runs past it.
            backgroundColor: tone === 'accent' ? colors.text : colors.primary,
          }}
        />
      )}
    </View>
  );
}
