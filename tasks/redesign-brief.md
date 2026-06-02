# Brief — Refonte visuelle de thecallagent-site

> Transcription du plan dicté (séance perdue d'hier soir, reconstituée le 2026-06-01).
> Statut : **brief validé à exécuter** — pas encore implémenté.
> Branche : `feat/50-stitch-redesign`

---

## 0. Pourquoi ce fichier existe

La session d'hier soir où ce plan a été défini **n'a pas été enregistrée au bon endroit**
(problème récurrent : les sessions thecallagent-site finissent rangées sous un autre
répertoire de travail dans `~/.claude/projects/`). Ce brief est volontairement commité
dans le repo pour être **durable et versionné**.

---

## 1. Objectif

Rendre **thecallagent-site plus beau visuellement** — une refonte UI/design, sans changer
la nature du site (site vitrine statique HTML/CSS/JS, en français, déployé sur thecallagent.com).

Critère de réussite : **le site doit rester entièrement lisible et clair.**

---

## 2. Outils & MCP à utiliser

| Outil | Usage |
|-------|-------|
| **Google Stitch** (MCP `stitch`) | Générer / itérer les écrans et le design |
| **Magic** (MCP `magic`) | Composants UI / inspiration |
| **fal.ai** (MCP `fal-ai`) | Génération de médias — **nano banana pro** (images) et **Veo 3.1** (vidéos) |
| **IONOS** (MCP `ionos`) | Déploiement / remplacement du site en ligne |

**Skills frontend** : utiliser les **meilleurs skills disponibles dans la config Claude Code**
(ex. `frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`, `stitch-design`).

### Contrainte budget médias
Génération fal.ai (images nano banana pro / vidéos Veo 3.1) **dans la limite du raisonnable :
≤ 5 € de crédits.**

---

## 3. Références à étudier (pour s'inspirer ET inclure des features)

Analyser ces deux projets pour comprendre ce qui est réalisable et l'intégrer au site :

1. `C:\Users\Utilisateur\ClaudeProjects\Booking_restaurant_hotel_app`
2. `C:\Users\Utilisateur\ClaudeProjects\n8n-workflows\whatsapp-agentkit\ma_villa_whatsapp.egg-info`

But : montrer/illustrer sur le site les capacités réelles du produit (ce qu'on sait faire).

---

## 4. Contraintes de contenu

- **GARDER la vidéo `0404`** (`videos/0404.mp4`) — notamment la section scroll-driven video.
- Site en **français**.
- Conserver le SEO / Open-Graph existant dans les `<head>` (titres, descriptions, OG tags).

---

## 5. Déroulé d'exécution (ordre demandé)

1. **Créer un plan** avec `/writing-plans` (superpowers:writing-plans).
2. **Importer les skills nécessaires** — ex. `/web-design-guidelines`.
3. **Exécuter** avec `/subagent-driven-development`.
4. **Vérifier** que le site est **entièrement lisible et clair** (revue visuelle + lisibilité).

---

## 6. Déploiement (via MCP IONOS) — PRÉPARER, NE PAS EXÉCUTER

> ⚠️ **Règle stricte (confirmée 2026-06-01)** : **ne pas modifier la config IONOS directement.**
> Une fois TOUT le refactoring terminé, **vérifier les actions à faire** via la doc + le MCP IONOS
> (lecture seule), puis **les présenter sans les lancer**. Aucune écriture DNS/hébergement
> sans validation explicite de l'utilisateur.

- Objectif : remplacer **thecallagent.com** (site actuel en ligne) par la nouvelle version.
- **`app.thecallagent.com` = sous-domaine** (app technique pour les clients). Il doit rester
  **strictement intact** — ne pas toucher son enregistrement DNS / sa cible.
- Livrable attendu : une **checklist d'actions IONOS** (étapes exactes + risques) à valider.

---

## 7. Décisions & points ouverts

- [x] `app.thecallagent.com` = **sous-domaine** (≠ dossier) → ne pas y toucher.
- [x] IONOS = **préparer la checklist, ne rien exécuter**.
- [x] Mode : **exécution autonome** (utilisateur absent à partir du 2026-06-01 15:03).
- [ ] Périmètre médias fal.ai : à cadrer une fois le design figé (rester ≤ 5 €).
- [ ] Validation des écrans Stitch : à faire valider au retour de l'utilisateur avant
      figer le HTML/CSS final (sauf si évident).

---

## 8. Journal d'exécution autonome

> Mis à jour en continu pour survivre à une perte de session (cf. §0).

- `2026-06-01 15:03` — Brief verrouillé. Démarrage recherche (site actuel + 2 projets réf).
- `2026-06-01 15:10` — Site cartographié : 7 pages (index, nos-solutions [riche, modales A-D],
  a-propos, contact [booking Google Calendar iframe + form n8n], + légales + 404). Design
  "Tech Noir" sombre (#06080F / #2B6FFF / #06D6A0, Syne + DM Sans, glassmorphism).
  **Assets existants** : logo.png, odilon.webp, og-home.jpg, video 0404.mp4 — **quasi aucune
  image produit** → fort potentiel pour la génération fal.ai. Règles repo strictes :
  zéro nom d'outil tiers visible, aucun chiffre inventé ([à confirmer]), vanilla only.
- `2026-06-01 15:10` — 2 sous-agents lancés (analyse Booking_restaurant_hotel_app +
  ma_villa_whatsapp) → en cours. Direction visuelle en parallèle.
