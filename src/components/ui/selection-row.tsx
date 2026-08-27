import { Pressable, View } from 'react-native';

import { cn } from '@/lib/cn';
import { Text } from './text';

export type SelectionRowProps = {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  /** `radio` for one-of-many, `checkbox` for many-of-many. */
  mode?: 'radio' | 'checkbox';
  disabled?: boolean;
  className?: string;
};

/**
 * A full-width option row. Selection is shown by filling the row with accent
 * rather than by a control glyph, which is how the design references handle it.
 */
export function SelectionRow({
  label,
  description,
  selected,
  onPress,
  mode = 'radio',
  disabled = false,
  className,
}: SelectionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={mode}
      accessibilityState={{ selected, disabled }}
      className={cn(
        'flex-row items-center justify-between gap-4 border-2 px-4 py-4',
        selected ? 'border-primary bg-primary' : 'border-border active:bg-surface',
        disabled && 'opacity-40',
        className,
      )}
    >
      <View className="flex-1 gap-1">
        <Text variant="h4" tone={selected ? 'onPrimary' : 'default'}>
          {label}
        </Text>
        {description ? (
          <Text variant="caption" tone={selected ? 'onPrimary' : 'muted'}>
            {description}
          </Text>
        ) : null}
      </View>

      <View
        className={cn(
          'h-4 w-4 border-2',
          selected ? 'border-on-primary bg-on-primary' : 'border-divider',
        )}
      />
    </Pressable>
  );
}
