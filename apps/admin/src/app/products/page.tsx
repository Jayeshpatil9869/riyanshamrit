"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  stockQuantity: number | null;
  isActive: boolean | null;
  isFeatured: boolean | null;
  description: string | null;
};

const empty = {
  name: "",
  slug: "",
  price: "1199",
  stockQuantity: "100",
  description: "",
  isFeatured: false,
};

export default function ProductsAdminPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const data = await adminFetch<{ items: Product[] }>("/api/v1/admin/products");
    setItems(data.items);
  }

  useEffect(() => {
    void load().catch((e: Error) => setError(e.message));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      const body = {
        name: form.name,
        slug: form.slug,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        description: form.description || undefined,
        isFeatured: form.isFeatured,
      };
      if (editingId) {
        await adminFetch(`/api/v1/admin/products/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
        setOk("Product updated");
      } else {
        await adminFetch("/api/v1/admin/products", {
          method: "POST",
          body: JSON.stringify(body),
        });
        setOk("Product created");
      }
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function deactivate(id: string) {
    setError("");
    try {
      await adminFetch(`/api/v1/admin/products/${id}`, { method: "DELETE" });
      setOk("Product deactivated");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      price: String(p.price),
      stockQuantity: String(p.stockQuantity ?? 0),
      description: p.description ?? "",
      isFeatured: Boolean(p.isFeatured),
    });
  }

  return (
    <section>
      <h1>Products</h1>
      {error ? <p className="error">{error}</p> : null}
      {ok ? <p className="ok">{ok}</p> : null}
      <form className="form" onSubmit={save}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
        />
        <div className="form row">
          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            placeholder="Stock"
            value={form.stockQuantity}
            onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
          />
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
        />
        <label>
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
          />{" "}
          Featured
        </label>
        <div className="actions">
          <button className="btn" type="submit">
            {editingId ? "Update product" : "Create product"}
          </button>
          {editingId ? (
            <button
              className="btn secondary"
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(empty);
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Active</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.slug}</td>
              <td>₹{p.price}</td>
              <td>{p.stockQuantity}</td>
              <td>{String(p.isActive)}</td>
              <td className="actions">
                <button className="btn secondary" type="button" onClick={() => startEdit(p)}>
                  Edit
                </button>
                <button className="btn danger" type="button" onClick={() => deactivate(p.id)}>
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
