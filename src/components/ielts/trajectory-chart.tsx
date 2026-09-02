import { View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { useTheme } from '@/theme';
import type { TrajectoryPoint } from '@/types';

export type TrajectoryChartProps = {
  points: readonly TrajectoryPoint[];
  target: number;
  className?: string;
};

const FLOOR = 4;
const CEILING = 9;
const HEIGHT = 96;

function ratio(band: number): number {
  return Math.min(1, Math.max(0, (band - FLOOR) / (CEILING - FLOOR)));
}

/**
 * Weekly band columns. Solid = held. Dashed = projected. No chart library.
 */
export function TrajectoryChart({ points, target, className }: TrajectoryChartProps) {
  const { colors } = useTheme();
  const targetTop = (1 - ratio(target)) * HEIGHT;

  return (
    <View className={cn('pt-2', className)}>
      <View className="relative flex-row items-end justify-between" style={{ height: HEIGHT }}>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: targetTop,
            borderTopWidth: 2,
            borderStyle: 'dashed',
            borderColor: colors.primary,
          }}
        />
        {points.map((point) => {
          const h = Math.max(4, ratio(point.band) * HEIGHT);
          return (
            <View key={point.id} className="flex-1 items-center px-0.5">
              <View
                style={{
                  width: '70%',
                  height: h,
                  backgroundColor: point.projected ? 'transparent' : colors.inverseSurface,
                  borderWidth: 2,
                  borderColor: colors.inverseSurface,
                  borderStyle: point.projected ? 'dashed' : 'solid',
                }}
              />
            </View>
          );
        })}
      </View>
      <View className="mt-2 flex-row justify-between">
        {points.map((point) => (
          <Text key={point.id} variant="caption" tone="muted" className="flex-1 text-center">
            {point.label}
          </Text>
        ))}
      </View>
    </View>
  );
}
