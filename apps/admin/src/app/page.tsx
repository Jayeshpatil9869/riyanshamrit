"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

type Stats = {
  products: number;
  orders: number;
  customers: number;
  paidRevenue: string;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void adminFetch<Stats>("/api/v1/admin/dashboard")
      .then(setStats)
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section>
      <h1>Dashboard</h1>
      {error ? <p className="error">{error}</p> : null}
      {stats ? (
        <div className="cards">
          <div className="card">
            Products<strong>{stats.products}</strong>
          </div>
          <div className="card">
            Orders<strong>{stats.orders}</strong>
          </div>
          <div className="card">
            Customers<strong>{stats.customers}</strong>
          </div>
          <div className="card">
            Paid revenue<strong>₹{stats.paidRevenue}</strong>
          </div>
        </div>
      ) : !error ? (
        <p>Loading…</p>
      ) : null}
      <p>
        Storefront: <code>http://localhost:3000</code> · Admin:{" "}
        <code>http://localhost:3050</code> · API:{" "}
        <code>http://localhost:4000</code>
      </p>
    </section>
  );
}
