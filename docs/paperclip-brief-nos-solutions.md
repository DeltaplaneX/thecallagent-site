# Ticket CEO → Paperclip : Page "Nos Solutions" interactive

## Objectif

Transformer `nos-solutions.html` en page interactive : chaque solution / intégration / workflow devient cliquable et ouvre une fiche détaillée (modale, drawer ou page dédiée). Le visiteur doit pouvoir creuser n'importe quel élément sans quitter la page.

**Ne pas casser le design existant** (dark tech-noir, glassmorphism, tokens CSS de `css/style.css`, particules).

---

## Contexte produit

TheCallAgent est un agent téléphonique IA pour PME. La page actuelle décrit 5 grands blocs de manière trop superficielle. Les visiteurs sortent sans comprendre concrètement ce que l'agent fait.

**Source de vérité technique** : 82 workflows d'automatisation existent dans l'instance n8n d'Odilon. Ils prouvent ce que l'agent sait faire (appels entrants/sortants, hub CRM conversationnel, devis-facture-contrat, prospection multi-étapes, onboarding lead). Tu n'as pas à les nommer ni à exposer la stack technique au visiteur — tu t'en sers comme matière première pour produire des descriptions crédibles.

---

## Périmètre

Fichier cible unique : `nos-solutions.html`
Possibilité de toucher : `css/style.css` (extension), `js/main.js` (interactions), nouveaux fichiers dans `images/` ou `docs/` si nécessaire.

**Interdit** : modifier les autres pages, casser la nav, introduire un build step (Node, bundler), ajouter un framework lourd.

---

## 5 zones à rendre interactives

### Zone A — Cartes "Appels Entrants" / "Appels Sortants"
Chaque carte devient cliquable et ouvre une fiche détaillée avec :
- Pitch en 1 phrase
- Schéma "Comment ça marche en 3 étapes" (texte ou SVG simple)
- 4 à 6 cas d'usage concrets (sans nommer un secteur unique)
- KPIs / promesses mesurables
- CTA "Réserver une démo"

### Zone B — Grille "Intégrations natives" (6 cartes)
CRM, Email, Calendrier, LinkedIn, SMS, Documents.
Chaque carte cliquable ouvre une fiche :
- Ce que l'agent fait avec cette intégration (3-4 actions concrètes côté utilisateur, sans citer le nom du SaaS sous-jacent — rester générique : "votre CRM", "votre boîte mail", "votre calendrier")
- Exemple concret de scénario
- Liste des données lues / écrites

### Zone C — Workflows automatisés (5 items numérotés)
Chaque item cliquable ouvre une fiche :
- Description longue de l'automatisation
- Étapes du flux
- Bénéfice business chiffrable
- À qui c'est destiné

### Zone D — Secteurs (4 cartes)
Chaque carte sectorielle cliquable ouvre une fiche :
- 3 problèmes typiques du secteur
- 3 façons dont l'agent les résout
- 1 mini-scénario d'usage
- Stat ou témoignage placeholder (à remplir plus tard)

### Zone E — (optionnel) Hub CRM Conversationnel
Si tu juges utile, ajoute un nouveau bloc avant "Workflows" pour valoriser cette capacité (l'agent comprend texte/voix, pilote calendrier+CRM+email+SMS depuis une conversation). Sinon ignore.

---

## Règles de contenu

1. **Zéro nom d'outil tiers visible** côté visiteur. Pas de "Retell", "Twilio", "Airtable", "Gmail", "Google Calendar", "Apify", "Perplexity", "OpenAI", "n8n". Toujours générique : *"votre CRM", "votre calendrier", "le SMS de confirmation", "l'agent vocal"*.
2. **Ton** : concis, technique-mais-accessible, en français, tutoiement de l'entreprise ("votre équipe"), pas d'enthousiasme creux.
3. **Aucun chiffre inventé**. Si un KPI doit être avancé sans source, le formuler comme objectif ("vise X%") ou le marquer `[à confirmer]`.
4. **Pas de promesses fantaisistes** (ex : "remplace 5 commerciaux"). Rester sur des automatisations factuelles.

---

## Choix d'implémentation à proposer (single-select avant codage)

Tu dois trancher entre 3 patterns d'interaction et soumettre ton choix au CEO **avant** d'écrire le code :

| Option | Description | Avantage | Inconvénient |
|---|---|---|---|
| **1. Modale glassmorphic** | Clic → overlay centré qui matche la charte | Rapide à coder, reste sur la page | Mobile peut être étroit |
| **2. Drawer latéral droit** | Clic → panneau qui slide depuis la droite | Premium, plus d'espace de lecture | Plus complexe en CSS pur |
| **3. Section expansible inline** | Clic → la fiche se déploie sous la carte | Pas de modale, accessible | Casse le rythme de la grille |

Recommandation par défaut : **Option 1 (modale)**, sauf si tu identifies une raison forte de choisir autre chose.

---

## Exigences techniques

- **HTML/CSS/JS vanille uniquement** (pas de React, pas de bundler, pas de npm).
- **Accessibilité** : modales avec `role="dialog"`, `aria-labelledby`, focus trap, fermeture sur `Esc`, fermeture sur clic extérieur.
- **Performance** : aucune dégradation Lighthouse. Re-run Lighthouse après et sauvegarder un nouveau `lh-nos-solutions-interactive.json`.
- **SEO** : tous les contenus de fiches dans le DOM (pas chargés en async) pour que Google les indexe. Cacher visuellement, pas avec `display:none` qui pénalise.
- **Responsive** : modales/drawers passent en plein écran mobile.
- **Animations** : respecter `prefers-reduced-motion`.

---

## Livrables attendus

1. `nos-solutions.html` modifié + contenu de fiches complet pour les 4 zones obligatoires (A, B, C, D).
2. Extension de `css/style.css` (nouvelle section commentée `/* === MODALS / FICHES SOLUTIONS === */`).
3. Code d'interaction dans `js/main.js` (ouverture/fermeture, accessibilité).
4. Run Lighthouse local sur la page modifiée + nouveau JSON sauvegardé.
5. Capture avant/après (1 screenshot mobile + 1 desktop) dans `docs/screenshots/`.
6. Mini changelog dans la PR : ce qui a bougé, ce qui n'a pas été fait, raisons.

---

## Avant de coder

Réponds au CEO avec :
- Le pattern d'interaction retenu (1, 2 ou 3) + 1 ligne de justification
- Tout besoin de clarification sur les contenus (préfères-tu rédiger les fiches ou les recevoir ?)
- ETA estimé

Une fois validé → tu codes.
