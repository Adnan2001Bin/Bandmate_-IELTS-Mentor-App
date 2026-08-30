import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui';
import { control, iconSize, useTheme } from '@/theme';
import type { Band, PracticeStatus } from '@/types';
import { PracticeStatusTag } from './practice-status';

export type SkillCardProps = {
  label: string;
  description: string;
  band: Band | null;
  status: PracticeStatus;
  onPress: () => void;
};

/** One skill on the Practice hub. The band is the status; the tag is the plan. */
export function SkillCard({ label, description, band, status, onPress }: SkillCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-3 py-4 active:bg-surface"
      style={{ minHeight: control.minTouch }}
    >
      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between gap-3">
          <Text variant="h4">{label}</Text>
          {band !== null ? (
            <Text variant="h3" tone={status === 'gap' ? 'accent' : 'default'}>
              {band.toFixed(1)}
            </Text>
          ) : null}
        </View>
        <Text variant="caption" tone="muted">
          {description}
        </Text>
        <View className="mt-1">
          <PracticeStatusTag status={status} />
        </View>
      </View>
      <ChevronRight size={iconSize.lg} color={colors.textSubtle} strokeWidth={2} />
    </Pressable>
  );
}
