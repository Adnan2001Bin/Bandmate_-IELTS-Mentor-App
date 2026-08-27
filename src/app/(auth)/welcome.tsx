import { useRouter } from 'expo-router';
import { ArrowRight, Clock, Mic, Target } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MiraMark } from '@/components/mira';
import { Button, Rule, Text, type IconComponent } from '@/components/ui';
import { iconSize, useTheme } from '@/theme';

const PROMISES: readonly { icon: IconComponent; text: string }[] = [
  { icon: Mic, text: "Speak for 30 seconds — I'll estimate your band" },
  { icon: Target, text: 'I build a plan back-dated from your test day' },
  { icon: Clock, text: 'We work 15–20 minutes a day. I adjust it daily.' },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="border-b-2 border-divider px-6 pb-5 pt-4">
        <Text variant="h1">BANDMATE</Text>
        <Text variant="kicker" tone="muted" className="mt-1">
          IELTS, with someone in your corner
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-6 py-4"
        showsVerticalScrollIndicator={false}
      >
        <MiraMark />

        <Text variant="display" className="mt-6 text-[38px] leading-[40px]">
          {"I'M MIRA.\nI'LL BE YOUR\nTUTOR."}
        </Text>

        <Text variant="body" tone="muted" className="mt-5 max-w-[300px]">
          Not a question bank with a mascot. I listen to you speak, read what you write, and tell
          you the one thing to fix next.
        </Text>

        <View className="mt-7 border-t-2 border-divider">
          {PROMISES.map((promise, index) => (
            <View key={promise.text}>
              {index > 0 ? <Rule /> : null}
              <View className="flex-row items-center gap-3.5 py-3.5">
                <promise.icon size={iconSize.md} color={colors.primary} strokeWidth={2} />
                <Text variant="bodySm" className="flex-1">
                  {promise.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="gap-1 px-6 pb-2 pt-4">
        <Button
          label="Start my diagnostic"
          trailingIcon={ArrowRight}
          onPress={() => router.push('/sign-up')}
        />
        <Button
          label="I've used Bandmate before"
          variant="ghost"
          size="md"
          onPress={() => router.push('/sign-in')}
          className="px-0"
        />
      </View>
    </SafeAreaView>
  );
}
