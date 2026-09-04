const eurFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

/** Formate un montant en euros : 74.9 -> "74,90 €" */
export function formatEuros(amount: number): string {
  return eurFormatter.format(amount);
}

/** Convertit des euros en centimes pour Stripe : 74.9 -> 7490 */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}
