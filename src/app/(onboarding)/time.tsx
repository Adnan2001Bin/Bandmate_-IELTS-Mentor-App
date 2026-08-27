import { useRouter } from 'expo-router';

import { OnboardingStep } from '@/components/onboarding';
import { SelectionRow, Text } from '@/components/ui';
import { useOnboardingStore } from '@/store';

const SLOTS: readonly { minutes: number; label: string; description: string }[] = [
  {
    minutes: 10,
    label: 'Ten minutes',
    description: 'A commute or a coffee. Slower, but it still counts.',
  },
  {
    minutes: 20,
    label: 'Twenty minutes',
    description: 'What most people can actually keep up. My default.',
  },
  {
    minutes: 40,
    label: 'Forty minutes',
    description: 'One full skill drill plus review, most days.',
  },
  {
    minutes: 60,
    label: 'An hour or more',
    description: "You're close to the test, or you have the room for it.",
  },
];

export default function TimeStep() {
  const router = useRouter();
  const dailyMinutes = useOnboardingStore((state) => state.draft.dailyMinutes);
  const setDraft = useOnboardingStore((state) => state.setDraft);

  return (
    <OnboardingStep
      index={2}
      kicker="Step 03 — your time"
      title="HOW LONG DO YOU HAVE EACH DAY?"
      description="Be honest rather than ambitious. I would rather build a plan you finish than one you abandon in week two."
      canContinue={dailyMinutes !== null}
      onContinue={() => router.push('/diagnostic-intro')}
    >
      {SLOTS.map((slot) => {
        const selected = dailyMinutes === slot.minutes;

        return (
          <SelectionRow
            key={slot.minutes}
            label={slot.label}
            description={slot.description}
            selected={selected}
            onPress={() => setDraft({ dailyMinutes: slot.minutes })}
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
    </OnboardingStep>
  );
}
