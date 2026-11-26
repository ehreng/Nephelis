#!/usr/bin/env bash
# verify-turn.sh — deterministic gate for a Grok / Gemini Carbon flywheel turn.
#
# Usage: automation/scripts/verify-turn.sh [BASE [HEAD]]
#   BASE  comparison base (default: main)
#   HEAD  comparison head (default: HEAD); pass flywheel/builder (or any ref) when needed
#
# Gates:
#   1. Protected-path guard
#   2. Claims & guardrail linter (added lines only; this script is excluded)
#   3. Site CI via `cd site && pnpm run ci`
#      (validate:content, check:mass, check:power, typecheck, lint, build)
#
# Exits 0 if every deterministic gate passes; non-zero otherwise.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

BASE="${1:-main}"
HEAD="${2:-HEAD}"
SCRIPT_PATH="automation/scripts/verify-turn.sh"

PROTECTED_RE='^\.github/|^AGENTS\.md$|pnpm-lock\.yaml$|package-lock\.json$|yarn\.lock$|(^|/)\.env(\.|$)'
CLAIM_RE='2027 launch|launch in 2027|LOI signed|signed LOI|NASA partner|NASA affiliation|samples received|sk_live_|pk_live_'

blocking_issues=()
physics_or_claim_violations=()

die_ref() {
  echo "ERROR: unknown git ref: $1" >&2
  exit 2
}

git rev-parse --verify "$BASE" >/dev/null 2>&1 || die_ref "$BASE"
git rev-parse --verify "$HEAD" >/dev/null 2>&1 || die_ref "$HEAD"

BASE_SHA="$(git rev-parse "$BASE")"
HEAD_SHA="$(git rev-parse "$HEAD")"

echo "======== VERIFY TURN ========"
echo "Repo: $ROOT"
echo "Base: $BASE ($BASE_SHA)"
echo "Head: $HEAD ($HEAD_SHA)"
echo

echo "--- Diff stat ($BASE..$HEAD) ---"
git diff --stat "$BASE..$HEAD"
echo

echo "--- Protected paths ---"
protected_hits=()
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  if printf '%s\n' "$file" | grep -Eq "$PROTECTED_RE"; then
    protected_hits+=("$file")
  fi
done < <(git diff --name-only "$BASE..$HEAD")

if ((${#protected_hits[@]})); then
  echo "FAIL: protected path(s) changed:"
  for f in "${protected_hits[@]}"; do
    echo "  $f"
    blocking_issues+=("protected path changed: $f")
  done
else
  echo "PASS: no protected paths changed"
fi
echo

echo "--- Claim guardrails ---"
claim_hits=()
current_file=""
while IFS= read -r line; do
  if [[ "$line" == "diff --git "* ]]; then
    current_file=""
    continue
  fi
  if [[ "$line" == +++* ]]; then
    current_file="${line#+++ b/}"
    if [[ "$current_file" == "/dev/null" ]]; then
      current_file=""
    fi
    continue
  fi
  # Added lines only (skip file headers)
  if [[ "$line" == +* && "$line" != +++* ]]; then
    content="${line:1}"
    if printf '%s\n' "$content" | grep -Eiq -- "$CLAIM_RE"; then
      loc="${current_file:-unknown}"
      claim_hits+=("$loc: $content")
    fi
  fi
done < <(git diff "$BASE..$HEAD" -- . ":!${SCRIPT_PATH}")

if ((${#claim_hits[@]})); then
  echo "FAIL: banned claim / secret drift in added lines:"
  for hit in "${claim_hits[@]}"; do
    echo "  $hit"
    physics_or_claim_violations+=("$hit")
  done
else
  echo "PASS: no banned claim language or live Stripe keys in added lines"
fi
echo

echo "--- Site CI (cd site && pnpm run ci) ---"
# `pnpm ci` is a reserved pnpm command and is not implemented in pnpm 9.
# Run the package.json "ci" script from site/ so Corepack honors
# site/package.json "packageManager": "pnpm@9.0.0".
# (`pnpm --dir site` from the repo root can pick a different pnpm.)
ci_log="$(mktemp)"
set +e
( cd "$ROOT/site" && pnpm run ci ) >"$ci_log" 2>&1
ci_status=$?
set -e
if [[ $ci_status -eq 0 ]]; then
  echo "PASS: site CI gate succeeded"
  tail -n 8 "$ci_log" | sed 's/^/  /'
else
  echo "FAIL: site CI gate exited $ci_status"
  tail -n 60 "$ci_log" | sed 's/^/  /'
  blocking_issues+=("site CI gate failed (exit $ci_status)")
  physics_or_claim_violations+=("cd site && pnpm run ci exited $ci_status")
fi
rm -f "$ci_log"
echo

if ((${#blocking_issues[@]})) || ((${#physics_or_claim_violations[@]})); then
  approved=false
  review_summary="Deterministic gates failed. See blocking_issues and physics_or_claim_violations."
else
  approved=true
  review_summary="All deterministic gates passed (protected paths, claim guardrails, site CI)."
fi

echo "======= VERDICT ======="
if [[ "$approved" == "true" ]]; then
  echo "Result: APPROVED"
else
  echo "Result: REJECTED"
fi
echo "Summary: $review_summary"
echo

verdict_dir="$(mktemp -d)"
if ((${#blocking_issues[@]})); then
  printf '%s\n' "${blocking_issues[@]}" >"$verdict_dir/blocking.txt"
else
  : >"$verdict_dir/blocking.txt"
fi
if ((${#physics_or_claim_violations[@]})); then
  printf '%s\n' "${physics_or_claim_violations[@]}" >"$verdict_dir/violations.txt"
else
  : >"$verdict_dir/violations.txt"
fi

python3 - "$approved" "$review_summary" "$verdict_dir" <<'PY'
import json, sys
from pathlib import Path

approved = sys.argv[1] == "true"
review_summary = sys.argv[2]
base = Path(sys.argv[3])

def lines(path: Path):
    text = path.read_text()
    if not text.strip():
        return []
    return [ln for ln in text.splitlines() if ln != ""]

print(json.dumps({
    "approved": approved,
    "blocking_issues": lines(base / "blocking.txt"),
    "physics_or_claim_violations": lines(base / "violations.txt"),
    "review_summary": review_summary,
}, indent=2, ensure_ascii=False))
PY
rm -rf "$verdict_dir"

if [[ "$approved" == "true" ]]; then
  exit 0
fi
exit 1
