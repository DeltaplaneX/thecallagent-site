---
type: memory-register
register: learnings
project: thecallagent-site
schema: "ID | Date | Pattern | Contexte | Application future"
---

# Learnings — thecallagent-site

| ID | Date | Pattern observé |
|----|------|-----------------|
| LRN-001 | 2026-06-28 | `dist/` gitignoré + rapport hors-projet + piège `res.ok` |

## Entrées

### LRN-001 — Pièges migration backend du formulaire
- **Date** : 2026-06-28
- **Pattern** :
  1. **`dist/` est gitignoré** : `grep`/ripgrep (respecte `.gitignore`) ne le voit pas et il n'apparaît pas dans `git status`. Pas de build step → la copie `dist/js/main.js` doit être **synchronisée à la main** (`cp js/main.js dist/js/main.js`) à chaque modif de `js/main.js`.
  2. Le **rapport de handoff** vivait dans un AUTRE projet : `ClaudeProjects/n8n-workflows/tasks/thecallagent-site-changes-report.md` (pas dans ce repo). Le backend aussi : `n8n-workflows/projects/thecallagent-backend/`.
  3. Un front qui ne teste que `res.ok` (HTTP status) **ignore** le `success` métier du body → faux positif si l'API renvoie `200 {success:false}`. Toujours croiser statut + body.
- **Contexte** : migration du webhook formulaire n8n cloud → endpoint FastAPI Railway `/lead` (BDR-001).
- **Application future** : pour tout JS navigateur sans build, tester la logique pure via `node --test` en l'extrayant en fonction pure + export CommonJS gardé (`if (typeof module !== 'undefined')`) et bootstrap DOM gardé (`if (typeof document !== 'undefined')`).
