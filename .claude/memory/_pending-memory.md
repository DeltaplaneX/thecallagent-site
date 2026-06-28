# Candidats mémoire — session 2026-06-03 19:04

> Extraits automatiquement par session-end-rich.js. À valider manuellement et promouvoir vers decisions.md / blockers.md / learnings.md via /memory.

## Décisions (BDR)
1. ment » à l'aveugle (ton garde-fou). Une décision s'impose sur l'ampleur :
2. erveur encore lancé). --- Reste **une décision** : le widget Retell **manque sur `nos-solutions` et `a-propos`** (présent sur les 5 autres pages) — c'était déjà le cas avant ma r
3. . Secrets `.mcp.json` exclus. ## 🟡 Ta décision au réveil 1. **Quelle version on garde** — dark ou brutaliste ? (ou un mix). Le `/critique` penche : la brutaliste est distinctive
4. s/2026-06-03-card-detail-modals.md). **Décision du plan** : sur `nos-solutions-brutalist` (la page que tu as screenshotée, contenu riche) → les 17 cartes ouvrent un **détail au cl
5. Lighthouse) ? Et toujours ouverte : la décision **dark vs brutaliste** (qui change quelles pages je finalise).

## Blockers (BLK)
1. configuration MCP réelle (le point qui bloque l'utilisateur : "Stitch ne s'est pas lancé"), notamment le menu Export → MCP, la sélection IDE/API key, et le contenu du `mcp.json`.
2. oog-Api-Key`**. C'est cohérent avec ton blocker de la session précédente (« Stitch MCP présent mais bloqué par auth »). Deux causes probables : 1. **Pas de clé API valide** dans l
3. as donnée. - Tu veux que je consigne ce blocage résolu dans `.claude/memory/blockers.md` (BLK Stitch MCP = méthode HTTP, pas proxy OAuth) pour ne plus reperdre le contexte ?
4. nt avec les 4 échecs précédents). Je ne bloque pas dessus — j'ai **tout pour construire la direction D à la main** : le spec brutaliste, le contenu app-v3, les 3 verticales, et les
5. 'abord si c'est un bug CSS (overlay qui bloque les clics) ou juste des CTA manquants sur les cartes. Test via le navigateur.

## Learnings (LRN)
1. t** avec le header `X-Goog-Api-Key`. Le piège : le « API keys not supported, expected OAuth2 » des [forums](https://discuss.ai.google.dev/t/stitch-mcp-not-working-with-api-key/1209
2. Note importante : le widget **Retell manque sur `nos-solutions.html` et `a-propos.html`** (présent sur les 5 autres) — incohérence pré-exist
3. es et je ne l'ai jamais relevé. Faute d'attention basique. → à corriger partout. 2. **« Stitch valide »** : raisonnement circulaire (je l'ai prompté brutaliste → il rend brutaliste
4. dessus soit tu enleve la serbrillance. attention je parle pas du bouton Voir une démo →. fait d abord un plan /writing-plans puis enchaine avec /subagent-driven-development /ui-ux
---

# Candidats mémoire — session 2026-06-28 14:27

> Extraits automatiquement par session-end-rich.js. À valider manuellement et promouvoir vers decisions.md / blockers.md / learnings.md via /memory.

## Décisions (BDR)
1. ni npm, je vais extraire la logique de décision en **fonction pure testable** `leadSucceeded(res, data)` et la tester avec `node --test` (zéro dépendance). Regardons d'abord la st
2. front 6/6, backend 14/14. Capturons la décision dans la mémoire projet (rituel de clôture). Lisons le format actuel des registres.
3. Registres lus. J'ajoute une décision (BDR-001), un learning (LRN-001) et l'entrée de journal du jour.

## Blockers (BLK)
1. undamentals, not just symptoms - "We're stuck?" (frustrated) - Your approach isn't working **When you see these:** STOP. Return to Phase 1. ## Common Rationalizations | Excuse |
2. ? You skipped TDD. Start over. ## When Stuck | Problem | Solution | |---------|----------| | Don't know how to test | Write wished-for API. Write assertion first. Ask your human
3. » sur un lead rejeté. **MAIS** le front bloque déjà consent=false côté client → ce cas n'atteint jamais le backend via le vrai formulaire. Et il existe un **test backend qui assert

## Learnings (LRN)
1. us. J'ajoute une décision (BDR-001), un learning (LRN-001) et l'entrée de journal du jour.
2. oquants, je n'y touche pas. J'ajoute le learning + l'entrée de journal.
