import type { Metadata } from "next";

import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de Ma belle planche.",
};

export default function Page() {
  return <LegalPageView slug="cgv" />;
}
