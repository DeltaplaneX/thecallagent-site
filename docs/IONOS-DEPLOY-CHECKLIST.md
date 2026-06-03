# IONOS — Marche à suivre pour remplacer le site `thecallagent.com`

> **Statut : PRÉPARÉ — NON EXÉCUTÉ.** Aucun DNS, aucun hébergement, aucun fichier en ligne n'a été modifié.
> Ce document est une checklist à **valider par Odilon** avant toute action.
> Généré le 2026-06-03 — lecture seule.

---

## ⚠️ Avertissement de lecture MCP IONOS

L'étape de lecture via le MCP IONOS a **échoué** :

```
mcp__ionos__list_domains      → IONOS API error: Invalid API key format.
mcp__ionos__list_dns_zones    → IONOS API error: Invalid API key format.
mcp__ionos__get_dns_zone      → IONOS API error: Invalid API key format.
```

**Conséquence :** les identifiants internes IONOS (`domainId`, `zoneId`) et les détails complets
de zone (IDs d'enregistrements, valeurs désactivées, commentaires internes) **n'ont pas pu être
lus**. Les valeurs DNS publiques observables ont été relevées séparément ci-dessous via DNS-over-HTTPS
Cloudflare + Google le **2026-06-03**. Elles servent de repère, mais le panneau IONOS reste la
source à vérifier avant toute bascule.

**Action préalable requise** (côté utilisateur, hors de ce document) :
- Régénérer/corriger la clé API IONOS (format attendu : `<public-prefix>.<secret>`),
  la fournir au MCP, puis relancer les 3 appels de lecture ; **ou**
- Renseigner manuellement les valeurs ci-dessous depuis le panneau IONOS
  (`https://www.ionos.fr` → Domaines & SSL → `thecallagent.com` → DNS).

---

## 1. État actuel constaté

| Élément | Valeur lue | Source |
|---|---|---|
| Domaine | `thecallagent.com` | confirmé via le repo (canonical / OG dans `index.html`) |
| domainId | **[à lire dans le panneau IONOS]** | MCP indisponible (clé API invalide) |
| zoneId | **[à lire dans le panneau IONOS]** | MCP indisponible (clé API invalide) |
| Enregistrement **racine** `thecallagent.com` | `A 217.160.0.145` · `AAAA 2001:8d8:100f:f000::200` · TTL public `3600` | DNS-over-HTTPS Cloudflare + Google |
| Enregistrement **`www.thecallagent.com`** | `A 212.227.172.253` · `AAAA 2001:8d8:105:1:0:1:0:7` · TTL public `3600` | DNS-over-HTTPS Cloudflare + Google |
| Enregistrement **`app.thecallagent.com`** (app technique clients → cible) | `A 185.158.133.1` · pas de CNAME/AAAA public observé · TTL public `3600` | DNS-over-HTTPS Cloudflare + Google — **NE PAS TOUCHER** |
| NS | `ns1034.ui-dns.de`, `ns1065.ui-dns.com`, `ns1081.ui-dns.org`, `ns1104.ui-dns.biz` | DNS-over-HTTPS Cloudflare + Google |
| MX | `10 mx00.ionos.fr`, `10 mx01.ionos.fr` · TTL public `3600` | DNS-over-HTTPS Cloudflare + Google |
| TXT `@` | `v=spf1 include:_spf-eu.ionos.com ~all` · `google-site-verification=FWNteBd5IzvT4r8eIdTTSAk1AZlgHSWYhlFyfmSVy6M` · TTL public `3600` | DNS-over-HTTPS Cloudflare + Google |
| DMARC | `_dmarc.thecallagent.com CNAME dmarc.ionos.fr` → `v=DMARC1; p=none;` | DNS-over-HTTPS Cloudflare + Google |
| Hébergement observé `https://thecallagent.com/` / `www` | HTTP `200`, serveur `IONOS Webserver`, headers WordPress (`wp-json`) | sonde HEAD publique le 2026-06-03 |
| Hébergement observé `https://app.thecallagent.com/` | HTTP `200`, serveur `cloudflare` | sonde HEAD publique le 2026-06-03 — **NE PAS TOUCHER** |

> Note de vérification : `Resolve-DnsName` local a retourné des IP `198.18.1.x`, plage réservée aux tests.
> Ces résultats ont été considérés comme pollués par l'environnement réseau local et **ignorés**. Les valeurs ci-dessus
> proviennent de DNS-over-HTTPS Cloudflare + Google, cohérents entre eux.

> Le code confirme l'existence de deux entités distinctes (`politique-de-confidentialite.html`) :
> - **Site vitrine** = `thecallagent.com` (objet de ce déploiement)
> - **Plateforme clients** = `app.thecallagent.com` (à **NE PAS toucher**, voir §4)

### Tableau à compléter une fois le panneau IONOS ouvert

```
domainId            : ______________________________
zoneId              : ______________________________

@ (racine)          : type A     valeur 217.160.0.145                 TTL 3600 public
@ (racine)          : type AAAA  valeur 2001:8d8:100f:f000::200       TTL 3600 public
www                 : type A     valeur 212.227.172.253              TTL 3600 public
www                 : type AAAA  valeur 2001:8d8:105:1:0:1:0:7       TTL 3600 public
app                 : type A     valeur 185.158.133.1                TTL 3600 public   ← NE PAS MODIFIER
MX                  : 10 mx00.ionos.fr ; 10 mx01.ionos.fr            TTL 3600 public
TXT (SPF)           : v=spf1 include:_spf-eu.ionos.com ~all          TTL 3600 public
TXT (verification)  : google-site-verification=FWNteBd5IzvT4r8eIdTTSAk1AZlgHSWYhlFyfmSVy6M
TXT (DMARC)         : _dmarc CNAME dmarc.ionos.fr → v=DMARC1; p=none;
```

---

## 2. Objectif

Remplacer le contenu servi sur **`https://thecallagent.com/`** (et `www.`) par la **nouvelle
version statique** présente dans ce dépôt.

Le site est un **ensemble de fichiers statiques** (HTML / CSS / JS / images / vidéo), **sans
étape de build** : ce qui est dans le repo est exactement ce qui doit être servi. Pas de
`npm build`, pas de bundler à lancer — copie de fichiers directe.

### Fichiers / dossiers à mettre en ligne (racine du site)

Pages publiques (versions canoniques — **PAS** les variantes de design) :

```
index.html
a-propos.html
nos-solutions.html
contact.html
avis-juridique.html
politique-de-confidentialite.html
404.html
```

Assets et configuration :

```
css/            → style.css  (+ brutalist.css, variant-a.css, variant-b.css si variantes servies)
js/             → main.js
cached-bundle.js
images/         → favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png,
                  logo.png, logo-trim.png, odilon.webp, odilon-avatar.png, og-home.jpg
videos/         → 0404.mp4
site.webmanifest
robots.txt
sitemap.xml
```

### À NE PAS mettre en ligne (artefacts de travail / hors-prod)

```
*-brutalist.html, index-variant-a.html, index-variant-b.html, stitch-test.html   (maquettes/variantes)
lh-*.json                                                                          (audits Lighthouse)
docs/, tasks/, graphify-out/, stitch-export/                                       (docs & outillage interne)
*.jpeg / *.png de maquette à la racine (brutalist-full.jpeg, hero-console.jpeg,
  final-fusion.jpeg, stitch-brutalist.png, paperclip-modal-entrants.png, ...)
audit-log.md, shadow-dataset.md, CLAUDE.md, .git/                                  (interne)
```

> ⚠️ Vérifier avant upload **quelles** pages de design sont réellement servies. Si seule la
> version « classique » est en prod, n'uploader que les 7 pages canoniques ci-dessus +
> `css/style.css`. Si une variante brutaliste/A/B est retenue comme page d'accueil, ajuster
> en conséquence (et son CSS associé).

---

## 3. Marche à suivre pas-à-pas

> Choisir **UNE** des deux variantes selon le mode d'hébergement réel de `thecallagent.com`.
> Si vous ne savez pas lequel : dans le panneau IONOS, regardez si le domaine est associé à
> un **espace d'hébergement web / Deploy Now** (→ Variante A) ou si l'enregistrement racine
> pointe (A/CNAME) vers une **IP / un hostname d'un autre hébergeur** (→ Variante B).

### Étape commune 0 — Sauvegarde AVANT toute bascule (OBLIGATOIRE)

1. **Exporter la zone DNS actuelle** : panneau IONOS → DNS → noter/exporter **tous** les
   enregistrements (capture d'écran + copie dans le tableau du §1). C'est le filet de
   sécurité pour le rollback (§5).
2. **Sauvegarder le site actuellement en ligne** : télécharger l'intégralité des fichiers
   servis (SFTP « download » du webroot, ou `wget`/clone si pointage externe) dans un dossier
   horodaté local, ex. `backup-prod-2026-06-03/`. Ne rien supprimer en ligne tant que la
   sauvegarde n'est pas vérifiée.
3. Vérifier que la sauvegarde s'ouvre correctement en local (ouvrir `index.html` sauvegardé).

---

### Variante A — Hébergement IONOS (Web Hosting classique **ou** Deploy Now)

**Cas A1 — IONOS Web Hosting (SFTP / gestionnaire de fichiers)**

> État probable le 2026-06-03 : `thecallagent.com` et `www.thecallagent.com` répondent via
> `IONOS Webserver` avec des headers WordPress. La bascule la plus probable est donc un
> remplacement de contenu sur l'hébergement IONOS (ou une migration hors WordPress), **sans
> toucher au DNS**, sauf décision explicite de passer par la Variante B.

1. Récupérer les identifiants SFTP : panneau IONOS → Hébergement → Accès SFTP/SSH
   (hôte, utilisateur, mot de passe/clé, **chemin du webroot** — souvent `/` ou `/htdocs`).
2. Se connecter en SFTP (FileZilla / WinSCP) au webroot.
3. Faire la sauvegarde du webroot (cf. Étape 0.2) si pas déjà fait.
4. **▼▼▼ POINT DE BASCULE ▼▼▼** — Uploader les fichiers du §2 à la racine du webroot,
   en **écrasant** les anciens. Conserver l'arborescence (`css/`, `js/`, `images/`,
   `videos/`). Supprimer les anciens fichiers devenus obsolètes uniquement après vérif.
   **▲▲▲ FIN POINT DE BASCULE ▲▲▲**
5. Vérifier les **permissions** des fichiers uploadés (lecture publique).
6. Aucune modification DNS nécessaire dans ce cas (le domaine pointe déjà vers cet hébergement).
7. Purger le cache (cf. §3, étape commune « purge ») et tester (§ test post-bascule).

**Cas A2 — IONOS Deploy Now (déploiement Git)**

1. Panneau IONOS → Deploy Now → projet lié à `thecallagent.com` (ou créer le lien au repo).
2. Vérifier la config de build : **aucun build** → commande de build vide, **dossier de
   sortie = racine du repo** (`./`). S'assurer que le `.deploy-now`/workflow ne tente pas
   un `npm install/build` inexistant.
3. Pousser la branche de prod (ou merger vers `main`). Deploy Now déploie automatiquement.
4. **▼▼▼ POINT DE BASCULE ▼▼▼** — c'est le **merge/push** qui déclenche la mise en ligne.
   La bascule a lieu quand le déploiement Deploy Now passe au vert.
   **▲▲▲ FIN POINT DE BASCULE ▲▲▲**
5. Vérifier dans Deploy Now que le domaine `thecallagent.com` est bien rattaché au déploiement.
6. Purger le cache CDN si proposé, puis tester (§ test post-bascule).

> Variante A : **le DNS n'est PAS modifié.** La bascule est un changement de **contenu**, pas
> de pointage.

---

### Variante B — Pointage DNS vers un autre hébergeur (Vercel / Netlify / S3 / autre)

> À utiliser **uniquement** si le nouveau site doit être hébergé ailleurs qu'IONOS et que la
> bascule se fait en changeant l'enregistrement DNS racine.

1. Déployer d'abord le site statique chez l'hébergeur cible (ex. Vercel) et obtenir la
   **cible** à pointer (hostname CNAME, ex. `cname.vercel-dns.com`, ou IP A). **Tester le
   site sur l'URL de préproduction de l'hébergeur AVANT toute modif DNS.**
2. Sauvegarder la zone DNS actuelle (Étape 0.1) — indispensable.
3. **Noter la valeur ACTUELLE** de l'enregistrement racine (pour rollback).
4. **▼▼▼ POINT DE BASCULE ▼▼▼** — Dans IONOS → DNS de `thecallagent.com`, modifier
   **UNIQUEMENT** l'enregistrement **racine `@` `thecallagent.com`** (et éventuellement
   `www`) pour pointer vers la nouvelle cible. **Ne toucher à AUCUN autre enregistrement**
   (voir §4). Baisser le TTL **avant** la bascule (ex. 300 s) pour limiter la fenêtre de
   propagation, puis le remonter ensuite.
   **▲▲▲ FIN POINT DE BASCULE ▲▲▲**
5. Configurer le **SSL** chez le nouvel hébergeur (vérification de domaine / Let's Encrypt).
6. Attendre la propagation DNS (cf. TTL, §5), puis tester (§ test post-bascule).

---

### Purge cache / CDN (les deux variantes, si applicable)

- IONOS CDN / cache d'hébergement : déclencher une purge depuis le panneau si l'option existe.
- CDN tiers (Cloudflare/Vercel) : purger le cache du déploiement.
- Test en navigation privée + `Ctrl+F5` pour contourner le cache navigateur.

---

### ✅ Test post-bascule (obligatoire avant de déclarer terminé)

1. **Page d'accueil** : `https://thecallagent.com/` charge, design correct, HTTPS valide
   (cadenas), pas d'erreur console, OG image `images/og-home.jpg` accessible.
2. **`www`** : `https://www.thecallagent.com/` redirige/charge correctement.
3. **Navigation** : ouvrir chaque page — `a-propos`, `nos-solutions`, `contact`,
   `avis-juridique`, `politique-de-confidentialite`.
4. **Formulaire / contact** : page `contact.html` s'affiche correctement.
5. **Agenda** : sur `contact.html`, l'iframe Google Calendar
   (`https://calendar.app.google/x4PCjCjYi2vaFYLb7`) se charge et permet de réserver un créneau
   (le loader « Chargement du calendrier… » doit disparaître).
6. **Widget chat** : le **widget Retell AI** (`https://dashboard.retellai.com/retell-widget.js`)
   apparaît et s'ouvre sur les pages où il est intégré (index, contact, a-propos, etc.).
7. **Vidéo 0404** : ouvrir une URL inexistante (ex. `https://thecallagent.com/zzz`) → la page
   `404.html` s'affiche et la **vidéo `videos/0404.mp4`** se lit.
8. **Favicons / manifest** : favicon visible, `site.webmanifest` accessible.
9. **SEO** : `robots.txt` et `sitemap.xml` accessibles à la racine.
10. **`app.thecallagent.com`** : vérifier qu'elle **fonctionne toujours** exactement comme
    avant (preuve que le DNS de l'app n'a pas été impacté).

---

## 4. ⛔ À NE PAS TOUCHER

> ╔══════════════════════════════════════════════════════════════════════════╗
> ║  L'enregistrement DNS de **`app.thecallagent.com`** pointe vers l'APP      ║
> ║  TECHNIQUE DES CLIENTS. Il DOIT rester **STRICTEMENT IDENTIQUE**.          ║
> ║  Toute modification de `app.` couperait l'accès des clients à la plateforme.║
> ╚══════════════════════════════════════════════════════════════════════════╝

Enregistrements à **ne pas modifier / ne pas supprimer** lors de la bascule :

- **`app` (A) `app.thecallagent.com`** → `185.158.133.1` (TTL public `3600`) — **INTACT**.
- **MX** (réception e-mail) → **INTACT**.
- **TXT `@` SPF** (`v=spf1 ...`) → **INTACT**.
- **TXT DKIM / DMARC** (`_dmarc`, sélecteurs DKIM) → **INTACT**.
- Tout **autre sous-domaine** existant (ex. `mail`, `autodiscover`, `_acme-challenge`,
  enregistrements de vérification Google/Microsoft) → **INTACT**.

En Variante A (hébergement IONOS), **aucun** enregistrement DNS n'est touché du tout.
En Variante B, **seul** l'enregistrement **racine `@`** (et éventuellement `www`) est modifié ;
tout le reste de la liste ci-dessus reste tel quel.

---

## 5. Risques & rollback

**Risques**
- Modifier par erreur `app.`, MX ou SPF → coupure de l'app clients ou des e-mails.
- Oublier un asset (vidéo, favicon, og-image) → liens cassés.
- Cache/CDN non purgé → ancien site encore visible un moment.
- SSL non renouvelé sur la nouvelle cible (Variante B) → avertissement navigateur.

**Rollback**
- **Variante A (contenu) :** re-uploader la sauvegarde du webroot (`backup-prod-2026-06-03/`)
  par SFTP, ou (Deploy Now) redéployer le commit précédent. Bascule de retour ≈ immédiate.
- **Variante B (DNS) :** remettre l'enregistrement racine `@` à sa **valeur d'origine** notée
  à l'Étape 0.1 / §1. Le retour est soumis au **TTL**.

**TTL DNS à considérer**
- La propagation dépend du TTL. **Baisser le TTL à 300 s (5 min) ~24 h AVANT** une bascule de
  type Variante B, pour rendre le rollback rapide. Remonter le TTL (ex. 3600 s) une fois la
  bascule validée et stable.
- Variante A n'implique pas de propagation DNS (changement de contenu uniquement).

---

## 6. Décision

**Rien n'a été exécuté.** Aucun DNS, aucun fichier en ligne, aucun cache n'a été modifié par
cette préparation. La lecture MCP IONOS a échoué (clé API invalide) → les valeurs DNS réelles
restent **à lire dans le panneau IONOS**.

➡️ **Action attendue d'Odilon avant toute exécution :**
1. Corriger l'accès IONOS (clé API ou lecture manuelle) et **renseigner les valeurs du §1**.
2. Confirmer la **variante d'hébergement** (A ou B).
3. **Valider explicitement** cette checklist.
4. Seulement ensuite : exécuter, en respectant l'encadré §4 (`app.` intouchable).
