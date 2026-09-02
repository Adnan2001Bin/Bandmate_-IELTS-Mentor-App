import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { MiraMark } from '@/components/mira';
import { Screen, Text } from '@/components/ui';
import {
  speakingResultHref,
  speakingRunHref,
  useSpeakingAttemptStore,
  useSubmitSpeaking,
} from '@/features/speaking';

const STAGES = [
  'Listening back',
  'Counting fillers',
  'Checking fluency',
  'Naming the two fixes',
] as const;

export default function SpeakingAnalyzingScreen() {
  const router = useRouter();
  const { topicId = '' } = useLocalSearchParams<{ topicId: string }>();
  const submit = useSubmitSpeaking();
  const setEvaluation = useSpeakingAttemptStore((state) => state.setEvaluation);
  const started = useRef(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((current) => Math.min(current + 1, STAGES.length - 1));
    }, 400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (started.current) {
      return;
    }
    started.current = true;
    const state = useSpeakingAttemptStore.getState();
    if (state.topicId !== topicId) {
      router.replace(speakingRunHref(topicId));
      return;
    }

    const answers = Object.entries(state.answers).map(([questionId, durationMs]) => ({
      questionId,
      durationMs,
    }));

    submit.mutate(
      { topicId, mode: state.mode, answers },
      {
        onSuccess: (evaluation) => {
          setEvaluation(evaluation);
          router.replace(speakingResultHref(topicId));
        },
        onError: () => {
          router.replace(speakingRunHref(topicId));
        },
      },
    );
  }, [topicId, router, setEvaluation, submit]);

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="flex-1 items-start justify-center px-6">
        <MiraMark size={72} pulsing />
        <Text variant="kicker" tone="subtle" className="mt-8">
          Reading the recording
        </Text>
        <Text variant="h2" className="mt-2">
          {STAGES[stage]}
        </Text>
        <Text variant="bodySm" tone="muted" className="mt-4">
          A mock evaluation. Not an official IELTS score, and not a live model. The microphone was
          never wired.
        </Text>
      </View>
    </Screen>
  );
}
