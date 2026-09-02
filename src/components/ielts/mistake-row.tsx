import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Tag, Text } from '@/components/ui';
import { iconSize, useTheme } from '@/theme';
import type { Mistake } from '@/types';

export type MistakeRowProps = {
  mistake: Mistake;
  onPress?: () => void;
};

/** One notebook line. Prompt is the row; why lives on the detail screen. */
export function MistakeRow({ mistake, onPress }: MistakeRowProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-3 py-4 active:bg-surface"
    >
      <View className="flex-1 gap-1">
        <Tag label={mistake.category} tone="outline" />
        <Text variant="h4" numberOfLines={2}>
          {mistake.prompt}
        </Text>
        <Text variant="caption" tone="muted" numberOfLines={1}>
          You chose {mistake.given}
        </Text>
      </View>
      <ChevronRight size={iconSize.lg} color={colors.textSubtle} strokeWidth={2} />
    </Pressable>
  );
}
