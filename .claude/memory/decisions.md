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
