import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { MiraMark } from '@/components/mira';
import { Screen, Text } from '@/components/ui';
import {
  mockLobbyHref,
  mockReportHref,
  useMockAttemptStore,
  useSubmitMock,
} from '@/features/mock';

const STAGES = [
  'Listening paper',
  'Reading paper',
  'Writing scripts',
  'Speaking fluency',
] as const;

export default function MockAnalyzingScreen() {
  const router = useRouter();
  const { mockId = '' } = useLocalSearchParams<{ mockId: string }>();
  const storeMockId = useMockAttemptStore((state) => state.mockId);
  const setReport = useMockAttemptStore((state) => state.setReport);
  const submit = useSubmitMock();
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
    if (storeMockId !== mockId) {
      router.replace(mockLobbyHref(mockId));
      return;
    }
    submit.mutate(mockId, {
      onSuccess: (report) => {
        setReport(report);
        router.replace(mockReportHref(report.id));
      },
      onError: () => {
        router.replace(mockLobbyHref(mockId));
      },
    });
  }, [mockId, router, setReport, storeMockId, submit]);

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="flex-1 items-start justify-center px-6">
        <MiraMark size={72} pulsing />
        <Text variant="kicker" tone="subtle" className="mt-8">
          Marking the sitting
        </Text>
        <Text variant="h2" className="mt-2">
          {STAGES[stage]}
        </Text>
        <Text variant="bodySm" tone="muted" className="mt-4">
          AI estimated band — for practice purposes only. Not an official IELTS score, and not a live
          model.
        </Text>
      </View>
    </Screen>
  );
}
