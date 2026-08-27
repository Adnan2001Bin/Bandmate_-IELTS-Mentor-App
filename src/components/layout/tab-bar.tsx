import * as Haptics from 'expo-haptics';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import type { IconComponent } from '@/components/ui';
import { cn } from '@/lib/cn';
import { iconSize, rule, useTheme } from '@/theme';

/**
 * The subset of React Navigation's tab bar props this component uses. Declared
 * structurally so `@react-navigation/bottom-tabs` stays a transitive dependency.
 */
export type TabBarProps = {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  navigation: {
    navigate: (name: string) => void;
    emit: (event: {
      type: 'tabPress';
      target: string;
      canPreventDefault: true;
    }) => { defaultPrevented: boolean };
  };
};

export type TabDefinition = {
  name: string;
  label: string;
  icon: IconComponent;
};

/**
 * The design system's tab bar: a 2px rule across the top, and a 3px accent rule
 * over the active tab. No pill, no background fill, no shadow.
 */
export function AppTabBar({
  state,
  navigation,
  tabs,
}: TabBarProps & { tabs: readonly TabDefinition[] }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row border-t-2 border-divider bg-background"
      style={{ paddingBottom: insets.bottom }}
      accessibilityRole="tablist"
    >
      {state.routes.map((route, index) => {
        const tab = tabs.find((entry) => entry.name === route.name);

        if (!tab) {
          return null;
        }

        const isFocused = state.index === index;
        const Icon = tab.icon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (isFocused || event.defaultPrevented) {
            return;
          }

          void Haptics.selectionAsync();
          navigation.navigate(route.name);
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={tab.label}
            className={cn('flex-1 items-center gap-1.5 pb-3 pt-3', !isFocused && 'active:opacity-60')}
            style={{
              borderTopWidth: rule.tab,
              borderTopColor: isFocused ? colors.primary : 'transparent',
            }}
          >
            <Icon
              size={iconSize.lg}
              color={isFocused ? colors.primary : colors.textMuted}
              strokeWidth={2}
            />
            <Text variant="tabLabel" tone={isFocused ? 'accent' : 'muted'}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
