"use client";

import { useState } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { BUSINESS_CONFIG } from "@/lib/config";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-sand min-h-screen pt-[88px]">
      <section className="py-20 bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Let's <span className="text-coral italic font-light">Talk.</span>
            </h1>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto">
              Have a question about a package? Need a custom quote? We're here to help you plan the perfect event.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <AnimatedSection>
              <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-coral/10 text-coral flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg mb-1">Call Us</h3>
                    <p className="text-gray-500 text-sm mb-2">We're available Monday - Saturday.</p>
                    <a href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`} className="block text-xl font-bold text-charcoal hover:text-coral transition-colors">
                      {BUSINESS_CONFIG.contact.phone1}
                    </a>
                    <a href={`tel:${BUSINESS_CONFIG.contact.phone2Formatted}`} className="block text-gray-600 hover:text-coral transition-colors mt-1">
                      {BUSINESS_CONFIG.contact.phone2} (Reservations)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg mb-1">Email Us</h3>
                    <p className="text-gray-500 text-sm mb-2">We typically reply within 2 hours.</p>
                    <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="text-lg font-bold text-charcoal hover:text-gold transition-colors">
                      {BUSINESS_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy/10 text-navy flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg mb-1">Headquarters</h3>
                    <p className="text-gray-500 text-sm mb-2">Serving all of Massachusetts</p>
                    <address className="text-charcoal font-medium not-italic">
                      {BUSINESS_CONFIG.address.street}<br/>
                      {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state} {BUSINESS_CONFIG.address.zip}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-mint/10 text-mint flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg mb-1">Hours of Operation</h3>
                    <p className="text-gray-600">Event Operations: 7 Days a Week</p>
                    <p className="text-gray-600">Office Hours: Mon - Sat, 9am - 6pm</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* General Contact Form (Not the Quote Form) */}
            <AnimatedSection delay={0.2} className="bg-sand p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-charcoal mb-6">Send a Message</h2>
              <p className="text-gray-600 mb-8">
                Ready to book? Please use our <a href="/get-a-quote" className="text-coral font-bold hover:underline">Quote Form</a> for fastest service. For general inquiries, use the form below.
              </p>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-mint text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thanks for reaching out, {formData.firstName}. We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-charcoal">First Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full p-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-0 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-charcoal">Last Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full p-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-0 outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-charcoal">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-0 outline-none" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-charcoal">Message</label>
                    <textarea 
                      rows={4} 
                      required 
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-navy focus:ring-0 outline-none resize-none" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-navy text-cream font-bold rounded-full hover:bg-navy-mid transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
