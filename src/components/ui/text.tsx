import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { cn } from '@/lib/cn';
import { typography, type TypeVariant } from '@/theme';

export type TextTone =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'accent'
  | 'error'
  | 'warning'
  | 'onPrimary'
  | 'onSecondary'
  | 'onInverse'
  | 'onInverseMuted';

const toneClass: Record<TextTone, string> = {
  default: 'text-text',
  muted: 'text-text-muted',
  subtle: 'text-text-subtle',
  accent: 'text-primary-text',
  error: 'text-error',
  warning: 'text-warning',
  onPrimary: 'text-on-primary',
  onSecondary: 'text-on-secondary',
  onInverse: 'text-on-inverse',
  onInverseMuted: 'text-on-inverse-muted',
};

export type TextProps = RNTextProps & {
  variant?: TypeVariant;
  tone?: TextTone;
  className?: string;
};

/**
 * The only sanctioned way to render type. Size, weight and tracking come from
 * the scale; colour comes from a semantic tone, never a raw class.
 */
export function Text({
  variant = 'body',
  tone = 'default',
  className,
  style,
  ...rest
}: TextProps) {
  return (
    <RNText
      className={cn(toneClass[tone], className)}
      style={[typography[variant], style]}
      {...rest}
    />
  );
}
