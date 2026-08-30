import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';

export type QuestionNavigatorStatus = 'idle' | 'current' | 'correct' | 'wrong';

export type QuestionNavigatorProps = {
  total: number;
  current: number;
  statusFor?: (index: number) => QuestionNavigatorStatus;
  onSelect: (index: number) => void;
};

/** Jump between questions on review. Current is ink; wrong is accent. */
export function QuestionNavigator({ total, current, statusFor, onSelect }: QuestionNavigatorProps) {
  return (
    <View className="flex-row flex-wrap gap-1">
      {Array.from({ length: total }, (_, index) => {
        const status = statusFor?.(index) ?? (index === current ? 'current' : 'idle');

        return (
          <Pressable
            key={index}
            onPress={() => onSelect(index)}
            accessibilityRole="button"
            accessibilityState={{ selected: index === current }}
            className={cn(
              'h-9 w-9 items-center justify-center border-2',
              status === 'current' && 'border-text bg-inverse-surface',
              status === 'correct' && 'border-text',
              status === 'wrong' && 'border-primary bg-primary',
              status === 'idle' && 'border-border',
            )}
          >
            <Text
              variant="label"
              tone={status === 'current' || status === 'wrong' ? (status === 'wrong' ? 'onPrimary' : 'onInverse') : 'default'}
            >
              {index + 1}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
