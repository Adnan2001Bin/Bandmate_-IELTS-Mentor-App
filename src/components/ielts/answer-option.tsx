import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';

export type AnswerOptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dimmed';

export type AnswerOptionProps = {
  letter: string;
  label: string;
  state?: AnswerOptionState;
  onPress?: () => void;
};

/**
 * One choice in a listening / reading question. Correct is ink; wrong is accent.
 * Never a green tick.
 */
export function AnswerOption({ letter, label, state = 'idle', onPress }: AnswerOptionProps) {
  const letterTone =
    state === 'selected' || state === 'wrong'
      ? 'onPrimary'
      : state === 'correct'
        ? 'onInverse'
        : 'default';

  const letterBox =
    state === 'selected'
      ? 'bg-primary'
      : state === 'correct'
        ? 'bg-inverse-surface'
        : state === 'wrong'
          ? 'bg-primary'
          : 'border-2 border-text';

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress || state === 'dimmed' || state === 'correct' || state === 'wrong'}
      accessibilityRole="radio"
      accessibilityState={{
        selected: state === 'selected' || state === 'correct',
        disabled: !onPress,
      }}
      className={cn(
        'flex-row items-center gap-3 border-2 px-3 py-3',
        state === 'selected' && 'border-primary',
        state === 'correct' && 'border-text',
        state === 'wrong' && 'border-primary',
        state === 'idle' && 'border-border active:bg-surface',
        state === 'dimmed' && 'border-border opacity-40',
      )}
    >
      <View className={cn('h-8 w-8 items-center justify-center', letterBox)}>
        <Text variant="label" tone={letterTone}>
          {letter}
        </Text>
      </View>
      <Text variant="body" className="flex-1">
        {label}
      </Text>
    </Pressable>
  );
}
