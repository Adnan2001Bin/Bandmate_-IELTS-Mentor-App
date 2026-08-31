import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { MiraMark } from '@/components/mira';
import { Screen, Text } from '@/components/ui';
import {
  useSubmitWriting,
  useWritingAttemptStore,
  writingResultHref,
  writingWriteHref,
} from '@/features/writing';

const STAGES = [
  'Counting words',
  'Checking task response',
  'Reading for cohesion',
  'Naming the one pattern',
] as const;

export default function WritingAnalyzingScreen() {
  const router = useRouter();
  const { taskId = '' } = useLocalSearchParams<{ taskId: string }>();
  const submit = useSubmitWriting();
  const setEvaluation = useWritingAttemptStore((state) => state.setEvaluation);
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
    const state = useWritingAttemptStore.getState();
    if (state.taskId !== taskId) {
      router.replace(writingWriteHref(taskId));
      return;
    }

    submit.mutate(
      {
        taskId,
        body: state.body,
        mode: state.mode,
        method: state.method,
        remainingMs: state.remainingMs,
      },
      {
        onSuccess: (evaluation) => {
          setEvaluation(evaluation);
          router.replace(writingResultHref(taskId));
        },
        onError: () => {
          router.replace(writingWriteHref(taskId));
        },
      },
    );
  }, [taskId, router, setEvaluation, submit]);

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="flex-1 items-start justify-center px-6">
        <MiraMark size={72} pulsing />
        <Text variant="kicker" tone="subtle" className="mt-8">
          Reading the script
        </Text>
        <Text variant="h2" className="mt-2">
          {STAGES[stage]}
        </Text>
        <Text variant="bodySm" tone="muted" className="mt-4">
          A mock evaluation. Not an official IELTS score, and not a live model.
        </Text>
      </View>
    </Screen>
  );
}
