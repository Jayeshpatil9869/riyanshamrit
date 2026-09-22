"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { apiSend } from "@/lib/api";

export function AddToCartButton({ productId }: { productId: string }) {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    setMsg("");
    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setMsg("Please log in first.");
        return;
      }
      await apiSend("/api/v1/cart/items", "POST", { productId, quantity: 1 }, token);
      setMsg("Added to cart.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button className="btn" disabled={loading} onClick={onClick} type="button">
        {loading ? "Adding…" : "Add to cart"}
      </button>
      {msg ? <p className="muted">{msg}</p> : null}
    </div>
  );
}
