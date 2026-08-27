import { View } from 'react-native';

import { cn } from '@/lib/cn';

export type RuleWeight = 'row' | 'section' | 'emphasis';

const weightClass: Record<RuleWeight, string> = {
  row: 'h-px',
  section: 'h-0.5',
  emphasis: 'h-1',
};

export type RuleProps = {
  /** `row` separates list items, `section` separates blocks, `emphasis` opens one. */
  weight?: RuleWeight;
  accent?: boolean;
  className?: string;
};

/** The system's primary organising device: rules instead of cards and shadows. */
export function Rule({ weight = 'row', accent = false, className }: RuleProps) {
  return (
    <View
      className={cn(weightClass[weight], accent ? 'bg-primary' : 'bg-divider', className)}
    />
  );
}
