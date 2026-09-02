import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  AudioPlayer,
  CoachingCard,
  CueCard,
  RecordingTimer,
  SpeakingQuestion,
  SpeakingRecorder,
  TestProgress,
} from '@/components/ielts';
import { Button, ErrorState, Screen, Skeleton, StatCell, Text } from '@/components/ui';
import { useMockAudio } from '@/features/listening';
import {
  speakingAnalyzingHref,
  speakingTopicHref,
  useMockRecorder,
  useSpeakingAttemptStore,
  useSpeakingTopic,
} from '@/features/speaking';
import { estimatePauses, estimatePace, flattenTurns, formatClock, partLabel } from '@/lib/speaking';

export default function SpeakingRunScreen() {
  const router = useRouter();
  const { topicId = '' } = useLocalSearchParams<{ topicId: string }>();
  const { data: topic, isPending, isError, refetch } = useSpeakingTopic(topicId);

  const mode = useSpeakingAttemptStore((state) => state.mode);
  const storeTopicId = useSpeakingAttemptStore((state) => state.topicId);
  const index = useSpeakingAttemptStore((state) => state.index);
  const answers = useSpeakingAttemptStore((state) => state.answers);
  const setIndex = useSpeakingAttemptStore((state) => state.setIndex);
  const recordAnswer = useSpeakingAttemptStore((state) => state.recordAnswer);

  const turns = useMemo(() => (topic ? flattenTurns(topic, mode) : []), [topic, mode]);
  const turn = turns[index];
  const hardLimit = turn?.part === 2 ? turn.speakMs : undefined;
  const { status, elapsedMs, start, stop, reset } = useMockRecorder(hardLimit);

  const [phase, setPhase] = useState<'prep' | 'speak'>('speak');
  const [prepElapsed, setPrepElapsed] = useState(0);
  const prepOrigin = useRef<number | null>(null);

  const lastMs = turn ? (answers[turn.id] ?? 0) : 0;
  const playbackMs = status === 'stopped' ? elapsedMs || lastMs : lastMs;
  const playback = useMockAudio(playbackMs);
  const turnIdRef = useRef(turn?.id);
  turnIdRef.current = turn?.id;

  useEffect(() => {
    if (!storeTopicId || storeTopicId !== topicId) {
      router.replace(speakingTopicHref(topicId));
    }
  }, [storeTopicId, topicId, router]);

  useEffect(() => {
    reset();
    if (turn?.part === 2) {
      prepOrigin.current = Date.now();
      setPhase('prep');
      setPrepElapsed(0);
    } else {
      prepOrigin.current = null;
      setPhase('speak');
    }
  }, [turn?.id, reset, turn?.part]);

  useEffect(() => {
    if (phase !== 'prep' || !turn || turn.part !== 2) {
      return;
    }

    const origin = prepOrigin.current ?? Date.now();
    const cap = turn.prepMs;
    const id = setInterval(() => {
      const next = Date.now() - origin;
      setPrepElapsed(next);
      if (next >= cap) {
        setPhase('speak');
      }
    }, 200);

    return () => clearInterval(id);
  }, [phase, turn]);

  useEffect(() => {
    if (status !== 'stopped') {
      return;
    }
    const id = turnIdRef.current;
    if (id && elapsedMs > 0) {
      recordAnswer(id, elapsedMs);
    }
  }, [status, elapsedMs, recordAnswer]);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="gap-3 px-6 pt-8">
          <Skeleton height={24} />
          <Skeleton height={80} />
        </View>
      </Screen>
    );
  }

  if (isError || !topic || !turn) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const isPractice = mode === 'practice';
  const isLast = index >= turns.length - 1;
  const recorded = (answers[turn.id] ?? 0) > 0;
  const targetMs = turn.part === 2 ? turn.speakMs : turn.targetMs;
  const held = recorded && lastMs >= targetMs * 0.45;
  const partPeers = turns.filter((item) => item.part === turn.part);
  const partPos = partPeers.findIndex((item) => item.id === turn.id);
  const liveCoaching = isPractice && status === 'recording' && elapsedMs >= 8_000;
  const afterCoaching = isPractice && status === 'stopped' && recorded;
  const isPrep = turn.part === 2 && phase === 'prep';

  const goNext = () => {
    reset();
    if (isLast) {
      router.replace(speakingAnalyzingHref(topic.id));
      return;
    }
    setIndex(index + 1);
  };

  const onStart = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    start();
  };

  const onStop = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    stop();
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <TestProgress
        total={turns.length}
        current={index}
        onBack={() => router.back()}
        trailing={
          <Text variant="label" tone="muted">
            {partLabel(turn.part)}
          </Text>
        }
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-5">
          {turn.part === 2 ? (
            <CueCard title={turn.title} bullets={turn.bullets} />
          ) : (
            <SpeakingQuestion
              part={turn.part}
              prompt={turn.prompt}
              indexLabel={`${partPos + 1} of ${partPeers.length}`}
            />
          )}
        </View>

        {isPrep ? (
          <View className="flex-1 justify-center px-6">
            <Text variant="kicker" tone="subtle">
              Preparation
            </Text>
            <RecordingTimer elapsedMs={prepElapsed} limitMs={turn.prepMs} remaining warnBelowMs={10_000} />
            <Text variant="bodySm" tone="muted" className="mt-3">
              One minute. Notes stay with you. Do not speak yet. This is practice — you can skip the
              wait.
            </Text>
            <Button
              label="Skip wait"
              variant="ghost"
              size="md"
              className="mt-4 px-0"
              onPress={() => setPhase('speak')}
            />
          </View>
        ) : (
          <View className="flex-1 pt-5">
            <View className="flex-row border-y border-divider">
              <StatCell
                label="Pace"
                value={status === 'idle' ? '—' : String(estimatePace(elapsedMs))}
                detail="wpm estimate"
                className="flex-1 px-6"
              />
              <StatCell
                label="Pauses"
                value={status === 'idle' ? '—' : String(estimatePauses(elapsedMs))}
                detail="from the clock"
                className="flex-1 px-6"
              />
              <StatCell
                label="Target"
                value={formatClock(targetMs)}
                className="flex-1 px-6"
              />
            </View>
            <Text variant="caption" tone="muted" className="px-6 pt-2">
              Pace and pauses are clock estimates. Fillers are named after you stop, from the mock
              script — not from a mic.
            </Text>

            <View className="mt-4 px-6">
              <SpeakingRecorder
                status={status}
                elapsedMs={elapsedMs}
                limitMs={hardLimit}
                onStart={onStart}
                onStop={onStop}
              />
            </View>

            {status === 'stopped' && lastMs > 0 ? (
              <View className="mt-3 px-6">
                <AudioPlayer
                  durationMs={lastMs}
                  positionMs={playback.positionMs}
                  playing={playback.playing}
                  speed={playback.speed}
                  onPlayPause={playback.toggle}
                  onCycleSpeed={playback.cycleSpeed}
                />
              </View>
            ) : null}

            {liveCoaching ? (
              <View className="px-6 pt-4">
                <CoachingCard kicker="Live" title="Keep the line moving" body={turn.coaching.live} />
              </View>
            ) : null}

            {afterCoaching ? (
              <View className="px-6 pt-4">
                <CoachingCard
                  kicker="After you stopped"
                  title={held ? 'You held the time' : 'That was short'}
                  body={held ? turn.coaching.held : turn.coaching.short}
                />
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>

      <View className="px-6 pb-2 pt-3">
        <Button
          label={isLast ? 'Submit' : 'Next'}
          trailingIcon={ArrowRight}
          disabled={!recorded || isPrep}
          onPress={goNext}
        />
      </View>
    </Screen>
  );
}
