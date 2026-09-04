# Cahier des charges — Boutique en ligne de planches à découper artisanales

## 1. Présentation du projet

Site e-commerce pour vendre des planches à découper en bois fabriquées à la main par l'artisan lui-même. Modèles fixes en catalogue (pas de personnalisation/gravure pour le moment). Livraison en France uniquement.

**Objectif principal** : permettre aux visiteurs de découvrir les planches, comprendre le côté artisanal/fait main, et acheter directement en ligne avec paiement par carte bancaire.

---

## 2. Pages nécessaires

| Page | Contenu |
|---|---|
| **Accueil** | Présentation courte, mise en avant de 2-3 planches phares, photo/vidéo de l'atelier, bouton vers le catalogue |
| **Catalogue** | Liste de toutes les planches disponibles, avec photo, nom, prix, statut (en stock / rupture) |
| **Fiche produit** | Photos (plusieurs angles), description, dimensions, essence de bois, entretien, prix, bouton "Ajouter au panier" |
| **Panier** | Récapitulatif des articles, quantités modifiables, total, bouton vers le paiement |
| **Paiement (checkout)** | Formulaire adresse de livraison + paiement Stripe |
| **Confirmation de commande** | Message de remerciement + récapitulatif après paiement réussi |
| **À propos** | L'histoire de l'artisan, son atelier, sa démarche (photos/vidéo bienvenues) |
| **Contact** | Formulaire ou email pour questions |
| **Mentions légales / CGV** | Obligatoire légalement en France (voir section 7) |

---

## 3. Fonctionnalités essentielles (V1 — pour démarrer)

- [ ] Affichage du catalogue de produits avec photos
- [ ] Fiche produit détaillée
- [ ] Panier (ajout, suppression, modification quantité)
- [ ] Paiement par carte via **Stripe**
- [ ] Calcul des frais de port (zone France uniquement pour commencer)
- [ ] Email de confirmation automatique envoyé au client après achat
- [ ] Gestion simple du stock (marquer un produit "épuisé" quand il n'y en a plus)
- [ ] Site adapté mobile (beaucoup de visiteurs viendront d'Instagram/TikTok sur leur téléphone)

## 4. Fonctionnalités "plus tard" (V2 — pas urgent)

- Compte client / historique de commandes
- Codes promo
- Avis clients
- Personnalisation (gravure) si un jour vous le proposez
- Livraison internationale

---

## 5. Ambiance / Design souhaité

**
- Style :chaleureux/nature
- Couleurs qui vous représentent : bois clair, tons naturels
- Avez-vous déjà un logo ou un nom de marque : oui la marque c'est "Ma belle planche" et le logo est joint à la conversation

---

## 6. Contenu à préparer de votre côté

Avant de démarrer avec Claude Code, il est utile d'avoir déjà :
- Photos de chaque planche (idéalement plusieurs angles + une en situation/ambiance)
- Une liste des produits avec : nom, prix, dimensions, essence de bois, description courte
- Un texte "À propos" racontant votre histoire et votre démarche artisanale
- Vos informations légales : nom/statut de l'entreprise (auto-entrepreneur ?), adresse, SIRET si vous en avez un

---

## 7. Aspects légaux (France)

Un site marchand français doit obligatoirement avoir :
- **Mentions légales** (identité de l'entreprise, hébergeur du site)
- **CGV** (Conditions Générales de Vente) : prix, délais de livraison, droit de rétractation (14 jours pour un particulier), modalités de paiement
- **Politique de confidentialité** (si vous collectez des données clients, ce qui sera le cas avec les commandes)

Ce sont des textes réutilisables — pas besoin de les rédiger de zéro, il existe des générateurs gratuits (ex : sur les sites d'auto-entrepreneurs), mais il faudra les adapter à votre situation.

---

## 8. Comptes à créer avant de commencer avec Claude Code

- [ ] Nom de domaine : mabelleplanche.fr et mabelleplanche.eu
- [ ] Compte Stripe c'est fait, clé publique: pk_live_51PGMLhFSuVJZWwspMW0qeT5J9xXakB8ENGYHtI0Ap08TiWT7v4l3bPuh9qG3SULihJoRjZJrofsdqI2EFjGLaKfO00uy73P3K8
- [ ] Compte hébergement Vercel
