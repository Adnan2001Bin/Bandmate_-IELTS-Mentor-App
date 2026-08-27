import type { ReactNode } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

export type CardProps = ViewProps & {
  children: ReactNode;
  /** Outlined reads as a grouped block; filled lifts it off the background. */
  variant?: 'outlined' | 'filled';
  padded?: boolean;
  onPress?: () => void;
  className?: string;
};

/**
 * Grouped content. Flat and square by design — separation comes from the border,
 * never from a shadow or a radius.
 */
export function Card({
  children,
  variant = 'outlined',
  padded = true,
  onPress,
  className,
  ...rest
}: CardProps) {
  const classes = cn(
    variant === 'outlined' ? 'border border-border bg-background' : 'bg-card',
    padded && 'p-4',
    className,
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} className={cn(classes, 'active:bg-surface')} accessibilityRole="button">
        {children}
      </Pressable>
    );
  }

  return (
    <View className={classes} {...rest}>
      {children}
    </View>
  );
}
