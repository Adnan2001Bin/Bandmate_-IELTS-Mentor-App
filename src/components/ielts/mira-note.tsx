import { ArrowRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { iconSize, rule, useTheme } from '@/theme';

export type MiraNoteProps = {
  kicker?: string;
  title: string;
  body: string;
  ctaLabel?: string;
  onPress?: () => void;
  className?: string;
};

/**
 * Mira's voice on a page: a 4px accent rule, a short claim, and optionally one
 * action. Not a chat bubble.
 */
export function MiraNote({ kicker, title, body, ctaLabel, onPress, className }: MiraNoteProps) {
  const { colors } = useTheme();

  const inner = (
    <View
      className={cn('py-1 pl-3', className)}
      style={{ borderLeftWidth: rule.emphasis, borderLeftColor: colors.primary }}
    >
      {kicker ? (
        <Text variant="kicker" tone="subtle" className="mb-2">
          {kicker}
        </Text>
      ) : null}
      <Text variant="h4">{title}</Text>
      <Text variant="bodySm" tone="muted" className="mt-1">
        {body}
      </Text>
      {ctaLabel ? (
        <View className="mt-3 flex-row items-center gap-2">
          <Text variant="label" tone="accent">
            {ctaLabel}
          </Text>
          <ArrowRight size={iconSize.md} color={colors.primary} strokeWidth={2.25} />
        </View>
      ) : null}
    </View>
  );

  if (!onPress) {
    return inner;
  }

  return (
    <Pressable onPress={onPress} accessibilityRole="button" className="active:opacity-80">
      {inner}
    </Pressable>
  );
}
