import timeline from '../content/data/timeline.json';
import specs from '../content/data/specs.json';

export type TimelineItem = {
  year: string;
  event: string;
  status: string;
};

export function getTimeline(): TimelineItem[] {
  return timeline as TimelineItem[];
}

export function getSpecs() {
  return specs;
}

// Placeholder for future MDX loaded updates
export function getUpdates() {
  return [
    {
      slug: '2026-06-mission-update',
      title: 'Mission update — June 2026',
      date: '2026-06-01',
      excerpt: 'Initial design work for the AETHER probe is progressing on schedule.',
    },
    {
      slug: '2026-07-competitor-missions',
      title: 'Competitor missions update — July 2026',
      date: '2026-07-01',
      excerpt: 'Recent developments in Venus cloud exploration from Rocket Lab, NASA and ESA.',
    },
  ];
}
