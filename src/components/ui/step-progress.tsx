import { View } from 'react-native';

import { cn } from '@/lib/cn';

export type StepProgressProps = {
  total: number;
  /** Zero-based index of the active step. */
  current: number;
  height?: number;
  className?: string;
};

/**
 * The segmented bar that sits at the top of multi-step flows such as onboarding
 * and test sections. One segment per step, filled up to the current one.
 */
export function StepProgress({ total, current, height = 4, className }: StepProgressProps) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: total, now: Math.min(current + 1, total) }}
      className={cn('w-full flex-row gap-1', className)}
    >
      {Array.from({ length: total }, (_, index) => (
        <View
          key={index}
          className={cn('flex-1', index <= current ? 'bg-primary' : 'bg-border')}
          style={{ height }}
        />
      ))}
    </View>
  );
}
