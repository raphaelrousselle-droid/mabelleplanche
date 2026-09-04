import { groq } from "next-sanity";

const productFields = groq`
  "id": _id,
  "slug": slug.current,
  title,
  price,
  "images": images[]{ "url": asset->url, "alt": coalesce(alt, "") },
  shortDescription,
  description,
  dimensions,
  woodEssence,
  care,
  "inStock": coalesce(inStock, true),
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
