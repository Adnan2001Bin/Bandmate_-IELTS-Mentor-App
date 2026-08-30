import type { PlanTask } from '@/types';

/** The reference day's work from the design deck: 18 minutes, speaking-led. */
export const mockPlanTasks: PlanTask[] = [
  {
    id: 'task_speak',
    area: 'speaking',
    title: 'Live speaking with Mira',
    reason: 'Your biggest band gap — fluency, not vocabulary.',
    minutes: 6,
    tags: ['Part 2 cue card', 'Fluency', '+2 written fixes'],
    status: 'pending',
  },
  {
    id: 'task_write',
    area: 'writing',
    title: 'Writing T2 · cohesion rebuild',
    reason: 'Three paragraphs, marked live.',
    minutes: 8,
    tags: ['Task 2', 'Cohesion'],
    status: 'pending',
  },
  {
    id: 'task_listen',
    area: 'listening',
    title: 'Listening · maintenance set',
    reason: 'Keep the 6.5 from slipping while we spend time on speaking.',
    minutes: 4,
    tags: ['Section 3', 'Multiple choice'],
    status: 'pending',
  },
];

export const mockBenchTasks: PlanTask[] = [
  {
    id: 'bench_read',
    area: 'reading',
    title: 'Reading · True / False / Not Given',
    reason: 'A short set if you would rather read than write.',
    minutes: 8,
    tags: ['TFNG'],
    status: 'pending',
  },
  {
    id: 'bench_grammar',
    area: 'grammar',
    title: 'Articles and complex sentences',
    reason: 'Ten items. The same pattern as yesterday\'s writing flags.',
    minutes: 6,
    tags: ['Grammar'],
    status: 'pending',
  },
];
