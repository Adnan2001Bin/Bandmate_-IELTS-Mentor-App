import { View } from 'react-native';

import { Rule, Text } from '@/components/ui';
import type { VocabWord } from '@/types';

export type VocabularyDetailProps = {
  word: VocabWord;
};

/** Meaning, example, synonyms, antonyms, IELTS context. Not a flashcard back. */
export function VocabularyDetail({ word }: VocabularyDetailProps) {
  return (
    <View className="gap-5">
      <View>
        <Text variant="kicker" tone="subtle">
          Meaning
        </Text>
        <Text variant="body" className="mt-2">
          {word.meaning}
        </Text>
      </View>

      <View>
        <Text variant="kicker" tone="subtle">
          Example
        </Text>
        <Text variant="body" className="mt-2">
          {word.example}
        </Text>
      </View>

      <View>
        <Text variant="kicker" tone="subtle">
          Synonyms
        </Text>
        <Text variant="bodySm" className="mt-2">
          {word.synonyms.join(' · ')}
        </Text>
      </View>

      {word.antonyms.length > 0 ? (
        <View>
          <Text variant="kicker" tone="subtle">
            Antonyms
          </Text>
          <Text variant="bodySm" className="mt-2">
            {word.antonyms.join(' · ')}
          </Text>
        </View>
      ) : null}

      <Rule />

      <View>
        <Text variant="kicker" tone="subtle">
          IELTS context
        </Text>
        <Text variant="bodySm" className="mt-2">
          {word.ieltsContext}
        </Text>
      </View>
    </View>
  );
}
