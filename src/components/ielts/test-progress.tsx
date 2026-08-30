import { ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { StepProgress, Text } from '@/components/ui';
import { control, iconSize, useTheme } from '@/theme';

export type TestProgressProps = {
  total: number;
  current: number;
  onBack?: () => void;
  trailing?: ReactNode;
};

/** Drill header: back, segmented bar, n/total. */
export function TestProgress({ total, current, onBack, trailing }: TestProgressProps) {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-3.5 border-b-2 border-divider px-4 py-3">
      {onBack ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          className="items-center justify-center active:opacity-60"
          style={{ width: control.minTouch, height: control.minTouch }}
        >
          <ChevronLeft size={iconSize.xl} color={colors.text} strokeWidth={2.25} />
        </Pressable>
      ) : null}

      <View className="flex-1">
        <StepProgress total={total} current={current} height={6} />
      </View>

      <Text variant="label" tone="muted">
        {current + 1}/{total}
      </Text>

      {trailing}
    </View>
  );
}
