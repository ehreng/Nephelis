import timeline from '../content/data/timeline.json';
import specs from '../content/data/specs.json';
import heritage from '../content/data/heritage.json';
import tasks from '../content/data/tasks.json';
import telemetry from '../content/data/telemetry.json';
import funding from '../content/data/funding.json';
import massBudget from '../content/data/mass-budget.json';
import risks from '../content/data/risks.json';
import partners from '../content/data/partners.json';
import missionControl from '../content/data/mission-control.json';

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

export type RiskItem = {
  id: string;
  title: string;
  category: string;
  likelihood: string;
  impact: string;
  status: string;
  mitigation: string;
  owner?: string;
};

export type PartnerItem = {
  id: string;
  name: string;
  type: string;
  status: string;
  ask: string;
  next_step: string;
  priority: string;
};

export type MissionCheckItem = {
  id: string;
  item: string;
  phase: string;
  status: string;
  due?: string;
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

export function getMassBudget() {
  return massBudget;
}

export function getRisks(): RiskItem[] {
  return (risks as { risks: RiskItem[] }).risks;
}

export function getPartners(): PartnerItem[] {
  return (partners as { pipeline: PartnerItem[] }).pipeline;
}

export function getMissionControl() {
  return missionControl as {
    updated_at: string;
    callsign: string;
    phase: string;
    launch_target: string;
    funding_goal_usd: number;
    checklist: MissionCheckItem[];
  };
}

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
