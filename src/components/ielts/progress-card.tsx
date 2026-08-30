import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui';
import { BandScore } from './band-score';
import { cn } from '@/lib/cn';

export type ProgressCardProps = {
  forecast: number;
  forecastDelta: number;
  mocksDone: number;
  mocksTotal: number;
  onForecastPress?: () => void;
};

/** Forecast and mocks, side by side — proof under today's session, not the point. */
export function ProgressCard({
  forecast,
  forecastDelta,
  mocksDone,
  mocksTotal,
  onForecastPress,
}: ProgressCardProps) {
  return (
    <View className="flex-row border-b border-divider">
      <Pressable
        onPress={onForecastPress}
        disabled={!onForecastPress}
        accessibilityRole={onForecastPress ? 'button' : undefined}
        className={cn('flex-1 px-6 py-3.5', onForecastPress && 'active:bg-surface')}
      >
        <Text variant="kicker" tone="subtle">
          Forecast
        </Text>
        <BandScore value={forecast} delta={forecastDelta} size="md" className="mt-1" />
      </Pressable>

      <View className="w-px bg-divider" />

      <View className="flex-1 px-6 py-3.5">
        <Text variant="kicker" tone="subtle">
          Mocks done
        </Text>
        <View className="mt-1 flex-row items-end gap-2">
          <Text variant="h1">{mocksDone}</Text>
          <Text variant="caption" tone="muted" className="pb-1">
            of {mocksTotal}
          </Text>
        </View>
      </View>
    </View>
  );
}
