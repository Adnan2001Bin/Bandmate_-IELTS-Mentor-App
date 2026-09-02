import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { DateField } from '@/components/form';
import { AppHeader } from '@/components/layout';
import {
  Button,
  ErrorState,
  Screen,
  SegmentedControl,
  SelectionRow,
  Skeleton,
  Text,
} from '@/components/ui';
import { assessTestDate, MIN_LEAD_DAYS } from '@/features/onboarding/feasibility';
import {
  STUDY_GOAL_OPTIONS,
  TARGET_OPTIONS,
  TEST_TYPE_OPTIONS,
  timeSlotsFor,
  useProfile,
  useUpdateStudyProfile,
} from '@/features/profile';
import { addDays } from '@/lib/date';
import type { StudyProfile } from '@/types';

function sameStudy(a: StudyProfile, b: StudyProfile): boolean {
  return (
    a.targetBand === b.targetBand &&
    a.testDate === b.testDate &&
    a.testType === b.testType &&
    a.goal === b.goal &&
    a.dailyMinutes === b.dailyMinutes
  );
}

export default function GoalsScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useProfile();
  const save = useUpdateStudyProfile();
  const [draft, setDraft] = useState<StudyProfile | null>(null);

  useEffect(() => {
    if (data) {
      setDraft(data.study);
    }
  }, [data]);

  const feasibility = useMemo(() => assessTestDate(draft?.testDate ?? null), [draft?.testDate]);
  const dirty = Boolean(data && draft && !sameStudy(draft, data.study));
  const canSave = Boolean(draft && feasibility && !feasibility.tooSoon && dirty && !save.isPending);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Goals" kicker="Profile" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={72} />
          <Skeleton height={96} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Goals" kicker="Profile" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  if (!draft) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Goals" kicker="Profile" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  const slots = timeSlotsFor(draft.dailyMinutes);

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Goals" kicker="Profile" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-6">
        <Text variant="bodySm" tone="muted">
          I work backwards from the band and the date. An unreachable target is worse than a slower
          plan.
        </Text>
      </View>

      <View className="gap-2 px-6 pt-5">
        <Text variant="kicker" tone="subtle">
          Target band
        </Text>
        {TARGET_OPTIONS.map((option) => {
          const selected = draft.targetBand === option.band;
          return (
            <SelectionRow
              key={option.band}
              label={option.label}
              description={option.description}
              selected={selected}
              onPress={() => setDraft({ ...draft, targetBand: option.band })}
              leading={
                <Text
                  variant="h1"
                  tone={selected ? 'onPrimary' : 'subtle'}
                  className="w-[52px] text-[30px] leading-8"
                >
                  {option.band.toFixed(1)}
                </Text>
              }
            />
          );
        })}
      </View>

      <View className="px-6 pt-6">
        <DateField
          label="Test date"
          value={draft.testDate}
          onChange={(iso) => setDraft({ ...draft, testDate: iso })}
          placeholder="When do you sit it?"
          minimumDate={addDays(new Date(), 1)}
          hint={feasibility?.note ?? 'Pick roughly when you will sit it.'}
          hintTone={feasibility?.tooSoon ? 'error' : feasibility ? 'accent' : 'muted'}
        />
        <Text variant="caption" tone="muted" className="mt-2">
          I need at least {MIN_LEAD_DAYS} days to build a plan worth following.
        </Text>
      </View>

      <View className="gap-2 px-6 pt-6">
        <Text variant="kicker" tone="subtle">
          Test type
        </Text>
        <SegmentedControl
          options={TEST_TYPE_OPTIONS}
          value={draft.testType}
          onChange={(value) => setDraft({ ...draft, testType: value })}
        />
      </View>

      <View className="gap-2 px-6 pt-6">
        <Text variant="kicker" tone="subtle">
          Why this score
        </Text>
        {STUDY_GOAL_OPTIONS.map((option) => (
          <SelectionRow
            key={option.value}
            label={option.label}
            description={option.description}
            selected={draft.goal === option.value}
            onPress={() => setDraft({ ...draft, goal: option.value })}
          />
        ))}
      </View>

      <View className="gap-2 px-6 pt-6">
        <Text variant="kicker" tone="subtle">
          Daily time
        </Text>
        {slots.map((slot) => {
          const selected = draft.dailyMinutes === slot.minutes;
          return (
            <SelectionRow
              key={slot.minutes}
              label={slot.label}
              description={slot.description}
              selected={selected}
              onPress={() => setDraft({ ...draft, dailyMinutes: slot.minutes })}
              leading={
                <Text
                  variant="h1"
                  tone={selected ? 'onPrimary' : 'subtle'}
                  className="w-[52px] text-[30px] leading-8"
                >
                  {slot.minutes}
                </Text>
              }
            />
          );
        })}
      </View>

      <View className="px-6 pb-2 pt-6">
        <Button
          label="Save goals"
          loading={save.isPending}
          disabled={!canSave}
          onPress={() => {
            save.mutate(draft, {
              onSuccess: () => router.back(),
            });
          }}
        />
        <Text variant="caption" tone="muted" className="mt-3">
          Saving updates the target and countdown on Today. I recut the session list when a sitting
          lands, not from this screen.
        </Text>
      </View>
    </Screen>
  );
}
