import Link from "next/link";
import { apiGet } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
};

export default async function StorePage() {
  let items: Product[] = [];
  try {
    const data = await apiGet<{ items: Product[] }>("/api/v1/products");
    items = data.items;
  } catch {
    items = [];
  }

  return (
    <section>
      <h1>Store</h1>
      <p className="muted">Live products from Supabase</p>
      <div className="grid" style={{ marginTop: "1.5rem" }}>
        {items.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="card">
            {p.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
            ) : (
              <div style={{ height: 160, background: "#e7efe9" }} />
            )}
            <h2>{p.name}</h2>
            <p className="price">₹{p.price}</p>
          </Link>
        ))}
        {items.length === 0 && (
          <p className="muted">No products available. Start the API with DATABASE_URL configured.</p>
        )}
      </div>
    </section>
  );
}
