/**
 * Nephelis flywheel — Gemini builder + Grok critic.
 *
 * Modes:
 *   --self-check / FLYWHEEL_SELF_CHECK=true
 *     Path guards, banned-claim regex, schema samples. No git. No API keys.
 *   DRY_RUN=true
 *     Full builder/critic loop, local commit, skip push/PR. Needs API keys.
 *
 * Live runs open a PR. They do not merge main. Daily cron is off until
 * GEMINI_API_KEY and XAI_API_KEY exist as repo secrets.
 *
 * Usage (from repo root):
 *   npx tsx automation/scripts/flywheel-sync.ts --self-check
 *   DRY_RUN=true npx tsx automation/scripts/flywheel-sync.ts
 */
import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  Content,
  FunctionDeclaration,
  GoogleGenAI,
  Part,
  Type,
} from "@google/genai";
import OpenAI from "openai";
import { z } from "zod";

const REPO_ROOT = path.resolve(__dirname, "../..");
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-4-neon";
const GROK_MODEL = process.env.GROK_MODEL ?? "grok-4.7";
const XAI_BASE_URL = process.env.XAI_BASE_URL ?? "https://api.x.ai/v1";
const BASE_BRANCH = process.env.BASE_BRANCH ?? "main";
const DRY_RUN = process.env.DRY_RUN === "true";
const SKIP_FULL_CI = process.env.SKIP_FULL_CI === "true";
const SELF_CHECK =
  process.env.FLYWHEEL_SELF_CHECK === "true" ||
  process.argv.includes("--self-check");

const MAX_REPAIR_TURNS = Number(process.env.MAX_REPAIR_TURNS ?? "2");
const MAX_TOOL_STEPS = 12;
const MAX_READ_CHARS = 28_000;

const BuilderProposalSchema = z.object({
  summary: z.string().min(1),
  pr_title: z.string().min(5),
  edits: z
    .array(
      z.object({
        file_path: z.string().min(1),
        full_content: z.string(),
      })
    )
    .min(1),
});

const GrokCritiqueSchema = z.object({
  approved: z.boolean(),
  blocking_issues: z.array(z.string()),
  physics_or_claim_violations: z.array(z.string()),
  review_summary: z.string(),
});

const ListFilesArgsSchema = z.object({
  directory: z.string().optional().default("."),
  max_depth: z.number().int().min(1).max(5).optional().default(3),
});

const ReadFileArgsSchema = z.object({
  file_path: z.string(),
  start_line: z.number().int().min(1).optional(),
  end_line: z.number().int().min(1).optional(),
});

const SearchRepoArgsSchema = z.object({
  query: z.string().min(1),
  directory: z.string().optional(),
});

/** Kernel + identity + lockfiles. Flywheel may not rewrite its own sandbox. */
const FORBIDDEN_WRITE_PREFIXES = [
  ".github/",
  ".grok/",
  "AGENTS.md",
  "GEMINI.md",
  "aether-os/team/",
  "automation/package.json",
  "automation/pnpm-lock.yaml",
  "automation/tsconfig.json",
  "automation/scripts/flywheel-sync.ts",
  "automation/scripts/ask-grok.ts",
  "pnpm-lock.yaml",
  "site/pnpm-lock.yaml",
  "package-lock.json",
  "site/package-lock.json",
  "site/app/preview/",
  "site/public/assets/preview/",
  "site/public/assets/visuals/archive/",
  "site/public/assets/visuals/user-src/",
  "user-src/",
];

const IGNORED_DIRS = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  "coverage",
]);

const BANNED_CLAIM_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "2027 launch claim", regex: /\b2027\s+launch\b/i },
  { label: "Signed LOI claim", regex: /\b(LOI\s+signed|signed\s+LOI)\b/i },
  {
    label: "Unverified NASA partnership claim",
    regex:
      /\b(NASA\s+partner|partnered\s+with\s+NASA|NASA[- ]affiliated|affiliation with NASA)\b/i,
  },
  { label: "Unverified sample receipt", regex: /\bsamples\s+received\b/i },
  {
    label: "Live Stripe secret/publishable key or flag",
    regex:
      /\b(sk_live_[0-9a-zA-Z]+|pk_live_[0-9a-zA-Z]+|STRIPE_LIVE|NEXT_PUBLIC_STRIPE_LIVE\s*=\s*true)\b/,
  },
  {
    label: "Rejected $5–15M public flight-class target",
    regex: /\$\s*5\s*[–-]\s*15\s*M/i,
  },
];

const STANDING_RULES = `Standing Nephelis rules:
- $500k is the all-in public bet (ground through rideshare-class Venus flight). Do not raise it.
- Ambitious window is 2029 class; backup 2030–31. Do not claim a 2027 launch.
- Public copy is affirmative. Pre-hardware is the phase word. Skip "not X" hedges.
- Film samples / acid tests on balloon film. Keep ASTM "coupon" only in lab tables.
- No invented partners, contracts, NASA affiliation, or sample receipts.
- CubeSat is a separate 3U Venus orbiter, never on the sphere.
- Identity: one sphere, flush black bay, cyan #00F0FF, two cameras.
- Do not commit site/app/preview/, public/assets/preview/, archive, or user-src.`;

function requireEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

function getGemini(): GoogleGenAI {
  return new GoogleGenAI({ apiKey: requireEnv("GEMINI_API_KEY") });
}

function getGrok(): OpenAI {
  return new OpenAI({
    apiKey: requireEnv("XAI_API_KEY"),
    baseURL: XAI_BASE_URL,
  });
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function execErrorText(err: unknown, cmd: string): string {
  if (err && typeof err === "object") {
    const e = err as { stdout?: string; stderr?: string; message?: string };
    return `Command failed (${cmd}):\n${e.stdout ?? ""}\n${e.stderr ?? e.message ?? ""}`;
  }
  return `Command failed (${cmd}): ${String(err)}`;
}

function resolveInsideRepo(relPath: string): string {
  const resolved = path.resolve(REPO_ROOT, relPath || ".");
  const relative = path.relative(REPO_ROOT, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Path escapes repository root: ${relPath}`);
  }
  return relative === "" ? "." : relative.replace(/\\/g, "/");
}

function assertSafeReadPath(relPath: string): string {
  const safeRel = resolveInsideRepo(relPath);
  const base = path.basename(safeRel);
  if (
    safeRel === ".git" ||
    safeRel.startsWith(".git/") ||
    base === ".env" ||
    base.startsWith(".env.")
  ) {
    throw new Error(`Reading sensitive path is forbidden: ${safeRel}`);
  }
  return safeRel;
}

function assertSafeWritePath(relPath: string): string {
  const safeRel = assertSafeReadPath(relPath);
  if (
    safeRel === "." ||
    FORBIDDEN_WRITE_PREFIXES.some(
      (prefix) => safeRel === prefix || safeRel.startsWith(prefix)
    )
  ) {
    throw new Error(`Protected path blocked from autonomous write: ${safeRel}`);
  }
  return safeRel;
}

function toolListFiles(rawArgs: unknown): Record<string, unknown> {
  const { directory, max_depth } = ListFilesArgsSchema.parse(rawArgs ?? {});
  const startRel = assertSafeReadPath(directory);
  const startAbs = path.resolve(REPO_ROOT, startRel);

  if (!fs.existsSync(startAbs) || !fs.statSync(startAbs).isDirectory()) {
    return { error: `Directory not found: ${startRel}` };
  }

  const entries: string[] = [];
  function walk(currentAbs: string, depth: number) {
    if (depth > max_depth || entries.length >= 400) return;
    const items = fs.readdirSync(currentAbs, { withFileTypes: true });
    for (const item of items) {
      if (item.name.startsWith(".env") || IGNORED_DIRS.has(item.name)) continue;
      const fullPath = path.join(currentAbs, item.name);
      const rel = path.relative(REPO_ROOT, fullPath).replace(/\\/g, "/");
      if (item.isDirectory()) {
        entries.push(`${rel}/`);
        walk(fullPath, depth + 1);
      } else {
        entries.push(rel);
      }
      if (entries.length >= 400) break;
    }
  }

  walk(startAbs, 1);
  return {
    directory: startRel,
    count: entries.length,
    truncated: entries.length >= 400,
    entries,
  };
}

function toolReadFile(rawArgs: unknown): Record<string, unknown> {
  const { file_path, start_line, end_line } = ReadFileArgsSchema.parse(rawArgs);
  const safeRel = assertSafeReadPath(file_path);
  const absPath = path.resolve(REPO_ROOT, safeRel);

  if (!fs.existsSync(absPath) || !fs.statSync(absPath).isFile()) {
    return { error: `File does not exist: ${safeRel}` };
  }

  const allLines = fs.readFileSync(absPath, "utf8").split("\n");
  const startIdx = Math.max(0, (start_line ?? 1) - 1);
  const endIdx = Math.min(allLines.length, end_line ?? allLines.length);

  const numberedSlice = allLines
    .slice(startIdx, endIdx)
    .map((line, idx) => `${startIdx + idx + 1}: ${line}`)
    .join("\n");

  const truncated = numberedSlice.length > MAX_READ_CHARS;
  return {
    file_path: safeRel,
    total_lines: allLines.length,
    shown_lines: `${startIdx + 1}-${endIdx}`,
    truncated,
    content: truncated
      ? `${numberedSlice.slice(0, MAX_READ_CHARS)}\n... [truncated at ${MAX_READ_CHARS} chars — pass start_line/end_line to read more]`
      : numberedSlice,
  };
}

function toolSearchRepo(rawArgs: unknown): Record<string, unknown> {
  const { query, directory } = SearchRepoArgsSchema.parse(rawArgs);
  const targetDir = directory ? assertSafeReadPath(directory) : undefined;

  const gitArgs = ["grep", "-n", "-I", "-F", "--max-count", "25", "--", query];
  if (targetDir && targetDir !== ".") {
    gitArgs.push(targetDir);
  }

  try {
    const stdout = execFileSync("git", gitArgs, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    const matches = stdout.trim().split("\n").filter(Boolean).slice(0, 80);

    return {
      query,
      match_count: matches.length,
      truncated: matches.length >= 80,
      matches,
    };
  } catch (err: unknown) {
    const status =
      err && typeof err === "object" && "status" in err
        ? (err as { status?: number }).status
        : undefined;
    if (status === 1) {
      return { query, match_count: 0, matches: [] };
    }
    return { error: `git grep failed: ${errorMessage(err)}` };
  }
}

function executeRepoTool(
  name: string,
  args: unknown
): Record<string, unknown> {
  try {
    switch (name) {
      case "list_files":
        return toolListFiles(args);
      case "read_file":
        return toolReadFile(args);
      case "search_repo":
        return toolSearchRepo(args);
      default:
        return { error: `Unknown tool: ${name}` };
    }
  } catch (err: unknown) {
    return { error: errorMessage(err) };
  }
}

const repoToolDeclarations: FunctionDeclaration[] = [
  {
    name: "list_files",
    description:
      "Lists tracked/unignored files and directories inside the Nephelis repository.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        directory: {
          type: Type.STRING,
          description:
            "Relative directory path from repo root (e.g. '.', 'site/content/data', 'docs').",
        },
        max_depth: {
          type: Type.INTEGER,
          description: "Traversal depth from 1 to 5 (default 3).",
        },
      },
    },
  },
  {
    name: "read_file",
    description:
      "Reads a file with 1-based line numbers. Always read existing files completely before proposing full_content edits.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        file_path: {
          type: Type.STRING,
          description: "Relative file path from repository root.",
        },
        start_line: {
          type: Type.INTEGER,
          description: "Optional 1-based start line.",
        },
        end_line: {
          type: Type.INTEGER,
          description: "Optional 1-based end line.",
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "search_repo",
    description:
      "Searches repository files for a literal keyword, identifier, or JSON field via git grep.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: {
          type: Type.STRING,
          description: "Literal string to search for.",
        },
        directory: {
          type: Type.STRING,
          description: "Optional subdirectory scope (e.g. 'site' or 'docs').",
        },
      },
      required: ["query"],
    },
  },
];

function runDeterministicGates(writtenFiles: string[]): {
  ok: boolean;
  logs: string;
  diff: string;
} {
  if (writtenFiles.length === 0) {
    return {
      ok: false,
      logs: "Builder made zero file changes.",
      diff: "",
    };
  }

  for (const file of writtenFiles) {
    try {
      assertSafeWritePath(file);
    } catch (err: unknown) {
      return {
        ok: false,
        logs: errorMessage(err),
        diff: "",
      };
    }
  }

  for (const file of writtenFiles) {
    execFileSync("git", ["add", "-N", "--", file], { cwd: REPO_ROOT });
  }
  const diff = execFileSync("git", ["diff", "--", ...writtenFiles], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });

  const addedLines = diff
    .split("\n")
    .filter((line) => line.startsWith("+") && !line.startsWith("+++"));

  const claimViolations: string[] = [];
  for (const line of addedLines) {
    for (const rule of BANNED_CLAIM_PATTERNS) {
      if (rule.regex.test(line)) {
        claimViolations.push(`${rule.label}: ${line}`);
      }
    }
  }
  if (claimViolations.length > 0) {
    return {
      ok: false,
      logs: `Banned claim/guardrail drift detected:\n${claimViolations.join("\n")}`,
      diff,
    };
  }

  const validationCmd = SKIP_FULL_CI
    ? "pnpm --dir site validate:content && pnpm --dir site exec tsc --noEmit"
    : "pnpm --dir site validate:content && pnpm --dir site ci";

  try {
    const out = execSync(validationCmd, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: "pipe",
    });
    return { ok: true, logs: out, diff };
  } catch (err: unknown) {
    return {
      ok: false,
      logs: execErrorText(err, validationCmd),
      diff,
    };
  }
}

function stripMarkdownFences(raw: string): string {
  return raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

async function runGeminiBuilder(
  agentsMd: string,
  taskContext: string,
  feedbackHistory: string
): Promise<z.infer<typeof BuilderProposalSchema>> {
  const gemini = getGemini();
  const systemInstruction = `You are the Nephelis Industries Builder Agent paired with Grok in an adversarial engineering flywheel.
Grok is lead. You propose edits; Grok critiques; a human merges the PR.
Follow AGENTS.md strictly:
${agentsMd}

${STANDING_RULES}

Mandatory Rules:
1. Inspect existing files with list_files, search_repo, and read_file BEFORE proposing edits. Never guess schemas, imports, or existing prose.
2. Keep docs/ tables and site/content/data/*.json (including derived mass/power totals) 100% synchronized.
3. Use dated heritage citations only; never invent partners, signed LOIs, sample receipts, 2027 launch dates, or live Stripe flags.
4. Never modify protected paths (workflows, AGENTS.md, GEMINI.md, aether-os/team/, .grok/, lockfiles, preview/archive/user-src, this flywheel script).`;

  const contents: Content[] = [
    {
      role: "user",
      parts: [
        {
          text: `Task Assignment:\n${taskContext}\n\n${
            feedbackHistory
              ? `Fix every issue raised in the previous validation / Grok critique:\n${feedbackHistory}\n\n`
              : ""
          }Phase 1: Use your read-only repository tools to inspect all relevant files, schemas, and budgets. When ready, state your concise implementation plan.`,
        },
      ],
    },
  ];

  for (let step = 0; step < MAX_TOOL_STEPS; step++) {
    const resp = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: repoToolDeclarations }],
      },
    });

    const modelContent = resp.candidates?.[0]?.content;
    if (modelContent) {
      contents.push(modelContent);
    }

    const calls = resp.functionCalls ?? [];
    if (calls.length === 0) break;

    const responseParts: Part[] = calls.map((call) => {
      console.log(
        `  [gemini:tool] ${call.name}(${JSON.stringify(call.args ?? {})})`
      );
      const result = executeRepoTool(call.name!, call.args);
      return {
        functionResponse: {
          id: call.id,
          name: call.name!,
          response: result,
        },
      };
    });

    contents.push({ role: "user", parts: responseParts });
  }

  contents.push({
    role: "user",
    parts: [
      {
        text: `Phase 2: Output ONLY valid JSON matching this exact structure:
{
  "summary": "concise engineering summary of changes and citations",
  "pr_title": "conventional commit style PR title",
  "edits": [
    {
      "file_path": "relative/path/from/repo/root",
      "full_content": "complete updated file content"
    }
  ]
}`,
      },
    ],
  });

  const patchResp = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
    },
  });

  const parsedJson = JSON.parse(stripMarkdownFences(patchResp.text ?? "{}"));
  return BuilderProposalSchema.parse(parsedJson);
}

async function runGrokCritic(
  agentsMd: string,
  taskContext: string,
  proposalSummary: string,
  gitDiff: string,
  validationLogs: string
): Promise<z.infer<typeof GrokCritiqueSchema>> {
  const grok = getGrok();
  const grokResp = await grok.chat.completions.create({
    model: GROK_MODEL,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are Grok, the Red-Team Engineering Verifier and Persistent Mission Agent for Nephelis Industries (Project AETHER). You remain lead. The builder is a teammate.
Audit the Builder's git diff rigorously against AGENTS.md, first-principles aerospace/sensor physics (~400 kg wet stack, ~55 km float altitude, Ø ~6.6 m / ~150 m³ envelope, power/link budgets), and:
${STANDING_RULES}
- Reject any invented partners, signed LOIs, funding claims, 2027 launch dates, or unverified science results.
- Reject unsynchronized changes between docs/ markdown tables and site/content/data/*.json.
- Reject truncated files, accidental deletions, or undated heritage guesses.
- Reject preview/archive/user-src commits and "not X" public hedges.
Respond ONLY with a JSON object:
{
  "approved": boolean,
  "blocking_issues": string[],
  "physics_or_claim_violations": string[],
  "review_summary": string
}`,
      },
      {
        role: "user",
        content: [
          `AGENTS.md:\n${agentsMd}`,
          `Task Assignment:\n${taskContext}`,
          `Builder Summary:\n${proposalSummary}`,
          `Deterministic Gate Output (PASSED):\n${validationLogs.slice(-4000)}`,
          `Git Diff:\n${gitDiff}`,
        ].join("\n\n---\n\n"),
      },
    ],
  });

  const rawContent = grokResp.choices[0]?.message?.content ?? "{}";
  return GrokCritiqueSchema.parse(JSON.parse(stripMarkdownFences(rawContent)));
}

function resolveTaskContext(latestBrief: string): string {
  if (process.env.TASK_OVERRIDE?.trim()) {
    return `Task Override:\n${process.env.TASK_OVERRIDE.trim()}`;
  }
  if (process.env.ISSUE_NUMBER?.trim()) {
    const num = process.env.ISSUE_NUMBER.trim();
    if (process.env.ISSUE_TITLE) {
      return `GitHub Issue #${num}: ${process.env.ISSUE_TITLE}\n\n${process.env.ISSUE_BODY ?? ""}`;
    }
    const ghIssueJson = execFileSync(
      "gh",
      ["issue", "view", num, "--json", "number,title,body"],
      { encoding: "utf8" }
    );
    const issue = JSON.parse(ghIssueJson) as {
      number: number;
      title: string;
      body?: string;
    };
    return `GitHub Issue #${issue.number}: ${issue.title}\n\n${issue.body ?? ""}`;
  }
  return `Highest-priority unblocked item from aether-os/briefs/latest.md:\n\n${latestBrief}`;
}

function revertWrittenFiles(writtenFiles: string[]): void {
  execFileSync("git", ["reset", "--hard", "HEAD"], {
    cwd: REPO_ROOT,
    stdio: "pipe",
  });
  for (const file of writtenFiles) {
    const abs = path.resolve(REPO_ROOT, file);
    if (!fs.existsSync(abs)) continue;
    try {
      execFileSync("git", ["ls-files", "--error-unmatch", "--", file], {
        cwd: REPO_ROOT,
        stdio: "pipe",
      });
    } catch {
      fs.rmSync(abs, { force: true });
    }
  }
}

function expectThrow(fn: () => void, needle: string): void {
  try {
    fn();
  } catch (err: unknown) {
    if (errorMessage(err).includes(needle)) return;
    throw new Error(
      `Expected error containing "${needle}", got: ${errorMessage(err)}`
    );
  }
  throw new Error(`Expected throw containing "${needle}"`);
}

function selfCheck(): void {
  const failures: string[] = [];
  const check = (name: string, fn: () => void) => {
    try {
      fn();
      console.log(`  ok  ${name}`);
    } catch (err: unknown) {
      failures.push(`${name}: ${errorMessage(err)}`);
      console.error(`  FAIL  ${name}: ${errorMessage(err)}`);
    }
  };

  console.log(
    `[flywheel self-check] GEMINI_MODEL=${GEMINI_MODEL} GROK_MODEL=${GROK_MODEL}`
  );

  check("escape repo root", () => {
    expectThrow(() => resolveInsideRepo("../secret"), "escapes");
  });

  check("forbid .github", () => {
    expectThrow(
      () => assertSafeWritePath(".github/workflows/ci.yml"),
      "Protected path"
    );
  });
  check("forbid AGENTS.md", () => {
    expectThrow(() => assertSafeWritePath("AGENTS.md"), "Protected path");
  });
  check("forbid GEMINI.md", () => {
    expectThrow(() => assertSafeWritePath("GEMINI.md"), "Protected path");
  });
  check("forbid protocol", () => {
    expectThrow(
      () => assertSafeWritePath("aether-os/team/protocol.md"),
      "Protected path"
    );
  });
  check("forbid flywheel script", () => {
    expectThrow(
      () => assertSafeWritePath("automation/scripts/flywheel-sync.ts"),
      "Protected path"
    );
  });
  check("forbid preview app", () => {
    expectThrow(
      () => assertSafeWritePath("site/app/preview/visuals/page.tsx"),
      "Protected path"
    );
  });
  check("forbid preview assets", () => {
    expectThrow(
      () => assertSafeWritePath("site/public/assets/preview/n4-cool-bay.jpg"),
      "Protected path"
    );
  });
  check("forbid archive", () => {
    expectThrow(
      () =>
        assertSafeWritePath("site/public/assets/visuals/archive/vision.jpg"),
      "Protected path"
    );
  });
  check("forbid user-src", () => {
    expectThrow(
      () =>
        assertSafeWritePath("site/public/assets/visuals/user-src/src.jpg"),
      "Protected path"
    );
  });
  check("forbid lockfile", () => {
    expectThrow(
      () => assertSafeWritePath("site/pnpm-lock.yaml"),
      "Protected path"
    );
  });
  check("forbid .env", () => {
    expectThrow(() => assertSafeWritePath("site/.env.local"), "forbidden");
  });

  check("allow docs", () => {
    const p = assertSafeWritePath("docs/gate0-film-rfq.md");
    if (p !== "docs/gate0-film-rfq.md") throw new Error(p);
  });
  check("allow content json", () => {
    const p = assertSafeWritePath("site/content/data/tasks.json");
    if (p !== "site/content/data/tasks.json") throw new Error(p);
  });

  check("banned 2027 launch", () => {
    const rule = BANNED_CLAIM_PATTERNS.find((r) => r.label.includes("2027"));
    if (!rule?.regex.test("+ 2027 launch is booked")) {
      throw new Error("regex missed 2027 launch");
    }
  });
  check("banned NASA partner", () => {
    const rule = BANNED_CLAIM_PATTERNS.find((r) => r.label.includes("NASA"));
    if (!rule?.regex.test("+ We partnered with NASA last week")) {
      throw new Error("regex missed NASA partner");
    }
  });
  check("banned $5-15M", () => {
    const rule = BANNED_CLAIM_PATTERNS.find((r) => r.label.includes("5"));
    if (!rule?.regex.test("+ flight-class $5–15M target")) {
      throw new Error("regex missed $5–15M");
    }
  });

  check("builder schema", () => {
    BuilderProposalSchema.parse({
      summary: "sync Gate 0 ship-to placeholder",
      pr_title: "docs: fill Gate 0 RFQ ship-to once address exists",
      edits: [{ file_path: "docs/gate0-film-rfq.md", full_content: "# x\n" }],
    });
  });
  check("critic schema", () => {
    GrokCritiqueSchema.parse({
      approved: false,
      blocking_issues: ["missing evidence"],
      physics_or_claim_violations: [],
      review_summary: "fail closed",
    });
  });

  check("models configured", () => {
    if (!GEMINI_MODEL.trim() || !GROK_MODEL.trim()) {
      throw new Error("empty model id");
    }
  });

  if (failures.length) {
    throw new Error(`self-check failed (${failures.length})\n${failures.join("\n")}`);
  }
  console.log("[flywheel self-check] all guards passed");
}

function chdirRepo(): void {
  if (process.cwd() !== REPO_ROOT) {
    process.chdir(REPO_ROOT);
  }
}

async function main() {
  chdirRepo();

  if (SELF_CHECK) {
    selfCheck();
    return;
  }

  requireEnv("GEMINI_API_KEY");
  requireEnv("XAI_API_KEY");

  const dirtyPrecheck = execSync("git status --porcelain", {
    cwd: REPO_ROOT,
    encoding: "utf8",
  }).trim();
  if (dirtyPrecheck) {
    throw new Error(
      "Working tree is dirty. Commit or stash local changes before launching flywheel-sync.ts."
    );
  }

  const agentsMd = fs.existsSync("AGENTS.md")
    ? fs.readFileSync("AGENTS.md", "utf8")
    : "";
  const latestBrief = fs.existsSync("aether-os/briefs/latest.md")
    ? fs.readFileSync("aether-os/briefs/latest.md", "utf8")
    : "";

  const taskContext = resolveTaskContext(latestBrief);
  const issueSuffix = process.env.ISSUE_NUMBER
    ? `issue-${process.env.ISSUE_NUMBER}-`
    : "";
  const branchName = `flywheel/${issueSuffix}${Date.now()}`;

  console.log(`Creating flywheel branch: ${branchName}`);
  execFileSync("git", ["checkout", "-b", branchName], {
    cwd: REPO_ROOT,
    stdio: "inherit",
  });

  let feedbackHistory = "";
  let finalCritique: z.infer<typeof GrokCritiqueSchema> | null = null;
  let finalProposal: z.infer<typeof BuilderProposalSchema> | null = null;
  let lastWritten: string[] = [];

  for (let turn = 0; turn <= MAX_REPAIR_TURNS; turn++) {
    console.log(
      `\n=== Nephelis Flywheel Turn ${turn + 1}/${MAX_REPAIR_TURNS + 1} (Builder: ${GEMINI_MODEL} | Critic: ${GROK_MODEL}) ===`
    );

    if (turn > 0) {
      revertWrittenFiles(lastWritten);
      lastWritten = [];
    }

    const proposal = await runGeminiBuilder(
      agentsMd,
      taskContext,
      feedbackHistory
    );
    lastWritten = [];
    for (const edit of proposal.edits) {
      const safePath = assertSafeWritePath(edit.file_path);
      const abs = path.resolve(REPO_ROOT, safePath);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, edit.full_content, "utf8");
      lastWritten.push(safePath);
      console.log(`  [builder:write] ${safePath}`);
    }

    console.log(
      "  [gate] Running deterministic checks (pnpm --dir site validate:content & CI)..."
    );
    const gate = runDeterministicGates(lastWritten);
    if (!gate.ok) {
      console.warn(
        "  [gate:fail] Returning deterministic failure logs to Gemini..."
      );
      feedbackHistory = `Deterministic Validation Failed:\n${gate.logs}`;
      continue;
    }
    console.log(
      "  [gate:pass] Content validation, budgets, and build succeeded."
    );

    console.log(`  [grok:review] Auditing diff with ${GROK_MODEL}...`);
    const critique = await runGrokCritic(
      agentsMd,
      taskContext,
      proposal.summary,
      gate.diff,
      gate.logs
    );

    if (
      critique.approved &&
      critique.blocking_issues.length === 0 &&
      critique.physics_or_claim_violations.length === 0
    ) {
      finalProposal = proposal;
      finalCritique = critique;
      console.log("  [grok:approved] Changes verified by Grok!");
      break;
    }

    console.warn("  [grok:changes_requested]", {
      blocking: critique.blocking_issues,
      violations: critique.physics_or_claim_violations,
    });
    feedbackHistory = [
      "Grok Red-Team Verifier Critique:",
      `Review Summary: ${critique.review_summary}`,
      `Blocking Issues: ${critique.blocking_issues.join(" | ") || "None"}`,
      `Physics/Claim Violations: ${critique.physics_or_claim_violations.join(" | ") || "None"}`,
      `Reviewed Diff:\n${gate.diff}`,
    ].join("\n");
  }

  if (!finalProposal || !finalCritique) {
    revertWrittenFiles(lastWritten);
    throw new Error(
      `Flywheel exhausted ${MAX_REPAIR_TURNS + 1} attempts without passing both deterministic gates and Grok review.`
    );
  }

  execFileSync("git", ["add", "--", ...lastWritten], { cwd: REPO_ROOT });
  const issueRef = process.env.ISSUE_NUMBER
    ? ` (#${process.env.ISSUE_NUMBER})`
    : "";
  const commitTitle = finalProposal.pr_title.includes("#")
    ? finalProposal.pr_title
    : `${finalProposal.pr_title}${issueRef}`;

  execFileSync("git", ["commit", "-m", commitTitle], {
    cwd: REPO_ROOT,
    stdio: "inherit",
  });

  if (DRY_RUN) {
    console.log(
      `\n[DRY_RUN=true] Verified commit created locally on branch '${branchName}'. Skipping git push and gh pr create.`
    );
    return;
  }

  execFileSync("git", ["push", "-u", "origin", branchName], {
    cwd: REPO_ROOT,
    stdio: "inherit",
  });

  const prBodyPath = path.join(REPO_ROOT, ".flywheel-pr-body.tmp.md");
  const relatesLine = process.env.ISSUE_NUMBER
    ? `\nRelates to #${process.env.ISSUE_NUMBER}\n`
    : "";

  const prBody = [
    "## Nephelis Flywheel Sync (Gemini Builder + Grok Verifier)",
    relatesLine,
    "Grok is lead. Gemini is the builder teammate. This PR is opened for human merge; the flywheel does not push `main`.",
    "",
    "### Builder Summary (`" + GEMINI_MODEL + "`)",
    finalProposal.summary,
    "",
    "### Red-Team Verification Audit (`" + GROK_MODEL + "`)",
    finalCritique.review_summary,
    "",
    "### Deterministic Gates Passed",
    "- Protected-path guard (workflows, AGENTS.md, GEMINI.md, team protocol, lockfiles, preview/archive/user-src, flywheel sandbox)",
    "- Claims & live-Stripe drift linter (`0` violations)",
    SKIP_FULL_CI
      ? "- `pnpm --dir site validate:content` & `tsc --noEmit`"
      : "- `pnpm --dir site validate:content` & `pnpm --dir site ci` (`check:mass`, `check:power`, `typecheck`, `lint`, `build`)",
  ].join("\n");

  fs.writeFileSync(prBodyPath, prBody, "utf8");
  try {
    execFileSync(
      "gh",
      [
        "pr",
        "create",
        "--base",
        BASE_BRANCH,
        "--head",
        branchName,
        "--title",
        commitTitle,
        "--body-file",
        prBodyPath,
      ],
      { stdio: "inherit" }
    );
  } finally {
    if (fs.existsSync(prBodyPath)) fs.unlinkSync(prBodyPath);
  }
}

main().catch((err: unknown) => {
  console.error("\n[flywheel-sync fatal]:", err);
  process.exit(1);
});
