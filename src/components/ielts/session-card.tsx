import { ArrowRight, Menu } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Button, InkPanel, Tag, Text } from '@/components/ui';
import { control, iconSize, useTheme } from '@/theme';

export type SessionCardProps = {
  kicker: string;
  title: string;
  tags?: readonly string[];
  onStart: () => void;
  onMore?: () => void;
  startLabel?: string;
};

/**
 * Today's one decision, inverted. Everything else on Home is proof; this is the
 * work.
 */
export function SessionCard({
  kicker,
  title,
  tags = [],
  onStart,
  onMore,
  startLabel = 'Start',
}: SessionCardProps) {
  const { colors } = useTheme();

  return (
    <InkPanel className="gap-3">
      <Text variant="kicker" tone="onInverseMuted">
        {kicker}
      </Text>
      <Text variant="h2" tone="onInverse">
        {title}
      </Text>

      {tags.length > 0 ? (
        <View className="mt-1 flex-row flex-wrap gap-1">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} tone="onInverse" />
          ))}
        </View>
      ) : null}

      <View className="mt-3 flex-row gap-0.5">
        <Button
          label={startLabel}
          trailingIcon={ArrowRight}
          onPress={onStart}
          className="flex-1"
        />
        {onMore ? (
          <Pressable
            onPress={onMore}
            accessibilityRole="button"
            accessibilityLabel="Change today's plan"
            className="items-center justify-center border-2 border-on-inverse-muted active:opacity-70"
            style={{ width: control.lg, height: control.lg }}
          >
            <Menu size={iconSize.lg} color={colors.onInverseMuted} strokeWidth={2} />
          </Pressable>
        ) : null}
      </View>
    </InkPanel>
  );
}
