import type { ReactNode } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { Rule } from './rule';
import { Text } from './text';

export type SettingsSectionProps = {
  title: string;
  footer?: string;
  children: ReactNode;
  className?: string;
};

/** A kicker, a 2px rule, rows, and an optional caption. Used on Profile and Settings. */
export function SettingsSection({ title, footer, children, className }: SettingsSectionProps) {
  return (
    <View className={cn('px-6 pt-6', className)}>
      <Text variant="kicker" tone="subtle" className="pb-3">
        {title}
      </Text>
      <Rule weight="section" />
      {children}
      <Rule weight="section" />
      {footer ? (
        <Text variant="caption" tone="muted" className="pt-3">
          {footer}
        </Text>
      ) : null}
    </View>
  );
}
