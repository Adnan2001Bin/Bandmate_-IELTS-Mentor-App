import { ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Rule, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { control, iconSize, useTheme } from '@/theme';

export type AppHeaderProps = {
  title: string;
  /** Small tracked line above the title. */
  kicker?: string;
  onBack?: () => void;
  /** Rendered at the trailing edge, aligned with the title. */
  action?: ReactNode;
  /** `display` for tab roots, `compact` for pushed screens. */
  size?: 'display' | 'compact';
  className?: string;
};

/**
 * The app's header. Native headers are switched off throughout, because the
 * design system's header is a typographic block above a 2px rule, which the
 * stack header cannot express.
 */
export function AppHeader({
  title,
  kicker,
  onBack,
  action,
  size = 'display',
  className,
}: AppHeaderProps) {
  const { colors } = useTheme();

  return (
    <View className={cn('bg-background', className)}>
      {onBack ? (
        <View className="px-6">
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
            className="-ml-2 flex-row items-center self-start px-2 active:opacity-60"
            style={{ height: control.minTouch }}
          >
            <ChevronLeft size={iconSize.xl} color={colors.text} strokeWidth={2.25} />
          </Pressable>
        </View>
      ) : null}

      <View className="flex-row items-end justify-between gap-4 px-6 pb-5 pt-2">
        <View className="flex-1">
          {kicker ? (
            <Text variant="kicker" tone="subtle" className="mb-1">
              {kicker}
            </Text>
          ) : null}
          <Text variant={size === 'display' ? 'h1' : 'h2'} numberOfLines={2}>
            {title}
          </Text>
        </View>

        {action}
      </View>

      <Rule weight="section" />
    </View>
  );
}
