import { View } from 'react-native';

import { AnswerOption, type AnswerOptionState } from './answer-option';
import { QuestionCard } from './question-card';

export type GrammarQuestionItem = {
  prompt: string;
  options: readonly string[];
  correct: string;
};

export type GrammarQuestionProps = {
  item: GrammarQuestionItem;
  index: number;
  total: number;
  selected?: string;
  revealed?: boolean;
  onSelect?: (value: string) => void;
};

function stateFor(
  option: string,
  selected: string | undefined,
  correct: string,
  revealed: boolean,
): AnswerOptionState {
  if (!revealed) {
    return option === selected ? 'selected' : 'idle';
  }
  if (option === correct) {
    return 'correct';
  }
  if (option === selected) {
    return 'wrong';
  }
  return 'dimmed';
}

/** One grammar item. Correct is ink; wrong is accent. Never a green tick. */
export function GrammarQuestion({
  item,
  index,
  total,
  selected,
  revealed = false,
  onSelect,
}: GrammarQuestionProps) {
  return (
    <QuestionCard kicker={`Q${index + 1} of ${total}`} prompt={item.prompt}>
      <View className="gap-2">
        {item.options.map((option, optionIndex) => (
          <AnswerOption
            key={option}
            letter={String.fromCharCode(65 + optionIndex)}
            label={option}
            state={stateFor(option, selected, item.correct, revealed)}
            onPress={revealed ? undefined : () => onSelect?.(option)}
          />
        ))}
      </View>
    </QuestionCard>
  );
}
