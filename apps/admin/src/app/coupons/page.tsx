"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

export default function CouponsPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [value, setValue] = useState("10");
  const [type, setType] = useState<"percent" | "fixed">("percent");

  async function load() {
    const data = await adminFetch<{ items: Array<Record<string, unknown>> }>(
      "/api/v1/admin/coupons",
    );
    setItems(data.items);
  }

  useEffect(() => {
    void load().catch((e: Error) => setError(e.message));
  }, []);

  async function createCoupon(e: React.FormEvent) {
    e.preventDefault();
    try {
      await adminFetch("/api/v1/admin/coupons", {
        method: "POST",
        body: JSON.stringify({
          code,
          discountType: type,
          discountValue: Number(value),
        }),
      });
      setCode("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  }

  return (
    <section>
      <h1>Coupons</h1>
      {error ? <p className="error">{error}</p> : null}
      <form className="form row" onSubmit={createCoupon}>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="CODE" required />
        <select value={type} onChange={(e) => setType(e.target.value as "percent" | "fixed")}>
          <option value="percent">Percent</option>
          <option value="fixed">Fixed</option>
        </select>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" />
        <button className="btn" type="submit">
          Create
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Type</th>
            <th>Value</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={String(c.id)}>
              <td>{String(c.code)}</td>
              <td>{String(c.discountType)}</td>
              <td>{String(c.discountValue)}</td>
              <td>{String(c.isActive)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
