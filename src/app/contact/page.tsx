"use client";

import { useState } from "react";
import { BUSINESS_CONFIG } from "@/lib/config";
import { Phone, Mail, MapPin, Clock, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import FAQSection from "@/components/shared/FAQSection";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We proudly serve the entire state of Massachusetts. Depending on the distance from our headquarters, a small travel fee may apply. Contact us to confirm availability in your specific town!"
  },
  {
    question: "Do you only do large events?",
    answer: "Not at all! While we frequently serve massive corporate campuses and large festivals, we also love bringing joy to smaller, intimate gatherings like birthday parties and family reunions. We have packages designed for groups of all sizes."
  },
  {
    question: "How far in advance should I book?",
    answer: "Our calendar fills up extremely fast, especially during the peak summer months. We recommend booking at least 1-2 months in advance. However, we have a large fleet and will always do our best to accommodate last-minute requests if we have an opening."
  }
];

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
    <div className="relative min-h-screen pt-[88px] overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-navy/80 backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-white/10 text-white font-bold text-sm tracking-widest uppercase rounded-full mb-6 backdrop-blur-sm border border-white/20">
            We'd Love To Hear From You
          </span>
          <h1 className="font-display font-black text-[clamp(3.5rem,7vw,6rem)] leading-[1.05] text-white mb-6">
            Let's <span className="text-coral underline decoration-wavy decoration-coral/50 underline-offset-[12px]">Connect.</span>
          </h1>
          <p className="font-sans font-medium text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Have a question about a package? Need a custom quote? We're here to help you plan the perfect event.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative z-10 -mt-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Contact Info (Left Side) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-navy/5 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-coral/5 rounded-full blur-2xl" />
                
                <h2 className="font-display font-black text-3xl text-navy mb-8">Get In Touch</h2>
                
                <div className="space-y-8 relative z-10">
                  {/* Phone */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-coral/10 text-coral flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-coral group-hover:text-white transition-all duration-300">
                      <Phone size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg mb-1">Call Us</h3>
                      <p className="text-navy/60 text-sm font-medium mb-2">Available Mon - Sat.</p>
                      <a href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`} className="block text-xl font-bold text-navy hover:text-coral transition-colors">
                        {BUSINESS_CONFIG.contact.phone1}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                      <Mail size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg mb-1">Email Us</h3>
                      <p className="text-navy/60 text-sm font-medium mb-2">We typically reply within hours.</p>
                      <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="text-lg font-bold text-navy hover:text-gold transition-colors break-all">
                        {BUSINESS_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-navy/10 text-navy flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-navy group-hover:text-white transition-all duration-300">
                      <MapPin size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg mb-1">Headquarters</h3>
                      <p className="text-navy/60 text-sm font-medium mb-2">Serving all of Massachusetts</p>
                      <address className="text-navy font-bold not-italic">
                        {BUSINESS_CONFIG.address.street}<br/>
                        {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state} {BUSINESS_CONFIG.address.zip}
                      </address>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-mint/10 text-mint flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-mint group-hover:text-white transition-all duration-300">
                      <Clock size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg mb-1">Hours</h3>
                      <p className="text-navy/70 font-medium">Event Operations: 7 Days a Week</p>
                      <p className="text-navy/70 font-medium">Office Hours: Mon - Sat, 9am - 6pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form (Right Side) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-navy/5 relative h-full">
                
                <div className="mb-10">
                  <h2 className="text-3xl font-display font-black text-navy mb-4">Send a Message</h2>
                  <div className="bg-coral/5 border border-coral/10 p-5 rounded-2xl flex items-start gap-4">
                    <MessageSquareHeart className="w-8 h-8 text-coral shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-navy">Looking to book an event?</h3>
                      <p className="text-navy/70 text-sm font-medium mt-1 mb-3">
                        For the fastest response and accurate pricing, please use our dedicated Quote form instead of this general contact form.
                      </p>
                      <Link href="/get-a-quote" className="inline-block px-5 py-2 bg-coral text-white text-sm font-bold rounded-full hover:bg-navy transition-colors">
                        Get a Free Quote
                      </Link>
                    </div>
                  </div>
                </div>

                {isSuccess ? (
                  <div className="text-center py-16 bg-cream rounded-3xl border-2 border-dashed border-mint/30">
                    <div className="w-20 h-20 bg-mint text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-mint/20">
                      <span className="text-4xl font-bold">✓</span>
                    </div>
                    <h3 className="text-3xl font-display font-black text-navy mb-3">Message Sent!</h3>
                    <p className="text-navy/70 font-medium max-w-md mx-auto">
                      Thanks for reaching out, <span className="font-bold text-navy">{formData.firstName}</span>. We will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-navy ml-2">First Name</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full p-4 bg-cream rounded-2xl border-2 border-transparent focus:bg-white focus:border-navy outline-none transition-all font-medium" 
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-navy ml-2">Last Name</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full p-4 bg-cream rounded-2xl border-2 border-transparent focus:bg-white focus:border-navy outline-none transition-all font-medium"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-navy ml-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-4 bg-cream rounded-2xl border-2 border-transparent focus:bg-white focus:border-navy outline-none transition-all font-medium"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-navy ml-2">Message</label>
                      <textarea 
                        rows={5} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full p-4 bg-cream rounded-2xl border-2 border-transparent focus:bg-white focus:border-navy outline-none transition-all font-medium resize-none"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-navy text-white text-lg font-bold rounded-2xl hover:bg-coral transition-colors disabled:opacity-50 disabled:hover:bg-navy shadow-xl shadow-navy/10 mt-4"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <FAQSection 
        title="Contact Questions"
        subtitle="Some common things people ask."
        items={faqs}
      />
    </div>
  );
}
