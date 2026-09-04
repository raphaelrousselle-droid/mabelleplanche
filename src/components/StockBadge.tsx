export function StockBadge({ inStock }: { inStock: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        inStock
          ? "bg-olive/15 text-olive"
          : "bg-ecorce/10 text-brou"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-olive" : "bg-brou"}`}
      />
      {inStock ? "En stock" : "Épuisé"}
    </span>
  );
}
