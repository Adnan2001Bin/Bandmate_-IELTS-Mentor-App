import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { MistakeRow } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { EmptyState, ErrorState, Rule, Screen, Skeleton, Tag, Text } from '@/components/ui';
import { mistakeHref, useMistakeCategories, useMistakes } from '@/features/mistakes';

export default function MistakesScreen() {
  const router = useRouter();
  const [area, setArea] = useState('all');
  const categories = useMistakeCategories();
  const { data, isPending, isError, refetch } = useMistakes(area);

  if (categories.isPending || isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Mistakes" kicker="Learning" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={48} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (categories.isError || isError || !categories.data || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Mistakes" kicker="Learning" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState
            onRetry={() => {
              void categories.refetch();
              void refetch();
            }}
          />
        </View>
      </Screen>
    );
  }

  const total = categories.data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Mistakes" kicker="Learning" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Everything you missed, by skill. Practice again opens the drill that produced the miss —
          not a second quiz invented here.
        </Text>
      </View>

      <View className="flex-row flex-wrap gap-2 px-6 pt-4">
        <Pressable onPress={() => setArea('all')} accessibilityRole="button">
          <Tag label={`All · ${total}`} tone={area === 'all' ? 'accent' : 'outline'} />
        </Pressable>
        {categories.data.map((item) => (
          <Pressable key={item.id} onPress={() => setArea(item.id)} accessibilityRole="button">
            <Tag
              label={`${item.title} · ${item.count}`}
              tone={area === item.id ? 'accent' : 'outline'}
            />
          </Pressable>
        ))}
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.length === 0 ? (
          <View className="py-6">
            <EmptyState
              title="Nothing in this skill"
              description="Switch the filter, or keep practising — misses land here after a drill."
            />
          </View>
        ) : (
          data.map((item) => (
            <View key={item.id}>
              <MistakeRow mistake={item} onPress={() => router.push(mistakeHref(item.id))} />
              <Rule />
            </View>
          ))
        )}
      </View>
    </Screen>
  );
}
