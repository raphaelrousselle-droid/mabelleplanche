import type { RichBlock } from "@/lib/types";

export function RichText({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="prose-mbp text-brou">
      {blocks.map((block, i) => {
        if (block.style === "bullets") {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.style === "h2") return <h2 key={i} className="text-ecorce">{block.text}</h2>;
        if (block.style === "h3") return <h3 key={i} className="text-ecorce">{block.text}</h3>;
        return <p key={i}>{block.text}</p>;
      })}
    </div>
  );
}
