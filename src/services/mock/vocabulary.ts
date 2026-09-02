import { blankExample, gradeProgress, isDue, isKnown, todayStamp } from '@/lib/vocabulary';
import { isAnswerCorrect } from '@/lib/listening';
import { storage, storageKeys } from '@/lib/storage';
import { mockVocabCategories, mockVocabWords } from '@/mocks/vocabulary';
import type {
  VocabCategory,
  VocabCategorySummary,
  VocabProgress,
  VocabQuizItem,
  VocabWord,
} from '@/types';
import { ServiceError } from '../api/errors';
import type { VocabReviewInput, VocabQuizSubmitInput, VocabularyService } from '../contracts';
import { delay } from './latency';

const SEED: Record<string, VocabProgress> = {
  'education-significant': {
    wordId: 'education-significant',
    box: 1,
    dueAt: '2020-01-01',
    forgotten: 0,
    difficult: false,
  },
  'education-curriculum': {
    wordId: 'education-curriculum',
    box: 0,
    dueAt: '2020-01-01',
    forgotten: 0,
    difficult: false,
  },
  'education-literacy': {
    wordId: 'education-literacy',
    box: 3,
    dueAt: '2026-12-01',
    forgotten: 0,
    difficult: false,
  },
  'environment-mitigate': {
    wordId: 'environment-mitigate',
    box: 1,
    dueAt: '2020-01-01',
    forgotten: 0,
    difficult: false,
  },
  'work-workload': {
    wordId: 'work-workload',
    box: 0,
    dueAt: '2020-01-01',
    forgotten: 2,
    difficult: true,
  },
  'technology-ubiquitous': {
    wordId: 'technology-ubiquitous',
    box: 3,
    dueAt: '2026-12-01',
    forgotten: 0,
    difficult: false,
  },
};

let cache: Record<string, VocabProgress> | null = null;

async function loadProgress(): Promise<Record<string, VocabProgress>> {
  if (cache) {
    return cache;
  }
  cache = (await storage.get<Record<string, VocabProgress>>(storageKeys.vocabularyProgress)) ?? {
    ...SEED,
  };
  return cache;
}

async function saveProgress(next: Record<string, VocabProgress>): Promise<void> {
  cache = next;
  await storage.set(storageKeys.vocabularyProgress, next);
}

function counts(progress: Record<string, VocabProgress>, words: readonly VocabWord[]) {
  const today = todayStamp();
  let knownCount = 0;
  let dueCount = 0;
  let difficultCount = 0;

  for (const word of words) {
    const row = progress[word.id];
    if (isKnown(row)) {
      knownCount += 1;
    }
    if (row?.difficult) {
      difficultCount += 1;
    }
    if (!row || isDue(row.dueAt, today)) {
      if (row) {
        dueCount += 1;
      }
    }
  }

  return { knownCount, dueCount, difficultCount };
}

function summaryOf(
  category: VocabCategory,
  progress: Record<string, VocabProgress>,
): VocabCategorySummary {
  const { knownCount, dueCount, difficultCount } = counts(progress, category.words);
  return {
    id: category.id,
    title: category.title,
    wordCount: category.words.length,
    knownCount,
    dueCount,
    difficultCount,
    recommended: category.recommended,
  };
}

function place(correct: string, distractors: readonly string[], slot: number): string[] {
  const pool = distractors.filter((item) => item !== correct).slice(0, 3);
  const options = [...pool];
  const index = slot % (options.length + 1);
  options.splice(index, 0, correct);
  return options;
}

function buildQuiz(category: VocabCategory): VocabQuizItem[] {
  return category.words.map((word, index) => {
    const others = category.words.filter((item) => item.id !== word.id);
    const kind = (['meaning', 'gap', 'synonym'] as const)[index % 3];

    if (kind === 'gap') {
      return {
        id: `${word.id}-gap`,
        wordId: word.id,
        kind,
        prompt: blankExample(word.example, word.headword),
        options: place(
          word.headword,
          others.map((item) => item.headword),
          index,
        ),
        correct: word.headword,
        why: word.ieltsContext,
      };
    }

    if (kind === 'synonym') {
      const correct = word.synonyms[0] ?? word.headword;
      return {
        id: `${word.id}-syn`,
        wordId: word.id,
        kind,
        prompt: `Closest to “${word.headword}”`,
        options: place(
          correct,
          others.map((item) => item.synonyms[0] ?? item.headword),
          index + 1,
        ),
        correct,
        why: word.ieltsContext,
      };
    }

    return {
      id: `${word.id}-mean`,
      wordId: word.id,
      kind: 'meaning',
      prompt: `What does “${word.headword}” mean?`,
      options: place(
        word.meaning,
        others.map((item) => item.meaning),
        index + 2,
      ),
      correct: word.meaning,
      why: word.ieltsContext,
    };
  });
}

function flagsFor(
  words: readonly VocabWord[],
  progress: Record<string, VocabProgress>,
): VocabCategory['flags'] {
  const today = todayStamp();
  const flags: VocabCategory['flags'] = {};
  for (const word of words) {
    const row = progress[word.id];
    flags[word.id] = {
      due: Boolean(row) && isDue(row.dueAt, today),
      known: isKnown(row),
      difficult: Boolean(row?.difficult),
    };
  }
  return flags;
}

function findCategory(id: string): VocabCategory {
  const category = mockVocabCategories.find((item) => item.id === id);
  if (!category) {
    throw new ServiceError('notFound', 'That vocabulary set is not in the library.');
  }
  return category;
}

function findWord(id: string): VocabWord {
  const word = mockVocabWords.find((item) => item.id === id);
  if (!word) {
    throw new ServiceError('notFound', 'That word is not in the library.');
  }
  return word;
}

export const mockVocabularyService: VocabularyService = {
  async getOverview() {
    await delay();
    const progress = await loadProgress();
    const { knownCount, dueCount, difficultCount } = counts(progress, mockVocabWords);
    return {
      dueCount,
      knownCount,
      difficultCount,
      total: mockVocabWords.length,
    };
  },

  async listCategories() {
    await delay();
    const progress = await loadProgress();
    return mockVocabCategories.map((item) => summaryOf(item, progress));
  },

  async getCategory(id) {
    await delay();
    const progress = await loadProgress();
    const category = findCategory(id);
      return { ...category, ...summaryOf(category, progress), flags: flagsFor(category.words, progress) };
  },

  async getWord(id) {
    await delay();
    return findWord(id);
  },

  async getQuiz(categoryId) {
    await delay();
    return buildQuiz(findCategory(categoryId));
  },

  async submitQuiz({ categoryId, answers }: VocabQuizSubmitInput) {
    await delay(600);
    const category = findCategory(categoryId);
    const quiz = buildQuiz(category);
    const progress = { ...(await loadProgress()) };
    const mistakes: { wordId: string; given: string; correct: string; why: string }[] = [];
    let correct = 0;

    for (const item of quiz) {
      const given = answers[item.id] ?? '';
      const ok = isAnswerCorrect(given, item.correct);
      if (ok) {
        correct += 1;
        progress[item.wordId] = gradeProgress(progress[item.wordId], item.wordId, true);
      } else {
        mistakes.push({ wordId: item.wordId, given, correct: item.correct, why: item.why });
        progress[item.wordId] = gradeProgress(progress[item.wordId], item.wordId, false);
      }
    }

    await saveProgress(progress);

    const first = mistakes[0];
    return {
      categoryId: category.id,
      correct,
      total: quiz.length,
      xp: correct * 8 + 4,
      pattern: first
        ? `You missed “${findWord(first.wordId).headword}”. ${first.why}`
        : 'You picked the precise word, not “very important”. Keep the size word.',
      answers,
      mistakes,
    };
  },

  async listDue() {
    await delay();
    const progress = await loadProgress();
    const today = todayStamp();
    return mockVocabWords.filter((word) => {
      const row = progress[word.id];
      return Boolean(row) && isDue(row.dueAt, today);
    });
  },

  async listDifficult() {
    await delay();
    const progress = await loadProgress();
    return mockVocabWords.filter((word) => progress[word.id]?.difficult);
  },

  async review({ wordId, knew }: VocabReviewInput) {
    await delay(200);
    findWord(wordId);
    const progress = { ...(await loadProgress()) };
    progress[wordId] = gradeProgress(progress[wordId], wordId, knew);
    await saveProgress(progress);
    return progress[wordId];
  },

  async finishReview(grades: readonly VocabReviewInput[]) {
    await delay();
    const knew = grades.filter((item) => item.knew).length;
    const missed = grades.length - knew;
    const firstMiss = grades.find((item) => !item.knew);
    return {
      reviewed: grades.length,
      knew,
      missed,
      xp: knew * 4 + 6,
      pattern: firstMiss
        ? `You missed “${findWord(firstMiss.wordId).headword}”. ${findWord(firstMiss.wordId).ieltsContext}`
        : 'You held the queue. The next review is on the 2 / 4 / 7 / 14-day clock.',
    };
  },

  async markDifficult(wordId) {
    await delay(200);
    findWord(wordId);
    const progress = { ...(await loadProgress()) };
    progress[wordId] = gradeProgress(progress[wordId], wordId, false);
    await saveProgress(progress);
    return progress[wordId];
  },
};
