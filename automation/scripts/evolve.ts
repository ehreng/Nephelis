/**
 * Nephelis Evolution Runner
 *
 * Usage (after pnpm install in site/):
 *   cd site
 *   npx tsx ../automation/scripts/evolve.ts research
 *
 * This script outlines steps for AI-driven (Grok + subagents) development.
 * In this environment, you can invoke me with prompts to execute parts of the loop.
 *
 * Example full loop from Grok chat:
 * 1. "Research latest Venus cloud missions using tools"
 * 2. "Update timeline.json and create new MDX update based on research"
 * 3. "Generate visual briefs and update visuals page if needed"
 * 4. "Review changes and prepare summary/PR description"
 */

const mode = process.argv[2] || 'help';

console.log(`[Nephelis Evolve] Running in mode: ${mode}\n`);

if (mode === 'research') {
  console.log(`Steps for RESEARCH + CONTENT loop:
1. Call web_search + x_keyword_search / x_semantic_search for "Venus cloud layer" "super pressure balloon" "Venus life finder" etc.
2. Synthesize key facts.
3. Propose edits to:
   - research/science/ (new .md files)
   - content/data/timeline.json
   - content/data/specs.json
   - content/updates/ (new .mdx)
4. Use search_replace or implement to apply.
5. Verify with site build.

Example invocation: Ask Grok to run the research and output patches.`);
}

if (mode === 'visuals') {
  console.log(`Steps for VISUALS loop:
1. Read automation/prompts/visual-brief.md
2. Use imagine skill (or call image_gen) with branding constraints (venus orange, dark space, technical).
3. Edit with image_edit for consistency.
4. Save to assets/visuals/ and public/assets/visuals/
5. Update visuals/page.tsx list if needed.`);
}

if (mode === 'full') {
  console.log(`FULL EVOLUTION:
Combine research + visuals + code changes using:
- plan mode for architecture
- subagents for parallel research/design/code
- implement + review
- execute-plan for multi-step features

All changes versioned in git. Deploy via Vercel.`);
}

if (mode === 'help' || !mode) {
  console.log(`Available modes:
  research   - Trigger research + content update loop
  visuals    - Trigger visual generation briefs
  full       - Full evolution cycle

Run with: npx tsx ../automation/scripts/evolve.ts <mode>

This environment (Grok + tools + subagents + plan/implement/review skills) is the primary automation engine.`);
}
