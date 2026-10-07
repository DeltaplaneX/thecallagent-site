---
type: memory-register
register: blockers
project: thecallagent-site
schema: "ID | Date | Friction | Cause | Solution | Statut"
---

# Blockers — thecallagent-site

| ID | Date | Friction | Statut |
|----|------|----------|--------|
| BLK-001 | 2026-10-08 | Prod Vercel périmée : 4 commits de `main` jamais poussés (dont le fix vidéo iOS) | résolu |

## Entrées

<!-- BLK-001 template:
### BLK-001 — Titre
- **Date** : YYYY-MM-DD
- **Friction** : ...
- **Cause réelle** : ...
- **Solution** : ...
- **Statut** : résolu / ouvert
-->

### BLK-001 — Prod périmée : fix vidéo iOS non déployé
- **Date** : 2026-10-08
- **Friction** : « la vidéo 0404 ne s'affiche pas sur certains devices » alors que le repo contenait déjà le fix (814daf5, 27/07) ; pages légales d'octobre en 404 en prod.
- **Cause réelle** : `origin/main` figé à bb86edc (29/06) ; Vercel déploie `main` depuis GitHub ; la note vault indiquait IONOS → personne ne pensait que le push déployait.
- **Solution** : push de `main` (fix vidéo + i18n + légal) ; durcissement supplémentaire du scrub (geste touchend/click, watchdog seek → lecture en boucle, poster en fond CSS, `.video-failed`).
- **Statut** : résolu
