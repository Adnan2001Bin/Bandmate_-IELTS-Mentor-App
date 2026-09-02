import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { BandScore, MiraNote, SkillBar } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, InkPanel, Rule, Screen, Skeleton, Text } from '@/components/ui';
import { mockPlanHref, useMockAttemptStore, useMockReport } from '@/features/mock';
import { SKILLS } from '@/types';

export default function MockReportScreen() {
  const router = useRouter();
  const { reportId = '' } = useLocalSearchParams<{ reportId: string }>();
  const stored = useMockAttemptStore((state) => state.report);
  const query = useMockReport(stored?.id === reportId ? '' : reportId);
  const report = stored?.id === reportId ? stored : query.data;

  if (query.isPending && !report) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Band report" kicker="Mock" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={96} />
        </View>
      </Screen>
    );
  }

  if (!report) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Band report" kicker="Mock" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void query.refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title={report.title} kicker="Band report" size="compact" onBack={() => router.back()} />

      <View className="border-b-2 border-divider px-6 py-5">
        <Text variant="kicker" tone="subtle">
          Overall · AI estimated
        </Text>
        <BandScore value={report.overall} size="lg" className="mt-2" />
        <Text variant="caption" tone="muted" className="mt-2">
          Target {report.target.toFixed(1)} · gap {report.gap.toFixed(1)} · for practice purposes only
        </Text>
      </View>

      <InkPanel className="mx-6 mt-5">
        <Text variant="kicker" tone="onInverseMuted">
          The honest read
        </Text>
        <Text variant="bodySm" tone="onInverse" className="mt-2">
          {report.honestRead}
        </Text>
      </InkPanel>

      <View className="px-6 pt-5">
        {SKILLS.map((skill) => (
          <SkillBar key={skill} skill={skill} band={report.skills[skill]} target={report.target} />
        ))}
      </View>

      <View className="px-6 pt-4">
        <MiraNote kicker="One pattern" title="What this sitting named" body={report.pattern} />
      </View>

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle" className="pb-2">
          Question types
        </Text>
        <Rule weight="section" />
        {report.types.map((item) => (
          <View key={item.type} className="flex-row items-center justify-between py-3">
            <Text variant="h4">{item.type}</Text>
            <Text variant="label">
              {item.correct}/{item.total}
            </Text>
          </View>
        ))}
        <Rule weight="section" />
      </View>

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Recut my plan"
          trailingIcon={ArrowRight}
          onPress={() => router.push(mockPlanHref(report.id))}
        />
      </View>
    </Screen>
  );
}
