import { useRouter, type Href } from 'expo-router';
import {
  BookMarked,
  Languages,
  Palette,
  Settings,
  Target,
  TrendingUp,
} from 'lucide-react-native';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { ListRow, Monogram, Rule, Screen, Text } from '@/components/ui';
import type { IconComponent } from '@/components/ui';

type Entry = { href: Href; label: string; description: string; icon: IconComponent };

const SECTIONS: readonly { title: string; entries: readonly Entry[] }[] = [
  {
    title: 'Learning',
    entries: [
      { href: '/progress', label: 'My progress', description: 'Forecast, history, weaknesses', icon: TrendingUp },
      { href: '/mistakes', label: 'Mistakes', description: 'Everything you got wrong, by skill', icon: BookMarked },
      { href: '/practice/vocabulary', label: 'Vocabulary', description: 'Saved words and review queue', icon: Languages },
    ],
  },
  {
    title: 'Account',
    entries: [
      { href: '/profile/goals', label: 'Goals', description: 'Target band and test date', icon: Target },
      { href: '/profile/settings', label: 'Settings', description: 'Appearance, notifications, account', icon: Settings },
      { href: '/design-system', label: 'Design system', description: 'Component gallery — development only', icon: Palette },
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <Screen scroll>
      <AppHeader
        title="Profile"
        kicker="You"
        action={<Monogram name="Atlas Rahman" size="sm" />}
      />

      {SECTIONS.map((section) => (
        <View key={section.title} className="px-6 pt-6">
          <Text variant="kicker" tone="subtle" className="pb-3">
            {section.title}
          </Text>
          <Rule weight="section" />
          {section.entries.map((entry, index) => (
            <View key={entry.label}>
              {index > 0 ? <Rule /> : null}
              <ListRow
                label={entry.label}
                description={entry.description}
                icon={entry.icon}
                onPress={() => router.push(entry.href)}
              />
            </View>
          ))}
          <Rule weight="section" />
        </View>
      ))}
    </Screen>
  );
}
