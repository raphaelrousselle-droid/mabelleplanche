import { formatEuros } from "@/lib/format";

export function PriceTag({
  amount,
  prefix,
  className = "",
}: {
  amount: number;
  /** Ex. "dès " quand le prix varie selon l'essence choisie. */
  prefix?: string;
  className?: string;
}) {
  return (
    <span className={`font-serif tabular-nums ${className}`}>
      {prefix}
      {formatEuros(amount)}
    </span>
  );
}
