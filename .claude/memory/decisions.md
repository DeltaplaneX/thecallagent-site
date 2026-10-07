---
type: memory-register
register: decisions
project: thecallagent-site
schema: "ID | Date | Titre | Décision | Pourquoi | Alternatives | Statut"
---

# Décisions — thecallagent-site

| ID | Date | Titre | Statut |
|----|------|-------|--------|
| BDR-001 | 2026-06-28 | Migration formulaire n8n → backend Railway `/lead` + détection succès côté front | actif |

## Entrées

### BDR-001 — Formulaire contact : URL Railway `/lead` + `leadSucceeded(res, data)`
- **Date** : 2026-06-28
- **Décision** :
  1. `WEBHOOK_URL` (`js/main.js` ~L283 + copie `dist/js/main.js`) pointe désormais vers `https://thecallagent-backend-production.up.railway.app/lead` (remplace le webhook n8n cloud). Payload **inchangé** : `{name,email,company,phone,message,consent}`.
  2. Le front ne se fie plus à `res.ok` seul : il lit `res.ok && data.success === true` via la fonction pure `leadSucceeded()`. Évite le faux « Message envoyé ! » si le backend renvoie `200 {success:false}` (cas consent manquant).
- **Pourquoi** : le backend signale l'issue métier par le **body** (`success`) ET le statut HTTP. Le backend renvoie volontairement `200` pour un consent manquant (un test backend l'assert) → s'appuyer sur `res.ok` seul est faux. Durcir le front corrige sans toucher au backend ni redéployer Railway.
- **Alternatives considérées** :
  - Aligner le backend sur le rapport (`400` sur rejet) + redéploiement Railway + MAJ du test `test_lead_no_consent` → écarté (action externe, override d'un test délibéré). Reste possible plus tard.
  - Statu quo → écarté (le rapport demandait de fiabiliser).
- **Vérif** : `node --test tests/lead-response.test.js` (6/6), backend pytest (14/14), smoke test live `POST /lead` = `200 {success:true}`, CORS `access-control-allow-origin: https://thecallagent.com` OK sur preflight + POST réel.
- **Statut** : actif

<!-- BDR-002 template:
### BDR-002 — Titre
- **Date** : YYYY-MM-DD
- **Décision** : ...
- **Pourquoi** : ...
- **Alternatives considérées** : ...
- **Statut** : actif / obsolète
-->

## BDR — Services tiers chargés au clic, pas de bandeau cookies (2026-10-02)
- **Décision (Odilon)** : Retell (chat) et Google Calendar ne se chargent qu'après clic sur un encart d'information CNIL ; pas de bandeau global.
- **Pourquoi** : aucun autre traceur sur le site → art. 82 non déclenché avant action ; meilleure perf, zéro friction.
- **Conséquence** : tout nouveau script tiers doit passer par le stub `data-consent-src` (js/main.js `thirdPartyOnClick`). Google Fonts reste à auto-héberger.

## BDR — Offres réservées aux professionnels (2026-10-02)
- CGV B2B uniquement → pas de médiateur de la consommation, pas de rétractation en ligne (L221-3 = hors établissement seulement). Si des particuliers peuvent souscrire un jour : médiateur + CGV consommateur à ajouter.

## BDR — Site trilingue : sous-dossiers statiques `/en/` et `/zh/`, slugs anglais, hreflang (2026-10-08)
- **Décision** : une page HTML complète par langue (10 FR à la racine, 10 EN sous `/en/`, 10 ZH sous `/zh/` avec les mêmes slugs anglais : `solutions`, `about`, `contact`, `legal-notice`, `privacy-policy`, `terms`, `refund-policy`, `cookie-policy`, `404`). Pas de i18n JS côté contenu : seuls les messages générés par `js/main.js` (formulaire, launcher Retell) passent par le dictionnaire `TCA_I18N` lu sur `<html lang>`. Sélecteur FR | EN | 中文 dans la nav (`.lang-switch`), 4 `<link hreflang>` (fr, en, zh-CN, x-default = FR) sur chaque page, sitemap 27 URLs avec `xhtml:link`. Chinois = `lang="zh-CN"`, `og:locale zh_CN`, polices système CJK en repli (`html[lang="zh-CN"]`).
- **Pourquoi** : SEO (une URL par langue, indexable sans JS), Lighthouse inchangé, aucun build step (contrainte du projet). Pas de redirection automatique par langue navigateur (recommandation Google, zéro piège bouton retour).
- **Conséquence** : toute modif de contenu FR doit être reportée dans `en/` et `zh/` ; les chaînes JS nouvelles vont dans `TCA_I18N` (3 langues) ; le texte CSS `content:` se surcharge par `html[lang=…]`. Pages légales EN/ZH = traductions de courtoisie, la version FR prévaut (note `.translation-note`). Script de contrôle : `scratchpad/verify_i18n.py` (séquence de balises, ids, liens, head) — à recopier dans `scripts/` si on itère.

## BDR — Déploiement prod = Vercel relié à GitHub `main` (2026-10-08)
- **Constat** : `thecallagent.com` est servi par Vercel (`Server: Vercel`, alias `thecallagent-site-git-main-…vercel.app`), projet `thecallagent-site` (compte deltaplanex). La note vault disait IONOS (seulement le DNS/domaine). Un `git push origin main` déclenche le déploiement ; `dist/` + scripts Deno = chemin alternatif non utilisé en prod.
- **Conséquence** : « push à la fin » = mise en prod. Vérifier après chaque push : `curl -sI https://thecallagent.com/js/main.js` (Last-Modified) et une page nouvelle.
