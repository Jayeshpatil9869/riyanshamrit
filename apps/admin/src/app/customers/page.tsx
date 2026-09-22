"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

export default function CustomersPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void adminFetch<{ items: Array<Record<string, unknown>> }>("/api/v1/admin/customers")
      .then((d) => setItems(d.items))
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section>
      <h1>Customers</h1>
      {error ? <p className="error">{error}</p> : null}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {items.map((u) => (
            <tr key={String(u.id)}>
              <td>{String(u.email)}</td>
              <td>{String(u.fullName ?? "")}</td>
              <td>{String(u.phone ?? "")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
