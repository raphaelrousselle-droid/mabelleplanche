import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question sur une planche, une commande ou l'entretien du bois ? Écrivez à l'atelier Ma belle planche.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="wrap grid gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-20">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-4">Nous écrire</h1>
        <p className="mt-6 text-lg text-brou">
          Une question sur une planche, une commande en cours, l&apos;entretien
          du bois ou une demande particulière ? Nous répondons sous 2 à 3 jours
          ouvrés.
        </p>
        <p className="mt-6 text-sm text-brou">
          Directement par email :{" "}
          <a
            href={`mailto:${settings.contactEmail}`}
            className="text-chene-fonce link-underline"
          >
            {settings.contactEmail}
          </a>
        </p>
      </div>

      <div className="relative">
        <ContactForm />
      </div>
    </div>
  );
}
