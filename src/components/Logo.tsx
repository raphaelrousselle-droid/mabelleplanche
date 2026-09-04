import Link from "next/link";

/**
 * Logotype provisoire « Ma belle planche » : une marque (petite planche
 * stylisée) + le nom en serif. Remplacer par le logo fourni le moment venu
 * (déposer un fichier dans /public et échanger le markup ci-dessous).
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
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden
        className="shrink-0 transition-transform duration-300 group-hover:-rotate-6"
      >
        <rect
          x="4.5"
          y="1.5"
          width="17"
          height="23"
          rx="7"
          stroke={color}
          strokeWidth="1.6"
        />
        <circle cx="13" cy="6.4" r="1.7" fill={color} />
        <path
          d="M8 13.5c3.4-1.2 6.6-1.2 10 0M8 17.5c3.4-1.2 6.6-1.2 10 0"
          stroke={color}
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="font-serif text-[1.15rem] font-medium leading-none tracking-tight sm:text-[1.3rem]"
        style={{ color }}
      >
        Ma belle planche
      </span>
    </Link>
  );
}
