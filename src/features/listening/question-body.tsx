import { View } from 'react-native';

import { AnswerOption, type AnswerOptionState } from '@/components/ielts';
import { Input } from '@/components/ui';
import { isAnswerCorrect } from '@/lib/listening';
import type { ListeningQuestion } from '@/types';

export type QuestionBodyProps = {
  question: ListeningQuestion;
  value: string;
  revealed: boolean;
  onChange: (value: string) => void;
};

function optionState(
  optionId: string,
  value: string,
  revealed: boolean,
  correct: string | readonly string[],
): AnswerOptionState {
  if (!revealed) {
    return value === optionId ? 'selected' : 'idle';
  }

  const isRight = isAnswerCorrect(optionId, correct);
  if (isRight) {
    return 'correct';
  }

  if (value === optionId) {
    return 'wrong';
  }

  return 'dimmed';
}

export function QuestionBody({ question, value, revealed, onChange }: QuestionBodyProps) {
  if (question.options && question.options.length > 0) {
    return (
      <View className="gap-2">
        {question.options.map((option) => (
          <AnswerOption
            key={option.id}
            letter={option.id}
            label={option.label}
            state={optionState(option.id, value, revealed, question.correct)}
            onPress={revealed ? undefined : () => onChange(option.id)}
          />
        ))}
      </View>
    );
  }

  return (
    <Input
      label={question.fieldLabel}
      value={value}
      onChangeText={onChange}
      editable={!revealed}
      autoCapitalize="none"
      autoCorrect={false}
      hint={revealed ? undefined : question.constraint}
    />
  );
}
