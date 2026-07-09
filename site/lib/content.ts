import timeline from '../content/data/timeline.json';
import specs from '../content/data/specs.json';
import heritage from '../content/data/heritage.json';
import tasks from '../content/data/tasks.json';
import telemetry from '../content/data/telemetry.json';
import funding from '../content/data/funding.json';

export type TimelineItem = {
  year: string;
  event: string;
  status: string;
};

export type HeritageItem = {
  year: string;
  mission: string;
  note?: string;
  type: string;
  highlight?: boolean;
  link?: string | null;
};

export type TaskItem = {
  id: string;
  title: string;
  status: string;
  priority: string;
  area: string;
  quarter: string;
};

export type TelemetrySystem = {
  id: string;
  label: string;
  status: string;
  value: string;
  detail: string;
};

export type Telemetry = {
  updated_at: string;
  mission_phase: string;
  overall_status: string;
  systems: TelemetrySystem[];
};

export function getTimeline(): TimelineItem[] {
  return timeline as TimelineItem[];
}

export function getSpecs() {
  return specs;
}

export function getHeritage(): HeritageItem[] {
  return heritage as HeritageItem[];
}

export function getTasks(): TaskItem[] {
  return tasks as TaskItem[];
}

export function getTelemetry(): Telemetry {
  return telemetry as Telemetry;
}

export function getFunding() {
  return funding;
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
