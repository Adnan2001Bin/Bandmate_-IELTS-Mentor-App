import { useRouter } from 'expo-router';
import { History, ScanSearch } from 'lucide-react-native';
import { View } from 'react-native';

import { BandScore, LeagueRow, SkillBar, StreakStrip, TrajectoryChart } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import {
  Button,
  ErrorState,
  ListRow,
  Rule,
  Screen,
  Skeleton,
  StatCell,
  Text,
} from '@/components/ui';
import { useLeague, useLeagueOptIn, useProgressSnapshot } from '@/features/progress';
import { SKILLS } from '@/types';

export default function ProgressScreen() {
  const router = useRouter();
  const snapshot = useProgressSnapshot();
  const league = useLeague();
  const optIn = useLeagueOptIn();

  if (snapshot.isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Progress" kicker="Where you stand" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={96} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (snapshot.isError || !snapshot.data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Progress" kicker="Where you stand" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void snapshot.refetch()} />
        </View>
      </Screen>
    );
  }

  const data = snapshot.data;
  const stats = data.analytics;
  const members = league.data?.members ?? [];
  const optedIn = league.data?.optedIn ?? false;

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title="Progress"
        kicker="Where you stand"
        size="compact"
        onBack={() => router.back()}
        action={<StreakStrip days={data.streakDays} />}
      />

      <View className="flex-row border-b-2 border-divider">
        <View className="flex-1 px-6 py-4">
          <Text variant="kicker" tone="subtle">
            Current
          </Text>
          <BandScore value={data.current} size="lg" className="mt-1" />
        </View>
        <View className="flex-1 px-6 py-4">
          <Text variant="kicker" tone="subtle">
            Target
          </Text>
          <BandScore value={data.target} size="lg" className="mt-1" />
        </View>
        <View className="flex-1 px-6 py-4">
          <Text variant="kicker" tone="subtle">
            Forecast
          </Text>
          <BandScore value={data.forecast} delta={data.forecastDelta} size="md" className="mt-1" />
        </View>
      </View>

      <View className="px-6 pt-3">
        <Text variant="caption" tone="muted">
          AI estimated band — for practice purposes only. Bars start at 4.0.
        </Text>
      </View>

      <View className="px-6 pt-4">
        {SKILLS.map((skill) => (
          <SkillBar key={skill} skill={skill} band={data.skills[skill]} target={data.target} />
        ))}
      </View>

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle">
          Weekly trajectory
        </Text>
        <Text variant="caption" tone="muted" className="mt-1">
          Solid is held. Dashed is projected. The red rule is the target.
        </Text>
        <TrajectoryChart points={data.trajectory} target={data.target} className="mt-3" />
      </View>

      <View className="mt-5 border-t-2 border-divider">
        <View className="flex-row">
          <StatCell
            label="This week"
            value={String(stats.practiceMinutesWeek)}
            detail="minutes"
            className="flex-1 px-6"
          />
          <StatCell
            label="Tests"
            value={String(stats.testsCompleted)}
            className="flex-1 px-6"
          />
        </View>
        <View className="flex-row border-t border-divider">
          <StatCell
            label="Questions"
            value={String(stats.questionsAnswered)}
            className="flex-1 px-6"
          />
          <StatCell
            label="Accuracy"
            value={`${stats.accuracyPct}%`}
            className="flex-1 px-6"
          />
        </View>
        <View className="flex-row border-t border-divider">
          <StatCell
            label="Vocabulary held"
            value={String(stats.vocabularyHeld)}
            className="flex-1 px-6"
          />
          <StatCell
            label="Speaking sessions"
            value={String(stats.speakingSessions)}
            className="flex-1 px-6"
          />
        </View>
        <View className="flex-row border-t border-divider">
          <StatCell
            label="Writing avg"
            value={stats.writingAverage.toFixed(1)}
            detail={`${stats.writingSubmissions} scripts`}
            className="flex-1 px-6"
          />
          <StatCell
            label="Speaking avg"
            value={stats.speakingAverage.toFixed(1)}
            className="flex-1 px-6"
          />
        </View>
      </View>

      <View className="px-6 pt-2">
        <Text variant="caption" tone="muted">
          {data.xp} XP · streak is proof, not a punishment.
        </Text>
      </View>

      <View className="mt-5 px-6">
        <Rule weight="section" />
        <ListRow
          label="History"
          description="Every session and test, by date"
          icon={History}
          onPress={() => router.push('/progress/history')}
        />
        <Rule />
        <ListRow
          label="Weaknesses"
          description="What is costing you the most band"
          icon={ScanSearch}
          onPress={() => router.push('/progress/weaknesses')}
        />
        <Rule weight="section" />
      </View>

      <View className="px-6 pb-6 pt-5">
        <Text variant="kicker" tone="subtle">
          League
        </Text>
        <Text variant="caption" tone="muted" className="mt-1">
          Opt-in. Sorted by effort in a shared target, not by band. Never the reason this screen
          exists.
        </Text>

        {optedIn ? (
          <View className="mt-3">
            <Rule weight="section" />
            {members.map((member, index) => (
              <View key={member.id}>
                <LeagueRow rank={index + 1} member={member} />
                <Rule />
              </View>
            ))}
            <Button
              label="Leave the league"
              variant="ghost"
              size="md"
              className="mt-2 px-0"
              loading={optIn.isPending}
              onPress={() => optIn.mutate(false)}
            />
          </View>
        ) : (
          <Button
            label="Join the league"
            variant="outline"
            className="mt-4"
            loading={optIn.isPending || league.isPending}
            onPress={() => optIn.mutate(true)}
          />
        )}
      </View>
    </Screen>
  );
}
