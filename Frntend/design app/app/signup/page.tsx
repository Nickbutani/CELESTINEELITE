"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "", email: "", password: "", password2: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (form.password !== form.password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        const firstError = Object.values(data)[0];
        setError(Array.isArray(firstError) ? firstError[0] : String(firstError));
        return;
      }

      setSuccess("Account created! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-sm border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-[#f5f0e8] placeholder-white/20 outline-none transition focus:border-[rgba(212,175,55,0.5)] focus:bg-[rgba(212,175,55,0.04)]";

  const labelClass = "text-[11px] uppercase tracking-widest text-white/40";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none fixed -right-24 -top-24 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none fixed -bottom-12 -left-12 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 grid w-full max-w-[920px] grid-cols-[1fr_1.4fr] shadow-2xl animate-fade-in">
        {/* Left panel */}
        <div
          className="flex flex-col justify-between border border-r-0 border-[rgba(212,175,55,0.2)] bg-[linear-gradient(135deg,#1a1408_0%,#0d0d0d_100%)] p-12"
          style={{ borderRadius: "2px 0 0 2px" }}
        >
          <span className="text-[#d4af37] tracking-[0.15em] uppercase"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "20px" }}>
            CelestineElite
          </span>

          <div>
            <div className="mb-5 h-px w-10 bg-[#d4af37]" />
            <h1 className="mb-4 text-[36px] leading-tight text-[#f5f0e8]"
              style={{ fontFamily: "Playfair Display, serif" }}>
              Join the <em className="text-[#d4af37]">elite</em> circle.
            </h1>
            <p className="text-sm font-light leading-relaxed text-white/40">
              Create your account and unlock access to our curated world of premium products.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {[
                "Exclusive member-only collections",
                "Early access to new arrivals",
                "Personalised shopping experience",
                "Priority customer support",
              ].map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-[13px] font-light text-white/40">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <span className="text-[11px] uppercase tracking-widest text-white/20">
            Est. 2024 · Premium Collection
          </span>
        </div>

        {/* Right panel */}
        <div
          className="flex flex-col justify-center gap-5 border border-white/[0.06] bg-[#111111] p-12"
          style={{ borderRadius: "0 2px 2px 0" }}
        >
          <div>
            <h2 className="mb-1 text-[26px] text-[#f5f0e8]"
              style={{ fontFamily: "Playfair Display, serif" }}>
              Create an account
            </h2>
            <p className="text-[13px] font-light text-white/35">
              Fill in your details to get started
            </p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-[#d4af37]">{success}</p>}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>First name</label>
              <input type="text" placeholder="John" className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Last name</label>
              <input type="text" placeholder="Doe" className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Username</label>
            <input id="username" type="text" placeholder="johndoe"
              value={form.username} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Email address</label>
            <input id="email" type="email" placeholder="john@example.com"
              value={form.email} onChange={handleChange} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Password</label>
              <input id="password" type="password" placeholder="••••••••"
                value={form.password} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Confirm password</label>
              <input id="password2" type="password" placeholder="••••••••"
                value={form.password2} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <p className="text-[12px] leading-relaxed text-white/30">
            By creating an account you agree to our{" "}
            <a href="#" className="text-[rgba(212,175,55,0.7)] hover:text-[#d4af37] transition">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-[rgba(212,175,55,0.7)] hover:text-[#d4af37] transition">Privacy Policy</a>.
          </p>

          <button onClick={handleSignup} disabled={loading}
            className="w-full rounded-sm bg-[#d4af37] py-4 text-[13px] font-semibold uppercase tracking-widest text-[#0a0a0a] transition hover:-translate-y-px hover:bg-[#e8c84a] hover:shadow-[0_8px_24px_rgba(212,175,55,0.2)] disabled:opacity-60">
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <div className="flex items-center gap-3 text-[11px] tracking-widest text-white/15">
            <span className="h-px flex-1 bg-white/[0.08]" />or
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <p className="text-center text-[13px] text-white/30">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-[#d4af37] hover:opacity-80 transition">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}