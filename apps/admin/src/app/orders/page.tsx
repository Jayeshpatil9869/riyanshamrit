"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

type Order = {
  id: string;
  status: string;
  totalAmount: string;
  payuStatus: string | null;
  payuTxnId: string | null;
  createdAt: string | null;
};

const STATUSES = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
] as const;

export default function OrdersAdminPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const data = await adminFetch<{ items: Order[] }>("/api/v1/admin/orders");
    setItems(data.items);
  }

  useEffect(() => {
    void load().catch((e: Error) => setError(e.message));
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      await adminFetch(`/api/v1/admin/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  return (
    <section>
      <h1>Orders</h1>
      {error ? <p className="error">{error}</p> : null}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Total</th>
            <th>PayU</th>
            <th>Txn</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {items.map((o) => (
            <tr key={o.id}>
              <td>{o.id.slice(0, 8)}</td>
              <td>{o.status}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.payuStatus ?? "-"}</td>
              <td>{o.payuTxnId ?? "-"}</td>
              <td>
                <select
                  defaultValue={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
