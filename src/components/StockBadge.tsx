export function StockBadge({
  inStock,
  className = "",
}: {
  inStock: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
        inStock ? "text-olive" : "text-brou"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${
          inStock ? "bg-olive" : "bg-brou/60"
        }`}
      />
      {inStock ? "Disponible" : "Épuisé"}
    </span>
  );
}
