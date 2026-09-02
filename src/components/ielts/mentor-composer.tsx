import { ArrowRight } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { control, iconSize, typography, useTheme } from '@/theme';

export type MentorComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
};

/** Flush compose row. Zero radius. Send is the accent square, not a pill. */
export function MentorComposer({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = 'Ask Mira…',
}: MentorComposerProps) {
  const { colors } = useTheme();
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <View className="flex-row items-end gap-2 border-t-2 border-divider bg-background px-6 py-3">
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textSubtle}
        selectionColor={colors.primary}
        editable={!disabled}
        multiline
        blurOnSubmit={false}
        onSubmitEditing={() => {
          if (canSend) {
            onSend();
          }
        }}
        className="flex-1 border-2 border-border px-3 py-2 text-text"
        style={[typography.body, { minHeight: control.md, maxHeight: 120 }]}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Send"
        disabled={!canSend}
        onPress={onSend}
        className={cn('items-center justify-center bg-primary', !canSend && 'opacity-40')}
        style={{ width: control.lg, height: control.lg }}
      >
        <ArrowRight size={iconSize.lg} color={colors.onPrimary} strokeWidth={2.25} />
      </Pressable>
    </View>
  );
}

export function MentorPromptChip({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className="border-2 border-text px-3 py-2 active:bg-surface"
    >
      <Text variant="label">{label}</Text>
    </Pressable>
  );
}
