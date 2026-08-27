import { useRouter, type Href } from 'expo-router';
import { BookOpen, Headphones, Languages, Mic, PenLine, Ruler } from 'lucide-react-native';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { ListRow, Rule, Screen } from '@/components/ui';
import type { IconComponent } from '@/components/ui';

const AREAS: readonly { href: Href; label: string; description: string; icon: IconComponent }[] = [
  { href: '/practice/listening', label: 'Listening', description: 'Sections, accents, question types', icon: Headphones },
  { href: '/practice/reading', label: 'Reading', description: 'Passages and question types', icon: BookOpen },
  { href: '/practice/writing', label: 'Writing', description: 'Task 1 and Task 2', icon: PenLine },
  { href: '/practice/speaking', label: 'Speaking', description: 'Parts 1 to 3, live with Mira', icon: Mic },
  { href: '/practice/vocabulary', label: 'Vocabulary', description: 'Topic sets and review', icon: Languages },
  { href: '/practice/grammar', label: 'Grammar', description: 'Targeted lessons and drills', icon: Ruler },
];

export default function PracticeScreen() {
  const router = useRouter();

  return (
    <Screen scroll>
      <AppHeader title="Practice" kicker="Choose your own" />

      <View className="px-6">
        {AREAS.map((area, index) => (
          <View key={area.label}>
            {index > 0 ? <Rule /> : null}
            <ListRow
              label={area.label}
              description={area.description}
              icon={area.icon}
              onPress={() => router.push(area.href)}
            />
          </View>
        ))}
        <Rule weight="section" />
      </View>
    </Screen>
  );
}
