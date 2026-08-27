import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { iconSize, useTheme } from '@/theme';
import { Button, type IconComponent } from './button';
import { Text } from './text';

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: IconComponent;
  action?: { label: string; onPress: () => void };
  className?: string;
};

/** Shown when a surface has no data yet, as opposed to having failed. */
export function EmptyState({ title, description, icon: Icon, action, className }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View className={cn('items-start gap-3 border-2 border-border p-5', className)}>
      {Icon ? <Icon size={iconSize.xl} color={colors.textSubtle} strokeWidth={2} /> : null}

      <View className="gap-1">
        <Text variant="h3">{title}</Text>
        {description ? (
          <Text variant="body" tone="muted">
            {description}
          </Text>
        ) : null}
      </View>

      {action ? (
        <Button
          label={action.label}
          onPress={action.onPress}
          variant="outline"
          size="md"
          align="center"
          fullWidth={false}
          className="mt-1"
        />
      ) : null}
    </View>
  );
}
