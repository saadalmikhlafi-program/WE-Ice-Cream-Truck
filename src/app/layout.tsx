import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { BUSINESS_CONFIG } from "@/lib/config";
import { constructMetadata } from "@/lib/seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import FloatingQuoteButton from "@/components/layout/FloatingQuoteButton";
import { Providers } from "./providers";
import SplashScreen from "@/components/shared/SplashScreen";
import FlavorBlobs from "@/components/shared/FlavorBlobs";

// ─── FONTS ──────────────────────────────────────────────────────────

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// ─── METADATA ───────────────────────────────────────────────────────

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: "#FFFBF5", // color-cream
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── LAYOUT ─────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${outfit.variable} font-sans bg-cream text-charcoal antialiased min-h-screen flex flex-col relative`}
      >
        <FlavorBlobs />
        <SplashScreen />
        <SiteHeader />
        
        <main className="flex-1 flex flex-col w-full pt-[88px] z-10">
          <Providers>{children}</Providers>
        </main>

        <SiteFooter />
        <MobileBottomNav />
        <FloatingQuoteButton />
      </body>
    </html>
  );
}
