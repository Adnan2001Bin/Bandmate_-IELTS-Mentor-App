import { TextInput, View, type TextInputProps } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { typography, useTheme } from '@/theme';

export type WritingEditorProps = Omit<TextInputProps, 'style' | 'multiline'> & {
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
};

/** Body-size editor. The keyboard is the point; this is not a rich-text surface. */
export function WritingEditor({ value, onChangeText, className, ...rest }: WritingEditorProps) {
  const { colors } = useTheme();

  return (
    <View className={cn('flex-1 border-2 border-text', className)}>
      <Text variant="kicker" tone="subtle" className="px-4 pt-3">
        Your answer
      </Text>
      <TextInput
        multiline
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
        placeholder="Write here."
        placeholderTextColor={colors.textSubtle}
        selectionColor={colors.primary}
        className="flex-1 px-4 pb-4 pt-2 text-text"
        style={typography.body}
        autoCorrect
        {...rest}
      />
    </View>
  );
}
