/**
 * AETHER OS — Grok-led team run helper
 *
 * Usage (from repo root):
 *   npx tsx automation/scripts/team-run.ts start "objective" [--gemini]
 *   npx tsx automation/scripts/team-run.ts list
 *   npx tsx automation/scripts/team-run.ts gemini [run-id]
 *   npx tsx automation/scripts/team-run.ts lesson --run <id> --kind process --observation "..." --change "..."
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = join(__dirname, '../..');
const teamDir = join(root, 'aether-os/team');
const runsDir = join(teamDir, 'runs');
const lessonsPath = join(teamDir, 'lessons.json');

type Lesson = {
  id: string;
  date: string;
  source_run: string;
  kind: string;
  observation: string;
  change: string;
  applied: boolean;
  files: string[];
};

type LessonsFile = { updated_at: string; lessons: Lesson[] };

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'objective';
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadLessons(): LessonsFile {
  return JSON.parse(readFileSync(lessonsPath, 'utf8')) as LessonsFile;
}

function saveLessons(data: LessonsFile) {
  data.updated_at = today();
  writeFileSync(lessonsPath, JSON.stringify(data, null, 2) + '\n');
}

function latestRunId(): string | null {
  if (!existsSync(runsDir)) return null;
  const dirs = readdirSync(runsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  return dirs.length ? dirs[dirs.length - 1] : null;
}

function start(objective: string, spawnGemini: boolean) {
  mkdirSync(runsDir, { recursive: true });
  const id = `${today()}-${slugify(objective)}`;
  const dir = join(runsDir, id);
  if (existsSync(dir)) {
    console.log(`Run exists: aether-os/team/runs/${id}`);
  } else {
    mkdirSync(dir, { recursive: true });
  }

  const brief = `# Team run ${id}

**Lead:** grok  
**Objective:** ${objective}  
**Status:** open  

## Standing constraints

See AGENTS.md. $500k all-in. 2029 window class. Affirmative public copy. Pre-hardware. No invented partners or 2027 launch.

## Plan

_Lead fills slices in assignments.json._

## Next

1. Grok: \`/aether-team\` with this objective, or implement grok-owned slices.
2. If Gemini is assigned, keep handoff.md current and run \`npx tsx automation/scripts/team-run.ts gemini ${id}\`.
3. Verify, then \`team-run.ts lesson\`.
`;

  const assignments = {
    id,
    objective,
    lead: 'grok',
    status: 'open',
    slices: [] as {
      id: string;
      owner: 'grok' | 'gemini' | 'human';
      paths: string[];
      done_when: string;
    }[],
  };

  const handoff = `# Handoff ${id}
status: open
owner: gemini
objective: ${objective}

## Context

You are a teammate on Project AETHER. Grok is lead. Read GEMINI.md, AGENTS.md, and aether-os/team/protocol.md.

## Files you own (only these)

_Lead fills this list. Do not edit other paths._

## Do not touch

- site/content/data/*.json unless listed above
- site/app/preview/, public/assets/preview/, archive, user-src
- $500k target, 2029 window, public launch posture

## Done when

Observable acceptance criteria go here.

## Return

Write \`gemini-return.md\` in this directory with:

- ## Summary
- ## Files
- ## Evidence
- ## Risks
- ## RSI
`;

  writeFileSync(join(dir, 'brief.md'), brief);
  writeFileSync(join(dir, 'assignments.json'), JSON.stringify(assignments, null, 2) + '\n');
  writeFileSync(join(dir, 'handoff.md'), handoff);
  console.log(`Scaffolded aether-os/team/runs/${id}/`);
  if (spawnGemini) gemini(id);
}

function list() {
  if (!existsSync(runsDir)) {
    console.log('No runs yet. team-run.ts start "<objective>"');
    return;
  }
  const dirs = readdirSync(runsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  for (const id of dirs) {
    const handoff = join(runsDir, id, 'handoff.md');
    const ret = join(runsDir, id, 'gemini-return.md');
    const verify = join(runsDir, id, 'verify.md');
    const flags = [
      existsSync(handoff) ? 'handoff' : null,
      existsSync(ret) ? 'gemini-return' : null,
      existsSync(verify) ? 'verify' : null,
    ]
      .filter(Boolean)
      .join(',');
    console.log(`${id}  ${flags}`);
  }
}

function findAgentapi(): string | null {
  const p = join(homedir(), '.gemini/antigravity/bin/agentapi');
  return existsSync(p) ? p : null;
}

function findHub(): { httpPort: number; csrfToken: string } | null {
  const daemon = join(homedir(), '.gemini/antigravity/daemon');
  if (!existsSync(daemon)) return null;
  const files = readdirSync(daemon).filter((f) => f.startsWith('hub_') && f.endsWith('.json'));
  if (!files.length) return null;
  const latest = files.sort().at(-1)!;
  try {
    return JSON.parse(readFileSync(join(daemon, latest), 'utf8')) as {
      httpPort: number;
      csrfToken: string;
    };
  } catch {
    return null;
  }
}

function gemini(runId?: string) {
  const id = runId || latestRunId();
  if (!id) {
    console.error('No run. team-run.ts start "<objective>" first.');
    process.exit(1);
  }
  const handoff = join(runsDir, id, 'handoff.md');
  if (!existsSync(handoff)) {
    console.error(`Missing ${handoff}`);
    process.exit(1);
  }
  const body = readFileSync(handoff, 'utf8');
  const api = findAgentapi();
  const hub = findHub();
  if (!api || !hub) {
    console.log(`Antigravity is not running. Handoff is ready at aether-os/team/runs/${id}/handoff.md`);
    console.log('Open Antigravity on the nephelis project and paste or point Gemini at that file.');
    return;
  }
  const prompt =
    `You are Gemini, teammate on Project AETHER. Grok is lead.\n` +
    `Work only the open handoff below. Write gemini-return.md in the same run directory when done.\n\n` +
    body;
  const r = spawnSync(api, ['new-conversation', '--title', `AETHER ${id}`, '--model', 'pro', prompt], {
    stdio: 'inherit',
    cwd: root,
  });
  if (r.status !== 0) {
    console.error('agentapi new-conversation failed. Handoff file still stands.');
    process.exit(r.status || 1);
  }
}

function lesson(opts: {
  run: string;
  kind: string;
  observation: string;
  change: string;
  files?: string[];
}) {
  const kinds = new Set(['process', 'prompt', 'tooling', 'claim', 'coordination', 'noop']);
  if (!kinds.has(opts.kind)) {
    console.error(`kind must be one of ${[...kinds].join(', ')}`);
    process.exit(1);
  }
  const data = loadLessons();
  const n = data.lessons.reduce((m, l) => {
    const k = Number(l.id.replace(/^L-/, ''));
    return Number.isFinite(k) ? Math.max(m, k) : m;
  }, 0);
  const id = `L-${String(n + 1).padStart(3, '0')}`;
  data.lessons.push({
    id,
    date: today(),
    source_run: opts.run,
    kind: opts.kind,
    observation: opts.observation,
    change: opts.change,
    applied: false,
    files: opts.files || [],
  });
  saveLessons(data);
  console.log(`Appended ${id} to aether-os/team/lessons.json`);
}

function flag(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  if (i === -1 || i === args.length - 1) return undefined;
  return args[i + 1];
}

function help() {
  console.log(`AETHER OS team-run

  start "<objective>" [--gemini]   scaffold runs/<date>-<slug>/
  list                             show run directories
  gemini [run-id]                  spawn Antigravity conversation from handoff.md
  lesson --run <id> --kind <k> --observation "..." --change "..."

Kinds: process | prompt | tooling | claim | coordination | noop

Docs: docs/agent-team-rsi.md
`);
}

const argv = process.argv.slice(2);
const cmd = argv[0];

if (!cmd || cmd === 'help' || cmd === '-h') {
  help();
} else if (cmd === 'start') {
  const gem = argv.includes('--gemini');
  const objective = argv
    .slice(1)
    .filter((a) => a !== '--gemini')
    .join(' ')
    .trim();
  if (!objective) {
    console.error('start requires an objective string');
    process.exit(1);
  }
  start(objective, gem);
} else if (cmd === 'list') {
  list();
} else if (cmd === 'gemini') {
  gemini(argv[1]);
} else if (cmd === 'lesson') {
  const run = flag(argv, '--run') || latestRunId() || 'unknown';
  const kind = flag(argv, '--kind');
  const observation = flag(argv, '--observation');
  const change = flag(argv, '--change');
  if (!kind || !observation || !change) {
    console.error('lesson requires --kind --observation --change');
    process.exit(1);
  }
  lesson({ run, kind, observation, change });
} else {
  help();
  process.exit(1);
}
