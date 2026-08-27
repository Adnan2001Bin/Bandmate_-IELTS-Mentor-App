import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

export type InkPanelProps = ViewProps & {
  children: ReactNode;
  padded?: boolean;
  className?: string;
};

/**
 * An inverted block. The system's strongest emphasis short of accent red, used
 * sparingly for the one thing on a screen that matters most. Text inside must
 * use the `onInverse` tone.
 */
export function InkPanel({ children, padded = true, className, ...rest }: InkPanelProps) {
  return (
    <View className={cn('bg-inverse-surface', padded && 'p-5', className)} {...rest}>
      {children}
    </View>
  );
}
