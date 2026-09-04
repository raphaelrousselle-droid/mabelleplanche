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
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl text-ecorce sm:text-4xl">Nous écrire</h1>
      <p className="mt-3 text-brou">
        Une question sur une planche, une commande en cours, l&apos;entretien du
        bois ou une demande particulière ? Écrivez-nous, nous répondons sous 2 à
        3 jours ouvrés.
      </p>
      <p className="mt-2 text-sm text-brou">
        Par email :{" "}
        <a
          href={`mailto:${settings.contactEmail}`}
          className="text-chene-fonce underline"
        >
          {settings.contactEmail}
        </a>
      </p>

      <div className="relative mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
