/**
 * Lightweight Grok query helper for teammate sessions (Gemini / humans).
 * Calling this does not invert lead — Grok Build remains Persistent Mission Agent.
 *
 * Usage (from repo root):
 *   npx tsx automation/scripts/ask-grok.ts "red-team the Gate 0 RFQ claims"
 *   npx tsx automation/scripts/ask-grok.ts --no-agents "quick physics check: night at 55 km"
 *
 * Needs XAI_API_KEY. Default model grok-4.7 (override with GROK_MODEL).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "../..");
const XAI_BASE_URL = process.env.XAI_BASE_URL ?? "https://api.x.ai/v1";
const GROK_MODEL = process.env.GROK_MODEL ?? "grok-4.7";
const MAX_AGENTS_CHARS = 12_000;

function help(): void {
  console.log(`ask-grok — query Grok via the xAI API

  npx tsx automation/scripts/ask-grok.ts "question"
  npx tsx automation/scripts/ask-grok.ts --no-agents "question"

Env: XAI_API_KEY (required), GROK_MODEL (default grok-4.7), XAI_BASE_URL
Grok remains lead. This helper is layer 3 of the stacked collaboration model.
`);
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args[0] === "-h" || args[0] === "--help") {
    help();
    process.exit(args.length ? 0 : 1);
  }

  const noAgents = args.includes("--no-agents");
  const question = args.filter((a) => a !== "--no-agents").join(" ").trim();
  if (!question) {
    help();
    process.exit(1);
  }

  const apiKey = process.env.XAI_API_KEY?.trim();
  if (!apiKey) {
    console.error(
      "XAI_API_KEY is unset. Export it locally or add it as a GitHub Actions secret."
    );
    console.error(
      "This helper is optional. Async handoff (GEMINI.md + aether-os/team/runs/*/handoff.md) works without it."
    );
    process.exit(1);
  }

  let agents = "";
  const agentsPath = join(root, "AGENTS.md");
  if (!noAgents && existsSync(agentsPath)) {
    agents = readFileSync(agentsPath, "utf8").slice(0, MAX_AGENTS_CHARS);
  }

  const system = [
    "You are Grok, Persistent Mission Agent for Nephelis Industries / Project AETHER.",
    "The caller is a teammate (often Gemini). You remain lead.",
    "$500k is all-in. Ambitious window is 2029 class. Public copy is affirmative. Pre-hardware is the phase word.",
    "No invented partners, NASA affiliation, or 2027 launch. CubeSat is a separate orbiter.",
    agents ? `\nAGENTS.md:\n${agents}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`${XAI_BASE_URL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROK_MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: question },
      ],
    }),
  });

  const raw = await res.text();
  if (!res.ok) {
    console.error(`xAI API ${res.status}: ${raw.slice(0, 2000)}`);
    process.exit(1);
  }

  let content = "";
  try {
    const json = JSON.parse(raw) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    content = json.choices?.[0]?.message?.content ?? "";
  } catch {
    content = raw;
  }

  if (!content.trim()) {
    console.error("Empty response from xAI.");
    process.exit(1);
  }
  process.stdout.write(content.endsWith("\n") ? content : `${content}\n`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
