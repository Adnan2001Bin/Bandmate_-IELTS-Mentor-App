import type { ReactNode } from 'react';
import { ScrollView, View, type ViewProps } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { cn } from '@/lib/cn';
import { layout } from '@/theme';

export type ScreenProps = ViewProps & {
  children: ReactNode;
  /** Wraps content in a ScrollView. Off by default so lists can own scrolling. */
  scroll?: boolean;
  /** Applies the standard horizontal screen gutter. */
  padded?: boolean;
  edges?: readonly Edge[];
  className?: string;
  contentClassName?: string;
};

/**
 * Every route's outermost element. Owns the safe areas and the background so no
 * screen has to remember either.
 */
export function Screen({
  children,
  scroll = false,
  padded = false,
  edges = ['top'],
  className,
  contentClassName,
  ...rest
}: ScreenProps) {
  const contentClass = cn(padded && 'px-6', contentClassName);

  return (
    <SafeAreaView className={cn('flex-1 bg-background', className)} edges={edges} {...rest}>
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName={contentClass}
          contentContainerStyle={{ paddingBottom: layout.sectionGap }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View className={cn('flex-1', contentClass)}>{children}</View>
      )}
    </SafeAreaView>
  );
}
