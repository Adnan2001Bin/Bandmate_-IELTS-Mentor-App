import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { duration, elevation, scrimOpacity, useTheme } from '@/theme';
import { Rule } from './rule';
import { Text } from './text';

const DISMISS_DISTANCE = 120;

export type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

/** A sheet that rises from the bottom edge and can be dragged away. */
export function BottomSheet({ visible, onClose, title, children }: BottomSheetProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(0);

  const dragToDismiss = Gesture.Pan()
    .onChange((event) => {
      translateY.value = Math.max(0, translateY.value + event.changeY);
    })
    .onEnd(() => {
      if (translateY.value > DISMISS_DISTANCE) {
        runOnJS(onClose)();
      }
      translateY.value = withTiming(0, { duration: duration.fast });
    });

  const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <GestureHandlerRootView style={StyleSheet.absoluteFill}>
        <View className="flex-1 justify-end">
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

          <GestureDetector gesture={dragToDismiss}>
            <Animated.View
              entering={SlideInDown.duration(duration.normal)}
              exiting={SlideOutDown.duration(duration.fast)}
              className="border-t-2 border-text bg-background"
              style={[elevation.overlay, sheetStyle, { paddingBottom: insets.bottom }]}
            >
              <View className="items-center py-3">
                <View className="h-1 w-10 bg-divider" />
              </View>

              {title ? (
                <>
                  <View className="px-5 pb-4">
                    <Text variant="h3">{title}</Text>
                  </View>
                  <Rule weight="section" />
                </>
              ) : null}

              <View className="p-5">{children}</View>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}
