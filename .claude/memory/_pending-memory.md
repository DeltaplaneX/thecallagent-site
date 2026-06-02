# Candidats mémoire — session 2026-06-02 11:25

> Extraits automatiquement par session-end-rich.js. À valider manuellement et promouvoir vers decisions.md / blockers.md / learnings.md via /memory.

## Blockers (BLK)
1. configuration MCP réelle (le point qui bloque l'utilisateur : "Stitch ne s'est pas lancé"), notamment le menu Export → MCP, la sélection IDE/API key, et le contenu du `mcp.json`.
2. oog-Api-Key`**. C'est cohérent avec ton blocker de la session précédente (« Stitch MCP présent mais bloqué par auth »). Deux causes probables : 1. **Pas de clé API valide** dans l

---

# Candidats mémoire — session 2026-06-02 11:36

> Extraits automatiquement par session-end-rich.js. À valider manuellement et promouvoir vers decisions.md / blockers.md / learnings.md via /memory.

## Blockers (BLK)
1. configuration MCP réelle (le point qui bloque l'utilisateur : "Stitch ne s'est pas lancé"), notamment le menu Export → MCP, la sélection IDE/API key, et le contenu du `mcp.json`.
2. oog-Api-Key`**. C'est cohérent avec ton blocker de la session précédente (« Stitch MCP présent mais bloqué par auth »). Deux causes probables : 1. **Pas de clé API valide** dans l
3. as donnée. - Tu veux que je consigne ce blocage résolu dans `.claude/memory/blockers.md` (BLK Stitch MCP = méthode HTTP, pas proxy OAuth) pour ne plus reperdre le contexte ?

## Learnings (LRN)
1. t** avec le header `X-Goog-Api-Key`. Le piège : le « API keys not supported, expected OAuth2 » des [forums](https://discuss.ai.google.dev/t/stitch-mcp-not-working-with-api-key/1209
