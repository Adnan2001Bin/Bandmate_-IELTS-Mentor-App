import { flattenQuestions, isAnswerCorrect } from '@/lib/listening';
import { estimateReadingBand } from '@/lib/reading';
import { storage, storageKeys } from '@/lib/storage';
import { mockReadingSets } from '@/mocks/reading';
import type { ReadingMistake, ReadingResult, ReadingSavedItem, ReadingSet } from '@/types';
import { ServiceError } from '../api/errors';
import type { ReadingService } from '../contracts';
import { delay } from './latency';

function summaryOf(set: ReadingSet) {
  return {
    id: set.id,
    title: set.title,
    testType: set.testType,
    difficulty: set.difficulty,
    questionCount: set.questionCount,
    minutes: set.minutes,
    recommended: set.recommended,
  };
}

let savedCache: ReadingSavedItem[] | null = null;

async function loadSaved(): Promise<ReadingSavedItem[]> {
  if (savedCache) {
    return savedCache;
  }

  savedCache = (await storage.get<ReadingSavedItem[]>(storageKeys.readingSaved)) ?? [];
  return savedCache;
}

async function persistSaved(items: ReadingSavedItem[]): Promise<ReadingSavedItem[]> {
  savedCache = items;
  await storage.set(storageKeys.readingSaved, items);
  return items;
}

export const mockReadingService: ReadingService = {
  async listSets() {
    await delay();
    return mockReadingSets.map(summaryOf);
  },

  async getSet(id) {
    await delay();
    const set = mockReadingSets.find((item) => item.id === id);

    if (!set) {
      throw new ServiceError('notFound', 'That reading set is not in the library.');
    }

    return set;
  },

  async submit({ setId, mode, answers }) {
    await delay(350);
    const set = mockReadingSets.find((item) => item.id === setId);

    if (!set) {
      throw new ServiceError('notFound', 'That reading set is not in the library.');
    }

    const questions = flattenQuestions(set);
    const mistakes: ReadingMistake[] = [];
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

    const locateMisses = mistakes.filter((item) => {
      const question = questions.find((entry) => entry.id === item.questionId);
      const haystack = `${item.explanation} ${question?.miraWrong ?? ''}`.toLowerCase();
      return haystack.includes('not given') || haystack.includes('false');
    }).length;

    const pattern =
      mistakes.length === 0
        ? 'You held the locate. The next set can be a denser Academic paper, not another copy of this one.'
        : locateMisses >= 2
          ? 'The misses sit on True/False/Not Given — you are treating a missing number as a disagreement. Tomorrow is only that distinction.'
          : mistakes.length === 1
            ? `One miss — Q${mistakes[0]?.number}. Read the highlighted paragraph once. Do not collect a second of the same kind.`
            : 'The misses are not random. Open the review and sit only with the paragraphs marked on the left.';

    const result: ReadingResult = {
      setId,
      mode,
      correct,
      total: questions.length,
      band: estimateReadingBand(correct, questions.length),
      xp: correct * 20,
      pattern,
      mistakes,
      answers: { ...answers },
    };

    return result;
  },

  async listSaved() {
    await delay(200);
    return (await loadSaved()).slice();
  },

  async saveQuestion({ setId, questionId }) {
    await delay(200);
    const set = mockReadingSets.find((item) => item.id === setId);

    if (!set) {
      throw new ServiceError('notFound', 'That reading set is not in the library.');
    }

    const question = flattenQuestions(set).find((item) => item.id === questionId);

    if (!question) {
      throw new ServiceError('notFound', 'That question is not on this paper.');
    }

    const current = await loadSaved();
    if (current.some((item) => item.setId === setId && item.questionId === questionId)) {
      return current.slice();
    }

    return persistSaved([
      ...current,
      {
        setId,
        setTitle: set.title,
        questionId,
        number: question.number,
        prompt: question.prompt,
      },
    ]);
  },

  async unsaveQuestion({ setId, questionId }) {
    await delay(200);
    const current = await loadSaved();
    return persistSaved(
      current.filter((item) => !(item.setId === setId && item.questionId === questionId)),
    );
  },
};
