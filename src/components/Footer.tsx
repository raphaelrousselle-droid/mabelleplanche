import Link from "next/link";

import { Logo } from "@/components/Logo";
import { getSiteSettings } from "@/lib/store";

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 bg-foret text-foret-clair">
      <div className="wrap py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foret-clair/70">
              Planches à découper en bois massif, dessinées et façonnées à la
              main, une par une, dans l&apos;atelier.
            </p>
          </div>

          <nav className="text-sm">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foret-clair/50">
              La boutique
            </p>
            <ul className="space-y-2.5 text-foret-clair/85">
              <li><Link href="/catalogue" className="link-underline">Catalogue</Link></li>
              <li><Link href="/a-propos" className="link-underline">L&apos;atelier</Link></li>
              <li><Link href="/contact" className="link-underline">Contact</Link></li>
            </ul>
          </nav>

          <nav className="text-sm">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foret-clair/50">
              Informations
            </p>
            <ul className="space-y-2.5 text-foret-clair/85">
              <li><Link href="/cgv" className="link-underline">Conditions de vente</Link></li>
              <li><Link href="/mentions-legales" className="link-underline">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="link-underline">Confidentialité</Link></li>
            </ul>
            {(settings.instagramUrl || settings.tiktokUrl) && (
              <ul className="mt-4 flex gap-4 text-foret-clair/85">
                {settings.instagramUrl && (
                  <li><a href={settings.instagramUrl} className="link-underline" rel="me noreferrer" target="_blank">Instagram</a></li>
                )}
                {settings.tiktokUrl && (
                  <li><a href={settings.tiktokUrl} className="link-underline" rel="me noreferrer" target="_blank">TikTok</a></li>
                )}
              </ul>
            )}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-foret-clair/15 pt-6 text-xs text-foret-clair/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {settings.companyName}</span>
          <span>Livraison en France métropolitaine · Paiement sécurisé Stripe</span>
        </div>
      </div>
    </footer>
  );
}
