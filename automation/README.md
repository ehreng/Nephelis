# Nephelis Automation & AI Loops

This folder contains the tools and prompts to keep the Nephelis venture and website constantly evolving with AI assistance.

## How to Use (with Grok or similar)

1. **Research Loop**
   - Use web_search and x_keyword_search for latest on Venus missions, science, competitors.
   - Update `research/science/`, `competitors/`
   - Edit `site/content/data/timeline.json` and `specs.json`
   - Add new MDX in `site/content/updates/`

2. **Visuals Loop**
   - Use the visual-brief.md prompt with image generation tools.
   - Save to `assets/visuals/` and sync to `site/public/assets/visuals/`

3. **Run the evolve script**
   ```bash
   cd site
   npx tsx ../automation/scripts/evolve.ts research
   ```

4. **Full Development**
   - Use plan mode for new features
   - Implement with AI assistance
   - Review changes
   - Commit and push to GitHub → auto deploy on Vercel

## Prompts

- research-update.md : For keeping research and site data current.
- visual-brief.md : For generating consistent mission visuals.

## Benefits
- Site content stays fresh without manual updates.
- Research feeds directly into website and decks.
- Visuals and assets organized automatically.
- Agent + human teams can generate next-step plans, todo lists, and implement features.

## Generating Next Steps / Project Plans

Ask an agent (Grok or similar):

"Analyze the current site, repo structure, and open items. Produce a prioritized TODO list + 30-day plan. Output as markdown and propose updates to timeline.json or a new doc."

Or run local helpers when available.

The goal is a self-improving project where AI handles research, content generation, basic implementation planning, and humans provide direction + final review/merge.

Start a loop: "Build the structure / todo list / next steps to ensure project success for Nephelis and update the site README + a new contribute section if needed."
