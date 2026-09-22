"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Signed in.");
    router.push("/");
  }

  async function google() {
    await supabaseBrowser().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
  }

  return (
    <section>
      <h1>Admin login</h1>
      <p>Use a Supabase user that has the <code>admin</code> role in <code>user_roles</code>.</p>
      <form className="form" onSubmit={onSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="btn" type="submit">
          Sign in
        </button>
      </form>
      <p>
        <button className="btn secondary" type="button" onClick={google}>
          Continue with Google
        </button>
      </p>
      {message ? <p>{message}</p> : null}
    </section>
  );
}
