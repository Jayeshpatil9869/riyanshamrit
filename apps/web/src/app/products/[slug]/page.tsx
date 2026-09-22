import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { AddToCartButton } from "./add-to-cart-button";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  stockQuantity: number | null;
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const seo = await apiGet<{
      title?: string;
      description?: string | null;
      canonicalUrl?: string;
      ogImage?: string | null;
    }>(`/api/v1/seo/products/${slug}`);
    return {
      title: seo.title,
      description: seo.description ?? undefined,
      alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
      openGraph: {
        title: seo.title,
        description: seo.description ?? undefined,
        images: seo.ogImage ? [seo.ogImage] : undefined,
      },
    };
  } catch {
    return { title: slug };
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  let product: Product;
  try {
    product = await apiGet<Product>(`/api/v1/products/${slug}`);
  } catch {
    notFound();
  }

  return (
    <section className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
      <div className="card">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} style={{ width: "100%" }} />
        ) : (
          <div style={{ height: 320, background: "#e7efe9" }} />
        )}
      </div>
      <div>
        <h1>{product.name}</h1>
        <p className="price" style={{ fontSize: "1.5rem" }}>
          ₹{product.price}
        </p>
        <p className="muted">{product.description}</p>
        <p className="muted">In stock: {product.stockQuantity ?? 0}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </section>
  );
}
