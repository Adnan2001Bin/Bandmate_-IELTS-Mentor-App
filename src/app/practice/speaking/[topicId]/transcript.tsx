import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { AudioPlayer, Transcript } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, Screen, Text } from '@/components/ui';
import { useMockAudio } from '@/features/listening';
import { SPEAKING_LIBRARY_HREF, useSpeakingAttemptStore } from '@/features/speaking';

export default function SpeakingTranscriptScreen() {
  const router = useRouter();
  const { topicId = '' } = useLocalSearchParams<{ topicId: string }>();
  const evaluation = useSpeakingAttemptStore((state) => state.evaluation);
  const audio = useMockAudio(evaluation?.metrics.totalMs ?? 0);

  if (!evaluation || evaluation.topicId !== topicId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <Text variant="body" tone="muted">
            No transcript yet. Finish a speaking run first.
          </Text>
          <Button
            label="Speaking library"
            className="mt-4"
            onPress={() => router.replace(SPEAKING_LIBRARY_HREF)}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Transcript" kicker="Hear yourself" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-4">
        <AudioPlayer
          durationMs={evaluation.metrics.totalMs}
          positionMs={audio.positionMs}
          playing={audio.playing}
          speed={audio.speed}
          onPlayPause={audio.toggle}
          onCycleSpeed={audio.cycleSpeed}
        />
        <Text variant="caption" tone="muted" className="mt-3">
          Playback is a clock on the mock duration. There is no audio file. Hear yourself seeks the
          timestamp.
        </Text>
      </View>

      <View className="px-6 pt-5 pb-2">
        <Transcript
          lines={evaluation.transcript}
          activeAtMs={audio.playing ? audio.positionMs : undefined}
          onHear={(atMs) => audio.playFrom(atMs)}
        />
      </View>
    </Screen>
  );
}
