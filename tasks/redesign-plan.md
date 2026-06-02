# Plan d'execution - refonte visuelle TheCallAgent

> Plan repris depuis la conversation Claude perdue et adapte pour Codex.
> Objectif: rendre le site plus beau, plus clair et plus concret, sans casser le site statique existant.

## Principes

- Conserver la video `videos/0404.mp4`.
- Conserver la structure statique HTML/CSS/JS: pas de framework, pas de build obligatoire.
- Conserver les balises SEO/Open Graph existantes.
- Garder le site lisible sur mobile et desktop.
- Ne pas exposer les noms d'outils tiers au visiteur.
- Ne pas toucher a IONOS/DNS en ecriture. Produire seulement une checklist de migration.

## Direction visuelle

Style cible: "operational premium AI", pas landing page generique.

- Fond sombre conserve, mais moins monotone: zones noires profondes, surfaces graphite, accents bleu electrique et vert signal.
- Plus de preuves produit: dashboards stylises, bulles conversationnelles, timelines d'appel.
- Moins d'abstraction pure: les orbes et anneaux doivent soutenir le propos, pas remplacer les captures/maquettes.
- Typographie: garder l'identite existante si elle est deja chargee, mais renforcer hierarchie, espacements, longueurs de ligne.
- Composants: cartes denses, modules de flux, badges metier, panneaux "journee type".

## Phases

### Phase 1 - Stabiliser le brief

- Verifier `tasks/redesign-brief.md`.
- Persister les notes de recherche dans `tasks/research-notes.md`.
- Garder une trace de toutes les decisions dans `tasks/redesign-plan.md`.

### Phase 2 - Audit du site actuel

- Lire `index.html`, `nos-solutions.html`, `a-propos.html`, `contact.html`, `css/style.css`, `js/main.js`.
- Identifier les sections a conserver, renforcer ou remplacer.
- Relever les risques: inline styles, contraste, mobile, cartes trop abstraites, texte trop long.

### Phase 3 - Refonte contenu + UI

- `index.html`: renforcer hero, preuve multicanal, cas restaurant, cas conciergerie WhatsApp, video 0404, CTA.
- `nos-solutions.html`: ajouter les capacites reelles issues des deux projets et simplifier les modales si necessaire.
- `a-propos.html`: relier Odilon au positionnement "agents operationnels sur mesure".
- `contact.html`: clarifier la prise de rendez-vous et le niveau de projet attendu.
- `css/style.css`: ajouter les nouveaux composants sans casser les classes existantes.
- `js/main.js`: ne modifier que si une interaction nouvelle l'exige.

### Phase 4 - Medias

- Priorite 1: utiliser les assets existants.
- Priorite 2: generer 1 a 3 images maximum via fal.ai si cela ameliore vraiment la perception produit.
- Budget strict: `<= 5 EUR`.
- Pas de generation video sauf justification forte; `0404.mp4` reste la video principale.

### Phase 5 - Verification

- Lancer le site localement.
- Verifier desktop et mobile.
- Verifier lisibilite, contraste, absence d'overlap, CTA visibles, video 0404 fonctionnelle.
- Appliquer une revue `web-design-guidelines` sur les fichiers modifies.
- Corriger les problemes bloquants.

### Phase 6 - IONOS

- Utiliser les infos disponibles sur le MCP IONOS en lecture seule si accessible.
- Produire une checklist pour remplacer `thecallagent.com` par cette version.
- Ne pas toucher a `app.thecallagent.com`.
- Mentionner les sauvegardes et le rollback: backup du site actuel, verification DNS, test apres upload.

## Livrables

- Site modifie localement.
- Notes de recherche persistantes.
- Plan d'execution persistant.
- Verification lisibilite/mobile.
- Checklist IONOS sans action destructive.

## Statut outils - 2026-06-02

### Google Stitch

- Le namespace MCP `mcp__stitch` est bien expose dans Codex.
- Appel reel tente: `create_project`.
- Resultat: echec `Auth required`.
- Tentative de login: `codex mcp login stitch`.
- Resultat: echec `Dynamic client registration not supported`.

Conclusion: Stitch est importe mais pas authentifie/utilisable dans cette session. Le refactoring
peut continuer sans Stitch, mais l'etape Stitch doit etre reprise des que l'auth MCP est corrigee.

Workflow a executer une fois Stitch fonctionnel:

1. `mcp__stitch.create_project` avec le titre `TheCallAgent refonte visuelle 2026`.
2. Creer ou uploader un `DESIGN.md` reprenant:
   - palette: `#06080F`, `#0B0F1C`, `#2B6FFF`, `#06D6A0`, texte clair;
   - style: premium operational AI, glassmorphism sobre, preuves produit, pas de landing generique;
   - pages: accueil, solutions, a-propos, contact;
   - contraintes: garder `videos/0404.mp4`, site francais, pas de noms d'outils tiers visibles.
3. `generate_screen_from_text` pour la homepage desktop.
4. `generate_screen_from_text` pour la homepage mobile.
5. Integrer manuellement les idees utiles dans `index.html` et `css/style.css`, sans copier le HTML brut.

### Browser harness

- Skill Claude Code identifie: `browser-qa` depuis `everything-claude-code`.
- Backend Chrome/claude-in-chrome non expose dans cette session.
- Fallback fonctionnel utilise: Playwright CLI via `npx playwright screenshot`.
- Captures generees:
  - `C:\tmp\thecallagent-index-mobile-v4.png`
  - `C:\tmp\thecallagent-index-desktop-v4.png`
  - `C:\tmp\thecallagent-proof-anchor-desktop-v2.png`
  - `C:\tmp\thecallagent-proof-anchor-mobile-v2.png`

Conclusion: oui, verification faite avec le browser harness disponible ici, en mode fallback Playwright.
