import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { createElement, useRef, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { BottomSheet, Button, Text } from '@/components/ui';
import { fromIsoDate, formatLongDate, toIsoDate } from '@/lib/date';
import { control, iconSize, useTheme } from '@/theme';

export type DateFieldProps = {
  label: string;
  /** ISO `YYYY-MM-DD`, or null while unanswered. */
  value: string | null;
  onChange: (iso: string) => void;
  placeholder?: string;
  hint?: string;
  hintTone?: 'muted' | 'accent' | 'error';
  minimumDate?: Date;
  maximumDate?: Date;
};

/**
 * A date field backed by the platform picker: a dialog on Android, a spinner in
 * a sheet on iOS, and the browser's date input on web.
 */
export function DateField({
  label,
  value,
  onChange,
  placeholder = 'Choose a date',
  hint,
  hintTone = 'muted',
  minimumDate,
  maximumDate,
}: DateFieldProps) {
  const { colors, scheme } = useTheme();
  const [sheetOpen, setSheetOpen] = useState(false);
  const webInputRef = useRef<{ showPicker?: () => void; click: () => void } | null>(null);
  const selected = value ? fromIsoDate(value) : (minimumDate ?? new Date());

  function open() {
    if (Platform.OS === 'web') {
      const node = webInputRef.current;
      if (node?.showPicker) {
        node.showPicker();
      } else {
        node?.click();
      }
      return;
    }

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: selected,
        mode: 'date',
        minimumDate,
        maximumDate,
        onChange: (event, date) => {
          if (event.type === 'set' && date) {
            onChange(toIsoDate(date));
          }
        },
      });
      return;
    }

    setSheetOpen(true);
  }

  return (
    <View className="gap-2">
      <Text variant="kicker" tone="subtle">
        {label}
      </Text>

      <View className="relative flex-row items-center gap-2.5">
        <Pressable
          onPress={open}
          accessibilityRole="button"
          accessibilityLabel={`${label}. ${value ? formatLongDate(value) : placeholder}`}
          className="flex-1 justify-center border-2 border-border px-4 active:bg-surface"
          style={{ height: control.md }}
          pointerEvents={Platform.OS === 'web' ? 'none' : 'auto'}
        >
          <Text variant="h4" tone={value ? 'default' : 'subtle'} numberOfLines={1}>
            {value ? formatLongDate(value) : placeholder}
          </Text>
        </Pressable>

        <Pressable
          onPress={open}
          accessibilityRole="button"
          accessibilityLabel={`Pick ${label.toLowerCase()}`}
          className="items-center justify-center bg-secondary active:bg-secondary-pressed"
          style={{ height: control.md, width: control.md }}
          pointerEvents={Platform.OS === 'web' ? 'none' : 'auto'}
        >
          <Calendar size={iconSize.lg} color={colors.onSecondary} strokeWidth={2} />
        </Pressable>

        {Platform.OS === 'web'
          ? createElement('input', {
              ref: webInputRef,
              type: 'date',
              value: value ?? '',
              min: minimumDate ? toIsoDate(minimumDate) : undefined,
              max: maximumDate ? toIsoDate(maximumDate) : undefined,
              onChange: (event: { target: { value: string } }) => {
                if (event.target.value) {
                  onChange(event.target.value);
                }
              },
              style: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                border: 0,
                margin: 0,
                padding: 0,
              },
            })
          : null}
      </View>

      {hint ? (
        <Text
          variant="caption"
          tone={hintTone === 'accent' ? 'accent' : hintTone === 'error' ? 'error' : 'muted'}
        >
          {hint}
        </Text>
      ) : null}

      {Platform.OS === 'ios' ? (
        <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title={label}>
          <DateTimePicker
            value={selected}
            mode="date"
            display="spinner"
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            themeVariant={scheme}
            onChange={(_event, date) => {
              if (date) {
                onChange(toIsoDate(date));
              }
            }}
          />

          <Button label="Done" align="center" onPress={() => setSheetOpen(false)} />
        </BottomSheet>
      ) : null}
    </View>
  );
}
