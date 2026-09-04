import { formatEuros } from "@/lib/format";

export function PriceTag({
  amount,
  className = "",
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span className={`font-serif tabular-nums ${className}`}>
      {formatEuros(amount)}
    </span>
  );
}
