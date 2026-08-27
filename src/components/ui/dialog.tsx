import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { duration, elevation, scrimOpacity, useTheme } from '@/theme';
import { Button, type ButtonVariant } from './button';
import { Rule } from './rule';
import { Text } from './text';

export type DialogAction = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
};

export type DialogProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Stacked below the body; the first action reads as the primary one. */
  actions?: DialogAction[];
};

/** A centred, square modal. Used for confirmations and short decisions. */
export function Dialog({ visible, onClose, title, description, children, actions }: DialogProps) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center p-6">
        <Animated.View
          entering={FadeIn.duration(duration.fast)}
          exiting={FadeOut.duration(duration.instant)}
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.inverseSurface, opacity: scrimOpacity },
          ]}
        >
          <Pressable
            accessibilityLabel="Close"
            accessibilityRole="button"
            className="flex-1"
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(duration.normal)}
          exiting={FadeOut.duration(duration.instant)}
          className="w-full border-2 border-text bg-background"
          style={elevation.overlay}
        >
          <View className="gap-2 p-5">
            <Text variant="h3">{title}</Text>
            {description ? (
              <Text variant="body" tone="muted">
                {description}
              </Text>
            ) : null}
            {children}
          </View>

          {actions?.length ? (
            <>
              <Rule weight="section" />
              <View className="gap-px">
                {actions.map((action, index) => (
                  <Button
                    key={action.label}
                    label={action.label}
                    onPress={action.onPress}
                    variant={action.variant ?? (index === 0 ? 'primary' : 'ghost')}
                    size="md"
                  />
                ))}
              </View>
            </>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  );
}
