import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { Text, type TextTone } from './text';

export type TagTone = 'neutral' | 'accent' | 'ink' | 'outline' | 'onInverse';

const toneStyles: Record<TagTone, { container: string; text: TextTone }> = {
  neutral: { container: 'bg-surface', text: 'muted' },
  accent: { container: 'bg-primary', text: 'onPrimary' },
  ink: { container: 'bg-inverse-surface', text: 'onInverse' },
  outline: { container: 'border border-divider', text: 'muted' },
  onInverse: { container: 'border border-on-inverse-muted', text: 'onInverseMuted' },
};

export type TagProps = {
  label: string;
  tone?: TagTone;
  className?: string;
};

/** A short status marker. Square, uppercase, never a pill. */
export function Tag({ label, tone = 'neutral', className }: TagProps) {
  const style = toneStyles[tone];

  return (
    <View className={cn('self-start px-2 py-1', style.container, className)}>
      <Text variant="kicker" tone={style.text}>
        {label}
      </Text>
    </View>
  );
}
