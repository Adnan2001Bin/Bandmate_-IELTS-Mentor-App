import type { ComponentType } from 'react';
import { ActivityIndicator, Pressable, View, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';
import { control, iconSize, useTheme, type ControlSize } from '@/theme';
import { Text } from './text';

/** Structural shape of a Lucide icon, kept local so the library stays swappable. */
export type IconComponent = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

type VariantStyle = {
  container: string;
  pressed: string;
  tone: 'onPrimary' | 'onSecondary' | 'default';
};

const variants: Record<ButtonVariant, VariantStyle> = {
  primary: { container: 'bg-primary', pressed: 'active:bg-primary-pressed', tone: 'onPrimary' },
  secondary: {
    container: 'bg-secondary',
    pressed: 'active:bg-secondary-pressed',
    tone: 'onSecondary',
  },
  outline: { container: 'border-2 border-text', pressed: 'active:bg-surface', tone: 'default' },
  ghost: { container: '', pressed: 'active:bg-surface', tone: 'default' },
};

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: ButtonVariant;
  size?: ControlSize;
  /** Renders at the far right, opposite the label. */
  trailingIcon?: IconComponent;
  leadingIcon?: IconComponent;
  loading?: boolean;
  /** Left-aligned by default, which is how the design system sets CTAs. */
  align?: 'left' | 'center';
  fullWidth?: boolean;
  className?: string;
};

export function Button({
  label,
  variant = 'primary',
  size = 'lg',
  trailingIcon: TrailingIcon,
  leadingIcon: LeadingIcon,
  loading = false,
  align = 'left',
  fullWidth = true,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();
  const style = variants[variant];
  const isInactive = Boolean(disabled) || loading;

  // Icons and the spinner sit outside NativeWind's reach, so they read the
  // resolved palette directly rather than a class.
  const contentColor =
    style.tone === 'onPrimary'
      ? colors.onPrimary
      : style.tone === 'onSecondary'
        ? colors.onSecondary
        : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive, busy: loading }}
      disabled={isInactive}
      className={cn(
        'flex-row items-center gap-3 px-5',
        align === 'center' ? 'justify-center' : 'justify-between',
        fullWidth ? 'w-full' : 'self-start',
        style.container,
        !isInactive && style.pressed,
        isInactive && 'opacity-40',
        className,
      )}
      style={{ height: control[size] }}
      {...rest}
    >
      <View className="flex-row items-center gap-3">
        {LeadingIcon ? <LeadingIcon size={iconSize.lg} color={contentColor} strokeWidth={2.25} /> : null}
        <Text variant="label" tone={style.tone === 'default' ? 'default' : style.tone}>
          {label}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color={contentColor} />
      ) : TrailingIcon ? (
        <TrailingIcon size={iconSize.lg} color={contentColor} strokeWidth={2.25} />
      ) : null}
    </Pressable>
  );
}
