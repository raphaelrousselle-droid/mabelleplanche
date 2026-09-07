# Ma belle planche

Boutique en ligne de planches à découper artisanales en bois massif.
Next.js (App Router) · Sanity (CMS) · Stripe (paiement) · Resend (emails) · Vercel (hébergement).

## Démarrage rapide

```bash
npm install
cp .env.example .env.local     # puis compléter les valeurs
npm run dev                    # http://localhost:3000
```

Sans aucune configuration, le site tourne avec **6 planches de démonstration**
(images et textes provisoires, dans `src/lib/placeholder-data.ts`). Dès qu'un
projet Sanity est renseigné, le contenu vient du CMS.

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et lancement en production |
| `npm run typecheck` | Vérification TypeScript |
| `npm run seed` | Charge les données de démo dans le dataset Sanity (voir `SETUP.md`) |

## Structure

```
src/
  app/
    (shop)/            Pages publiques (accueil, catalogue, fiche, panier, ...)
    api/
      checkout/        Crée la session Stripe Checkout
      stripe/webhook/  Reçoit checkout.session.completed -> emails Resend
      contact/         Formulaire de contact -> email Resend
  components/          Header, Footer, cartes produit, panier (contexte), ...
  lib/
    store.ts           Point d'accès unique aux données (Sanity OU démo)
    placeholder-data.ts  Contenu de démonstration
    sanity/            Client, requêtes GROQ, conversion Portable Text
    email/             Client Resend + gabarits d'emails
    stripe.ts          Client Stripe (serveur)
```

Le Sanity Studio (modèle de contenu, administration) est un projet séparé,
`studio-mabelleplanche/`, à côté de ce dossier — pas embarqué dans le site
(voir `SETUP.md`).

## Mise en production

Voir **`SETUP.md`** : comptes à créer, variables d'environnement, configuration
Stripe / Sanity / Resend, déploiement sur Vercel, checklist légale.

## Points à finaliser avant l'ouverture

- Fournir la **clé secrète Stripe** (`STRIPE_SECRET_KEY`) et le **secret de webhook**.
- Créer le **projet Sanity**, lancer `npm run seed`, puis ajouter les vraies photos.
- Créer le **compte Resend**, vérifier le domaine `mabelleplanche.fr`.
- Remplacer le logotype provisoire (`src/components/Logo.tsx`).
- Faire relire les **CGV / mentions légales / confidentialité** (modèles fournis, à adapter).
