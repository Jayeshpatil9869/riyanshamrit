export type ProductSeoInput = {
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  price: string | number;
  baseUrl: string;
};

export function productJsonLd(input: ProductSeoInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description ?? undefined,
    image: input.imageUrl ?? undefined,
    url: `${input.baseUrl.replace(/\/$/, "")}/products/${input.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(input.price),
      availability: "https://schema.org/InStock",
    },
  };
}

export function organizationJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Riyansh Amrit",
    url: baseUrl,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
