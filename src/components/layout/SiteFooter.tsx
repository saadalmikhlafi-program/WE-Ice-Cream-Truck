import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/shared/Logo";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-navy text-cream pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Logo variant="light" />
            </Link>
            <p className="text-cream/70 text-sm max-w-sm">
              {BUSINESS_CONFIG.description}
            </p>
            <div className="flex gap-4">
              <a href={BUSINESS_CONFIG.social.instagram} className="text-cream/70 hover:text-coral transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={BUSINESS_CONFIG.social.facebook} className="text-cream/70 hover:text-coral transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {BUSINESS_CONFIG.social.tiktok && (
                <a href={BUSINESS_CONFIG.social.tiktok} className="text-cream/70 hover:text-coral transition-colors" aria-label="TikTok">
                  <span className="font-bold">TikTok</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-cream/70">
              <li>
                <Link href="/packages" className="hover:text-coral transition-colors">Packages & Pricing</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-coral transition-colors">Event Gallery</Link>
              </li>
              <li>
                <Link href="/cities" className="hover:text-coral transition-colors">Areas We Serve</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-coral transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coral transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6">Events</h3>
            <ul className="space-y-4 text-cream/70">
              <li>
                <Link href="/occasions/birthday-parties" className="hover:text-coral transition-colors">Birthday Parties</Link>
              </li>
              <li>
                <Link href="/occasions/corporate-events" className="hover:text-coral transition-colors">Corporate Events</Link>
              </li>
              <li>
                <Link href="/occasions/wedding-receptions" className="hover:text-coral transition-colors">Weddings</Link>
              </li>
              <li>
                <Link href="/occasions/school-occasions" className="hover:text-coral transition-colors">School Events</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4 text-cream/70">
              <li className="flex gap-3">
                <Phone className="text-coral shrink-0" size={20} />
                <div>
                  <a href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`} className="block hover:text-coral transition-colors">
                    {BUSINESS_CONFIG.contact.phone1}
                  </a>
                  <a href={`tel:${BUSINESS_CONFIG.contact.phone2Formatted}`} className="block hover:text-coral transition-colors text-sm">
                    {BUSINESS_CONFIG.contact.phone2} (Reservations)
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="text-coral shrink-0" size={20} />
                <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="hover:text-coral transition-colors">
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="text-coral shrink-0" size={20} />
                <address className="not-italic">
                  {BUSINESS_CONFIG.address.display}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-cream/50 text-sm">
          <p>&copy; {currentYear} {BUSINESS_CONFIG.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
