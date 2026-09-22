"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  async function load() {
    const data = await adminFetch<{ items: Category[] }>("/api/v1/admin/categories");
    setItems(data.items);
  }

  useEffect(() => {
    void load().catch((e: Error) => setError(e.message));
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    try {
      await adminFetch("/api/v1/admin/categories", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ name: "", slug: "", description: "" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  }

  return (
    <section>
      <h1>Categories</h1>
      {error ? <p className="error">{error}</p> : null}
      <form className="form" onSubmit={create}>
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
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="btn" type="submit">
          Create category
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.slug}</td>
              <td>{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
