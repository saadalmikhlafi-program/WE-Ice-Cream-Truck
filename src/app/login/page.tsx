"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  // Default callback to /portal for customers, but if admin, nextauth or middleware usually redirects them to /admin.
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        // We need to fetch the session to know where to redirect
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        
        if (sessionData?.user?.role === "CUSTOMER") {
          router.push(callbackUrl);
        } else {
          router.push(searchParams.get("callbackUrl") || "/admin");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-navy/5 border border-navy/5 space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-bold text-navy ml-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all text-navy font-medium"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
          <label className="text-sm font-bold text-navy">Password</label>
          <Link href="/forgot-password" className="text-sm text-coral font-bold hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all text-navy font-medium"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-navy text-white rounded-2xl font-black text-lg hover:bg-coral hover:shadow-xl hover:shadow-coral/20 transition-all duration-300 disabled:opacity-70 disabled:hover:bg-navy disabled:hover:shadow-none flex items-center justify-center gap-2 group mt-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={24} />
        ) : (
          <>
            Sign In
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
      
      <p className="text-center text-gray-500 font-medium text-sm mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="text-navy font-bold hover:text-coral transition-colors">
          Create an Account
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden font-sans pt-20 pb-12">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-coral/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-navy/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Logo variant="dark" />
            </Link>
          </div>
          <h1 className="font-display font-black text-3xl text-navy mb-2">Welcome Back</h1>
          <p className="text-gray-500 font-medium">Sign in to book and manage your events</p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin text-coral" size={32} /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
