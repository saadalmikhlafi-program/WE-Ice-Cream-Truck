"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff, IceCream } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") || "/portal";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", { redirect: false, email, password });
      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        const sessionRes  = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        if (sessionData?.user?.role === "CUSTOMER") {
          router.push(callbackUrl);
        } else {
          router.push("/admin");
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-semibold">
          <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-xs">!</span>
          {error}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 block">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all text-slate-800 font-medium placeholder:text-slate-400 text-sm"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-700">Password</label>
          <Link href="/forgot-password" className="text-xs text-coral font-semibold hover:underline underline-offset-2">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all text-slate-800 font-medium placeholder:text-slate-400 text-sm"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-navy text-white rounded-xl font-black text-base hover:bg-coral transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 group shadow-lg shadow-navy/20 mt-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            Sign In
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-center text-slate-500 text-sm mt-2">
        Don't have an account?{" "}
        <Link href="/register" className="text-navy font-bold hover:text-coral transition-colors">
          Create Account
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* ── Left Panel: Branding ── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col items-center justify-center overflow-hidden bg-navy p-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }} />
        {/* Glowing orbs */}
        <div className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-coral/20 blur-[80px]" />
        <div className="absolute bottom-[15%] right-[10%] w-64 h-64 rounded-full bg-coral/15 blur-[80px]" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          {/* Logo circle */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-8 ring-4 ring-coral/30">
            <Image
              src="/images/we-icecream.jpg"
              alt="WE Ice Cream Truck"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <p className="text-coral font-black text-xs tracking-[0.4em] uppercase mb-3">Welcome Back</p>
          <h1 className="font-display font-black text-4xl text-white leading-tight mb-4">
            WE<span className="text-coral">.</span> Ice Cream<br />Truck
          </h1>
          <p className="text-white/60 font-medium text-sm leading-relaxed max-w-xs">
            Greater Boston's premium mobile ice cream truck service. Sign in to manage your bookings.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {["🍦 Premium Service", "📍 Greater Boston", "⚡ Instant Booking"].map(f => (
              <span key={f} className="px-3 py-1.5 bg-white/10 rounded-full text-white/80 text-xs font-semibold border border-white/10">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="w-full lg:flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-slate-50 relative flex-grow">
        {/* Mobile logo */}
        <div className="lg:hidden flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-navy/10 shadow-lg mb-3">
            <Image
              src="/images/we-icecream.jpg"
              alt="WE Ice Cream Truck"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-display font-black text-2xl text-navy">WE<span className="text-coral">.</span> Ice Cream Truck</p>
        </div>

        <div className="w-full max-w-sm">
          {/* Form header */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-navy tracking-tight">Sign in to your account</h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Enter your credentials to continue</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <Suspense fallback={<div className="flex justify-center p-6"><Loader2 className="animate-spin text-coral" size={28} /></div>}>
              <LoginForm />
            </Suspense>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            &copy; {new Date().getFullYear()} WE Ice Cream Truck LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
