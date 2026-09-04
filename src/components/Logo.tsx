import Link from "next/link";

/**
 * Logotype provisoire « Ma belle planche ».
 * Remplacer par le logo fourni : déposer un fichier dans /public et
 * échanger le markup ci-dessous par une <Image> ou un <svg> inline.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Ma belle planche — accueil"
      className={`inline-flex items-baseline gap-2 ${className}`}
    >
      <span className="font-serif text-xl font-semibold tracking-tight text-ecorce sm:text-2xl">
        Ma belle planche
      </span>
    </Link>
  );
}
