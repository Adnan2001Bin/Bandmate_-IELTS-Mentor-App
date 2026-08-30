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
};
