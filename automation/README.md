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

Start a loop by asking Grok: "Run the Nephelis research update and propose changes to the site."
