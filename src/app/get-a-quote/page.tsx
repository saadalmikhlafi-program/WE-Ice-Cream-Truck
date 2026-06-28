import { Metadata } from "next";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/seo";
import MultiStepQuoteForm from "@/components/quote/MultiStepQuoteForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Get a Free Quote | WE Ice Cream Truck",
  description: "Book Massachusetts' premium ice cream truck for your next event. Fill out our quick 2-minute form for instant pricing and availability.",
  url: "/get-a-quote",
});

function QuoteFormLoading() {
  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-12 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading your quote form...</p>
      </div>
    </div>
  );
}

export default function GetAQuotePage() {
  return (
    <div className="min-h-screen bg-sand flex flex-col relative pb-24 md:pb-0">
      {/* Distraction-free header */}
      <header className="w-full py-6 px-4 md:px-8 absolute top-0 left-0 z-10 flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center text-charcoal font-bold hover:text-coral transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="hidden md:block text-charcoal font-display font-bold text-xl tracking-tight">
          WE ICE CREAM <span className="text-coral">TRUCK</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 md:px-8">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
              Let&apos;s Plan Your Event
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Fill out this quick form to check availability and get a customized quote for your celebration.
            </p>
          </div>

          <Suspense fallback={<QuoteFormLoading />}>
            <MultiStepQuoteForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
