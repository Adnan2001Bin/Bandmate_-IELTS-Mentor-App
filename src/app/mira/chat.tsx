import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

import {
  MentorComposer,
  MentorMessageBubble,
  MentorPromptChip,
  MentorStatus,
  type MentorPhase,
} from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { ErrorState, Screen, Skeleton, Text } from '@/components/ui';
import { MIRA_CHAT_HREF, useMentorThread, useSendMentor } from '@/features/mentor';
import { isServiceError } from '@/services';
import type { MentorMessage } from '@/types';

export default function MiraChatScreen() {
  const router = useRouter();
  const { prompt = '' } = useLocalSearchParams<{ prompt?: string }>();
  const { data, isPending, isError, refetch } = useMentorThread();
  const send = useSendMentor();

  const [draft, setDraft] = useState('');
  const [inflight, setInflight] = useState<string | null>(null);
  const [phase, setPhase] = useState<MentorPhase>('thinking');
  const consumed = useRef<string | null>(null);
  const scroll = useRef<ScrollView>(null);

  useEffect(() => {
    if (!send.isPending) {
      return;
    }
    setPhase('thinking');
    const id = setTimeout(() => setPhase('typing'), 650);
    return () => clearTimeout(id);
  }, [send.isPending]);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || send.isPending) {
      return;
    }
    setDraft('');
    setInflight(trimmed);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    send.mutate(
      { text: trimmed },
      {
        onSuccess: () => {
          setInflight(null);
        },
      },
    );
  };

  useEffect(() => {
    const seed = typeof prompt === 'string' ? prompt : prompt[0];
    if (!seed || !data || consumed.current === seed) {
      return;
    }
    consumed.current = seed;
    router.replace(MIRA_CHAT_HREF);
    submit(seed);
    // Seeded once per prompt. submit is stable enough for this mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- consume prompt once
  }, [prompt, data]);

  useEffect(() => {
    const id = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 50);
    return () => clearTimeout(id);
  }, [data?.messages.length, inflight, send.isPending]);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Ask Mira" kicker="Chat" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={80} />
          <Skeleton height={80} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Ask Mira" kicker="Chat" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const localUser: MentorMessage | null = inflight
    ? {
        id: 'local-user',
        role: 'user',
        body: inflight,
        createdAt: new Date().toISOString(),
        status: send.isError ? 'error' : 'pending',
      }
    : null;

  const showPrompts = data.messages.every((item) => item.role === 'mira') && !inflight;
  const errorMessage = send.isError
    ? isServiceError(send.error)
      ? send.error.message
      : 'I did not get that. Try again.'
    : null;

  return (
    <Screen edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <AppHeader title="Ask Mira" kicker="Chat" size="compact" onBack={() => router.back()} />

        <ScrollView
          ref={scroll}
          className="flex-1"
          contentContainerClassName="px-6 pt-4 pb-4"
          keyboardShouldPersistTaps="handled"
        >
          <Text variant="caption" tone="muted" className="mb-2">
            Mock tutor. No live model. I already have your bands.
          </Text>

          {data.messages.map((item) => (
            <MentorMessageBubble
              key={item.id}
              message={item}
              onAction={(href) => router.push(href as Href)}
            />
          ))}
          {localUser ? <MentorMessageBubble message={localUser} /> : null}
          {send.isPending ? <MentorStatus phase={phase} /> : null}

          {errorMessage ? (
            <View className="pt-2">
              <ErrorState
                title="Mira dropped the line"
                description={errorMessage}
                onRetry={() => {
                  if (inflight) {
                    submit(inflight);
                  }
                }}
              />
            </View>
          ) : null}

          {showPrompts ? (
            <View className="flex-row flex-wrap gap-2 pt-4">
              {data.prompts.slice(0, 3).map((item) => (
                <MentorPromptChip
                  key={item.id}
                  label={item.label}
                  onPress={() => submit(item.text)}
                />
              ))}
            </View>
          ) : null}
        </ScrollView>

        <MentorComposer
          value={draft}
          onChange={setDraft}
          disabled={send.isPending}
          onSend={() => submit(draft)}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}
