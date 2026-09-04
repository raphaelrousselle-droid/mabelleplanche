import type { RichBlock } from "@/lib/types";

type PortableTextSpan = { _type: "span"; text?: string };
type PortableTextBlock = {
  _type: string;
  style?: string;
  listItem?: string;
  children?: PortableTextSpan[];
};

/**
 * Convertit un tableau Portable Text (Sanity) vers notre format `RichBlock[]`
 * simplifié, utilisé aussi bien par les données de démonstration que par le CMS.
 * Les puces consécutives sont regroupées dans un seul bloc `bullets`.
 */
export function portableTextToRichBlocks(
  input: unknown,
): RichBlock[] {
  if (!Array.isArray(input)) return [];
  const blocks = input as PortableTextBlock[];
  const out: RichBlock[] = [];

  for (const block of blocks) {
    if (block?._type !== "block") continue;
    const text = (block.children ?? [])
      .map((child) => child?.text ?? "")
      .join("")
      .trim();
    if (!text) continue;

    if (block.listItem === "bullet") {
      const last = out[out.length - 1];
      if (last && last.style === "bullets") {
        last.items.push(text);
      } else {
        out.push({ style: "bullets", items: [text] });
      }
      continue;
    }

    const style = block.style === "h2" || block.style === "h3" ? block.style : "normal";
    out.push({ style, text });
  }

  return out;
}
