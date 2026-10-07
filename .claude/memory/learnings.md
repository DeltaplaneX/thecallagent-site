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
| LRN-002 | 2026-10-08 | Bug « en prod » = d'abord comparer la prod au repo ; traduction par agents + vérif structurelle |

## Entrées

### LRN-001 — Pièges migration backend du formulaire
- **Date** : 2026-06-28
- **Pattern** :
  1. **`dist/` est gitignoré** : `grep`/ripgrep (respecte `.gitignore`) ne le voit pas et il n'apparaît pas dans `git status`. Pas de build step → la copie `dist/js/main.js` doit être **synchronisée à la main** (`cp js/main.js dist/js/main.js`) à chaque modif de `js/main.js`.
  2. Le **rapport de handoff** vivait dans un AUTRE projet : `ClaudeProjects/n8n-workflows/tasks/thecallagent-site-changes-report.md` (pas dans ce repo). Le backend aussi : `n8n-workflows/projects/thecallagent-backend/`.
  3. Un front qui ne teste que `res.ok` (HTTP status) **ignore** le `success` métier du body → faux positif si l'API renvoie `200 {success:false}`. Toujours croiser statut + body.
- **Contexte** : migration du webhook formulaire n8n cloud → endpoint FastAPI Railway `/lead` (BDR-001).
- **Application future** : pour tout JS navigateur sans build, tester la logique pure via `node --test` en l'extrayant en fonction pure + export CommonJS gardé (`if (typeof module !== 'undefined')`) et bootstrap DOM gardé (`if (typeof document !== 'undefined')`).

### LRN-002 — Diagnostic prod, traduction par agents, outillage
- **Date** : 2026-10-08
- **Pattern** :
  1. Pour un bug « ne marche pas sur certains devices », comparer **d'abord** la prod au repo (`curl -sI` : `Server`, `Last-Modified`, taille ; `curl -s … | grep` sur le HTML/JS). Ici la prod (Vercel) servait un commit vieux de 3 mois : le `<video>` sans `autoplay/poster` et `main.js` sans le fix iOS — rien à corriger côté fichier vidéo (H.264 all-intra sain).
  2. Traduction d'un site statique : une spec commune (slugs, chemins absolus, glossaire nav/footer, règles head/JSON-LD, « structure DOM identique ») + un agent par page/langue + un script qui compare la séquence de balises, les ids, les liens et le head → 20/20 pages conformes au premier passage. 1 agent sur 15 a calé (watchdog 600 s) : relancer tel quel suffit.
  3. Outil Bash : un heredoc de plus de ~100 lignes est rejeté (`unexpected EOF`) ; écrire les gros scripts avec Write puis les exécuter. `node --test tests/` échoue sous Node 24 (dossier) : passer le fichier.
  4. Le code chargé par `require()` dans les tests doit garder tout accès DOM derrière `typeof document !== 'undefined'` (l'IIFE `thirdPartyOnClick` l'avait cassé).
- **Contexte** : site trilingue + vidéo 0404 (BDR du 2026-10-08).
- **Application future** : avant tout diagnostic « prod », `curl` la prod ; après chaque modif de contenu FR, reporter dans `en/` et `zh/` puis relancer `verify_i18n.py`.
