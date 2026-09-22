"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

export default function ActivityPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void adminFetch<{ items: Array<Record<string, unknown>> }>("/api/v1/admin/activity")
      .then((d) => setItems(d.items))
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section>
      <h1>Activity</h1>
      {error ? <p className="error">{error}</p> : null}
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Entity</th>
            <th>Description</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={String(a.id)}>
              <td>{String(a.action)}</td>
              <td>
                {String(a.entityType ?? "")} {String(a.entityId ?? "").slice(0, 8)}
              </td>
              <td>{String(a.description)}</td>
              <td>{String(a.createdAt ?? "")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
