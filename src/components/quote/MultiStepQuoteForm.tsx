"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { 
  Calendar, Clock, MapPin, Users, Map, User, Mail, Phone, 
  ArrowRight, ArrowLeft, Check, CheckCircle2, AlertCircle, Loader2, Info
} from "lucide-react";
import { PACKAGES, getPackageBySlug, Package } from "@/lib/packages-data";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(
  () => import("@/components/quote/LocationPicker"),
  { ssr: false, loading: () => <div className="h-[500px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-coral" /></div> }
);

type RoutingMode = "SINGLE" | "SEQUENTIAL" | "SIMULTANEOUS";

export default function MultiStepQuoteForm() {
  const searchParams = useSearchParams();
  const initialPackageSlug = searchParams.get("package");
  const initialPackage = initialPackageSlug ? getPackageBySlug(initialPackageSlug) : undefined;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [distanceLoading, setDistanceLoading] = useState(false);

  // Form State
  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(initialPackage);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // 24h format e.g. "14:30"
  const [eventType, setEventType] = useState("Birthday Party");
  
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [distance, setDistance] = useState(0);
  const [distanceFee, setDistanceFee] = useState(0);
  
  // Location 2 (For multi-stop routing)
  const [address2, setAddress2] = useState("");
  const [zip2, setZip2] = useState("");
  const [city2, setCity2] = useState("");
  const [lat2, setLat2] = useState(0);
  const [lng2, setLng2] = useState(0);
  const [distance2, setDistance2] = useState(0);
  const [distanceFee2, setDistanceFee2] = useState(0);
  const [distanceLoading2, setDistanceLoading2] = useState(false);
  
  const [extraGuests, setExtraGuests] = useState(0);
  const [routingMode, setRoutingMode] = useState<RoutingMode>("SINGLE");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Derived calculations
  const isWeekend = useMemo(() => {
    if (!date) return false;
    const day = new Date(date).getDay();
    return day === 6 || day === 0; // Saturday or Sunday
  }, [date]);

  const weekendFee = isWeekend ? 25 : 0;
  
  const routingFee = useMemo(() => {
    if (routingMode === "SEQUENTIAL") return 50;
    if (routingMode === "SIMULTANEOUS") return 200;
    return 0;
  }, [routingMode]);

  const basePrice = selectedPackage?.price || 0;
  const extraGuestFee = extraGuests * (selectedPackage?.extraGuestPrice || 0);
  
  const total = basePrice + weekendFee + distanceFee + distanceFee2 + extraGuestFee + routingFee;

  // Handlers
  const handleLocationDataChange = async (newLat: number, newLng: number, newZip: string) => {
    setZip(newZip);
    if (newLat && newLng || newZip.length === 5) {
      setDistanceLoading(true);
      try {
        const res = await fetch(`/api/distance?lat=${newLat}&lng=${newLng}&zip=${newZip}`);
        const data = await res.json();
        if (res.ok) {
          setCity(data.city || "Selected Location");
          setDistance(data.distance);
          setDistanceFee(data.fee);
        } else {
          alert(data.error || "Could not calculate distance");
          setCity("");
          setDistanceFee(0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setDistanceLoading(false);
      }
    }
  };

  const handleSecondLocationDataChange = async (newLat: number, newLng: number, newZip: string, currentMode: RoutingMode) => {
    setZip2(newZip);
    if ((newLat && newLng) || newZip.length === 5) {
      setDistanceLoading2(true);
      try {
        let originParams = "";
        if (currentMode === "SEQUENTIAL") {
          // Calculate from Location 1, NO free miles (0 free miles for the 2nd segment)
          originParams = `&originLat=${lat}&originLng=${lng}&freeMiles=0`;
        } else if (currentMode === "SIMULTANEOUS") {
          // Calculate from HQ, WITH 10 free miles
          originParams = `&freeMiles=10`;
        }
        
        const res = await fetch(`/api/distance?lat=${newLat}&lng=${newLng}&zip=${newZip}${originParams}`);
        const data = await res.json();
        if (res.ok) {
          setCity2(data.city || "Selected Location");
          setDistance2(data.distance);
          setDistanceFee2(data.fee);
        } else {
          alert(data.error || "Could not calculate distance for second location");
          setCity2("");
          setDistanceFee2(0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setDistanceLoading2(false);
      }
    }
  };

  // Recalculate 2nd location distance if routing mode changes
  useEffect(() => {
    if (routingMode !== "SINGLE" && lat2 !== 0 && lng2 !== 0) {
      handleSecondLocationDataChange(lat2, lng2, zip2, routingMode);
    }
    if (routingMode === "SINGLE") {
      setDistanceFee2(0);
      setDistance2(0);
    }
  }, [routingMode, lat]); // Dependency on `lat` so if Location 1 changes, Sequential recalculates

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const submitFinal = async () => {
    setLoading(true);
    try {
      const payload = {
        email, otp, name, phone,
        date, time, eventType,
        address, city, zip, distance, distanceFee,
        address2, city2, zip2, distance2, distanceFee2,
        packageId: selectedPackage?.id, extraGuests, routingMode,
        basePrice, weekendFee, extraGuestFee, routingFee, totalAmount: total
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        if (data.status === "REVIEW_REQUIRED") {
          alert(`Booking Submitted (Ref: ${data.bookingNumber}). It is pending staff review due to distance/minimums.`);
        } else {
          alert(`Booking Confirmed! (Ref: ${data.bookingNumber}) You will receive an email shortly.`);
        }
        window.location.href = "/";
      } else {
        alert(data.error || "Failed to submit booking");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (!selectedPackage) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-navy mb-4">Please select a package first</h2>
        <a href="/packages" className="inline-block px-8 py-4 bg-coral text-white rounded-full font-bold hover:bg-coral-dark">
          View Packages
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Decorative Floating SVGs */}
      <div className="absolute -top-12 -left-12 w-32 h-32 opacity-20 pointer-events-none z-0 transform -rotate-12 animate-pulse">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90L20 30H80L50 90Z" fill="#D4AF37"/>
          <circle cx="50" cy="25" r="20" fill="#FF6B6B"/>
          <circle cx="35" cy="35" r="15" fill="#4ECDC4"/>
          <circle cx="65" cy="35" r="15" fill="#FFFFFF"/>
        </svg>
      </div>
      <div className="absolute -bottom-16 -right-16 w-40 h-40 opacity-10 pointer-events-none z-0 transform rotate-45 animate-blob">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 95L25 35H75L50 95Z" fill="#D4AF37"/>
          <circle cx="50" cy="30" r="22" fill="#FF6B6B"/>
          <path d="M30 30 Q 50 10 70 30 Q 50 50 30 30" fill="#FFFFFF" opacity="0.5"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-navy/10 border border-white/50 overflow-hidden">
        {/* Progress Bar */}
        <div className="flex border-b border-gray-100 bg-gray-50/80">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`flex-1 h-2.5 transition-all duration-500 ease-out ${step >= i ? "bg-gradient-to-r from-coral to-coral-light" : "bg-transparent"}`} />
          ))}
        </div>

        <div className="p-8 md:p-14 min-h-[600px] flex flex-col relative">
        <AnimatePresence mode="wait">
          {/* STEP 1: EVENT DETAILS */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow">
              <div className="mb-8">
                <h2 className="font-display font-black text-4xl text-navy mb-2">Event Details</h2>
                <p className="text-gray-500 font-medium">When and what are we celebrating?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1">Event Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 outline-none transition-all font-medium" />
                  </div>
                  {isWeekend && (
                    <p className="text-xs font-bold text-coral flex items-center gap-1 ml-1 mt-2">
                      <AlertCircle className="w-3.5 h-3.5" /> Weekend surcharge applies ($25)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1">Time (24h format)</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="time" value={time} onChange={e => setTime(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 outline-none transition-all font-medium" />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-navy ml-1">Event Type</label>
                  <select value={eventType} onChange={e => setEventType(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 outline-none transition-all font-medium appearance-none">
                    {["Birthday Party", "Corporate Event", "Wedding", "School Event", "Festival/Fair", "Other"].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: LOCATION */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow">
              <div className="mb-8">
                <h2 className="font-display font-black text-4xl text-navy mb-2">Location</h2>
                <p className="text-gray-500 font-medium">Where should we park the truck? Search or drop a pin on the map.</p>
              </div>

              <LocationPicker
                address={address}
                onAddressChange={(val) => setAddress(val)}
                onLocationSelect={(data) => {
                  setAddress(data.address);
                  setLat(data.lat);
                  setLng(data.lng);
                  handleLocationDataChange(data.lat, data.lng, data.zip || "");
                }}
              />

              {distanceLoading && (
                <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center gap-4">
                  <Loader2 className="w-5 h-5 animate-spin text-coral flex-shrink-0" />
                  <p className="text-sm text-gray-600 font-medium">Calculating travel distance...</p>
                </div>
              )}

              {distance !== 0 && !distanceLoading && (
                <div className="mt-6 p-5 bg-navy/5 border border-navy/10 rounded-2xl flex items-start gap-4">
                  <Info className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-navy text-sm">Travel Calculation</h4>
                    <p className="text-sm text-gray-600 font-medium mt-2 leading-relaxed">
                      Coordinates: <span className="text-navy font-bold">{lat.toFixed(5)}, {lng.toFixed(5)}</span><br/>
                      Total distance from our HQ (02151): <span className="text-navy font-bold">{distance} miles</span><br/>
                      <span className="text-coral font-bold mt-1 inline-block">Note:</span> The first 10 miles are FREE. Each additional mile is $2.50.<br/>
                    </p>
                    <div className="mt-3 pt-3 border-t border-navy/10 flex justify-between items-center">
                      <span className="font-bold text-navy">Calculated Travel Fee:</span>
                      <strong className="text-coral text-lg">${distanceFee.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: CUSTOMIZATIONS */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow">
              <div className="mb-8">
                <h2 className="font-display font-black text-4xl text-navy mb-2">Customizations</h2>
                <p className="text-gray-500 font-medium">Extra guests or multiple stops?</p>
              </div>

              <div className="space-y-8">
                <div className="p-6 border border-gray-200 rounded-3xl bg-gray-50/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center text-coral">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy">Additional Guests</h3>
                      <p className="text-xs text-gray-500 font-medium">Package includes {selectedPackage.servings}. Add more for ${selectedPackage.extraGuestPrice}/each.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setExtraGuests(Math.max(0, extraGuests - 5))} className="w-12 h-12 rounded-xl border border-gray-200 bg-white font-black text-xl hover:bg-gray-50">-</button>
                    <div className="text-2xl font-black text-navy w-16 text-center">{extraGuests}</div>
                    <button onClick={() => setExtraGuests(extraGuests + 5)} className="w-12 h-12 rounded-xl border border-gray-200 bg-white font-black text-xl hover:bg-gray-50">+</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-navy flex items-center gap-2"><MapPin className="w-4 h-4 text-coral"/> Multiple Locations?</h3>
                  
                  <div onClick={() => setRoutingMode("SINGLE")} className={`p-4 rounded-2xl border cursor-pointer transition-all ${routingMode === "SINGLE" ? "border-coral bg-coral/5" : "border-gray-200 bg-white hover:border-coral/50"}`}>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-navy">Single Location</div>
                      <div className="text-sm font-bold text-gray-400">Included</div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">One stop only.</p>
                  </div>

                  <div onClick={() => setRoutingMode("SEQUENTIAL")} className={`p-4 rounded-2xl border cursor-pointer transition-all ${routingMode === "SEQUENTIAL" ? "border-coral bg-coral/5" : "border-gray-200 bg-white hover:border-coral/50"}`}>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-navy">Sequential Stops</div>
                      <div className="text-sm font-bold text-coral">+$50</div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Multiple stops in order (single vehicle). Covers routing and setup time.</p>
                  </div>

                  <div onClick={() => setRoutingMode("SIMULTANEOUS")} className={`p-4 rounded-2xl border cursor-pointer transition-all ${routingMode === "SIMULTANEOUS" ? "border-coral bg-coral/5" : "border-gray-200 bg-white hover:border-coral/50"}`}>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-navy">Simultaneous Multi-Vehicle</div>
                      <div className="text-sm font-bold text-coral">+$200</div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Deploy a second vehicle to multiple locations at the same time.</p>
                  </div>
                </div>

                {/* Additional Stops Details Input */}
                <AnimatePresence>
                  {routingMode !== "SINGLE" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: "auto" }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <label className="text-sm font-bold text-navy ml-1 block mb-2">Select the Second Location</label>
                        <LocationPicker
                          address={address2}
                          onAddressChange={(val) => setAddress2(val)}
                          onLocationSelect={(data) => {
                            setAddress2(data.address);
                            setLat2(data.lat);
                            setLng2(data.lng);
                            handleSecondLocationDataChange(data.lat, data.lng, data.zip || "", routingMode);
                          }}
                        />

                        {distance2 !== 0 && !distanceLoading2 && (
                          <div className="mt-6 p-5 bg-navy/5 border border-navy/10 rounded-2xl flex items-start gap-4">
                            <Info className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                            <div className="w-full">
                              <h4 className="font-bold text-navy text-sm">Second Route Calculation</h4>
                              <p className="text-sm text-gray-600 font-medium mt-2 leading-relaxed">
                                {routingMode === "SEQUENTIAL" ? (
                                  <>
                                    Origin: <span className="font-bold text-navy">Location 1</span><br/>
                                    Distance from Location 1: <span className="text-navy font-bold">{distance2} miles</span><br/>
                                    <span className="text-coral font-bold mt-1 inline-block">Note:</span> Free miles apply only to the first segment. Each mile for this segment is $2.50.<br/>
                                  </>
                                ) : (
                                  <>
                                    Origin: <span className="font-bold text-navy">HQ (02151)</span><br/>
                                    Distance from HQ: <span className="text-navy font-bold">{distance2} miles</span><br/>
                                    <span className="text-coral font-bold mt-1 inline-block">Note:</span> The first 10 miles are FREE. Each additional mile is $2.50.<br/>
                                  </>
                                )}
                              </p>
                              <div className="mt-3 pt-3 border-t border-navy/10 flex justify-between items-center">
                                <span className="font-bold text-navy">Calculated Travel Fee:</span>
                                <strong className="text-coral text-lg">${distanceFee2.toFixed(2)}</strong>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONTACT & VERIFICATION */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow">
              <div className="mb-8">
                <h2 className="font-display font-black text-4xl text-navy mb-2">Your Details</h2>
                <p className="text-gray-500 font-medium">How can we reach you?</p>
              </div>

              {!otpSent ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 outline-none transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 123-4567"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 outline-none transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 outline-none transition-all font-medium" />
                    </div>
                  </div>
                  <button onClick={sendOtp} disabled={!name || !email || loading} 
                    className="w-full py-4 bg-navy text-white rounded-2xl font-black disabled:opacity-50 hover:bg-navy-light transition-colors flex items-center justify-center">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Verification Code"}
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                  <div className="p-6 bg-green-50 border border-green-100 rounded-3xl text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-navy mb-1">Code sent to {email}</h3>
                    <p className="text-sm text-gray-500 font-medium">Please enter the 6-digit code to verify your email.</p>
                  </div>
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="0 0 0 0 0 0" maxLength={6}
                    className="w-full text-center tracking-[1em] py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 outline-none transition-all font-black text-2xl" />
                  <button onClick={() => setOtpSent(false)} className="text-sm font-bold text-coral w-full text-center hover:underline">
                    Use a different email
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 5: REVIEW */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow">
               <div className="mb-8">
                <h2 className="font-display font-black text-4xl text-navy mb-2">Review Booking</h2>
                <p className="text-gray-500 font-medium">Almost there! Review your quote details.</p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-2xl bg-coral flex items-center justify-center text-white flex-shrink-0">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-navy">{selectedPackage.name}</h3>
                    <p className="text-gray-500 text-sm font-medium">{date} at {time} • {address}, {city}</p>
                  </div>
                </div>

                <div className="py-6 space-y-4 border-b border-gray-200">
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-600">Base Package</span>
                    <span className="text-navy font-bold">${basePrice.toFixed(2)}</span>
                  </div>
                  {weekendFee > 0 && (
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-gray-600">Weekend Surcharge</span>
                      <span className="text-navy font-bold">${weekendFee.toFixed(2)}</span>
                    </div>
                  )}
                  {distanceFee > 0 && (
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-gray-600">Travel Fee ({distance} miles)</span>
                      <span className="text-navy font-bold">${distanceFee.toFixed(2)}</span>
                    </div>
                  )}
                  {extraGuestFee > 0 && (
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-gray-600">Extra Guests ({extraGuests})</span>
                      <span className="text-navy font-bold">${extraGuestFee.toFixed(2)}</span>
                    </div>
                  )}
                  {routingMode !== "SINGLE" && distanceFee2 > 0 && (
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-gray-600">Second Stop Travel Fee</span>
                      <span className="text-navy font-bold">${distanceFee2.toFixed(2)}</span>
                    </div>
                  )}
                  {routingFee > 0 && (
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-gray-600">Multi-Location ({routingMode})</span>
                      <span className="text-navy font-bold">${routingFee.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <span className="font-black text-2xl text-navy">Total</span>
                  <span className="font-black text-3xl text-coral">${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button onClick={prevStep} className="px-6 py-3 rounded-full font-bold text-gray-500 hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < 5 ? (
            <button onClick={nextStep} disabled={
              (step === 1 && (!date || !time)) || 
              (step === 2 && (!address || !city)) ||
              (step === 4 && (!otpSent || otp.length < 6))
            } 
            className="px-8 py-3 rounded-full font-black bg-navy text-white hover:bg-coral transition-all disabled:opacity-50 disabled:hover:bg-navy shadow-lg flex items-center gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={submitFinal} disabled={loading} className="px-10 py-4 rounded-full font-black bg-coral text-white hover:bg-coral-dark hover:scale-105 transition-all shadow-xl shadow-coral/20 flex items-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Booking"}
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
