import type { Metadata } from "next";

import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Ma belle planche collecte et protège vos données personnelles.",
};

export default function Page() {
  return <LegalPageView slug="confidentialite" />;
}
