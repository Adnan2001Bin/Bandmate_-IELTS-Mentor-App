import type { Band, PracticeArea, PracticeHub, PracticeHubItem, PracticeStatus } from '@/types';
import type { PracticeService } from '../contracts';
import { delay } from './latency';
import { mockProfileService } from './profile';

const COPY: Record<PracticeArea, { label: string; description: string }> = {
  listening: { label: 'Listening', description: 'Sections, accents, question types' },
  reading: { label: 'Reading', description: 'Passages and question types' },
  writing: { label: 'Writing', description: 'Task 1 and Task 2' },
  speaking: { label: 'Speaking', description: 'Parts 1 to 3, live with Mira' },
  vocabulary: { label: 'Vocabulary', description: 'Topic sets and review' },
  grammar: { label: 'Grammar', description: 'Targeted lessons and drills' },
};

function statusFor(band: Band | null, target: Band, area: PracticeArea): PracticeStatus {
  if (area === 'vocabulary' || area === 'grammar') {
    return 'support';
  }

  if (band === null) {
    return 'gap';
  }

  const gap = target - band;

  if (gap >= 1) {
    return 'gap';
  }

  if (gap > 0) {
    return 'recommended';
  }

  return 'maintenance';
}

export const mockPracticeService: PracticeService = {
  async getHub() {
    await delay();
    const profile = await mockProfileService.getProfile();
    const target = profile.study.targetBand;
    const skills = profile.diagnostic?.skills;

    const items: PracticeHubItem[] = (
      ['speaking', 'writing', 'listening', 'reading', 'vocabulary', 'grammar'] as const
    ).map((area) => {
      const band = area === 'vocabulary' || area === 'grammar' ? null : (skills?.[area] ?? null);
      return {
        area,
        ...COPY[area],
        band,
        target: band === null ? null : target,
        status: statusFor(band, target, area),
      };
    });

    // Today's featured skill is the only "today's work" tag. Other small gaps
    // stay "below target" so the hub does not compete with Today.
    const featured = items.find((item) => item.area === 'speaking');

    for (const item of items) {
      if (item.status === 'recommended' && item !== featured) {
        item.status = 'gap';
      }
    }

    if (featured) {
      featured.status = 'recommended';
    }

    return { items, mistakeCount: 11 } satisfies PracticeHub;
  },
};
