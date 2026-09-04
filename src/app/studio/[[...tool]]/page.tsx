"use client";

/**
 * Sanity Studio intégré, servi sur /studio.
 * Tant que NEXT_PUBLIC_SANITY_PROJECT_ID n'est pas défini, cette page affiche
 * une erreur de configuration Sanity — c'est attendu : le site public, lui,
 * fonctionne sur les données de démonstration.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
