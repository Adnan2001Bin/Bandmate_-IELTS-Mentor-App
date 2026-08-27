import { ChevronRight } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { cn } from '@/lib/cn';
import { control, iconSize, useTheme } from '@/theme';
import { Text } from './text';
import type { IconComponent } from './button';

export type ListRowProps = {
  label: string;
  description?: string;
  /** Right-hand text, for settings-style rows. */
  value?: string;
  icon?: IconComponent;
  /** Replaces the default chevron / value slot entirely. */
  accessory?: ReactNode;
  onPress?: () => void;
  className?: string;
};

/** A tappable row in a ruled list. Rules are supplied by the parent, not the row. */
export function ListRow({
  label,
  description,
  value,
  icon: Icon,
  accessory,
  onPress,
  className,
}: ListRowProps) {
  const { colors } = useTheme();

  const content = (
    <>
      {Icon ? <Icon size={iconSize.lg} color={colors.text} strokeWidth={2} /> : null}

      <View className="flex-1 gap-0.5">
        <Text variant="h4">{label}</Text>
        {description ? (
          <Text variant="caption" tone="muted">
            {description}
          </Text>
        ) : null}
      </View>

      {accessory ??
        (value ? (
          <Text variant="bodySm" tone="muted">
            {value}
          </Text>
        ) : onPress ? (
          <ChevronRight size={iconSize.lg} color={colors.textSubtle} strokeWidth={2} />
        ) : null)}
    </>
  );

  const classes = cn('flex-row items-center gap-4 py-4', className);

  if (!onPress) {
    return (
      <View className={classes} style={{ minHeight: control.minTouch }}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className={cn(classes, 'active:bg-surface')}
      style={{ minHeight: control.minTouch }}
    >
      {content}
    </Pressable>
  );
}
