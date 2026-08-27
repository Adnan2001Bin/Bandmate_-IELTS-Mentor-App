import { View } from 'react-native';

import { Text } from '@/components/ui';
import { toIsoDate } from '@/lib/date';
import { control, typography, useTheme } from '@/theme';
import type { DateFieldProps } from './date-field';

/**
 * The native picker has no web implementation, so the browser build uses the
 * platform's own date input. Same props, same look — see `date-field.tsx`.
 */
export function DateField({
  label,
  value,
  onChange,
  hint,
  hintTone = 'muted',
  minimumDate,
  maximumDate,
}: DateFieldProps) {
  const { colors } = useTheme();

  return (
    <View className="gap-2">
      <Text variant="kicker" tone="subtle">
        {label}
      </Text>

      <input
        type="date"
        aria-label={label}
        value={value ?? ''}
        min={minimumDate ? toIsoDate(minimumDate) : undefined}
        max={maximumDate ? toIsoDate(maximumDate) : undefined}
        onChange={(event) => {
          if (event.target.value) {
            onChange(event.target.value);
          }
        }}
        style={{
          height: control.md,
          paddingLeft: 16,
          paddingRight: 16,
          border: `2px solid ${colors.border}`,
          backgroundColor: colors.background,
          color: colors.text,
          fontFamily: typography.h4.fontFamily,
          fontSize: typography.h4.fontSize,
          borderRadius: 0,
          boxSizing: 'border-box',
          width: '100%',
        }}
      />

      {hint ? (
        <Text
          variant="caption"
          tone={hintTone === 'accent' ? 'accent' : hintTone === 'error' ? 'error' : 'muted'}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
