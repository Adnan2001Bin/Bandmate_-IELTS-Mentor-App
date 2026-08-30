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
};
