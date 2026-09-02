import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { BandScore, SpeakingEvaluation } from '@/components/ielts';
import { MiraMark } from '@/components/mira';
import { Button, ListRow, Rule, Screen, Text } from '@/components/ui';
import {
  MODE_LABEL,
  SPEAKING_LIBRARY_HREF,
  speakingTranscriptHref,
  useSpeakingAttemptStore,
} from '@/features/speaking';
import { useProfile } from '@/features/profile/use-profile';
import { PRACTICE_HREF } from '@/features/practice/routes';

export default function SpeakingResultScreen() {
  const router = useRouter();
  const { topicId = '' } = useLocalSearchParams<{ topicId: string }>();
  const evaluation = useSpeakingAttemptStore((state) => state.evaluation);
  const fromRandom = useSpeakingAttemptStore((state) => state.fromRandom);
  const { data: profile } = useProfile();
  const target = profile?.study.targetBand;

  if (!evaluation || evaluation.topicId !== topicId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <Text variant="body" tone="muted">
            No evaluation for this topic. Run it from the library.
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
      <View className="border-b-2 border-divider px-6 pb-5 pt-6">
        <Text variant="kicker" tone="subtle">
          {fromRandom ? 'Random · ' : ''}
          {MODE_LABEL[evaluation.mode]}
        </Text>
        <View className="mt-2 flex-row items-end gap-3.5">
          <BandScore value={evaluation.band} size="lg" />
          <View className="pb-1.5">
            <Text variant="label">Speaking</Text>
            <Text variant="caption" tone="muted" className="mt-0.5">
              +{evaluation.xp} XP
            </Text>
          </View>
        </View>
      </View>

      <Text variant="caption" tone="muted" className="px-6 pt-3">
        AI estimated band — for practice purposes only.
      </Text>

      <View className="flex-row gap-3 px-6 py-5">
        <MiraMark size={34} />
        <View className="flex-1">
          <Text variant="kicker" tone="subtle" className="mb-2">
            One pattern worth naming
          </Text>
          <Text variant="bodySm">{evaluation.pattern}</Text>
        </View>
      </View>

      <SpeakingEvaluation evaluation={evaluation} target={target} />

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle" className="pb-2">
          Held
        </Text>
        {evaluation.strengths.map((line) => (
          <Text key={line} variant="bodySm" className="pb-1">
            {line}
          </Text>
        ))}
        <Text variant="kicker" tone="subtle" className="pb-2 pt-4">
          The gap
        </Text>
        {evaluation.weaknesses.map((line) => (
          <Text key={line} variant="bodySm" className="pb-1">
            {line}
          </Text>
        ))}
      </View>

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle" className="pb-3">
          Practise next
        </Text>
        <Rule weight="section" />
        {evaluation.recommendations.map((item) => (
          <View key={item.id}>
            <ListRow
              label={item.label}
              description={item.reason}
              onPress={() => router.push(PRACTICE_HREF[item.area])}
            />
            <Rule />
          </View>
        ))}
      </View>

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Transcript"
          trailingIcon={ArrowRight}
          onPress={() => router.push(speakingTranscriptHref(topicId))}
        />
        <Button
          label="Back to library"
          variant="ghost"
          size="md"
          onPress={() => router.replace(SPEAKING_LIBRARY_HREF)}
          className="mt-1 px-0"
        />
      </View>
    </Screen>
  );
}
