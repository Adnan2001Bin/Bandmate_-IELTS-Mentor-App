import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ArrowRight, BookOpen, Headphones, Mic } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import {
  BottomSheet,
  Button,
  Card,
  Dialog,
  EmptyState,
  ErrorState,
  InkPanel,
  Input,
  ListRow,
  Monogram,
  ProgressBar,
  Rule,
  Screen,
  SegmentedControl,
  SelectionRow,
  Skeleton,
  StatCell,
  StepProgress,
  Tag,
  Text,
  TextArea,
} from '@/components/ui';
import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';
import { useTheme, type AppearanceMode } from '@/theme';

const APPEARANCE_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const satisfies readonly { value: AppearanceMode; label: string }[];

/**
 * Development-only gallery. Renders every foundational component in one scroll
 * so both themes can be checked in a single pass. Not reachable from the tab
 * bar, and removed before release.
 */
export default function DesignSystemScreen() {
  const router = useRouter();
  const { mode, setMode } = useTheme();
  const [goal, setGoal] = useState('band7');
  const [essay, setEssay] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => services.profile.getProfile(),
  });

  return (
    <Screen scroll>
      <AppHeader
        title="Design system"
        kicker="Development only"
        size="compact"
        onBack={() => router.back()}
      />

      <View className="px-6">
        <Section title="Appearance">
          <SegmentedControl options={APPEARANCE_OPTIONS} value={mode} onChange={setMode} />
        </Section>

        <Section title="Type scale">
          <Text variant="displaySm">6.5</Text>
          <Text variant="h1">Heading one</Text>
          <Text variant="h2">Heading two</Text>
          <Text variant="h3">Heading three</Text>
          <Text variant="h4">Heading four</Text>
          <Text variant="body">
            Body copy carries the explanations, so it is set at a comfortable measure for long study
            sessions.
          </Text>
          <Text variant="bodySm" tone="muted">
            Small body, used for supporting detail.
          </Text>
          <Text variant="caption" tone="subtle">
            Caption for metadata
          </Text>
        </Section>

        <Section title="Service layer">
          {isPending ? (
            <View className="gap-2">
              <Skeleton width="40%" height={40} />
              <Skeleton width="70%" height={14} />
            </View>
          ) : isError ? (
            <ErrorState
              description="The profile service did not respond."
              onRetry={() => refetch()}
            />
          ) : (
            <View className="flex-row items-end gap-3">
              <Text variant="display">{data.diagnostic?.overall.toFixed(1) ?? '—'}</Text>
              <Text variant="bodySm" tone="muted" className="pb-2">
                estimated, target {data.study.targetBand.toFixed(1)}
              </Text>
            </View>
          )}
        </Section>

        <Section title="Buttons">
          <Button label="Start today's session" trailingIcon={ArrowRight} />
          <Button label="Secondary action" variant="secondary" />
          <Button label="Outline action" variant="outline" />
          <Button label="Ghost action" variant="ghost" />
          <Button label="Working" loading />
          <Button label="Unavailable" disabled />
        </Section>

        <Section title="Selection">
          <SelectionRow
            label="Band 7.0"
            description="Most university and visa routes"
            selected={goal === 'band7'}
            onPress={() => setGoal('band7')}
          />
          <SelectionRow
            label="Band 8.0"
            description="Competitive programmes"
            selected={goal === 'band8'}
            onPress={() => setGoal('band8')}
          />
        </Section>

        <Section title="Inputs">
          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Test date"
            placeholder="Select a date"
            error="Pick a date at least a week away."
          />
          <TextArea
            label="Task 2 response"
            placeholder="Write your answer…"
            value={essay}
            onChangeText={setEssay}
            minHeight={100}
            hint={`${essay.trim() ? essay.trim().split(/\s+/).length : 0} words`}
          />
        </Section>

        <Section title="Progress">
          <View className="gap-2">
            <Text variant="kicker" tone="subtle">
              Overall, target 7.0
            </Text>
            <ProgressBar value={0.6} target={0.7} accessibilityLabel="Overall band progress" />
          </View>
          <View className="gap-2">
            <Text variant="kicker" tone="subtle">
              Onboarding, step 2 of 5
            </Text>
            <StepProgress total={5} current={1} />
          </View>
        </Section>

        <Section title="Data display">
          <View className="flex-row border-y-2 border-divider">
            <StatCell label="Streak" value="12" detail="days" className="flex-1" />
            <View className="w-px bg-divider" />
            <StatCell label="Sessions" value="48" className="flex-1 pl-4" />
            <View className="w-px bg-divider" />
            <StatCell
              label="Gap"
              value="1.0"
              detail="to target"
              tone="accent"
              className="flex-1 pl-4"
            />
          </View>

          <View className="flex-row flex-wrap gap-2">
            <Tag label="New" tone="accent" />
            <Tag label="Listening" />
            <Tag label="Completed" tone="ink" />
            <Tag label="Optional" tone="outline" />
          </View>

          <View className="flex-row items-center gap-3">
            <Monogram name="Mira" size="sm" tone="accent" />
            <Monogram name="Atlas Rahman" />
            <Monogram name="Atlas Rahman" size="lg" />
          </View>
        </Section>

        <Section title="Rows">
          <View className="border-y border-divider">
            <ListRow
              label="Listening"
              description="Section 3 · 10 questions"
              icon={Headphones}
              onPress={() => {}}
            />
            <Rule />
            <ListRow
              label="Reading"
              description="Matching headings"
              icon={BookOpen}
              onPress={() => {}}
            />
            <Rule />
            <ListRow label="Speaking" value="Part 2" icon={Mic} />
          </View>
        </Section>

        <Section title="Emphasis">
          <InkPanel>
            <Text variant="kicker" tone="onInverseMuted">
              Mira says
            </Text>
            <Text variant="h3" tone="onInverse" className="mt-2">
              Your Task 2 conclusions are rushed.
            </Text>
          </InkPanel>

          <Card>
            <Text variant="h4">Outlined card</Text>
            <Text variant="bodySm" tone="muted" className="mt-1">
              Grouped content, separated by a border rather than a shadow.
            </Text>
          </Card>

          <Card variant="filled">
            <Text variant="h4">Filled card</Text>
            <Text variant="bodySm" tone="muted" className="mt-1">
              Sits on the surface tone instead.
            </Text>
          </Card>
        </Section>

        <Section title="Overlays">
          <Button label="Open dialog" variant="outline" onPress={() => setDialogOpen(true)} />
          <Button label="Open bottom sheet" variant="outline" onPress={() => setSheetOpen(true)} />
        </Section>

        <Section title="States">
          <EmptyState
            title="No mistakes yet"
            description="Mistakes you make in practice collect here for review."
            icon={BookOpen}
            action={{ label: 'Start practising', onPress: () => {} }}
          />
          <ErrorState onRetry={() => {}} />
        </Section>
      </View>

      <Dialog
        visible={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Change your target band?"
        description="Your study plan will be rebuilt around the new target."
        actions={[
          { label: 'Change target', onPress: () => setDialogOpen(false) },
          { label: 'Keep 7.0', onPress: () => setDialogOpen(false) },
        ]}
      />

      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="Session options">
        <View className="gap-3">
          <Text variant="body" tone="muted">
            Drag down or tap outside to dismiss.
          </Text>
          <Button label="Done" onPress={() => setSheetOpen(false)} align="center" />
        </View>
      </BottomSheet>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3 pb-8 pt-6">
      <Text variant="kicker" tone="subtle">
        {title}
      </Text>
      {children}
    </View>
  );
}
