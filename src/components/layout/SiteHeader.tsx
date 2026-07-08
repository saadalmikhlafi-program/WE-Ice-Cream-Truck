"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserCircle2, ChevronDown } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { getAllServices } from "@/lib/services-data";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Reset immediately on route change to prevent flash
    setIsScrolled(false);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Check initial scroll position after a slight delay to allow Next.js to scroll to top first
    const timer = setTimeout(() => {
      handleScroll();
    }, 50);
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  const services = getAllServices();
  const topServices = services.slice(0, 6); // Show top 6 services in dropdown

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Menu", href: "/menu" },
    { label: "Packages", href: "/packages" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-cream/90 backdrop-blur-xl shadow-sm border-b border-navy/5 py-3"
          : "bg-transparent py-5 md:py-6"
      )}
    >
      <div suppressHydrationWarning className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="z-50">
          <Logo variant="dark" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 xl:gap-2">
          {/* Home, About, Menu */}
          {navLinks.slice(0, 3).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[0.95rem] font-bold tracking-wide transition-colors rounded-full",
                  isActive ? "text-coral bg-coral/5" : "text-navy/80 hover:text-navy hover:bg-navy/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Occasions Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("occasions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-[0.95rem] font-bold tracking-wide transition-colors rounded-full",
                pathname.startsWith("/occasions") ? "text-coral bg-coral/5" : "text-navy/80 hover:text-navy hover:bg-navy/5"
              )}
            >
              Occasions
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === "occasions" && "rotate-180")} />
            </button>

            <AnimatePresence>
              {activeDropdown === "occasions" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-navy/5 overflow-hidden z-50 py-2"
                >
                  {topServices.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/occasions/${service.slug}`}
                      className="block px-6 py-3 text-[0.9rem] font-semibold text-navy/70 hover:text-coral hover:bg-cream transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {service.name}
                    </Link>
                  ))}
                  <div className="border-t border-navy/5 mt-2 pt-2 px-4 pb-2">
                    <Link
                      href="/occasions"
                      className="block w-full text-center py-2 bg-coral/10 text-coral font-bold rounded-xl text-sm hover:bg-coral hover:text-white transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      View All Occasions
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Packages, Contact */}
          {navLinks.slice(3).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[0.95rem] font-bold tracking-wide transition-colors rounded-full",
                  isActive ? "text-coral bg-coral/5" : "text-navy/80 hover:text-navy hover:bg-navy/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Authentication / User Area (Desktop & Mobile) */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="group flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-navy/10 rounded-full hover:border-coral transition-all shadow-sm hover:shadow-md"
          >
            <UserCircle2 className="w-5 h-5 text-navy/70 group-hover:text-coral transition-colors" />
            <span className="font-bold text-[0.9rem] text-navy hidden sm:block">Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
