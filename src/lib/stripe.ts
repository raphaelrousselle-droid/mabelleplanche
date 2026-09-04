import "server-only";

import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

/**
 * Client Stripe côté serveur. La clé secrète n'est pas incluse dans le dépôt :
 * la renseigner dans `.env.local` (STRIPE_SECRET_KEY). Sans elle, les routes
 * de paiement renvoient une erreur explicite au lieu de planter au démarrage.
 */
export const stripe = secretKey ? new Stripe(secretKey) : null;

export function assertStripe(): Stripe {
  if (!stripe) {
    throw new Error(
      "STRIPE_SECRET_KEY manquante : ajoutez la clé secrète Stripe dans .env.local.",
    );
  }
  return stripe;
}
