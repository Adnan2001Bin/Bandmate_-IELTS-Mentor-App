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

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { useTheme } from '@/theme';

const RING_DURATION = 2600;

export type MiraMarkProps = {
  size?: number;
  /** Emits expanding rules while Mira is listening. */
  pulsing?: boolean;
  className?: string;
};

/**
 * Mira's mark: an accent square with a bottom-set "M". The product's one piece
 * of brand furniture, so it is a component rather than a repeated layout.
 */
export function MiraMark({ size = 96, pulsing = false, className }: MiraMarkProps) {
  return (
    <View style={{ width: size, height: size }} className={cn('relative', className)}>
      {pulsing ? (
        <>
          <Ring size={size} delay={0} />
          <Ring size={size} delay={RING_DURATION / 2} />
        </>
      ) : null}

      <View className="absolute inset-0 justify-end bg-primary" style={{ padding: size * 0.1 }}>
        <Text
          variant="display"
          tone="onPrimary"
          style={{ fontSize: size * 0.46, lineHeight: size * 0.37 }}
        >
          M
        </Text>
      </View>
    </View>
  );
}

function Ring({ size, delay }: { size: number; delay: number }) {
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration: RING_DURATION, easing: Easing.out(Easing.ease) }), -1),
    );
  }, [delay, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [{ scale: 1 + progress.value * 0.9 }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderWidth: 2,
          borderColor: colors.primary,
        },
        style,
      ]}
    />
  );
}
