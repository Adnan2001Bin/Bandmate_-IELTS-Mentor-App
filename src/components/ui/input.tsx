import { useState, type Ref } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { cn } from '@/lib/cn';
import { control, typography, useTheme } from '@/theme';
import { Text } from './text';

export type InputProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  /** Replaces the hint and turns the field red while set. */
  error?: string;
  hint?: string;
  ref?: Ref<TextInput>;
  className?: string;
};

export function Input({ label, error, hint, className, ref, ...rest }: InputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn('gap-2', className)}>
      {label ? (
        <Text variant="kicker" tone="subtle">
          {label}
        </Text>
      ) : null}

      <TextInput
        ref={ref}
        className={cn(
          'border-2 px-4 text-text',
          error ? 'border-error' : isFocused ? 'border-primary' : 'border-border',
        )}
        style={[typography.body, { height: control.md }]}
        placeholderTextColor={colors.textSubtle}
        selectionColor={colors.primary}
        onFocus={(event) => {
          setIsFocused(true);
          rest.onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          rest.onBlur?.(event);
        }}
        {...rest}
      />

      {error ? (
        <Text variant="caption" tone="error">
          {error}
        </Text>
      ) : hint ? (
        <Text variant="caption" tone="subtle">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

export type TextAreaProps = InputProps & {
  minHeight?: number;
};

export function TextArea({ label, error, hint, minHeight = 140, className, ref, ...rest }: TextAreaProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn('gap-2', className)}>
      {label ? (
        <Text variant="kicker" tone="subtle">
          {label}
        </Text>
      ) : null}

      <TextInput
        ref={ref}
        multiline
        textAlignVertical="top"
        className={cn(
          'border-2 p-4 text-text',
          error ? 'border-error' : isFocused ? 'border-primary' : 'border-border',
        )}
        style={[typography.body, { minHeight }]}
        placeholderTextColor={colors.textSubtle}
        selectionColor={colors.primary}
        onFocus={(event) => {
          setIsFocused(true);
          rest.onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          rest.onBlur?.(event);
        }}
        {...rest}
      />

      {error ? (
        <Text variant="caption" tone="error">
          {error}
        </Text>
      ) : hint ? (
        <Text variant="caption" tone="subtle">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
