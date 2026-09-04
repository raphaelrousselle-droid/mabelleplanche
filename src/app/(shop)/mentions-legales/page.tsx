import type { Metadata } from "next";

import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales du site mabelleplanche.fr.",
};

export default function Page() {
  return <LegalPageView slug="mentions-legales" />;
}
