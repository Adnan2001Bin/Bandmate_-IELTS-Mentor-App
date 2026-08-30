import { estimateListeningBand, flattenQuestions, isAnswerCorrect } from '@/lib/listening';
import { mockListeningSets } from '@/mocks/listening';
import type { ListeningMistake, ListeningResult, ListeningSet } from '@/types';
import { ServiceError } from '../api/errors';
import type { ListeningService } from '../contracts';
import { delay } from './latency';

function summaryOf(set: ListeningSet) {
  return {
    id: set.id,
    title: set.title,
    section: set.section,
    difficulty: set.difficulty,
    accent: set.accent,
    questionCount: set.questionCount,
    minutes: set.minutes,
    recommended: set.recommended,
  };
}

export const mockListeningService: ListeningService = {
  async listSets() {
    await delay();
    return mockListeningSets.map(summaryOf);
  },

  async getSet(id) {
    await delay();
    const set = mockListeningSets.find((item) => item.id === id);

    if (!set) {
      throw new ServiceError('notFound', 'That listening set is not in the library.');
    }

    return set;
  },

  async submit({ setId, mode, answers }) {
    await delay(350);
    const set = mockListeningSets.find((item) => item.id === setId);

    if (!set) {
      throw new ServiceError('notFound', 'That listening set is not in the library.');
    }

    const questions = flattenQuestions(set);
    const mistakes: ListeningMistake[] = [];
    let correct = 0;

    for (const question of questions) {
      const given = answers[question.id] ?? '';
      if (isAnswerCorrect(given, question.correct)) {
        correct += 1;
        continue;
      }

      const key = typeof question.correct === 'string' ? question.correct : question.correct[0];
      mistakes.push({
        questionId: question.id,
        number: question.number,
        prompt: question.prompt,
        given: given || '—',
        correct: key ?? '',
        explanation: question.explanation,
      });
    }

    const correctionCount = mistakes.filter((item) => {
      const question = questions.find((entry) => entry.id === item.questionId);
      const haystack = `${item.explanation} ${question?.miraWrong ?? ''}`.toLowerCase();
      return haystack.includes('correct');
    }).length;

    const pattern =
      correctionCount >= 2
        ? 'Both of your misses were distractor answers — the speaker said your option out loud, then corrected themselves. You are catching keywords but not the correction. Tomorrow’s set is only that.'
        : mistakes.length === 0
          ? 'You held the corrections. The next set can be a harder accent, not another copy of this paper.'
          : mistakes.length === 1
            ? `One miss — Q${mistakes[0]?.number}. Read the explanation once, then replay that timestamp. Do not collect a second of the same kind.`
            : 'The misses are not random. Open the review and listen only to the timestamps beside the wrong answers.';

    const result: ListeningResult = {
      setId,
      mode,
      correct,
      total: questions.length,
      band: estimateListeningBand(correct, questions.length),
      xp: correct * 20,
      pattern,
      mistakes,
      answers: { ...answers },
    };

    return result;
  },
};
