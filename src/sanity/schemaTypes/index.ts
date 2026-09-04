import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { legalPage } from "./legalPage";
import { product } from "./product";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  siteSettings,
  aboutPage,
  legalPage,
];
