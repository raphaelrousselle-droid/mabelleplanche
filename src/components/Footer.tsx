import Link from "next/link";

import { getSiteSettings } from "@/lib/store";

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-bordure bg-creme">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-ecorce">{settings.companyName}</p>
          <p className="mt-2 max-w-xs text-sm text-brou">
            Planches à découper en bois massif, fabriquées à la main en France.
          </p>
        </div>

        <nav className="text-sm">
          <p className="mb-3 font-semibold text-ecorce">La boutique</p>
          <ul className="space-y-2 text-brou">
            <li><Link href="/catalogue" className="hover:text-chene">Catalogue</Link></li>
            <li><Link href="/a-propos" className="hover:text-chene">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-chene">Contact</Link></li>
          </ul>
        </nav>

        <nav className="text-sm">
          <p className="mb-3 font-semibold text-ecorce">Informations</p>
          <ul className="space-y-2 text-brou">
            <li><Link href="/cgv" className="hover:text-chene">Conditions générales de vente</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-chene">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-chene">Confidentialité</Link></li>
          </ul>
          {(settings.instagramUrl || settings.tiktokUrl) && (
            <ul className="mt-3 flex gap-4 text-brou">
              {settings.instagramUrl && (
                <li><a href={settings.instagramUrl} className="hover:text-chene" rel="me noreferrer" target="_blank">Instagram</a></li>
              )}
              {settings.tiktokUrl && (
                <li><a href={settings.tiktokUrl} className="hover:text-chene" rel="me noreferrer" target="_blank">TikTok</a></li>
              )}
            </ul>
          )}
        </nav>
      </div>

      <div className="border-t border-bordure px-4 py-4 text-center text-xs text-brou sm:px-6">
        © {year} {settings.companyName}. Livraison en France métropolitaine. Paiement sécurisé par Stripe.
      </div>
    </footer>
  );
}
