import { Pressable, View } from 'react-native';

import { cn } from '@/lib/cn';
import { control } from '@/theme';
import { Text } from './text';

export type SettingsToggleProps = {
  label: string;
  description?: string;
  value: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
};

/**
 * A settings switch. On is ink, off is an empty square — never a pill.
 */
export function SettingsToggle({
  label,
  description,
  value,
  onChange,
  disabled = false,
}: SettingsToggleProps) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      className={cn('flex-row items-center gap-4 py-4', disabled && 'opacity-40')}
      style={{ minHeight: control.minTouch }}
    >
      <View className="flex-1 gap-0.5">
        <Text variant="h4">{label}</Text>
        {description ? (
          <Text variant="caption" tone="muted">
            {description}
          </Text>
        ) : null}
      </View>
      <View
        className={cn(
          'h-6 w-6 border-2',
          value ? 'border-inverse-surface bg-inverse-surface' : 'border-divider',
        )}
      />
    </Pressable>
  );
}
