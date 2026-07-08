"use client";
import { usePathname } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import FloatingQuoteButton from "@/components/layout/FloatingQuoteButton";
import SplashScreen from "@/components/shared/SplashScreen";
import FlavorBlobs from "@/components/shared/FlavorBlobs";
import ScrollToTop from "@/components/shared/ScrollToTop";

/** Routes where the public site chrome (header, footer, blobs) are hidden */
const ADMIN_PREFIXES = ["/admin", "/login", "/book", "/get-a-quote"];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = ADMIN_PREFIXES.some(p => pathname.startsWith(p));

  if (isAdminRoute) {
    // Admin pages get NO public chrome — just children
    return <>{children}</>;
  }

  // Public site pages get the full chrome
  return (
    <>
      <FlavorBlobs />
      <SplashScreen />
      <SiteHeader />
      <main className="flex-1 flex flex-col w-full z-10">
        <ScrollToTop />
        {children}
      </main>
      <SiteFooter />
      <MobileBottomNav />
      <FloatingQuoteButton />
    </>
  );
}
