# thecallagent-site — Claude Context

## Project Overview

Static marketing site for **TheCallAgent** - an AI phone agent product for SMEs (PME). Pure HTML/CSS/JS, no build step. Deployed at `thecallagent.com`.

## Stack

- **Static HTML** pages (index, a-propos, contact, avis-juridique, nos-solutions, politique-de-confidentialite, 404)
- **CSS** in `css/style.css`
- **JS** in `js/main.js` + `cached-bundle.js` at root (bundled assets)
- **Lighthouse audits** stored as `lh-*.json` files in root (perf/SEO baselines per page, with iterations: clean, async, desktop, v2/v3/v4)
- **Design docs** in `docs/DESIGN.md` and `docs/stitch.md`

## Repo Layout

```
thecallagent-site/
├── *.html                # public pages
├── css/style.css         # global stylesheet
├── js/main.js            # interaction code
├── cached-bundle.js      # built/bundled JS
├── images/               # static images
├── docs/                 # DESIGN.md, stitch.md (design notes)
└── lh-*.json             # Lighthouse audit results, iterations
```

## When Working Here

- **No build pipeline** - edits to `.html` / `.css` / `.js` are live. Test in a local server (`python -m http.server`) before pushing.
- **Lighthouse-driven** - performance/SEO/accessibility are tracked via repeated Lighthouse runs. When changing layout or adding scripts, **re-run Lighthouse** and save a new `lh-*.json` to compare against the existing baselines.
- **SEO/Open-Graph metadata** is in every `<head>` - keep titles, descriptions, OG tags consistent when editing.
- **French content** - site is in French; keep that locale.
- **No package.json / no node_modules** - don't introduce a build step without explicit ask.

## MCPs / Plugins / Skills

- **Plugin enabled**: `playwright@claude-plugins-official` - for browser automation, visual regression, and Lighthouse runs against local server.
- **Skills relevant**: none specific. Use the `frontend-design` skill (global) when iterating on visual layout.
- **MCP**: none in `.mcp.json` - Playwright MCP comes from the plugin.


## 🧠 Mémoire — Registres .claude/memory/

Au **début de chaque session**, lire dans l'ordre :
1. `.claude/memory/journal.md` → dernières sessions
2. `.claude/memory/blockers.md` → blocages ouverts
3. `.claude/memory/decisions.md` → décisions actives

**Règles de capitalisation :**
- BDR-XXX → décision structurante (impact > 1 mois)
- LRN-XXX → pattern observé qui change la façon de faire
- BLK-XXX → friction > 30 min (même résolue)
- EVAL-XXX → output à évaluer (garder / corriger / déprécier)

**Ritual de fermeture (obligatoire) :**
1. Décidé ? → `decisions.md`
2. Appris ? → `learnings.md`
3. Bloqué ? → `blockers.md`
4. Toujours : ajouter date du jour dans `journal.md` (3-5 lignes)

**Graphify :** si `graphify-out/GRAPH_REPORT.md` existe, le lire pour naviguer le code sans relire les fichiers.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)


---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes -- don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests -- then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management
1. **Plan First**: Write plan to tasks/todo.md with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to tasks/todo.md
6. **Capture Lessons**: Update tasks/lessons.md after corrections

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Only touch what's necessary. No side effects with new bugs.


---

## Second Cerveau - Obsidian Sync

Vault : `C:\Users\Utilisateur\OneDrive\Documents\Obsidian\SecondCerveau`

### Fin de session (OBLIGATOIRE)
1. Mets a jour `Projects\thecallagent-site.md` avec ce qui a ete fait + prochaines etapes
2. Cree/mets a jour le Daily Log : `Daily Logs\YYYY-MM-DD.md`
3. Si avancee majeure : mets a jour `memory.md`
