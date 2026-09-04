export const apiVersion = "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * Le site fonctionne sans Sanity : dans ce cas la couche `store.ts` sert les
 * données de démonstration. Dès qu'un projectId est fourni, on interroge le CMS.
 */
export const isSanityConfigured = projectId.length > 0;

export const readToken = process.env.SANITY_API_READ_TOKEN || "";
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || "";
