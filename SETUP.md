# Mise en production — Ma belle planche

Ce guide couvre les comptes à créer et la configuration nécessaire pour ouvrir
la boutique. Ordre conseillé : Sanity → Stripe → Resend → Vercel.

---

## 0. Variables d'environnement

Toutes les variables sont décrites dans `.env.example`. En local, les copier
dans `.env.local`. En production, les saisir dans **Vercel → Settings →
Environment Variables**.

| Variable | Obligatoire | Où l'obtenir |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | oui | `https://mabelleplanche.fr` en prod |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | pour le CMS | tableau de bord Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | pour le CMS | `production` |
| `SANITY_API_READ_TOKEN` | recommandé | Sanity → API → Tokens (Viewer) |
| `SANITY_API_WRITE_TOKEN` | pour `npm run seed` | Sanity → API → Tokens (Editor) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | oui | Stripe → Développeurs → Clés API (`pk_test_…` / `pk_live_…`) |
| `STRIPE_SECRET_KEY` | oui | Stripe → Développeurs → Clés API |
| `STRIPE_WEBHOOK_SECRET` | oui | Stripe → Développeurs → Webhooks |
| `RESEND_API_KEY` | oui | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | oui | une adresse de votre domaine vérifié |
| `ORDER_NOTIFICATION_EMAIL` | oui | votre adresse (réception commandes + contact) |

> Le site fonctionne **sans** Sanity ni Resend (données de démo, formulaires
> renvoient un message d'indisponibilité). Stripe est requis pour tester un
> paiement.

---

## 1. Sanity (catalogue et contenu)

1. Créer un compte sur [sanity.io](https://www.sanity.io) (gratuit).
2. Depuis le dossier du projet :
   ```bash
   npx sanity@latest login
   npx sanity@latest init --env
   ```
   Choisir « Create new project », nom « Ma belle planche », dataset
   `production`. La commande écrit `NEXT_PUBLIC_SANITY_PROJECT_ID` dans
   `.env.local`.
3. Créer deux tokens dans **manage.sanity.io → API → Tokens** :
   - un token **Viewer** → `SANITY_API_READ_TOKEN`
   - un token **Editor** → `SANITY_API_WRITE_TOKEN`
4. Charger les données de démonstration :
   ```bash
   npm run seed
   ```
5. Ouvrir `http://localhost:3000/studio`, se connecter, puis :
   - remplacer les textes,
   - **ajouter les photos** de chaque planche (le seed n'importe pas d'images),
   - compléter **Réglages du site** (SIRET, adresse, hébergeur, frais de port…),
   - relire les **Pages légales**.
6. Dans **manage.sanity.io → API → CORS origins**, ajouter
   `http://localhost:3000` et `https://mabelleplanche.fr` (Allow credentials).

Gérer le stock au quotidien : dans le Studio, ouvrir une planche et cocher /
décocher **En stock**.

---

## 2. Stripe (paiement)

1. Récupérer la clé **publique** dans **Stripe → Développeurs → Clés API**
   (`pk_test_…` pour les tests, `pk_live_…` en production) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
2. Récupérer la clé **secrète** au même endroit :
   - `sk_test_…` pour les tests → `STRIPE_SECRET_KEY` en local,
   - `sk_live_…` pour la production → `STRIPE_SECRET_KEY` sur Vercel.
3. **Webhook** (envoi des emails de confirmation) :
   - En local :
     ```bash
     stripe login
     stripe listen --forward-to localhost:3000/api/stripe/webhook
     ```
     Copier le `whsec_…` affiché dans `STRIPE_WEBHOOK_SECRET`.
   - En production : **Stripe → Développeurs → Webhooks → Ajouter un endpoint**
     `https://mabelleplanche.fr/api/stripe/webhook`, événement
     `checkout.session.completed`. Copier le secret de signature dans Vercel.
4. Vérifier dans **Stripe → Réglages** que la devise est l'euro et que
   l'adresse de l'entreprise est renseignée (obligatoire en mode live).
5. Test : carte `4242 4242 4242 4242`, date future, CVC quelconque.

Le site ne stocke jamais les données de carte : la saisie se fait sur la page
sécurisée hébergée par Stripe.

---

## 3. Resend (emails de confirmation et de contact)

1. Créer un compte sur [resend.com](https://resend.com).
2. **Domains → Add Domain** : `mabelleplanche.fr`. Ajouter les enregistrements
   DNS fournis (SPF, DKIM) chez le registrar du domaine, attendre la
   vérification.
3. **API Keys → Create** → `RESEND_API_KEY`.
4. `RESEND_FROM_EMAIL` : par exemple `commandes@mabelleplanche.fr` (doit
   appartenir au domaine vérifié).
5. `ORDER_NOTIFICATION_EMAIL` : l'adresse qui reçoit les alertes de commande et
   les messages du formulaire de contact.

Tant que le domaine n'est pas vérifié, on peut tester avec l'expéditeur
`onboarding@resend.dev` (envoi limité à l'adresse du compte Resend).

---

## 4. Vercel (hébergement)

1. Créer un compte sur [vercel.com](https://vercel.com) et connecter le dépôt
   GitHub `mabelleplanche`.
2. Framework détecté : **Next.js**. Aucun réglage de build à modifier.
3. Saisir toutes les variables d'environnement (section 0) pour
   « Production » (et « Preview » si besoin).
4. Déployer. Brancher les domaines `mabelleplanche.fr` et `mabelleplanche.eu`
   dans **Settings → Domains** (suivre les instructions DNS).
5. Après le premier déploiement : mettre à jour l'URL du webhook Stripe et les
   CORS Sanity avec le domaine de production.

---

## 5. Checklist avant ouverture

- [ ] `STRIPE_SECRET_KEY` en mode **live** sur Vercel + webhook live configuré
- [ ] Un achat test réel (petit montant) passe et déclenche les deux emails
- [ ] Photos réelles ajoutées pour chaque planche dans le Studio
- [ ] **Réglages du site** complétés (SIRET, adresse, hébergeur, frais de port)
- [ ] CGV, mentions légales et politique de confidentialité relues et adaptées
- [ ] Logo définitif en place (`src/components/Logo.tsx` + fichier dans `/public`)
- [ ] Mentions « fait main », délais de préparation et politique de retour
      cohérentes avec votre organisation
- [ ] Page `/contact` : l'email arrive bien
- [ ] Test sur mobile (Instagram/TikTok → navigateur intégré)

---

## Fonctionnalités prévues « plus tard » (V2)

Compte client et historique, codes promo, avis clients, personnalisation
(gravure), livraison internationale. L'architecture actuelle permet de les
ajouter sans tout refondre.
