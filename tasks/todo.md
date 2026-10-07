# Conformité légale, données, accessibilité & contenu — thecallagent.com

> Créé le 2026-09-30. Audit + plan d'exécution.
> Périmètre : les 7 pages live (`index`, `nos-solutions`, `a-propos`, `contact`,
> `avis-juridique`, `politique-de-confidentialite`, `404`) + leurs doublons
> `-brutalist` (noindex, à garder synchronisés).

## Décisions utilisateur (2026-09-30)

- Offre générique = sur devis. **Verticales restauration + immobilier = payables en ligne** → CGV nécessaires, pas seulement des CGU.
- Cookies : **chargement des scripts tiers au clic**, pas de bandeau de consentement.
- Chiffres : **reformuler en capacités**, sourcer les stats de marché.
- Images cas d'usage : **générées par IA** → crédits à mentionner.

---

## État des lieux (vérifié, pas supposé)

### Déjà conforme
- [x] Mentions légales complètes (LCEN art. 6 III) : éditeur, SIRET 989 047 691 00013, adresse, tél, email, directeur de publication, hébergeur IONOS SE
- [x] Politique de confidentialité : bases légales, droits RGPD, CNIL, durées (3 ans site / 30 j plateforme)
- [x] Consentement RGPD sur le formulaire de contact (case à cocher obligatoire, `consent` transmis au backend)
- [x] Minimisation des données : nom + email + message obligatoires, société/téléphone optionnels
- [x] `alt` sur 100 % des images (0 manquant)
- [x] Aucun Google Analytics / pixel publicitaire / tracker
- [x] `<html lang="fr">` sur toutes les pages
- [x] Libellés de boutons explicites (aucun « cliquez ici », aucune flèche seule)
- [x] `<label for>` associé à chaque champ + attributs `autocomplete`

### À corriger — Données / RGPD
- [x] **Railway non déclaré** : le formulaire POST vers `thecallagent-backend-production.up.railway.app/lead`, absent de la liste des sous-traitants (art. 13 RGPD)
- [x] Liste « Destinataires » incomplète et incohérente : déclare n8n / Retell / Supabase, alors que le même document cite ailleurs Airtable, Composio et Twilio
- [x] Google (iframe Calendar) et IONOS (hébergeur) absents des destinataires
- [x] Transferts hors UE à documenter par sous-traitant

### À corriger — Accessibilité
- [x] **WCAG 2.1.1 (bloquant)** : cartes `<article role="button" tabindex="0">` avec un seul listener `click` → focusables mais **inactivables au clavier** (Enter/Espace ne déclenchent pas `click` sur un rôle ARIA). Concerne toutes les fiches solutions et workflows.
- [x] **Contrastes mesurés en échec AA** (palette live `brutalist.css`) :
  - blanc sur `--ok` #1f9d57 → **3,49:1** (`.tk-chip.ok`, `.conf.high`, `.form-msg.success`)
  - blanc sur `--accent-2` #FF3B30 → **3,55:1**
  - `--ok` en texte sur `--paper` → **3,09:1** (`.action .done`, mono 0.72rem)
  - correctif : texte `--ink` sur ces fonds (5,41:1 et 5,32:1) + token texte `--ok-ink` #146434 (6,41:1)
- [x] **WCAG 2.4.1** : aucun lien d'évitement (« Aller au contenu ») sur aucune page
- [x] **WCAG 4.1.3** : messages succès/erreur du formulaire sans `aria-live`/`role` → non annoncés
- [x] **WCAG 3.3.1** : pas de `aria-invalid`/`aria-describedby` sur les champs en erreur, pas de déplacement du focus vers le 1er champ invalide (`novalidate` + validation JS custom)
- [x] `:focus-visible` défini sur une seule règle — à généraliser aux liens, boutons et champs

### À corriger — Contenu
- [x] `62 %` → source réelle 411 Locals 2016, n=85, agence marketing, US only. Mal attribuée à BrightLocal partout. **Retirer le chiffre.**
- [x] `×21` → Oldroyd (MIT Sloan) + InsideSales 2007 : 21× = qualifier **à 5 min plutôt qu'à 30 min**. Libellé actuel omet la base → **reformuler + attribuer**
- [x] `70 %` → Baymard Institute 70,22 %, 50 études, sept. 2025 → **garder + attribuer**
- [x] `100 % appels décrochés`, `−34 % de RDV manqués`, `0,10 €/min`, `< 1 s`, `20+ simultanés` → promesses produit non prouvables → **reformuler en capacités**
- [x] Section « Promesses mesurables » / « Indicateur clé » → renommer (le mot « promesse » engage)
- [ ] (laissé, à décider) `stitch-test.html` : fichier de test qui hotlink une image IA hébergée chez Google (`lh3.googleusercontent.com/aida-public/…`) → **supprimer du dépôt**
- [x] Crédits images IA à ajouter aux mentions légales
- [x] Aucun faux avis / faux témoignage détecté → **rien à retirer** (le site n'affiche aucun avis client)

### À créer
- [x] `conditions-generales.html` (au lieu de `cgv.html`) — CGV (verticales payables en ligne) + CGU du site. Extraire la « Partie 2 — Conditions d'utilisation » actuellement noyée dans la politique de confidentialité
- [x] `politique-de-cookies.html` — page dédiée
- [x] `politique-de-remboursement.html` — + droit de rétractation art. L221-3 (pros < 6 salariés hors activité principale)
- [x] ~~`declaration-accessibilite.html`~~ — NON requise : exemption microentreprise EAA (L412-13 C. conso) + RGAA privé > 250 M€ seulement
- [x] Chargement au clic pour Retell + iframe Google Calendar
- [x] Liens vers les nouvelles pages dans le footer des 7 pages (+ doublons brutalist)

---

## Recherche

- [x] Sources des 3 stats de marché — terminé
- [x] Droit français : LCEN, cookies CNIL, CGU/CGV, L221-3, médiation, L121-1 — en cours
- [x] Accessibilité (EAA juin 2025 / RGAA) + AI Act art. 50 + CNIL voicebot — en cours

## Revue (2026-10-02)

**Fait et vérifié dans le navigateur** (serveur local, pane intégré) :
- Avant tout clic : 0 requête Retell, 0 cookie. Clic « Ouvrir le chat » → script Retell chargé et fonctionnel ; « Non merci » mémorisé pour la session ; activation/retrait depuis `politique-de-cookies.html#gerer`.
- Calendrier Google : `src` absent avant clic, posé après.
- Fiches solutions : Enter et Espace ouvrent, Escape ferme, focus rendu à la carte.
- Formulaire : champs fautifs `aria-invalid` + `aria-describedby`, focus sur le 1er, `role=alert`.
- 526 liens internes vérifiés : 0 cassé hors `index-variant-a/b` (pages de test, ancre `#appels` préexistante).
- Mobile 375 px : aucun débordement horizontal sur CGV et cookies.
- Diff propre : fins de ligne CRLF préservées.

**Corrections en cours de route** : widget Retell = chat écrit d'orientation (pas une démo vocale) ; éditeur = CALL AGENT SASU (pas une EI) ; L221-3 ne couvre pas la vente en ligne.

**Reste à faire (dépend d'Odilon)** :
- [ ] Capital social de la SASU → mentions légales (marqueur `TODO` dans `avis-juridique*.html`)
- [ ] Régime TVA réel (franchise 293 B ou réel) — les CGV couvrent les deux cas
- [ ] Autoriser l'auto-hébergement des polices (Google Fonts transmet l'IP de chaque visiteur à Google)
- [ ] Vérifier que l'agent téléphonique annonce bien « vous parlez à une IA » en début d'appel (AI Act art. 50, en vigueur depuis le 02/08/2026) — la politique de confidentialité l'affirme désormais
- [ ] Valider les choix par défaut des CGV / remboursement : abonnement mensuel tacite, mois entamé non remboursé, avoir au prorata si panne imputable, plafond de responsabilité 12 mois, export 30 j
- [ ] Si l'écran de consentement OAuth Google pointe vers la politique de confidentialité comme « conditions d'utilisation » : laisser tel quel (Partie 2 conservée) ou pointer vers `conditions-generales.html`
- [ ] Nettoyage : `stitch-test.html` (hotlink image Google), `index-variant-a/b.html`, `cached-bundle.js` (1,1 Mo, non chargé)
- [ ] Clause de réversibilité Data Act (cf. wiki [[Research - Conformite legale SaaS vocal IA restauration (2026-09)]])
- [ ] Re-lancer Lighthouse et sauvegarder un `lh-*.json` (règle du CLAUDE.md projet)

---

# Site trilingue FR / EN / ZH + vidéo 0404 + déploiement — 2026-10-08

## Diagnostic
- Prod (Vercel, projet relié à GitHub `main`) = commit bb86edc du 29/06 : `<video>` sans autoplay/loop/poster, `main.js` sans le fix iOS → « la vidéo ne s'affiche pas sur certains devices ». Le fix 814daf5 (27/07) et 3 autres commits n'ont jamais été poussés. Les 3 pages légales d'octobre renvoient 404 en prod.
- Fichier vidéo local sain : H.264 High@4.0, yuv420p, faststart, all-intra (152 keyframes), poster JPEG valide.

## Plan
- [x] Pages FR : sélecteur de langue dans la nav + 4 `<link hreflang>` (fr, en, zh-CN, x-default)
- [x] CSS : `.lang-switch`, note de traduction, repli poster en fond de `.scroll-video-sticky`, suppression `translateZ/backface-visibility` sur le lecteur, polices CJK + interlignage `html[lang="zh-CN"]`, `content:'Scenario'/'场景'`
- [x] JS : dictionnaire `TCA_I18N` (formulaire, launcher Retell) lu sur `<html lang>` ; vidéo : déverrouillage sur touchend/click/keydown, watchdog seek → lecture en boucle si seek impossible, `.video-failed` si source illisible
- [x] Deno : 3 pages légales + dossiers en/ zh/ dans le paquet, 404 localisée ; sitemap 27 URLs avec alternates ; llms.txt
- [ ] 20 pages traduites (10 EN sous `/en/`, 10 ZH sous `/zh/`, slugs anglais) par agents parallèles
- [ ] Vérification structurelle (script verify_i18n.py) + captures Playwright FR/EN/ZH desktop + mobile
- [ ] Commit + push `main` → déploiement Vercel automatique
- [ ] Mémoire : journal, décisions, Projects/thecallagent-site.md, Daily Log, graphify update

