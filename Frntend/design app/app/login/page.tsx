"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);
      window.dispatchEvent(new Event("storage"));
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div className="pointer-events-none fixed -right-24 -top-24 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none fixed -bottom-12 -left-12 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 grid w-full max-w-[900px] grid-cols-2 animate-fade-in shadow-2xl">
        {/* Left panel */}
        <div
          className="flex flex-col justify-between border border-r-0 border-[rgba(212,175,55,0.2)] bg-[linear-gradient(135deg,#1a1408_0%,#0d0d0d_100%)] p-14"
          style={{ borderRadius: "2px 0 0 2px" }}
        >
          <span
            className="text-[#d4af37] tracking-[0.15em] uppercase"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "22px" }}
          >
            CelestineElite
          </span>

          <div>
            <div className="mb-6 h-px w-10 bg-[#d4af37]" />
            <h1
              className="mb-4 text-[42px] leading-tight text-[#f5f0e8]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Curated for the{" "}
              <em className="text-[#d4af37]">discerning</em> few.
            </h1>
            <p className="text-sm font-light leading-relaxed text-white/40">
              Access your personal account and explore our exclusive collection
              of premium products.
            </p>
          </div>

          <span className="text-xs uppercase tracking-widest text-white/20">
            Est. 2024 · Premium Collection
          </span>
        </div>

        {/* Right panel */}
        <div
          className="flex flex-col justify-center gap-6 border border-white/[0.06] bg-[#111111] p-14"
          style={{ borderRadius: "0 2px 2px 0" }}
        >
          <div>
            <h2
              className="mb-1 text-[28px] text-[#f5f0e8]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Welcome back
            </h2>
            <p className="text-[13px] font-light text-white/35">
              Sign in to continue to your account
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-widest text-white/40">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-sm border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-[#f5f0e8] placeholder-white/20 outline-none transition focus:border-[rgba(212,175,55,0.5)] focus:bg-[rgba(212,175,55,0.04)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-widest text-white/40">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-[#f5f0e8] placeholder-white/20 outline-none transition focus:border-[rgba(212,175,55,0.5)] focus:bg-[rgba(212,175,55,0.04)]"
            />
            <div className="text-right text-[12px] text-[rgba(212,175,55,0.6)] cursor-pointer hover:text-[#d4af37] transition">
              Forgot password?
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-1 w-full rounded-sm bg-[#d4af37] py-4 text-[13px] font-semibold uppercase tracking-widest text-[#0a0a0a] transition hover:-translate-y-px hover:bg-[#e8c84a] hover:shadow-[0_8px_24px_rgba(212,175,55,0.2)] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="flex items-center gap-3 text-[11px] tracking-widest text-white/15">
            <span className="h-px flex-1 bg-white/[0.08]" />
            or
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <p className="text-center text-[13px] text-white/30">
                Don&apos;t have an account?{" "}
            <a href="/signup" className="font-medium text-[#d4af37] hover:opacity-80 transition">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}