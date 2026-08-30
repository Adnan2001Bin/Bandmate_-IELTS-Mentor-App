import { useRouter } from 'expo-router';
import { BookMarked } from 'lucide-react-native';
import { View } from 'react-native';

import { SkillCard } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { ErrorState, ListRow, Rule, Screen, Skeleton } from '@/components/ui';
import { PRACTICE_HREF, usePracticeHub } from '@/features/practice/routes';

export default function PracticeScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = usePracticeHub();

  if (isPending) {
    return (
      <Screen>
        <AppHeader title="Practice" kicker="Choose your own" />
        <View className="gap-3 px-6 pt-4">
          <Skeleton height={72} />
          <Skeleton height={72} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <AppHeader title="Practice" kicker="Choose your own" />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppHeader title="Practice" kicker="Choose your own" />

      <View className="px-6">
        {data.items.map((item, index) => (
          <View key={item.area}>
            {index > 0 ? <Rule /> : null}
            <SkillCard
              label={item.label}
              description={item.description}
              band={item.band}
              status={item.status}
              onPress={() => router.push(PRACTICE_HREF[item.area])}
            />
          </View>
        ))}
        <Rule weight="section" />
        <ListRow
          label="Mistakes"
          description="Everything you got wrong, by skill"
          icon={BookMarked}
          value={String(data.mistakeCount)}
          onPress={() => router.push('/mistakes')}
        />
        <Rule weight="section" />
      </View>
    </Screen>
  );
}
