"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { UserCircle2, ChevronDown, LogOut, LayoutDashboard, CalendarDays } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { getAllServices } from "@/lib/services-data";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsScrolled(false);
    setUserMenuOpen(false); // close user menu on navigate
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const timer = setTimeout(() => {
      handleScroll();
    }, 50);
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  // Handle clicking outside to close user menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const services = getAllServices();
  const topServices = services.slice(0, 6);

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
          : "bg-transparent py-5 md:py-6 pointer-events-none"
      )}
    >
      <div suppressHydrationWarning className="container mx-auto px-4 md:px-6 flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="z-50">
          <Logo variant="dark" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 xl:gap-2">
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

        {/* Authentication Area */}
        <div className="flex items-center gap-3 relative" ref={userMenuRef}>
          {status === "loading" ? (
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          ) : session ? (
            <>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="group flex items-center gap-2 px-4 py-2 bg-white border-2 border-navy/10 rounded-full hover:border-coral transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs uppercase">
                  {session.user?.name?.[0] || "U"}
                </div>
                <span className="font-bold text-[0.9rem] text-navy hidden sm:block truncate max-w-[100px]">
                  {session.user?.name?.split(" ")[0] || "User"}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", userMenuOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-navy/5 overflow-hidden z-50 py-2"
                  >
                    <div className="px-4 py-2 mb-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-navy truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>

                    {session.user?.role === "CUSTOMER" ? (
                      <Link
                        href="/portal"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-cream hover:text-coral transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <CalendarDays size={18} />
                        My Bookings
                      </Link>
                    ) : (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-cream hover:text-coral transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard size={18} />
                        Admin Dashboard
                      </Link>
                    )}
                    
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              href="/login"
              className="group flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-navy/10 rounded-full hover:border-coral transition-all shadow-sm hover:shadow-md"
            >
              <UserCircle2 className="w-5 h-5 text-navy/70 group-hover:text-coral transition-colors" />
              <span className="font-bold text-[0.9rem] text-navy hidden sm:block">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
