# Handoff — thecallagent-site refonte (pour Codex)

**Date :** 2026-06-03 · **Branche :** `feat/50-stitch-redesign` · **Dernier commit :** `6b78c18`
**Lancer le site :** `python -m http.server 8087` puis http://localhost:8087/

---

## 1. Contexte : DEUX versions en parallèle

Le site existe en **2 directions visuelles complètes**, à comparer ; l'utilisateur en choisira **une** à la fin, et l'autre devra être **cachée** (déplacée hors-ligne, pas supprimée).

| | **DARK « Tech Noir »** (sombre) | **BRUTALISTE** (clair ivoire/jaune) |
|---|---|---|
| Accueil | `index.html` | `index-brutalist.html` |
| Solutions | `nos-solutions.html` | `nos-solutions-brutalist.html` |
| À propos | `a-propos.html` | `a-propos-brutalist.html` |
| Contact | `contact.html` | `contact-brutalist.html` |
| 404 + légales | `404.html`, `avis-juridique.html`, `politique-de-confidentialite.html` | idem `*-brutalist.html` |
| CSS | `css/style.css` + `css/variant-a.css` + `css/variant-b.css` | `css/brutalist.css` |
| JS (partagé) | `js/main.js` | `js/main.js` |

`index-variant-a.html` / `index-variant-b.html` = scratch de comparaison (ignorables).
`stitch-export/` = export Stitch (référence design, ne pas déployer).

## 2. INVARIANTS à NE JAMAIS casser (intégrations en prod)
- **Widget Retell** : `<script id="retell-widget" ...>` dans le `<head>` des **14 pages**.
- **Formulaire n8n** : `contact.html` / `contact-brutalist.html` → `<form id="contact-form">` ; webhook en dur dans `js/main.js` (`setupContactForm`). Ne pas changer les `name`/`id` des champs.
- **Agenda Google** : iframe `id="booking-iframe"` src `https://calendar.app.google/x4PCjCjYi2vaFYLb7` + `#open-calendar-btn` + `#calendar-loader` (contact, 2 versions).
- **Vidéo 0404** : `<video id="scroll-video-el" src="videos/0404.mp4">` dans `<section id="scroll-video">` (accueils) — scroll-driven par `js/main.js`.
- **Modales fiches** (nos-solutions, 2 versions) : `[data-modal]` + `.fiches-store` + `[data-modal-panel]`, pilotés par `setupSolutionModals` dans `js/main.js`. Ne pas renommer ces hooks.
- **Logo** : `images/logo-trim.png` (recadré). Sur dark, inversé blanc via CSS.

## 3. Règles de contenu
- **Aucun nom d'outil tiers visible** (Retell, n8n, Twilio, Composio, Supabase, Gemini…) SAUF politique de confidentialité (déclaration légale).
- **Aucun chiffre inventé** : tous sourcés (411 Locals, MIT/HBR…). Ne pas ré-introduire de stats non sourcées.
- Site **en français**, ton concis, vouvoiement.

---

## 4. CE QUI EST FAIT (commits sur la branche)

- **Stitch MCP réparé** : méthode HTTP `X-Goog-Api-Key` (pas le proxy OAuth). Export dans `stitch-export/`.
- **Version DARK** : reskin + hero « console d'appel » + sections preuves + section **« Analyse d'appel »** (cockpit app-v3 : résumé, score 1-10, 2 actions max, validation humaine, brouillon email).
- **Version BRUTALISTE complète** : 7 pages, hero « ticket d'appel », multicanal, verticales, **modales de détail au clic** (parité dark, fiches KPI + scénario stylées), analyse d'appel, contact (form+agenda), légales fidèles.
- **Logo** : recadré (`logo-trim.png`) + unifié nav **et** footer sur toutes les pages.
- **Contraste WCAG AA (dark)** : `--text-muted #9AA8C8` (AAA), `--text-dim #7E8FB2` (AA), bloc `TOKENS v5` dans `css/style.css`.
- **Chiffres réels sourcés** : hero (62% appels PME non décrochés — 411 Locals ; 21× lead<5min — MIT/HBR ; 24/7) + fiches (remplacé « 0 € coût marginal », `[à confirmer]`, +50%/×4/+40%).
- **Perf** : `preconnect` Google Fonts + vidéo `preload="metadata"`.
- **Lighthouse v5** : `lh-{index,nos-solutions,contact,a-propos,index-brutalist}-v5.json` — **SEO 100** partout, **a11y 91-92**, BP 100 (sauf contact 77 = iframe Google), **perf 60-80**.
- **Cartes brutalistes cliquables** : CTA + modales (testé via browser-harness CDP).
- **Checklist IONOS** : `docs/IONOS-DEPLOY-CHECKLIST.md` (lecture seule, rien exécuté).
- **3 images générées** (fal.ai nano-banana-pro, ~0,45 $) : `images/usecases/{restaurant,menuiserie,villa}.webp` (bistro, atelier bois, villa vue mer). **Téléchargées mais PAS encore intégrées.**

---

## 5. CE QUI RESTE À FAIRE (priorité)

### 5.1 ⏳ INTÉGRER les 3 images (T7) — était en cours, NON fini
Les `.webp` sont dans `images/usecases/` mais pas dans le HTML. À câbler dans les **cartes verticales** des 2 accueils :

**Brutaliste — `index-brutalist.html`** (cartes `.cell`) :
- ~ligne 148 `<article class="cell">` + `<span class="kicker">Restaurant</span>` → `restaurant.webp`
- ~ligne 159 `Artisan · menuiserie` → `menuiserie.webp`
- ~ligne 170 `Villa · conciergerie` → `villa.webp`
Insérer `<img class="cell-img" src="images/usecases/X.webp" alt="..." loading="lazy">` juste après `<article class="cell">`. Ajouter dans `css/brutalist.css` :
```css
.cell-img { width:calc(100% + 52px); margin:-30px -26px 18px; aspect-ratio:16/9; object-fit:cover; border-bottom:var(--bw) solid var(--ink); display:block; }
```
(ajuster aux marges réelles du padding `.cell` = 30px 26px).

**Dark — `index.html`** (cartes `.proof-card`) :
- ~ligne 186 `Restaurant` → `restaurant.webp`
- ~ligne 197 `Artisan · menuiserie` → `menuiserie.webp`
- ~ligne 208 `Villa · conciergerie` → `villa.webp`
Insérer `<img>` en tête de carte ; CSS dans `css/variant-a.css` (full-bleed haut, radius cohérent dark, léger overlay si besoin).
→ QA visuelle (2 versions) + commit.

### 5.2 T9 — Checklist IONOS : valeurs DNS manquantes
`docs/IONOS-DEPLOY-CHECKLIST.md` existe mais les DNS sont en `[à lire dans le panneau IONOS]` (clé API IONOS invalide « Invalid API key format »). → Clé API valide (ou lecture panneau) puis renseigner racine `thecallagent.com` + **`app.thecallagent.com` (NE PAS toucher)**. Ne rien exécuter sans validation.

### 5.3 Perf (optionnel) — perf 60-80
Différer/`async` widget Retell ; lazy-load images ; alléger JS animation. Re-mesurer `npx lighthouse`.

### 5.4 DÉCISION FINALE — choisir 1 version, cacher l'autre
L'utilisateur tranche **dark vs brutaliste**. La version retenue → site canonique ; l'autre → **déplacée dans un sous-dossier non publié** (ex. `/_archive-<version>/`) ou hors sitemap/robots — **ne pas supprimer**.

### 5.5 Working-tree à clarifier
`git status` montre des modifs **non commitées** : `js/main.js`, `nos-solutions-brutalist.html` (+ `graphify-out/*` ; `videos/0404.mp4` apparaît modifié — vérifier, ne PAS committer un binaire corrompu). → `git diff` sur `js/main.js` + `nos-solutions-brutalist.html`, committer si volontaire sinon `git checkout --`.

---

## 6. Notes
- `.mcp.json` **gitignored** (clés Stitch/n8n) — ne jamais committer.
- Playwright MCP instable cette session → QA via **browser-harness** (CDP) : Chrome `--remote-debugging-port=9222 --user-data-dir=<temp>` puis `BU_CDP_URL=http://127.0.0.1:9222 browser-harness`.
- Plan maître (grille de vérif 10 tâches) : `docs/superpowers/plans/2026-06-03-thecallagent-redesign.md`.
- Mémoire : `.claude/memory/journal.md`, `tasks/lessons.md`.
