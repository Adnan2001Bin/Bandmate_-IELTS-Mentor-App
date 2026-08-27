import { useMutation } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Square } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MiraMark, Waveform } from '@/components/mira';
import { Text } from '@/components/ui';
import { services } from '@/services';
import { useOnboardingStore } from '@/store';
import { dark, iconSize, typography } from '@/theme';

/** Long enough to read fluency, short enough that nobody bails. */
const SAMPLE_SECONDS = 30;

const formatClock = (seconds: number) => `0:${`${seconds}`.padStart(2, '0')}`;

/**
 * The capture screen is always dark, in either app theme. It is a recording
 * booth rather than a page: the inversion is what tells you the mic is live.
 *
 * Audio capture itself arrives with the speaking module — this runs the real
 * timing and hands the duration to the diagnostic service.
 */
export default function DiagnosticScreen() {
  const router = useRouter();
  const setDiagnostic = useOnboardingStore((state) => state.setDiagnostic);
  const toStudyProfile = useOnboardingStore((state) => state.toStudyProfile);

  const [elapsed, setElapsed] = useState(0);
  const submitted = useRef(false);

  const submit = useMutation({
    mutationFn: async (seconds: number) => {
      const study = toStudyProfile();

      if (!study) {
        throw new Error('Answer the earlier steps first.');
      }

      return services.diagnostic.submitVoiceSample({ seconds, study });
    },
    onSuccess: (result) => {
      setDiagnostic(result);
      router.replace('/result');
    },
  });

  const { mutate } = submit;

  const finish = useCallback(
    (seconds: number) => {
      if (submitted.current) {
        return;
      }

      submitted.current = true;
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      mutate(seconds);
    },
    [mutate],
  );

  useEffect(() => {
    // Wall-clock rather than a tick count, so a backgrounded app does not
    // under-report how long the learner actually spoke.
    const startedAt = Date.now();

    const timer = setInterval(() => {
      const seconds = Math.min(Math.round((Date.now() - startedAt) / 1000), SAMPLE_SECONDS);
      setElapsed(seconds);

      if (seconds >= SAMPLE_SECONDS) {
        clearInterval(timer);
        finish(SAMPLE_SECONDS);
      }
    }, 250);

    return () => clearInterval(timer);
  }, [finish]);

  const isListening = !submit.isPending && !submitted.current;

  return (
    <View className="flex-1" style={{ backgroundColor: dark.background }}>
      <StatusBar style="light" />

      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="flex-row items-center justify-between px-6 pt-4">
          <Text variant="kicker" style={{ color: dark.textSubtle }}>
            Diagnostic — speaking
          </Text>
          <Pressable
            onPress={() => finish(elapsed)}
            accessibilityRole="button"
            hitSlop={12}
            className="active:opacity-60"
          >
            <Text variant="label" style={{ color: dark.textMuted }}>
              SKIP
            </Text>
          </Pressable>
        </View>

        <View className="flex-1 justify-center px-6">
          <MiraMark size={104} pulsing={isListening} />

          <Text
            variant="display"
            className="mt-8 text-[31px] leading-[34px]"
            style={{ color: dark.text }}
          >
            {"TELL ME WHY\nYOU'RE TAKING\nIELTS."}
          </Text>

          <Text variant="bodySm" className="mt-4 max-w-[296px]" style={{ color: dark.textMuted }}>
            Just talk for thirty seconds. I&apos;m listening for fluency, range and grammar —
            there is no right answer here.
          </Text>

          <ListeningTag listening={isListening} />
        </View>

        <View className="px-6 pb-4">
          <Waveform active={isListening} />
        </View>

        <View
          className="mx-6 flex-row items-center gap-4 pt-5"
          style={{ borderTopWidth: 2, borderTopColor: dark.border }}
        >
          <Pressable
            onPress={() => finish(elapsed)}
            disabled={submit.isPending}
            accessibilityRole="button"
            accessibilityLabel="Stop recording"
            className="h-[60px] w-[60px] items-center justify-center active:opacity-80"
            style={{ backgroundColor: dark.primary }}
          >
            <Square size={iconSize.xl} color={dark.onPrimary} fill={dark.onPrimary} />
          </Pressable>

          <View>
            <Text variant="h3" style={{ color: dark.text }}>
              {formatClock(elapsed)}
            </Text>
            <Text variant="caption" style={{ color: dark.textSubtle }}>
              {submit.isPending ? 'Reading your sample…' : 'Tap to stop early'}
            </Text>
          </View>
        </View>

        {submit.isError ? (
          <Text variant="caption" className="px-6 pt-3" style={{ color: dark.error }}>
            {submit.error.message}
          </Text>
        ) : null}
      </SafeAreaView>
    </View>
  );
}

function ListeningTag({ listening }: { listening: boolean }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = listening
      ? withRepeat(withTiming(0.15, { duration: 650, easing: Easing.inOut(Easing.ease) }), -1, true)
      : withTiming(1);
  }, [listening, opacity]);

  const dotStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View
      className="mt-6 flex-row items-center gap-2 self-start px-3 py-2"
      style={{ borderWidth: 2, borderColor: dark.primary }}
    >
      <Animated.View style={[{ width: 8, height: 8, backgroundColor: dark.primary }, dotStyle]} />
      <Text style={[typography.kicker, { color: dark.text }]}>
        {listening ? 'MIRA IS LISTENING' : "THAT'S ENOUGH"}
      </Text>
    </View>
  );
}
