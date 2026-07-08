import { Metadata } from "next";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/seo";
import MultiStepQuoteForm from "@/components/quote/MultiStepQuoteForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/shared/Logo";

export const metadata: Metadata = constructMetadata({
  title: "Book Your Event | WE Ice Cream Truck",
  description: "Book your ice cream truck or van experience for any event in Massachusetts. Easy online booking in just a few steps.",
  url: "/book",
});

function BookingLoading() {
  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-12 flex items-center justify-center min-h-[600px]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading your booking form...</p>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sand/30 to-cream flex flex-col relative pb-24 md:pb-0">
      {/* Distraction-free header */}
      <header className="w-full py-5 px-4 md:px-8 border-b border-navy/5 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <Link
          href="/packages"
          className="inline-flex items-center text-navy font-bold hover:text-coral transition-colors gap-2"
        >
          <ArrowLeft size={18} />
          Back to Packages
        </Link>
        <Link href="/" className="flex items-center gap-3">
          <Logo className="w-10 h-10 md:w-12 md:h-12 scale-[0.85]" />
          <div className="hidden md:block">
            <div className="text-[14px] font-black text-navy leading-none">WE Ice Cream</div>
            <div className="text-[10px] font-bold text-coral tracking-wide uppercase">Book Your Event</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 font-medium">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Secure Booking
        </div>
        <div className="md:hidden w-32" /> {/* spacer for mobile */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 md:px-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-display font-black text-navy mb-3">
              Book Your <span className="text-coral">Sweet</span> Experience
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
              Fill out this quick form to check availability and get a customized quote for your celebration.
            </p>
          </div>

          <Suspense fallback={<BookingLoading />}>
            <MultiStepQuoteForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
