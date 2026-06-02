# Notes de recherche - refonte TheCallAgent

> Matiere premiere pour transformer le site vitrine en preuve produit concrete.
> Regle marketing: vendre les capacites, pas les outils tiers. Ne pas afficher les noms de stack
> cote visiteur (Twilio, Retell, Airtable, Supabase, Railway, etc.).

## A. Agent WhatsApp - conciergerie / location courte duree

Source analysee: `C:\Users\Utilisateur\ClaudeProjects\n8n-workflows\whatsapp-agentkit\ma_villa_whatsapp.egg-info`
et projet parent `whatsapp-agentkit`.

Ce que le produit sait faire:

- Repondre aux locataires sur WhatsApp 24/7.
- Identifier automatiquement le client via son numero ou son nom de reservation.
- Envoyer un message de bienvenue personnalise au premier contact.
- Envoyer les infos pratiques a la demande: livret d'accueil, code WiFi, code boite a cles, plan d'acces, reglement.
- Detecter les urgences et alerter le gerant avec le contexte utile.
- Gerer le cycle de sejour: conversation ouverte pendant le sejour, cloture apres check-out, purge des conversations inactives.

Angle a integrer au site:

- TheCallAgent n'est pas seulement vocal: le meme moteur peut gerer telephone, WhatsApp, SMS et workflows metier.
- Cas d'usage fort: conciergerie, location saisonniere, hotellerie, immobilier court sejour.
- Promesse utilisable: "Au telephone et sur WhatsApp, votre agent IA gere reservations, questions clients et urgences automatiquement."

Visuels reutilisables:

- Bulles de conversation WhatsApp generiques, sans marque tierce.
- Flux simplifie: client -> identification -> assistant IA -> documents / urgence -> reponse.
- Carte "infos envoyees automatiquement": code, livret, plan d'acces, rappel check-out.

## B. Agent vocal - restaurant / reservations

Source analysee: `C:\Users\Utilisateur\ClaudeProjects\Booking_restaurant_hotel_app`.

Ce que le produit sait faire:

- Repondre au telephone en francais, 24/7.
- Prendre une reservation de restaurant de bout en bout: date, heure, couverts, nom, telephone, demandes speciales.
- Verifier les disponibilites en temps reel.
- Proposer des creneaux alternatifs si le restaurant est complet.
- Annuler ou modifier une reservation par telephone.
- Envoyer un SMS de confirmation ou un menu pendant l'appel.
- Lire un menu a voix haute.
- Alerter le gerant en cas de probleme.
- Resumer et analyser chaque appel.
- Donner au restaurateur un tableau de bord temps reel: reservations, tables, horaires, fermetures, analyses.

Angle a integrer au site:

- Montrer une preuve verticale concrete: restauration.
- Le site doit passer de "agent IA generaliste" a "agent operationnel qui prend vraiment des reservations".
- Promesse utilisable: "Le client appelle, l'agent verifie vos disponibilites, reserve, confirme par SMS et met votre tableau de bord a jour."

Visuels reutilisables:

- Timeline d'appel: Appel -> disponibilite -> reservation -> SMS -> dashboard.
- Carte dashboard stylisee: reservations du jour, table, statut, analyse.
- Scenario court "Le Petit Bistrot" sans citer de stack.

## C. Implications pour la refonte

- Ajouter une section "Ce que votre agent fait vraiment" avec 4 a 6 cas concrets.
- Ajouter une section "Telephone + WhatsApp + SMS" pour clarifier le positionnement multicanal.
- Remplacer une partie des cartes abstraites par des mini-scenarios metier.
- Garder `videos/0404.mp4` comme preuve visuelle existante.
- Utiliser des visuels generes uniquement si leur apport est net et sous budget `<= 5 EUR`.
