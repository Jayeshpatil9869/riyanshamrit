import React, { useState } from "react";
import { useRouter } from "../../context/RouterContext";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Leaf, Lock, UserRound, ArrowRight, ShieldCheck } from "lucide-react";

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const { navigate } = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f5f4ef] text-[#1a1c18] flex items-center justify-center px-4 py-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 20%, rgba(218,197,167,0.45), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 80%, rgba(60,68,51,0.18), transparent 50%), linear-gradient(160deg, #f5f4ef 0%, #ebe8df 45%, #e3e0d4 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e1f1c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#1e1f1c] border border-[#dac5a7]/40 flex items-center justify-center shadow-lg">
            <span className="font-serif text-[#dac5a7] text-xl font-bold tracking-wide">
              RA
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1e1f1c] tracking-tight">
            Riyansh Amrit
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#3c4433]">
            Apothecary Admin Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm border border-[rgba(30,31,28,0.1)] rounded-3xl p-7 sm:p-8 shadow-[0_24px_60px_rgba(30,31,28,0.08)] space-y-5"
        >
          <div className="flex items-center gap-2 text-[#3c4433]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-widest font-semibold">
              Staff Sign In
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60">
              Username
            </label>
            <div className="relative">
              <UserRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#f5f4ef] border border-[rgba(30,31,28,0.1)] text-sm focus:outline-none focus:border-[#3c4433]"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#f5f4ef] border border-[rgba(30,31,28,0.1)] text-sm focus:outline-none focus:border-[#3c4433]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-700 bg-red-50 border border-red-100 rounded-2xl px-3.5 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#1e1f1c] hover:bg-[#3c4433] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Enter dispensary"}
            {!loading && <ArrowRight className="w-4 h-4 text-[#dac5a7]" />}
          </button>

          <p className="text-[11px] text-center text-[#1a1c18]/45 flex items-center justify-center gap-1.5 pt-1">
            <Leaf className="w-3 h-3 text-[#757d5c]" />
            Authorized staff only · Sangamner processing hub
          </p>
        </form>
      </div>
    </div>
  );
};
