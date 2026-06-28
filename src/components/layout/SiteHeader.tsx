"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/shared/Logo";

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Packages", href: "/packages" },
    { label: "Gallery", href: "/gallery" },
    { label: "Cities", href: "/cities" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-cream/80 backdrop-blur-xl shadow-sm border-b border-navy/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="z-50">
          <Logo variant="dark" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[0.9rem] font-semibold tracking-wide text-navy/80 hover:text-coral transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`}
            className="flex items-center gap-2 text-navy/80 hover:text-coral transition-colors text-[0.9rem] font-semibold"
          >
            <Phone size={16} />
            <span>{BUSINESS_CONFIG.contact.phone1}</span>
          </a>
          <Link
            href="/get-a-quote"
            className="px-8 py-3 bg-navy text-cream text-[0.9rem] font-bold rounded-full hover:bg-coral transition-all shadow-md hover:shadow-coral"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-navy z-50 p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-cream z-40 flex flex-col justify-center px-6 transition-all duration-500 ease-in-out md:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-3xl font-display text-navy hover:text-coral transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-a-quote"
            className="mt-6 px-8 py-4 bg-navy text-cream text-xl font-bold rounded-full inline-block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get a Free Quote
          </Link>
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`}
            className="mt-8 flex items-center justify-center gap-2 text-navy/70 text-lg font-medium"
          >
            <Phone size={20} />
            <span>{BUSINESS_CONFIG.contact.phone1}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
