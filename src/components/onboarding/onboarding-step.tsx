import { useRouter } from 'expo-router';
import { ArrowRight, ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, StepProgress, Text } from '@/components/ui';
import { control, iconSize, useTheme } from '@/theme';

export const ONBOARDING_STEPS = 4;

export type OnboardingStepProps = {
  /** Zero-based, so step one passes 0. */
  index: number;
  kicker: string;
  title: string;
  description?: string;
  children: ReactNode;
  onContinue: () => void;
  continueLabel?: string;
  canContinue?: boolean;
  loading?: boolean;
};

/**
 * The frame every onboarding step shares: progress across the top, a
 * typographic question, the answers, and one action pinned to the bottom.
 */
export function OnboardingStep({
  index,
  kicker,
  title,
  description,
  children,
  onContinue,
  continueLabel = 'Continue',
  canContinue = true,
  loading = false,
}: OnboardingStepProps) {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="px-6 pt-4">
        <View className="flex-row items-center gap-3">
          {index > 0 ? (
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={8}
              className="-ml-2 items-center justify-center px-2 active:opacity-60"
              style={{ height: control.minTouch, width: control.minTouch }}
            >
              <ChevronLeft size={iconSize.xl} color={colors.text} strokeWidth={2.25} />
            </Pressable>
          ) : null}

          <StepProgress total={ONBOARDING_STEPS} current={index} className="flex-1" />
        </View>

        <Text variant="kicker" tone="subtle" className="mt-6">
          {kicker}
        </Text>
        <Text variant="h1" className="mt-2">
          {title}
        </Text>
        {description ? (
          <Text variant="bodySm" tone="muted" className="mt-3">
            {description}
          </Text>
        ) : null}
      </View>

      <ScrollView
        className="mt-6 flex-1"
        contentContainerClassName="px-6 pb-6 gap-3"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>

      <View className="px-6 pb-2 pt-3">
        <Button
          label={continueLabel}
          trailingIcon={ArrowRight}
          onPress={onContinue}
          disabled={!canContinue}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
