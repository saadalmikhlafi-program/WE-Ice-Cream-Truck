"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/Logo";

function LoginForm() {
  const [email, setEmail] = useState("saadmoad2004@gmail.com");
  const [password, setPassword] = useState("Kals123456##");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else if (res?.url) {
        router.push(res.url);
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
            placeholder="admin@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-navy ml-1">Password</label>
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
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-coral/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-navy/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo variant="dark" />
          </div>
          <h1 className="font-display font-black text-3xl text-navy mb-2">Admin Portal</h1>
          <p className="text-gray-500 font-medium">Sign in to manage WE Ice Cream Truck</p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin text-coral" size={32} /></div>}>
          <LoginForm />
        </Suspense>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} WE Ice Cream Truck
          </p>
        </div>
      </div>
    </div>
  );
}
