import Image from "next/image";
import Link from "next/link";

/**
 * Logotype « Ma belle planche » : la marque (fournie par l'artisan, recadrée
 * dans /public/brand) associée au nom composé dans la typographie du site,
 * pour rester cohérent avec le reste de l'interface.
 * Fichier source complet (icône + nom tels que livrés) : /public/brand/logo-full.jpg
 */
export function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  const color = tone === "light" ? "var(--color-foret-clair)" : "var(--color-ecorce)";
  return (
    <Link
      href="/"
      aria-label="Ma belle planche — accueil"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-lg transition-transform duration-300 group-hover:-rotate-6 sm:h-9 sm:w-9">
        <Image
          src="/brand/mark.png"
          alt=""
          fill
          sizes="36px"
          className="object-cover"
          priority
        />
      </span>
      <span
        className="font-serif text-[1.15rem] font-medium leading-none tracking-tight sm:text-[1.3rem]"
        style={{ color }}
      >
        Ma belle planche
      </span>
    </Link>
  );
}
