import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/shared/Logo";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-navy text-cream pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Socials */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo variant="light" />
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
              {BUSINESS_CONFIG.description}
            </p>
            <div className="flex gap-4">
              <a href={BUSINESS_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cream/5 flex items-center justify-center text-cream hover:bg-coral hover:text-white transition-all shadow-sm" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={BUSINESS_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cream/5 flex items-center justify-center text-cream hover:bg-coral hover:text-white transition-all shadow-sm" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {BUSINESS_CONFIG.social.tiktok && (
                <a href={BUSINESS_CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cream/5 flex items-center justify-center text-cream hover:bg-coral hover:text-white transition-all shadow-sm" aria-label="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-black mb-6 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm font-medium text-cream/70">
              <li>
                <Link href="/packages" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">Packages & Pricing</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">Event Gallery</Link>
              </li>
              <li>
                <Link href="/cities" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">Areas We Serve</Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">FAQs</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="font-display text-lg font-black mb-6 text-white uppercase tracking-wider">Events</h3>
            <ul className="space-y-3 text-sm font-medium text-cream/70">
              <li>
                <Link href="/occasions/birthday-parties" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">Birthday Parties</Link>
              </li>
              <li>
                <Link href="/occasions/corporate-events" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">Corporate Events</Link>
              </li>
              <li>
                <Link href="/occasions/wedding-receptions" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">Weddings</Link>
              </li>
              <li>
                <Link href="/occasions/school-occasions" className="hover:text-coral hover:translate-x-1 inline-block transition-transform duration-300">School Events</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display text-lg font-black mb-6 text-white uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 text-sm font-medium text-cream/70">
              <li className="flex items-start gap-3 group">
                <Phone className="text-coral shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                <div className="space-y-1">
                  <a href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`} className="block hover:text-white transition-colors">
                    {BUSINESS_CONFIG.contact.phone1}
                  </a>
                  <a href={`tel:${BUSINESS_CONFIG.contact.phone2Formatted}`} className="block hover:text-white transition-colors text-xs opacity-75">
                    {BUSINESS_CONFIG.contact.phone2} (Reservations)
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="text-coral shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="text-coral shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                <address className="not-italic leading-relaxed hover:text-white transition-colors">
                  {BUSINESS_CONFIG.address.display}
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium text-cream/50">
          <p>&copy; {currentYear} {BUSINESS_CONFIG.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
