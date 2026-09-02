import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import {
  Button,
  ErrorState,
  ListRow,
  Rule,
  Screen,
  Skeleton,
  StatCell,
  Tag,
  Text,
} from '@/components/ui';
import {
  VOCABULARY_DIFFICULT_HREF,
  VOCABULARY_REVIEW_HREF,
  vocabCategoryHref,
  useVocabCategories,
  useVocabOverview,
} from '@/features/vocabulary';

export default function VocabularyLibraryScreen() {
  const router = useRouter();
  const overview = useVocabOverview();
  const { data, isPending, isError, refetch } = useVocabCategories();

  if (isPending || overview.isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Vocabulary" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-4">
          <Skeleton height={72} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (isError || !data || overview.isError || !overview.data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Vocabulary" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const stats = overview.data;

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Vocabulary" kicker="Practice" size="compact" onBack={() => router.back()} />

      <View className="flex-row border-b-2 border-divider">
        <StatCell label="Due" value={String(stats.dueCount)} tone="accent" className="flex-1 px-6" />
        <StatCell label="Held" value={String(stats.knownCount)} className="flex-1 px-6" />
        <StatCell label="Hard" value={String(stats.difficultCount)} className="flex-1 px-6" />
      </View>

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Eleven IELTS topics. Original entries. Review uses a 1 / 2 / 4 / 7 / 14-day clock stored
          on this device — not a live tutor.
        </Text>
        <Button
          label={stats.dueCount > 0 ? `Review ${stats.dueCount} due` : 'Nothing due'}
          trailingIcon={ArrowRight}
          className="mt-4"
          disabled={stats.dueCount === 0}
          onPress={() => router.push(VOCABULARY_REVIEW_HREF)}
        />
        <Button
          label="Difficult words"
          variant="ghost"
          size="md"
          className="mt-1 px-0"
          onPress={() => router.push(VOCABULARY_DIFFICULT_HREF)}
        />
      </View>

      <View className="px-6 pt-2">
        <Rule weight="section" />
        {data.map((item) => (
          <View key={item.id}>
            <ListRow
              label={item.title}
              description={`${item.wordCount} words · ${item.dueCount} due · ${item.knownCount} held`}
              accessory={item.recommended ? <Tag label="Today" tone="accent" /> : undefined}
              onPress={() => router.push(vocabCategoryHref(item.id))}
            />
            <Rule />
          </View>
        ))}
      </View>
    </Screen>
  );
}
