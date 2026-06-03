# Refonte visuelle de thecallagent-site — Plan d'implémentation

> **Pour l'agent qui exécute :** SOUS-SKILL REQUIS — `superpowers:subagent-driven-development`
> (ou `superpowers:executing-plans`) pour exécuter tâche par tâche. Les étapes utilisent des
> cases à cocher (`- [ ]`) pour le suivi.
>
> **Pour Odilon (vérification) :** ce plan sert de checklist pour demander à l'autre session
> « est-ce que CECI a été fait ? ». Chaque tâche se termine par **✅ Fait si…** = un critère
> observable (élément du DOM, contraste, capture, score Lighthouse). Coche ce qui est réellement
> constaté dans le code/site, pas ce qui est « annoncé ».

**Goal :** Sublimer visuellement le site vitrine thecallagent.com (statique HTML/CSS/JS, FR),
y ajouter des sections « cas d'usage réels » prouvant ce que l'agent IA sait faire, en gardant
la vidéo `0404`, sans casser le SEO ni la production — puis préparer (sans exécuter) le
remplacement IONOS.

**Architecture :** Site statique vanilla, **aucun build step**. Design system « Tech Noir »
(tokens CSS dans `css/style.css`). On étend les tokens et les composants, on enrichit les pages,
on ajoute des médias générés (fal.ai) et des maquettes de conversation. Le déploiement reste
manuel via IONOS (préparé, non exécuté).

**Tech Stack :** HTML5 + CSS3 (custom properties) + Vanilla JS · polices Syne + DM Sans ·
widget chat Retell (conservé) · MCP Stitch (design) · MCP Magic (composants) · MCP fal.ai
(images nano banana pro / vidéos Veo 3.1, budget ≤ 5 €) · MCP IONOS (déploiement) ·
Playwright + Lighthouse (vérif).

---

## Contraintes transverses (s'appliquent à TOUTES les tâches)

- [ ] **C1** — Aucun build step introduit (pas de npm/bundler/framework). Le site s'ouvre via
  `python -m http.server`.
- [ ] **C2** — **Zéro nom d'outil tiers visible** côté visiteur (pas de Retell, Twilio, Airtable,
  Supabase, Vercel, n8n, Claude, Anthropic…). On vend la capacité, pas la stack.
- [ ] **C3** — **Aucun chiffre inventé.** Tout KPI sans source = objectif (« vise X% ») ou
  marqué `[à confirmer]`.
- [ ] **C4** — **Vidéo `videos/0404.mp4` conservée** (section scroll-video de l'accueil).
- [ ] **C5** — SEO/Open-Graph/Twitter préservés dans chaque `<head>` (titres, descriptions, OG).
- [ ] **C6** — Site **en français**, ton concis, pas d'enthousiasme creux, vouvoiement entreprise.
- [ ] **C7** — Accessibilité : `prefers-reduced-motion` respecté, modales `role="dialog"`,
  focus visible, contraste **WCAG AA** (≥ 4.5:1 texte courant).
- [ ] **C8** — Widget chat Retell conservé sur index + contact (script `retell-widget`).
- [ ] **C9** — Booking Google Calendar (iframe contact) + formulaire n8n conservés et fonctionnels.

---

## Structure des fichiers (créés / modifiés)

| Fichier | Responsabilité | Action |
|---|---|---|
| `css/style.css` | Design system + tous les composants | Modifier (extension tokens + sections) |
| `index.html` | Accueil (hero, stats, scroll-video, features, intégrations, secteurs, cas d'usage, CTA) | Modifier |
| `nos-solutions.html` | Page interactive (modales A–D) + verticales | Modifier |
| `a-propos.html` | Histoire, valeurs, techno | Modifier (polish) |
| `contact.html` | Form + booking | Modifier (polish, ne pas casser iframe/form) |
| `js/main.js` | Interactions (particules, scroll-video, modales, reveal, mockups animés) | Modifier |
| `images/usecases/*` | Visuels générés (fal.ai) | Créer |
| `images/og-*.jpg` | OG images régénérées | Créer/remplacer |
| `lh-*-v5.json` | Rapports Lighthouse après refonte | Créer |
| `docs/screenshots/*` | Captures avant/après desktop + mobile | Créer |
| `docs/IONOS-DEPLOY-CHECKLIST.md` | Marche à suivre déploiement (préparée, non exécutée) | Créer |
| `.stitch/` | Sorties Stitch (prototypes) — **gitignored** | Créer |

---

## Task 1 : Direction visuelle & extension du design system

**Files :**
- Modifier : `css/style.css` (bloc `:root` tokens + nouveaux utilitaires)
- Référence : `docs/DESIGN.md`, `docs/stitch.md`

- [ ] **1.1** Auditer le contraste actuel des couleurs texte (`--text-muted #7080A0`,
  `--text-dim #3A4A65`) sur fonds `#06080F` / `#0B0F1C`. Lister celles < 4.5:1.
- [ ] **1.2** Ajuster les tokens de texte secondaire pour atteindre WCAG AA (ex. remonter
  `--text-muted` vers ~`#8A99BD`+) sans casser l'esthétique Tech Noir.
- [ ] **1.3** Ajouter des tokens manquants si besoin (élévations, ombres douces, rayon `--r-xl`,
  gradients de surface) — documentés en commentaire `/* === TOKENS v5 === */`.
- [ ] **1.4** (Optionnel) Générer un prototype Stitch d'une section hero via MCP `stitch`
  (input = tokens de `docs/stitch.md`) dans `.stitch/designs/`. **Ne pas** coller le HTML brut :
  en extraire seulement les idées.

**✅ Fait si :** `css/style.css` contient un bloc commenté `TOKENS v5` ; le texte courant et les
légendes passent un check de contraste AA (vérifiable via DevTools/axe) ; le design reste sombre
et cohérent.

---

## Task 2 : Polish global (nav, boutons, cartes, sections, mobile)

**Files :**
- Modifier : `css/style.css`
- Test visuel : toutes les pages

- [ ] **2.1** Harmoniser la hiérarchie typographique (tailles H1/H2/H3, interlignes ≥ 1.6 corps)
  pour une lisibilité « entièrement claire » (objectif explicite du brief).
- [ ] **2.2** Raffiner les états hover/focus des `.btn`, `.feature-card`, `.sector-card`
  (transitions, halos) — sans surcharge d'animations.
- [ ] **2.3** Vérifier le responsive 375 px → 1440 px : grilles `features-grid`, `sectors-grid`,
  `integrations-grid`, `contact-grid` passent en 1 colonne proprement.
- [ ] **2.4** Logo nav incohérent entre pages (`index/contact` = `<img logo.png>`,
  `nos-solutions/a-propos` = texte « The Call Agent ») → **unifier** sur une seule variante.

**✅ Fait si :** nav identique sur les 4 pages ; aucun débordement horizontal à 375 px ;
hover/focus homogènes ; titres lisibles sans zoom.

---

## Task 3 : Accueil — hero & preuves (index.html)

**Files :**
- Modifier : `index.html` (sections hero, stats), `css/style.css`, `js/main.js`

- [ ] **3.1** Renforcer le hero : accroche claire, sous-titre orienté bénéfice PME, 2 CTA
  (« Réserver une démo » → contact, « Voir les solutions » → nos-solutions). Conserver l'effet
  visuel (orbe, anneaux d'appel, wave-bars) mais l'alléger si charge visuelle excessive.
- [ ] **3.2** Stats : garder `+50% / ×4 / +40%` **uniquement si sourçables**, sinon reformuler
  en objectifs ou `[à confirmer]` (C3).
- [ ] **3.3** Vérifier que la section `#scroll-video` lit toujours `videos/0404.mp4` (C4) et que
  le scroll-driven fonctionne (logique `js/main.js`).

**✅ Fait si :** `<video src="videos/0404.mp4">` présent et piloté au scroll ; aucun chiffre non
sourcé affirmé sans réserve ; hero lisible et net sur mobile.

---

## Task 4 : NOUVELLE section « Cas d'usage réels / Démonstrations » (index.html)

> Cœur de la demande : montrer ce que l'agent sait faire, à partir des 2 projets réels.
> **Sans nommer la stack** (C2). Source : `tasks/research-notes.md`.

**Files :**
- Modifier : `index.html` (nouvelle section après `features` ou `sectors`), `css/style.css`,
  `js/main.js` (mockups animés)
- Créer : `images/usecases/*` (visuels fal.ai)

- [ ] **4.1 — Cas A · Réservation au téléphone (restaurant).** Bloc « Comment ça marche » en
  3–4 étapes : *le client appelle → l'agent vérifie les dispos en direct → enregistre la
  réservation → envoie le SMS de confirmation*. Inclure une **maquette de conversation d'appel**
  (bulles vocales) reprenant un flux réaliste (date, couverts, nom, créneau alternatif si complet).
- [ ] **4.2 — Cas B · Conciergerie WhatsApp (location saisonnière).** Bloc « multicanal » :
  *le même agent répond aussi sur WhatsApp 24/7, identifie le client par sa réservation, envoie
  codes/livret, escalade les urgences*. Inclure une **maquette de bulles WhatsApp** (messages de
  bienvenue + envoi d'infos pratiques).
- [ ] **4.3 — Message multicanal.** Une phrase-clé : *« Au téléphone ET sur WhatsApp, votre agent
  gère réservations, questions clients et urgences — automatiquement. »*
- [ ] **4.4** Les capacités listées proviennent de capacités **réellement implémentées**
  (vérif dispo, créneaux alternatifs, annulation, envoi menu/SMS, analyse d'appel, identification
  client, welcome pack, escalade) — formulées en arguments courts, sans marque.

**✅ Fait si :** une section « cas d'usage » existe sur l'accueil avec **au moins** la démo
restaurant (appel) ET la démo WhatsApp (location) ; les mockups affichent des conversations
crédibles ; aucun nom d'outil tiers ; CTA « Réserver une démo » présent.

---

## Task 5 : nos-solutions.html — raffinement (garder l'interactif)

**Files :**
- Modifier : `nos-solutions.html`, `css/style.css`, `js/main.js`

- [ ] **5.1** Conserver les 4 zones interactives (A Entrant/Sortant, B Intégrations, C Workflows,
  D Secteurs) et le système de modales/fiches (`data-modal`, `.fiches-store`, contenu indexable
  pour le SEO — C5).
- [ ] **5.2** Remplacer les KPI `[à confirmer]` par des valeurs sourcées **si** Odilon les fournit,
  sinon les laisser tels quels (ne pas inventer — C3).
- [ ] **5.3** Ajouter (optionnel, zone E) une fiche « verticales » reliant aux cas d'usage de la
  Task 4 (restaurant, location/conciergerie) pour cohérence.
- [ ] **5.4** Polish visuel des cartes cliquables et de la modale (cohérent avec Task 2).

**✅ Fait si :** clic sur une carte ouvre toujours une fiche détaillée ; `Esc`/clic extérieur
ferment ; contenu des fiches présent dans le DOM (indexable) ; visuel aligné sur le reste.

---

## Task 6 : a-propos.html & contact.html — polish

**Files :**
- Modifier : `a-propos.html`, `contact.html`, `css/style.css`

- [ ] **6.1** a-propos : harmoniser hero/valeurs/techno avec le nouveau design ; garder la
  founder-card (photo `odilon.webp`).
- [ ] **6.2** contact : ne **pas** casser le formulaire (`id="contact-form"` → webhook n8n) ni
  l'iframe booking (`calendar.app.google/...`). Polir la mise en page du form et de la sidebar.
- [ ] **6.3** Vérifier le widget chat Retell sur contact (C8).

**✅ Fait si :** formulaire et iframe booking présents et fonctionnels ; pages cohérentes
visuellement ; widget chat présent.

---

## Task 7 : Médias générés (fal.ai) — budget ≤ 5 €

**Files :**
- Créer : `images/usecases/*.webp`, `images/og-*.jpg` ; éventuelle courte vidéo (Veo 3.1)
- Modifier : pages concernées (balises `<img>` + `og:image`)

- [ ] **7.1** Lister précisément les visuels nécessaires AVANT de générer (hero, illustration cas
  restaurant, illustration cas location, fond de section, OG) → estimer le coût, rester ≤ 5 €.
- [ ] **7.2** Générer les images via MCP `fal.ai` (nano banana pro), style cohérent Tech Noir
  (sombre, bleu électrique/teal). Optimiser en `.webp`, dimensions raisonnables (perf).
- [ ] **7.3** (Optionnel, si budget le permet) **ne pas** remplacer `0404` ; toute vidéo Veo 3.1
  est un complément, pas un remplacement (C4).
- [ ] **7.4** Mettre à jour les `og:image` si de meilleures images sont produites (chemins absolus
  `https://thecallagent.com/...`).

**✅ Fait si :** des images réelles (pas seulement SVG/canvas) enrichissent l'accueil et les cas
d'usage ; `videos/0404.mp4` toujours présent ; coût fal.ai documenté ≤ 5 € ; images en `.webp`
optimisées.

---

## Task 8 : Lisibilité, accessibilité & perf (vérification)

**Files :**
- Créer : `lh-index-v5.json`, `lh-nos-solutions-v5.json`, `lh-contact-v5.json`,
  `lh-a-propos-v5.json` ; `docs/screenshots/*`

- [ ] **8.1** Lancer le site en local : `python -m http.server 8000`.
- [ ] **8.2** Captures Playwright desktop (1440) + mobile (390) de chaque page →
  `docs/screenshots/<page>-<viewport>.png`.
- [ ] **8.3** Revue « entièrement lisible et clair » (objectif brief) : contraste AA, tailles de
  police, hiérarchie, espacement, pas de texte sur image illisible.
- [ ] **8.4** Lighthouse sur chaque page (perf/SEO/a11y) → sauvegarder `lh-*-v5.json` et comparer
  aux baselines existantes (`lh-*.json`). **Pas de régression** de perf/SEO.
- [ ] **8.5** Vérifier `prefers-reduced-motion` (animations coupées) et la navigation clavier.

**✅ Fait si :** 4 `lh-*-v5.json` présents sans régression ; captures desktop+mobile présentes ;
contraste AA validé ; reduced-motion respecté.

---

## Task 9 : IONOS — checklist de déploiement (PRÉPARER, NE PAS EXÉCUTER)

> ⚠️ Règle stricte du brief : **ne pas modifier la config IONOS.** Lecture seule + livrable écrit.

**Files :**
- Créer : `docs/IONOS-DEPLOY-CHECKLIST.md`

- [ ] **9.1** Via MCP `ionos` (lecture seule) : lister le domaine `thecallagent.com`, sa zone DNS,
  et l'enregistrement du **sous-domaine `app.thecallagent.com`** (cible actuelle).
- [ ] **9.2** Documenter la marche à suivre exacte pour remplacer le site `thecallagent.com`
  (upload des fichiers / pointage), **étape par étape**, avec le point de bascule.
- [ ] **9.3** Documenter explicitement ce qu'il **NE FAUT PAS toucher** : l'enregistrement DNS du
  sous-domaine `app.` (app technique clients) doit rester strictement intact.
- [ ] **9.4** Lister les risques + le rollback (sauvegarde de l'actuel avant bascule).
- [ ] **9.5** **NE RIEN exécuter** : aucune écriture DNS/hébergement. Livrable = le `.md` seul,
  à valider par Odilon.

**✅ Fait si :** `docs/IONOS-DEPLOY-CHECKLIST.md` existe, décrit la bascule pas-à-pas, marque
`app.thecallagent.com` comme intouchable, inclut un rollback — et **aucune** modif IONOS n'a été
réellement appliquée.

---

## Task 10 : Finalisation & persistance

- [ ] **10.1** Mettre à jour `tasks/redesign-brief.md` (§8 journal) avec ce qui a été fait.
- [ ] **10.2** Commit(s) atomiques par tâche sur la branche `feat/50-stitch-redesign`
  (messages `feat(redesign): …`). **Ne pas** committer `.stitch/` ni `.mcp.json` avec clé.
- [ ] **10.3** Mini-changelog dans la PR : ce qui a bougé, ce qui n'a pas été fait, pourquoi.

**✅ Fait si :** brief à jour ; commits présents sur la branche ; `.stitch/` et clés non commités ;
changelog rédigé.

---

## Self-review (couverture du brief)

| Exigence du brief | Couverte par |
|---|---|
| Plus beau visuellement | Tasks 1, 2, 3, 7 |
| Stitch + Magic | Tasks 1.4, 4 (composants) |
| fal.ai images/vidéos ≤ 5 € | Task 7 |
| Garder vidéo 0404 | C4, 3.3, 7.3 |
| Inclure capacités des 2 projets réf | Task 4 (+ research-notes.md) |
| Skills frontend (web-design-guidelines…) | Tasks 1–2 |
| Entièrement lisible et clair | Tasks 2.1, 8.3 |
| Déploiement IONOS sans casser app. (préparer, pas exécuter) | Task 9 |
| Vanilla / pas de build / FR / SEO / zéro marque / pas de chiffres inventés | C1–C9 |

---

## Handoff d'exécution

Deux options pour exécuter ce plan :
1. **Subagent-Driven (recommandé)** — un sous-agent neuf par tâche, revue entre les tâches.
2. **Inline** — exécution dans la session avec checkpoints.

> Note : ce plan est aussi une **grille de vérification**. Pour contrôler le travail de l'autre
> session, parcours les **✅ Fait si…** de chaque tâche et coche ce qui est réellement constaté.
