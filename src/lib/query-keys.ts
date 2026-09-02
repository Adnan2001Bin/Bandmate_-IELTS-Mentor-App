/** Every cache key in one place, so invalidation never guesses at a string. */
export const queryKeys = {
  profile: ['profile'] as const,
  plan: {
    today: ['plan', 'today'] as const,
    debrief: ['plan', 'debrief'] as const,
    bench: ['plan', 'bench'] as const,
  },
  practice: {
    hub: ['practice', 'hub'] as const,
  },
  listening: {
    sets: ['listening', 'sets'] as const,
    set: (id: string) => ['listening', 'set', id] as const,
  },
  reading: {
    sets: ['reading', 'sets'] as const,
    set: (id: string) => ['reading', 'set', id] as const,
    saved: ['reading', 'saved'] as const,
  },
  writing: {
    tasks: ['writing', 'tasks'] as const,
    task: (id: string) => ['writing', 'task', id] as const,
    drafts: ['writing', 'drafts'] as const,
    draft: (id: string) => ['writing', 'draft', id] as const,
  },
  speaking: {
    topics: ['speaking', 'topics'] as const,
    topic: (id: string) => ['speaking', 'topic', id] as const,
  },
  vocabulary: {
    overview: ['vocabulary', 'overview'] as const,
    categories: ['vocabulary', 'categories'] as const,
    category: (id: string) => ['vocabulary', 'category', id] as const,
    word: (id: string) => ['vocabulary', 'word', id] as const,
    quiz: (id: string) => ['vocabulary', 'quiz', id] as const,
    due: ['vocabulary', 'due'] as const,
    difficult: ['vocabulary', 'difficult'] as const,
  },
  grammar: {
    lessons: ['grammar', 'lessons'] as const,
    lesson: (id: string) => ['grammar', 'lesson', id] as const,
  },
};
