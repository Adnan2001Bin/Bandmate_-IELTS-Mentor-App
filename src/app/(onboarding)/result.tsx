import { Redirect } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SkillBar } from '@/components/ielts';
import { MiraMark } from '@/components/mira';
import { Button, Card, Text } from '@/components/ui';
import { useCompleteOnboarding } from '@/features/onboarding/use-complete-onboarding';
import { daysUntil } from '@/lib/date';
import { useOnboardingStore } from '@/store';
import { SKILLS } from '@/types';

/** One mock per fortnight, and never more than six. */
const mockCount = (days: number) => Math.min(Math.max(Math.floor(days / 14), 1), 6);

export default function ResultScreen() {
  const diagnostic = useOnboardingStore((state) => state.diagnostic);
  const toStudyProfile = useOnboardingStore((state) => state.toStudyProfile);
  const study = toStudyProfile();

  const complete = useCompleteOnboarding();

  // Reachable only by finishing the diagnostic; a cold link goes back to the start.
  if (!diagnostic || !study) {
    return <Redirect href="/goal" />;
  }

  const days = daysUntil(study.testDate);
  const weakest = twoWeakestBelowTarget(diagnostic.skills, study.targetBand);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="border-b-2 border-divider px-6 pb-5 pt-4">
        <Text variant="kicker" tone="subtle">
          Your starting point
        </Text>

        <View className="mt-2 flex-row items-end gap-3.5">
          <Text variant="displayLg">{diagnostic.overall.toFixed(1)}</Text>
          <View className="pb-1.5">
            <Text variant="label">ESTIMATED OVERALL</Text>
            <Text variant="caption" tone="muted" className="mt-0.5">
              target {study.targetBand.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row gap-3.5 border-b-2 border-divider px-6 py-4">
        <MiraMark size={36} />
        <Text variant="bodySm" className="flex-1">
          {diagnostic.summary}
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-6 pt-4 pb-6">
        <Text variant="kicker" tone="subtle" className="mb-1">
          By skill — bar is now, rule is target {study.targetBand.toFixed(1)}
        </Text>

        {SKILLS.map((skill, index) => (
          <SkillBar
            key={skill}
            skill={skill}
            band={diagnostic.skills[skill]}
            target={study.targetBand}
            className={index === SKILLS.length - 1 ? 'border-b' : undefined}
          />
        ))}

        <Card className="mt-5 border-l-4 border-l-primary">
          <Text variant="kicker" tone="subtle">
            The plan, in one line
          </Text>
          <Text variant="bodySm" className="mt-1">
            {weakest.length > 0
              ? `${listSkills(weakest)} get most of your time. The rest get maintenance sets, because they are nearly there already.`
              : 'You are already at target across the board. We hold the line and rehearse under exam pressure.'}
          </Text>
        </Card>
      </ScrollView>

      <View className="border-t-2 border-divider px-6 pb-2 pt-4">
        <View className="mb-3.5 flex-row gap-5">
          <View>
            <Text variant="h3">{days}</Text>
            <Text variant="kicker" tone="subtle">
              Days
            </Text>
          </View>
          <View>
            <Text variant="h3">{study.dailyMinutes}m</Text>
            <Text variant="kicker" tone="subtle">
              A day
            </Text>
          </View>
          <View>
            <Text variant="h3">{mockCount(days)}</Text>
            <Text variant="kicker" tone="subtle">
              Mocks
            </Text>
          </View>
        </View>

        <Button
          label="Build my plan"
          trailingIcon={ArrowRight}
          loading={complete.isPending}
          onPress={() => complete.mutate({ study, diagnostic })}
        />

        {complete.isError ? (
          <Text variant="caption" tone="error" className="mt-2">
            {complete.error.message}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function twoWeakestBelowTarget(
  skills: Record<(typeof SKILLS)[number], number>,
  target: number,
): (typeof SKILLS)[number][] {
  return [...SKILLS]
    .filter((skill) => skills[skill] < target)
    .sort((a, b) => skills[a] - skills[b] || a.localeCompare(b))
    .slice(0, 2);
}

function listSkills(skills: readonly string[]): string {
  const names = skills.map((skill) => skill[0].toUpperCase() + skill.slice(1));

  if (names.length === 1) {
    return names[0];
  }

  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}
