import { grammarXp } from '@/lib/grammar';
import { isAnswerCorrect } from '@/lib/listening';
import { mockGrammarLessons } from '@/mocks/grammar';
import type { GrammarLesson } from '@/types';
import { ServiceError } from '../api/errors';
import type { GrammarService, GrammarSubmitInput } from '../contracts';
import { delay } from './latency';

function summaryOf(lesson: GrammarLesson) {
  return {
    id: lesson.id,
    title: lesson.title,
    minutes: lesson.minutes,
    questionCount: lesson.questionCount,
    recommended: lesson.recommended,
  };
}

export const mockGrammarService: GrammarService = {
  async listLessons() {
    await delay();
    return mockGrammarLessons.map(summaryOf);
  },

  async getLesson(id) {
    await delay();
    const lesson = mockGrammarLessons.find((item) => item.id === id);
    if (!lesson) {
      throw new ServiceError('notFound', 'That grammar lesson is not in the library.');
    }
    return lesson;
  },

  async submit({ lessonId, answers }: GrammarSubmitInput) {
    await delay(500);
    const lesson = mockGrammarLessons.find((item) => item.id === lessonId);
    if (!lesson) {
      throw new ServiceError('notFound', 'That grammar lesson is not in the library.');
    }

    const mistakes: { questionId: string; given: string; correct: string; why: string }[] = [];
    let correct = 0;

    for (const item of lesson.questions) {
      const given = answers[item.id] ?? '';
      if (isAnswerCorrect(given, item.correct)) {
        correct += 1;
      } else {
        mistakes.push({
          questionId: item.id,
          given,
          correct: item.correct,
          why: item.why,
        });
      }
    }

    const first = mistakes[0];
    return {
      lessonId: lesson.id,
      correct,
      total: lesson.questions.length,
      xp: grammarXp(correct, lesson.questions.length),
      pattern: first ? first.why : lesson.pattern,
      answers,
      mistakes,
    };
  },
};
