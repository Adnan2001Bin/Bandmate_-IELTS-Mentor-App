import { View } from 'react-native';

import { MiraNote } from './mira-note';
import { Text } from '@/components/ui';
import type { GrammarLesson as Lesson } from '@/types';

export type GrammarLessonProps = {
  lesson: Lesson;
};

/** The learn step: short body, then the one pattern Mira will keep naming. */
export function GrammarLesson({ lesson }: GrammarLessonProps) {
  return (
    <View className="gap-4">
      {lesson.body.map((paragraph) => (
        <Text key={paragraph} variant="body">
          {paragraph}
        </Text>
      ))}
      <MiraNote kicker="The pattern" title={lesson.title} body={lesson.pattern} />
    </View>
  );
}
