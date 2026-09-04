import { groq } from "next-sanity";

const variantFields = groq`
  "essenceSlug": essence->slug.current,
  "essenceName": essence->name,
  "swatch": essence->swatch,
  "price": coalesce(priceOverride, ^.basePrice),
  "inStock": coalesce(inStock, true),
  "images": images[]{ "url": asset->url, "alt": coalesce(alt, "") }
`;

const productFields = groq`
  "id": _id,
  "slug": slug.current,
  title,
  basePrice,
  "images": images[]{ "url": asset->url, "alt": coalesce(alt, "") },
  "variants": variants[]{ ${variantFields} },
  shortDescription,
  description,
  dimensions,
  care,
  "featured": coalesce(featured, false)
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(coalesce(orderRank, title) asc) {
    ${productFields}
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(coalesce(orderRank, title) asc) {
    ${productFields}
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;

export const productByIdQuery = groq`
  *[_type == "product" && _id == $id][0] {
    ${productFields}
  }
`;

export const allEssencesQuery = groq`
  *[_type == "essence"] | order(name asc) {
    "id": _id,
    "slug": slug.current,
    name,
    swatch,
    shortDescription,
    description,
    "image": image{ "url": asset->url, "alt": coalesce(alt, "") }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    legalStatus,
    siret,
    address,
    hostingInfo,
    contactEmail,
    notificationEmail,
    instagramUrl,
    tiktokUrl,
    "shipping": {
      "label": shippingLabel,
      "amount": shippingAmount,
      "freeThreshold": shippingFreeThreshold
    },
    "workshopImageUrl": workshopImage.asset->url,
    workshopVideoUrl
  }
`;

export const aboutQuery = groq`
  *[_type == "aboutPage"][0] {
    title,
    intro,
    body,
    "images": images[]{ "url": asset->url, "alt": coalesce(alt, "") },
    videoUrl
  }
`;

export const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    "updatedAt": coalesce(updatedAt, _updatedAt),
    body
  }
`;
