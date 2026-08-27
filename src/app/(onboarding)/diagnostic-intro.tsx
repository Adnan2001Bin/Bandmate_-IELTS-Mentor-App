import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { MiraMark } from '@/components/mira';
import { OnboardingStep } from '@/components/onboarding';
import { Button, Rule, Text } from '@/components/ui';
import { services } from '@/services';
import { useOnboardingStore } from '@/store';

export default function DiagnosticIntroStep() {
  const router = useRouter();
  const setDiagnostic = useOnboardingStore((state) => state.setDiagnostic);
  const toStudyProfile = useOnboardingStore((state) => state.toStudyProfile);

  // Skipping still has to produce a starting point, otherwise there is nothing
  // to build a plan from.
  const skip = useMutation({
    mutationFn: async () => {
      const study = toStudyProfile();

      if (!study) {
        throw new Error('Answer the earlier steps first.');
      }

      return services.diagnostic.estimateWithoutSample(study);
    },
    onSuccess: (result) => {
      setDiagnostic(result);
      router.replace('/result');
    },
  });

  return (
    <OnboardingStep
      index={3}
      kicker="Step 04 — your starting point"
      title="NOW LET ME HEAR YOU."
      description="I don't need a test to place you. Thirty seconds of speech tells me more about your band than any multiple-choice question would."
      continueLabel="Start my diagnostic"
      canContinue={!skip.isPending}
      onContinue={() => router.push('/diagnostic')}
    >
      <View className="items-start py-2">
        <MiraMark size={72} />
      </View>

      <Rule weight="section" className="mt-2" />

      <Text variant="body" tone="muted" className="mt-3">
        I listen for fluency, range and grammar. There is no right answer and nothing to revise
        — you just talk, and I tell you what I hear.
      </Text>

      <Text variant="caption" tone="subtle" className="mt-3">
        Your recording stays on this device.
      </Text>

      <Button
        label="Skip — estimate from my answers"
        variant="ghost"
        size="md"
        loading={skip.isPending}
        onPress={() => skip.mutate()}
        className="mt-4 px-0"
      />

      {skip.isError ? (
        <Text variant="caption" tone="error">
          {skip.error.message}
        </Text>
      ) : null}
    </OnboardingStep>
  );
}
