import { useRouter, type Href } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { MiraNote, MentorPromptChip } from '@/components/ielts';
import { MiraMark } from '@/components/mira';
import { AppHeader } from '@/components/layout';
import {
  Button,
  ErrorState,
  ListRow,
  Monogram,
  Rule,
  Screen,
  Skeleton,
  StatCell,
  Text,
} from '@/components/ui';
import { MIRA_PLAN_HREF, miraChatHref, useMentorHome } from '@/features/mentor';

export default function MiraHomeScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useMentorHome();

  if (isPending) {
    return (
      <Screen>
        <AppHeader
          title="Mira"
          kicker="Your mentor"
          action={<Monogram name="Mira" size="sm" tone="accent" />}
        />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={72} />
          <Skeleton height={120} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <AppHeader
          title="Mira"
          kicker="Your mentor"
          action={<Monogram name="Mira" size="sm" tone="accent" />}
        />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppHeader
        title="Mira"
        kicker="Your mentor"
        action={<Monogram name="Mira" size="sm" tone="accent" />}
      />

      <View className="flex-row border-b-2 border-divider">
        <StatCell label="Now" value={data.currentBand.toFixed(1)} className="flex-1 px-6" />
        <StatCell
          label="Target"
          value={data.targetBand.toFixed(1)}
          tone="accent"
          className="flex-1 px-6"
        />
        <StatCell label="Days" value={String(Math.max(0, data.daysToTest))} className="flex-1 px-6" />
      </View>

      <View className="flex-row gap-3.5 border-b-2 border-divider px-6 py-5">
        <MiraMark size={42} />
        <View className="flex-1">
          <Text variant="kicker" tone="subtle" className="mb-2">
            {data.greeting}
          </Text>
          <Text variant="h3" className="uppercase">
            {data.headline}
          </Text>
          <Text variant="bodySm" tone="muted" className="mt-2">
            {data.body}
          </Text>
          <Text variant="caption" tone="muted" className="mt-3">
            {data.contextLine}
          </Text>
        </View>
      </View>

      <View className="px-6 py-5">
        <MiraNote
          kicker="Today"
          title={data.plan.title}
          body={data.plan.why}
          ctaLabel="See the mix"
          onPress={() => router.push(MIRA_PLAN_HREF)}
        />
      </View>

      <View className="px-6 pb-2">
        <Text variant="kicker" tone="subtle" className="mb-3">
          Ask me
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {data.prompts.map((item) => (
            <MentorPromptChip
              key={item.id}
              label={item.label}
              onPress={() => router.push(miraChatHref(item.text))}
            />
          ))}
        </View>
        <Button
          label={data.hasHistory ? 'Continue the thread' : 'Ask anything'}
          trailingIcon={ArrowRight}
          className="mt-4"
          onPress={() => router.push(miraChatHref())}
        />
        <Text variant="caption" tone="muted" className="mt-3">
          No live model. I answer from your bands and today’s plan.
        </Text>
      </View>

      {data.lastMira ? (
        <View className="px-6 pt-4">
          <Text variant="kicker" tone="subtle" className="mb-3">
            Last from Mira
          </Text>
          <Text variant="bodySm" numberOfLines={3}>
            {data.lastMira.body}
          </Text>
        </View>
      ) : null}

      <View className="px-6 pt-4">
        <Text variant="kicker" tone="subtle" className="pb-2">
          Go practise
        </Text>
        <Rule weight="section" />
        {data.entries.map((item) => (
          <View key={item.id}>
            <ListRow label={item.label} onPress={() => router.push(item.href as Href)} />
            <Rule />
          </View>
        ))}
      </View>
    </Screen>
  );
}
