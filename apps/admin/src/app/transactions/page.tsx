"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

export default function TransactionsPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void adminFetch<{ items: Array<Record<string, unknown>> }>(
      "/api/v1/admin/transactions",
    )
      .then((d) => setItems(d.items))
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section>
      <h1>Transactions</h1>
      {error ? <p className="error">{error}</p> : null}
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Amount</th>
            <th>Method</th>
            <th>PayU txn</th>
            <th>mihpayid</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={String(t.id)}>
              <td>{String(t.status)}</td>
              <td>
                ₹{String(t.amount)} {String(t.currency ?? "")}
              </td>
              <td>{String(t.paymentMethod ?? "-")}</td>
              <td>{String(t.payuTxnId ?? "-")}</td>
              <td>{String(t.mihpayId ?? "-")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
