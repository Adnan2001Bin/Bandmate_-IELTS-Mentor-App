import { Zap } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui';
import { iconSize, useTheme } from '@/theme';

export type StreakStripProps = {
  days: number;
};

/** Streak as proof, never as a punishment. A broken streak is a later problem. */
export function StreakStrip({ days }: StreakStripProps) {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-1 bg-surface px-2 py-1">
      <Zap size={iconSize.xs} color={colors.text} strokeWidth={2.25} />
      <Text variant="kicker">{days}</Text>
    </View>
  );
}
