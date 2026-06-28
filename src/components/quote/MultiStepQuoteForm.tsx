"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Check, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Form State Types ---
type FormData = {
  eventType: string;
  guestCount: string;
  date: string;
  time: string;
  city: string;
  packageId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
};

const INITIAL_DATA: FormData = {
  eventType: "",
  guestCount: "",
  date: "",
  time: "",
  city: "",
  packageId: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

const STEPS = [
  { id: "event", title: "Event Type" },
  { id: "guests", title: "Guest Count" },
  { id: "logistics", title: "Time & Place" },
  { id: "package", title: "Package" },
  { id: "contact", title: "Your Details" },
];

export default function MultiStepQuoteForm() {
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams?.get("package");
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_DATA,
    packageId: preselectedPackage || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  };

  const updateData = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStepIndex !== STEPS.length - 1) {
      return nextStep();
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("There was an error submitting your quote. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Animation Variants ---
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  if (isSuccess) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-12 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-mint text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Check size={40} strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-display font-bold text-charcoal mb-4">Quote Request Received!</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          Thank you, {formData.firstName}. We've received your details and will get back to you within 24 hours with a customized quote for your event in {formData.city}.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 bg-navy text-cream font-bold rounded-full hover:bg-coral transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Progress Bar Header */}
      <div className="bg-navy px-6 py-6 md:px-10 md:py-8 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-coral font-bold text-sm tracking-widest uppercase">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>
          <span className="text-cream/80 text-sm font-medium">
            {Math.round(((currentStepIndex + 1) / STEPS.length) * 100)}% Complete
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
          {STEPS[currentStepIndex].title}
        </h2>
        
        {/* Visual Progress Bar */}
        <div className="w-full h-2 bg-navy-mid rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-coral rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.6, 1] as [number, number, number, number] }}
          />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 md:p-10 min-h-[400px] flex flex-col">
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              {/* Render current step component here based on index */}
              {currentStepIndex === 0 && (
                <StepOneEvent data={formData} updateData={updateData} onNext={nextStep} />
              )}
              {currentStepIndex === 1 && (
                <StepTwoGuests data={formData} updateData={updateData} onNext={nextStep} />
              )}
              {currentStepIndex === 2 && (
                <StepThreeLogistics data={formData} updateData={updateData} />
              )}
              {currentStepIndex === 3 && (
                <StepFourPackage data={formData} updateData={updateData} />
              )}
              {currentStepIndex === 4 && (
                <StepFiveContact data={formData} updateData={updateData} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            className={cn(
              "flex items-center text-gray-500 hover:text-charcoal font-semibold transition-colors",
              currentStepIndex === 0 ? "invisible" : "visible"
            )}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center bg-coral text-white px-8 py-3 rounded-full font-bold shadow-coral hover:bg-coral-dark hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? "Submitting..." : currentStepIndex === STEPS.length - 1 ? (
              "Get My Free Quote"
            ) : (
              <>
                Continue
                <ChevronRight size={20} className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Step Components (Ideally extracted to separate files in a larger app, but kept here for simplicity) ---

function StepOneEvent({ data, updateData, onNext }: any) {
  const events = [
    "Corporate Event",
    "Birthday Party",
    "Wedding",
    "School Event",
    "Festival / Fair",
    "Other Celebration",
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-lg mb-6">What kind of event are you planning?</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <button
            key={event}
            type="button"
            onClick={() => {
              updateData({ eventType: event });
              // Optional: auto-advance on selection for a smoother feel
              setTimeout(onNext, 300);
            }}
            className={cn(
              "p-4 border-2 rounded-xl text-left font-bold text-lg transition-all flex justify-between items-center",
              data.eventType === event
                ? "border-coral bg-coral/5 text-coral"
                : "border-gray-200 text-gray-700 hover:border-coral/50 hover:bg-gray-50"
            )}
          >
            {event}
            {data.eventType === event && <Check size={20} className="text-coral" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepTwoGuests({ data, updateData, onNext }: any) {
  const ranges = [
    "Under 50",
    "50 - 100",
    "100 - 200",
    "200 - 500",
    "500+",
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-lg mb-6">Roughly how many guests are you expecting?</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ranges.map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => {
              updateData({ guestCount: range });
              setTimeout(onNext, 300);
            }}
            className={cn(
              "p-4 border-2 rounded-xl text-left font-bold text-lg transition-all flex justify-between items-center",
              data.guestCount === range
                ? "border-coral bg-coral/5 text-coral"
                : "border-gray-200 text-gray-700 hover:border-coral/50 hover:bg-gray-50"
            )}
          >
            {range}
            {data.guestCount === range && <Check size={20} className="text-coral" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepThreeLogistics({ data, updateData }: any) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-lg mb-6">When and where is this happening?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-charcoal">Date</label>
          <input
            type="date"
            required
            value={data.date}
            onChange={(e) => updateData({ date: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-0 transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-bold text-charcoal">Time</label>
          <input
            type="time"
            required
            value={data.time}
            onChange={(e) => updateData({ time: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-0 transition-colors"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-bold text-charcoal">Event City (Massachusetts)</label>
          <input
            type="text"
            required
            placeholder="e.g. Boston, Cambridge, Newton..."
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-0 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

function StepFourPackage({ data, updateData }: any) {
  const packages = [
    { id: "truck-classic", name: "Classic Truck", desc: "Our nostalgic ice cream truck experience.", type: "TRUCK" },
    { id: "van-premium", name: "Premium Van", desc: "Sleek Sprinter van for corporate events.", type: "VAN" },
    { id: "custom", name: "Not sure yet", desc: "Help me decide based on my event details.", type: "OTHER" },
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-lg mb-6">Do you have a package in mind?</p>
      <div className="space-y-4">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => updateData({ packageId: pkg.id })}
            className={cn(
              "w-full p-6 border-2 rounded-xl text-left transition-all flex items-center justify-between",
              data.packageId === pkg.id
                ? "border-coral bg-coral/5"
                : "border-gray-200 hover:border-coral/50 hover:bg-gray-50"
            )}
          >
            <div>
              <h4 className={cn("font-bold text-lg mb-1", data.packageId === pkg.id ? "text-coral" : "text-charcoal")}>
                {pkg.name}
              </h4>
              <p className="text-gray-500 text-sm">{pkg.desc}</p>
            </div>
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
              data.packageId === pkg.id ? "border-coral bg-coral text-white" : "border-gray-300"
            )}>
              {data.packageId === pkg.id && <Check size={14} strokeWidth={3} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepFiveContact({ data, updateData }: any) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-lg mb-6">Where should we send your quote?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-charcoal">First Name</label>
          <input
            type="text"
            required
            placeholder="Jane"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-0 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-charcoal">Last Name</label>
          <input
            type="text"
            required
            placeholder="Doe"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-0 transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-bold text-charcoal">Email Address</label>
          <input
            type="email"
            required
            placeholder="jane@example.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-0 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-charcoal">Phone Number</label>
          <input
            type="tel"
            required
            placeholder="(555) 123-4567"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-0 transition-colors"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-bold text-charcoal">Any special requests or details?</label>
          <textarea
            rows={3}
            placeholder="Tell us a bit more about the event..."
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-0 transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}
