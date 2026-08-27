import { Pressable, View } from 'react-native';

import { cn } from '@/lib/cn';
import { control } from '@/theme';
import { Text } from './text';

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedControlProps<T extends string> = {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/** A single-choice control. The selected segment fills with accent. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <View className={cn('flex-row border border-divider', className)}>
      {options.map((option, index) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            className={cn(
              'flex-1 items-center justify-center',
              index > 0 && 'border-l border-divider',
              isSelected && 'bg-primary',
            )}
            style={{ height: control.sm }}
          >
            <Text
              variant="kicker"
              tone={isSelected ? 'onPrimary' : 'muted'}
              numberOfLines={1}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
