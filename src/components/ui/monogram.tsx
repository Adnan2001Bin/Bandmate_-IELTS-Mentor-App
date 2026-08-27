import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { Text } from './text';

export type MonogramSize = 'sm' | 'md' | 'lg';

const sizes: Record<MonogramSize, { box: number; variant: 'label' | 'h4' | 'h2' }> = {
  sm: { box: 32, variant: 'label' },
  md: { box: 44, variant: 'h4' },
  lg: { box: 64, variant: 'h2' },
};

export type MonogramProps = {
  /** Full name or a pre-computed set of initials; reduced to at most two letters. */
  name: string;
  size?: MonogramSize;
  tone?: 'ink' | 'accent';
  className?: string;
};

function toInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '?';
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Square avatar. Used for the user and for Mira's accent "M". */
export function Monogram({ name, size = 'md', tone = 'ink', className }: MonogramProps) {
  const { box, variant } = sizes[size];

  return (
    <View
      className={cn(
        'items-center justify-center',
        tone === 'accent' ? 'bg-primary' : 'bg-inverse-surface',
        className,
      )}
      style={{ width: box, height: box }}
    >
      <Text variant={variant} tone={tone === 'accent' ? 'onPrimary' : 'onInverse'}>
        {toInitials(name)}
      </Text>
    </View>
  );
}
