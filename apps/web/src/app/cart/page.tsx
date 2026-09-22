"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { apiSend } from "@/lib/api";

type CartItem = {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  quantity: number;
  price: string;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      const access = data.session?.access_token ?? null;
      setToken(access);
      if (!access) {
        setError("Login required.");
        return;
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/v1/cart/items`,
          { headers: { authorization: `Bearer ${access}` }, cache: "no-store" },
        );
        const json = await res.json();
        if (!json.success) throw new Error(json.error?.message);
        setItems(json.data.items);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load cart");
      }
    })();
  }, []);

  async function checkout() {
    if (!token) return;
    try {
      const order = await apiSend<{ order: { id: string } }>(
        "/api/v1/checkout",
        "POST",
        {
          shippingAddress: {
            fullName: "Customer",
            line1: "Address pending",
            city: "City",
            state: "State",
            postalCode: "000000",
            country: "IN",
          },
        },
        token,
      );
      const payment = await apiSend<{ action: string; fields: Record<string, string> }>(
        "/api/v1/payments/payu/initiate",
        "POST",
        { orderId: order.order.id },
        token,
      );
      const form = document.createElement("form");
      form.method = "POST";
      form.action = payment.action;
      for (const [k, v] of Object.entries(payment.fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = v;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
    }
  }

  return (
    <section>
      <h1>Cart</h1>
      {error ? <p className="muted">{error}</p> : null}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/products/${item.productSlug}`}>{item.productName}</Link>{" "}
            × {item.quantity} — ₹{item.price}
          </li>
        ))}
      </ul>
      {items.length > 0 ? (
        <button className="btn" type="button" onClick={checkout}>
          Checkout with PayU
        </button>
      ) : null}
    </section>
  );
}
