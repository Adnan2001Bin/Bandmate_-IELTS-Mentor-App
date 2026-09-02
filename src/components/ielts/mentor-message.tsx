import { View } from 'react-native';

import { MiraMark } from '@/components/mira';
import { Button, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { rule, useTheme } from '@/theme';
import type { MentorMessage } from '@/types';

export type MentorMessageProps = {
  message: MentorMessage;
  onAction?: (href: string) => void;
};

/**
 * A turn in Mira's desk. Not a chat bubble: you are a kicker + line; she is the
 * 4px accent rule. Actions are rectangles, never pills.
 */
export function MentorMessageBubble({ message, onAction }: MentorMessageProps) {
  const { colors } = useTheme();

  if (message.role === 'user') {
    return (
      <View className="gap-1 py-3">
        <Text variant="kicker" tone="subtle">
          You
        </Text>
        <Text variant="body">{message.body}</Text>
      </View>
    );
  }

  return (
    <View className="flex-row gap-3 py-3">
      <MiraMark size={28} />
      <View
        className="flex-1 pl-3"
        style={{ borderLeftWidth: rule.emphasis, borderLeftColor: colors.primary }}
      >
        <Text variant="kicker" tone="subtle" className="mb-2">
          Mira
        </Text>
        <Text variant="bodySm">{message.body}</Text>
        {message.actions && message.actions.length > 0 ? (
          <View className="mt-3 gap-1">
            {message.actions.map((item) => (
              <Button
                key={item.id}
                label={item.label}
                variant="ghost"
                size="md"
                className={cn('px-0')}
                onPress={() => onAction?.(item.href)}
              />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}
