import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { essence } from "./essence";
import { legalPage } from "./legalPage";
import { product } from "./product";
import { productVariant } from "./productVariant";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  productVariant,
  essence,
  siteSettings,
  aboutPage,
  legalPage,
];
