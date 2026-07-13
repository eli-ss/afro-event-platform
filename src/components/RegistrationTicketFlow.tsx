/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Ticket, Calendar, MapPin, Clock, ArrowLeft, ArrowRight, Check, Share2, 
  Download, Phone, Building, Hash, Plus, Minus, User, ShieldAlert, 
  Sparkles, Mail, ExternalLink, Navigation, Map as MapIcon, ChevronRight,
  UserCheck, AlertCircle, CalendarPlus, ChevronLeft, CalendarDays, CheckCircle2,
  Share, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Event, INITIAL_EVENTS } from "./mockEvents";

// Types for persistent custom registration metadata
export interface TicketRegistration {
  id: string; // unique ticket ID
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  studentId?: string;
  ticketType: string;
  quantity: number;
  specialRequirements?: string;
  emergencyContact?: string;
  registeredAt: string;
  status: "active" | "checked-in" | "cancelled" | "past";
  registrationNumber?: string;
}

interface RegistrationTicketFlowProps {
  event: Event;
  onClose: () => void;
  onRegisterSuccess: (eventId: string) => void;
  userEmail?: string;
  userName?: string;
  initialStep?: "form" | "review" | "processing" | "success" | "ticket";
}

// Local storage key for persistent metadata
const TICKETS_STORAGE_KEY = "afro_event_registered_tickets_metadata";

export function loadSavedTickets(): TicketRegistration[] {
  try {
    const saved = localStorage.getItem(TICKETS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Failed to load saved tickets from localStorage:", err);
    return [];
  }
}

export function saveTickets(tickets: TicketRegistration[]) {
  try {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  } catch (err) {
    console.error("Failed to save tickets to localStorage:", err);
  }
}

export default function RegistrationTicketFlow({
  event,
  onClose,
  onRegisterSuccess,
  userEmail = "",
  userName = "",
  initialStep = "form"
}: RegistrationTicketFlowProps) {
  const [step, setStep] = useState<"form" | "review" | "processing" | "success" | "ticket">(initialStep);
  const [ticketMeta, setTicketMeta] = useState<TicketRegistration | null>(null);

  useEffect(() => {
    if (initialStep === "ticket") {
      const saved = loadSavedTickets();
      const existing = saved.find(t => t.eventId === event.id);
      if (existing) {
        setTicketMeta(existing);
      } else {
        setTicketMeta({
          id: `AE-TK-0${Math.floor(100000 + Math.random() * 899999)}`,
          eventId: event.id,
          fullName: userName || "Elene S.",
          email: userEmail || "elenis@gmail.com",
          phone: "+250 788 123 456",
          organization: event.university || "African Leadership University",
          ticketType: "General Admission",
          quantity: 1,
          registeredAt: "Previously Booked",
          status: "active",
          registrationNumber: `AE-RSVP-2026-${Math.floor(100000 + Math.random() * 899999)}`
        });
      }
    }
  }, [initialStep, event, userName, userEmail]);

  // Step 1: Form state
  const [fullName, setFullName] = useState(userName || "");
  const [email, setEmail] = useState(userEmail || "");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [studentId, setStudentId] = useState("");
  const [ticketType, setTicketType] = useState("General Admission");
  const [quantity, setQuantity] = useState(1);
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Client-side validations
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (userName && !fullName) setFullName(userName);
    if (userEmail && !email) setEmail(userEmail);
  }, [userName, userEmail]);

  const handleValidation = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please provide a valid email";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!organization.trim()) newErrors.organization = "University or Organization is required";
    if (!agreed) newErrors.agreed = "You must agree to the Event Terms and Privacy Policy";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) {
      // Smooth scroll to top of form card or error summary
      const element = document.getElementById("registration-form-title");
      if (element) element.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setStep("review");
  };

  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => {
        const uniqueId = `AE-TK-${Math.floor(100000 + Math.random() * 900000)}`;
        const regNum = `AE-RSVP-2026-${Math.floor(100000 + Math.random() * 899999)}`;
        const newRegistration: TicketRegistration = {
          id: uniqueId,
          eventId: event.id,
          fullName,
          email,
          phone,
          organization,
          studentId,
          ticketType,
          quantity,
          specialRequirements,
          emergencyContact,
          registeredAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          status: "active",
          registrationNumber: regNum
        };

        // Save metadata
        const allSaved = loadSavedTickets();
        allSaved.push(newRegistration);
        saveTickets(allSaved);

        setTicketMeta(newRegistration);
        onRegisterSuccess(event.id);
        setStep("success");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, event, fullName, email, phone, organization, studentId, ticketType, quantity, specialRequirements, emergencyContact, onRegisterSuccess]);

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4 sm:px-6">
      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-[2rem] border border-neutral-200 shadow-xl overflow-hidden relative"
          >
            {/* Elegant upper geometric branding banner */}
            <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
                <div>
                  <button 
                    onClick={onClose}
                    className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#F97316] transition-colors mb-3 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to details
                  </button>
                  <h2 id="registration-form-title" className="text-2xl font-display font-black text-neutral-900 tracking-tight">
                    Secure Your Spot
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1 leading-normal font-sans">
                    Complete your registration to instantly generate your premium Gye Nyame digital pass.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-neutral-200/60 max-w-xs flex gap-3 items-start">
                  <img src={event.image} alt={event.title} className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono font-bold text-[#F97316] uppercase block truncate">{event.category}</span>
                    <h3 className="font-display font-bold text-xs text-neutral-900 leading-tight mt-0.5 truncate">{event.title}</h3>
                    <span className="text-[10px] font-medium text-neutral-500 block truncate mt-0.5">{event.university}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
                {/* 1. Personal Information */}
                <div>
                  <h4 className="text-xs font-mono font-black text-[#F97316] tracking-wider uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-[#F97316] rounded-full" />
                    1. Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-450" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Elene Shiro"
                          className={`w-full bg-[#FAF8F5] border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200 focus:border-[#F97316] focus:ring-[#F97316]'} rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans transition-all focus:outline-hidden focus:ring-1`}
                        />
                      </div>
                      {errors.fullName && <span className="text-[10px] font-medium text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-450" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={`w-full bg-[#FAF8F5] border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200 focus:border-[#F97316] focus:ring-[#F97316]'} rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans transition-all focus:outline-hidden focus:ring-1`}
                        />
                      </div>
                      {errors.email && <span className="text-[10px] font-medium text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-450" />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+250 788 000 000"
                          className={`w-full bg-[#FAF8F5] border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200 focus:border-[#F97316] focus:ring-[#F97316]'} rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans transition-all focus:outline-hidden focus:ring-1`}
                        />
                      </div>
                      {errors.phone && <span className="text-[10px] font-medium text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {errors.phone}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">University or Organization *</label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-450" />
                        <input
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g. African Leadership University"
                          className={`w-full bg-[#FAF8F5] border ${errors.organization ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200 focus:border-[#F97316] focus:ring-[#F97316]'} rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans transition-all focus:outline-hidden focus:ring-1`}
                        />
                      </div>
                      {errors.organization && <span className="text-[10px] font-medium text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {errors.organization}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">Student ID (Optional)</label>
                      <div className="relative">
                        <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-450" />
                        <input
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          placeholder="e.g. ALU-CS-2026-981"
                          className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] focus:ring-[#F97316] rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans transition-all focus:outline-hidden focus:ring-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Ticket Information */}
                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="text-xs font-mono font-black text-[#059669] tracking-wider uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-[#059669] rounded-full" />
                    2. Ticket Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">Ticket Type</label>
                      <select
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] focus:ring-[#F97316] rounded-xl py-2.5 px-3.5 text-xs font-semibold text-neutral-800 transition-all focus:outline-hidden"
                      >
                        <option value="General Admission">General Admission (Free)</option>
                        <option value="Student VIP Pass">Student VIP Pass (Free / Fast-Track)</option>
                        <option value="Academic Scholar Pass">Academic Scholar Ticket (Free)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">Quantity</label>
                      <div className="flex items-center gap-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl px-2 py-1 h-[38px] w-fit">
                        <button
                          type="button"
                          disabled={quantity <= 1}
                          onClick={() => setQuantity(prev => prev - 1)}
                          className="w-8 h-8 rounded-lg hover:bg-neutral-200 text-neutral-600 disabled:opacity-40 flex items-center justify-center transition-colors font-bold cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-neutral-900">{quantity}</span>
                        <button
                          type="button"
                          disabled={quantity >= 5}
                          onClick={() => setQuantity(prev => prev + 1)}
                          className="w-8 h-8 rounded-lg hover:bg-neutral-200 text-neutral-600 disabled:opacity-40 flex items-center justify-center transition-colors font-bold cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">Special Requirements (Optional)</label>
                      <textarea
                        value={specialRequirements}
                        onChange={(e) => setSpecialRequirements(e.target.value)}
                        placeholder="e.g. Sign language translation, wheelchair accessibility, dietary restrictions..."
                        rows={2}
                        className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] focus:ring-[#F97316] rounded-xl py-2.5 px-3.5 text-xs font-sans transition-all focus:outline-hidden focus:ring-1"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">Emergency Contact (Optional)</label>
                      <input
                        type="text"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        placeholder="e.g. Jane Shiro (Mother) - +250 788 111 222"
                        className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] focus:ring-[#F97316] rounded-xl py-2.5 px-3.5 text-xs font-sans transition-all focus:outline-hidden focus:ring-1"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Agreement and actions */}
                <div className="pt-6 border-t border-neutral-100 flex flex-col gap-4">
                  <label className="flex items-start gap-3 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="rounded text-[#F97316] focus:ring-[#F97316] border-neutral-300 w-4 h-4 mt-0.5 shrink-0"
                    />
                    <span className="text-xs text-neutral-600 leading-normal font-sans">
                      I agree to the <strong className="font-semibold text-neutral-800 hover:underline">Event Terms</strong> and <strong className="font-semibold text-neutral-800 hover:underline">Privacy Policy</strong>. I consent to receive event updates.
                    </span>
                  </label>
                  {errors.agreed && <span className="text-[10px] font-medium text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.agreed}</span>}

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-3 border border-neutral-200 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-all cursor-pointer text-center"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      Review Registration
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-[2rem] border border-neutral-200 shadow-xl overflow-hidden relative"
          >
            <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#F97316] transition-colors mb-4 cursor-pointer" onClick={() => setStep("form")}>
                <ChevronLeft className="w-4 h-4" /> Back to edit
              </div>
              
              <h2 className="text-2xl font-display font-black text-neutral-900 tracking-tight">
                Review Your RSVP
              </h2>
              <p className="text-xs text-neutral-500 mt-1 leading-normal font-sans">
                Please double-check your registration details before final ticket reservation.
              </p>

              {/* Event card review */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200 flex flex-col sm:flex-row gap-4">
                <img src={event.image} alt={event.title} className="w-full sm:w-28 h-28 object-cover rounded-xl border border-neutral-200 shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-extrabold tracking-wider text-[#F97316] uppercase block">{event.category}</span>
                    <h3 className="font-display font-black text-base text-neutral-900 leading-snug mt-1">{event.title}</h3>
                    <span className="text-xs font-semibold text-emerald-600 block mt-0.5">{event.university}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-neutral-200/60 pt-3 text-[11px] font-mono text-neutral-600">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-[#F97316]" /> {event.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#F97316]" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#F97316]" /> {event.location}</span>
                  </div>
                </div>
              </div>

              {/* Attendee Details Summary */}
              <div className="mt-6 border border-neutral-200 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-mono font-black text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-2">
                  Attendee Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Full Name</span>
                    <span className="text-neutral-800 font-bold font-sans mt-0.5 block">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Email Address</span>
                    <span className="text-neutral-800 font-bold font-sans mt-0.5 block">{email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Phone Number</span>
                    <span className="text-neutral-800 font-bold font-sans mt-0.5 block">{phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Organization / Affiliation</span>
                    <span className="text-neutral-800 font-bold font-sans mt-0.5 block">{organization}</span>
                  </div>
                  {studentId && (
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Student ID</span>
                      <span className="text-neutral-800 font-bold font-sans mt-0.5 block">{studentId}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Ticket Tier & Qty</span>
                    <span className="text-neutral-800 font-bold font-sans mt-0.5 block">
                      {ticketType} <span className="bg-[#FAF8F5] border border-neutral-200 text-xs px-2 py-0.5 rounded-md ml-1.5 font-mono text-[#F97316]">Qty: {quantity}</span>
                    </span>
                  </div>
                  {specialRequirements && (
                    <div className="col-span-1 md:col-span-2">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Special Requirements</span>
                      <span className="text-neutral-800 font-sans mt-0.5 block bg-neutral-50 p-2 rounded-xl border border-neutral-200/40">{specialRequirements}</span>
                    </div>
                  )}
                  {emergencyContact && (
                    <div className="col-span-1 md:col-span-2">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Emergency Contact</span>
                      <span className="text-neutral-800 font-sans mt-0.5 block font-bold">{emergencyContact}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="w-full py-3.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-all cursor-pointer text-center"
                >
                  Edit Information
                </button>
                <button
                  type="button"
                  onClick={() => setStep("processing")}
                  className="w-full py-3.5 bg-gradient-to-r from-[#F97316] to-[#E5630F] hover:from-[#E5630F] hover:to-[#C2410C] text-white text-xs font-bold rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  Confirm Registration
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-[2rem] border border-neutral-200 shadow-xl p-12 text-center flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden"
          >
            {/* Elegant rotating geometric pattern backdrop */}
            <div className="absolute w-72 h-72 rounded-full border border-[#F97316]/5 border-dashed animate-spin duration-10000 pointer-events-none" />
            <div className="absolute w-48 h-48 rounded-full border border-[#059669]/5 border-dashed animate-spin-reverse duration-8000 pointer-events-none" />

            <div className="relative flex items-center justify-center mb-8">
              {/* Colored double-ring premium loading animation */}
              <div className="w-16 h-16 rounded-full border-4 border-[#F97316]/10 border-t-[#F97316] animate-spin absolute" />
              <div className="w-12 h-12 rounded-full border-4 border-[#059669]/10 border-b-[#059669] animate-spin-reverse absolute" />
              <Ticket className="w-6 h-6 text-[#E5A93B]" />
            </div>

            <h3 className="text-xl font-display font-black text-neutral-900 tracking-tight animate-pulse">
              Registering your ticket...
            </h3>
            <p className="text-xs text-neutral-550 mt-2 max-w-xs mx-auto font-sans">
              Please wait while we reserve your seat and secure your unique pass identifier.
            </p>
          </motion.div>
        )}

        {step === "success" && ticketMeta && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8 w-full"
          >
            <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-xl p-8 text-center flex flex-col items-center gap-6 relative overflow-hidden">
              {/* Pure CSS Confetti/Celebration background loops */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(24)].map((_, idx) => {
                  const colors = ["bg-[#F97316]", "bg-[#E5A93B]", "bg-[#059669]", "bg-[#DC2626]"];
                  const left = Math.random() * 100;
                  const size = Math.random() * 8 + 5;
                  const delay = Math.random() * 2;
                  const duration = Math.random() * 2.5 + 2;
                  return (
                    <div
                      key={idx}
                      className={`absolute rounded-full opacity-70 ${colors[idx % colors.length]}`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}%`,
                        top: `-20px`,
                        animation: `fall-confetti ${duration}s linear infinite`,
                        animationDelay: `${delay}s`
                      }}
                    />
                  );
                })}
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes fall-confetti {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 0.9; }
                    100% { transform: translateY(500px) rotate(360deg); opacity: 0; }
                  }
                  @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                  }
                  .animate-spin-reverse {
                    animation: spin-reverse 3s linear infinite;
                  }
                `}} />
              </div>

              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md animate-bounce mt-4 z-10">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2 z-10">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#059669] bg-[#059669]/10 px-3 py-1 rounded-full uppercase">
                  🎉 Registration Successful!
                </span>
                <h2 className="text-3xl font-display font-black text-neutral-950 mt-3">You're All Set!</h2>
                <p className="text-xs text-neutral-550 max-w-md mx-auto leading-relaxed font-sans">
                  Excellent! Your RSVP has been confirmed. Your unique digital pass is generated.
                </p>
              </div>

              {/* Complete Receipt/Invoice snapshot */}
              <div className="border border-neutral-200/80 rounded-2xl p-5 w-full max-w-md text-left z-10 space-y-4 bg-white shadow-xs">
                <div className="flex gap-4 border-b border-neutral-100 pb-4">
                  <img src={event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono tracking-widest font-extrabold text-[#F97316] uppercase">{event.category}</span>
                    <h3 className="font-display font-bold text-sm text-neutral-900 leading-tight mt-0.5 truncate">{event.title}</h3>
                    <span className="text-[11px] font-semibold text-emerald-600 block mt-0.5 truncate">{event.university}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Ticket ID</span>
                    <span className="text-neutral-800 font-bold font-mono mt-0.5 block truncate select-all">{ticketMeta.id}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Registration No.</span>
                    <span className="text-[#F97316] font-bold font-mono mt-0.5 block truncate">{ticketMeta.registrationNumber || "AE-RSVP-2026-N/A"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Date & Time</span>
                    <span className="text-neutral-800 font-bold font-sans mt-0.5 block leading-normal">{event.date.split(", ")[1]} • {event.time}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Venue / Location</span>
                    <span className="text-neutral-800 font-bold font-sans mt-0.5 block truncate leading-normal">{event.location}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Attendee Name</span>
                    <span className="text-neutral-800 font-bold font-sans mt-0.5 block truncate">{ticketMeta.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Registration Status</span>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirmation Notice Card (UI Only) */}
              <div className="bg-[#FAF8F5] border border-dashed border-amber-300/80 rounded-2xl p-4 w-full max-w-md text-left z-10 flex gap-3 items-start">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-neutral-800">Confirmation Notice</h4>
                  <p className="text-[11px] text-neutral-500 leading-normal font-sans">
                    A confirmation email will be sent after backend integration.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mt-2 z-10">
                <button
                  type="button"
                  onClick={() => setStep("ticket")}
                  className="w-full py-3.5 bg-neutral-900 hover:bg-[#F97316] text-white text-xs font-bold rounded-full transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  View Premium Ticket
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3.5 border border-neutral-200 hover:bg-[#FAF8F5] text-neutral-700 text-xs font-bold rounded-full transition-all cursor-pointer"
                >
                  Browse More Events
                </button>
              </div>
            </div>

            {/* Related/Recommended Events Section */}
            <div className="mt-4 border-t border-neutral-100 pt-8 text-left">
              <h3 className="text-lg font-display font-black text-neutral-900 tracking-tight flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#E5A93B]" />
                Discover More Events
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {INITIAL_EVENTS.filter(e => e.id !== event.id).slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white border border-neutral-200/80 hover:border-[#F97316]/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-32 w-full overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-[#F97316] border border-neutral-150 uppercase tracking-wider">
                          {item.category.split(" ")[0]}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <span className="text-[10px] font-bold text-emerald-600 block mb-0.5">{item.university}</span>
                        <h4 className="font-display font-bold text-xs text-neutral-900 leading-snug line-clamp-2 min-h-[2rem]">
                          {item.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 mt-3 text-[10px] font-mono text-neutral-500">
                          <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                          <span>{item.date.split(", ")[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 pb-4 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          setTimeout(() => {
                            const feed = document.getElementById("events-feed");
                            if (feed) feed.scrollIntoView({ behavior: "smooth" });
                          }, 150);
                        }}
                        className="w-full py-2 bg-[#FAF8F5] border border-neutral-200 hover:border-[#F97316] hover:bg-[#F97316]/5 text-neutral-700 text-[11px] font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1"
                      >
                        Explore Event
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === "ticket" && ticketMeta && (
          <motion.div
            key="ticket"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Digital Ticket component (Step 3) with Glassmorphism */}
            <DigitalTicket ticket={ticketMeta} event={event} onBackToSuccess={() => setStep("success")} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// STEP 3: DIGITAL TICKET COMPONENT
// ==========================================
interface DigitalTicketProps {
  ticket: TicketRegistration;
  event: Event;
  onBackToSuccess?: () => void;
  onClose?: () => void;
}

export function DigitalTicket({ ticket, event, onBackToSuccess, onClose }: DigitalTicketProps) {
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "downloaded">("idle");
  const [copiedState, setCopiedState] = useState(false);

  const handleDownload = () => {
    setDownloadState("loading");
    setTimeout(() => {
      setDownloadState("downloaded");
      alert(`Download complete! Ticket ${ticket.id}.pdf saved to device.`);
      setTimeout(() => setDownloadState("idle"), 4000);
    }, 1500);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/tickets/verify?id=${ticket.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 3000);
    });
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`[Pass Reserved] ${event.title}`);
    const details = encodeURIComponent(`Ticket ID: ${ticket.id}\nType: ${ticket.ticketType}\nQuantity: ${ticket.quantity}\nAffiliation: ${ticket.organization}\n\n${event.description}`);
    const location = encodeURIComponent(`${event.location}, ${event.city}, ${event.country}`);
    
    const dateObj = new Date();
    dateObj.setMonth(dateObj.getMonth() + 1); // Mock 1 month out
    const dateStr = dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const dateEndStr = new Date(dateObj.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateEndStr}&details=${details}&location=${location}`;
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6 font-sans">
      
      {/* Premium Glassmorphic digital ticket */}
      <div 
        className="relative bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-neutral-200/80 shadow-2xl overflow-hidden flex flex-col justify-between"
        id={`glass-ticket-${ticket.id}`}
      >
        {/* Upper colored stripe with Gye Nyame patterns */}
        <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />

        {/* Ticket Top: Logo + Cover */}
        <div className="p-6 pb-0 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            {/* Afro Event Logo representation */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#F97316] rounded-full inline-block animate-pulse" />
              <span className="font-display font-black text-xs tracking-tight text-neutral-900 uppercase">
                Afro Event <span className="text-[#F97316]">Pass</span>
              </span>
            </div>
            
            <span className="text-[9px] font-mono tracking-wider font-extrabold bg-[#059669]/10 text-[#059669] border border-[#059669]/20 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-[#059669]" /> {ticket.status.toUpperCase()}
            </span>
          </div>

          {/* Cover Snapshot */}
          <div className="h-28 w-full rounded-2xl overflow-hidden relative border border-neutral-250">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            <div className="absolute bottom-3 inset-x-4 text-white">
              <span className="text-[8px] font-mono font-bold text-[#E5A93B] bg-neutral-950/40 backdrop-blur-xs px-2 py-0.5 rounded-md uppercase">
                {event.category}
              </span>
              <h3 className="font-display font-bold text-sm text-white leading-tight mt-1 truncate" title={event.title}>
                {event.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Ticket Mid: Details Row */}
        <div className="p-6 pt-4 flex flex-col gap-4 relative">
          
          {/* Subtle Gye Nyame watermark symbol */}
          <div className="absolute right-6 bottom-4 w-28 h-28 opacity-[0.025] pointer-events-none select-none z-0">
            <svg viewBox="0 0 100 100" fill="none" stroke="#2B1E16" strokeWidth="8" className="w-full h-full">
              <path d="M 50 15 A 35 35 0 1 0 50 85 A 35 35 0 1 0 50 15 Z M 50 15 L 50 85 M 20 50 L 80 50" />
              <path d="M 28 28 L 72 72 M 72 28 L 28 72" strokeWidth="6" />
              <circle cx="50" cy="50" r="10" fill="#2B1E16" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left z-10">
            <div>
              <span className="text-[8px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">Date</span>
              <span className="font-semibold text-neutral-900 block text-[11px] leading-tight mt-0.5">{event.date.split(", ")[1]}</span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">Time</span>
              <span className="font-semibold text-[#F97316] block text-[11px] mt-0.5">{event.time}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[8px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">Venue</span>
              <span className="font-semibold text-neutral-850 block text-[11px] mt-0.5 truncate" title={event.location}>
                {event.location.split(", ")[0]}, {event.city}
              </span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">Holder</span>
              <span className="font-black text-neutral-900 block text-[11px] mt-0.5 truncate">{ticket.fullName}</span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">Ticket Code</span>
              <span className="font-mono font-bold text-neutral-900 block text-[11px] mt-0.5">{ticket.id}</span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">Ticket Type</span>
              <span className="font-bold text-emerald-700 block text-[10px] mt-0.5 uppercase tracking-wide truncate">{ticket.ticketType}</span>
            </div>
            <div>
              <span className="text-[8px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">Qty</span>
              <span className="font-bold text-neutral-900 block text-[11px] mt-0.5 font-mono">{ticket.quantity} Pax</span>
            </div>
          </div>
        </div>

        {/* Tear off dotted horizontal divisor */}
        <div className="relative flex items-center select-none pointer-events-none my-1">
          <span className="absolute -left-3.5 w-7 h-7 rounded-full bg-[#FAF8F5] border-r border-neutral-200/80 z-10" />
          <div className="w-full border-t-2 border-dashed border-neutral-200" />
          <span className="absolute -right-3.5 w-7 h-7 rounded-full bg-[#FAF8F5] border-l border-neutral-200/80 z-10" />
        </div>

        {/* Ticket Bottom: QR Stub section */}
        <div className="p-6 flex flex-col items-center gap-2.5 bg-neutral-50/50 rounded-b-[2.5rem] z-10">
          <div className="bg-white border border-neutral-200 p-2.5 rounded-2xl shadow-sm hover:scale-103 transition-transform duration-150">
            {/* Mock QR Code representation */}
            <svg className="w-24 h-24 text-neutral-900" viewBox="0 0 100 100" fill="currentColor">
              {/* Pattern Blocks */}
              <rect x="5" y="5" width="22" height="22" />
              <rect x="9" y="9" width="14" height="14" fill="white" />
              <rect x="12" y="12" width="8" height="8" />
              
              <rect x="73" y="5" width="22" height="22" />
              <rect x="77" y="9" width="14" height="14" fill="white" />
              <rect x="80" y="12" width="8" height="8" />
              
              <rect x="5" y="73" width="22" height="22" />
              <rect x="9" y="77" width="14" height="14" fill="white" />
              <rect x="12" y="80" width="8" height="8" />

              {/* Data points */}
              <rect x="36" y="5" width="6" height="30" />
              <rect x="48" y="15" width="14" height="12" />
              <rect x="36" y="55" width="12" height="24" />
              <rect x="55" y="45" width="24" height="15" />
              <rect x="80" y="73" width="15" height="15" />
              <rect x="45" y="80" width="22" height="15" />
              <rect x="52" y="65" width="12" height="6" />
              
              {/* Central small brand emblem */}
              <rect x="45" y="45" width="10" height="10" fill="#F97316" />
            </svg>
          </div>
          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
            Scan QR Code for Admission
          </span>
        </div>
      </div>

      {/* Ticket Commands UI Panel */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 text-xs font-bold font-mono">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloadState === "loading"}
            className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-[#F97316]" /> 
            {downloadState === "loading" ? "Generating..." : "Download Ticket (UI only)"}
          </button>
          
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 transition-all cursor-pointer shadow-xs"
          >
            <Share2 className="w-4 h-4 text-[#059669]" />
            {copiedState ? "Link Copied!" : "Share Ticket"}
          </button>
        </div>

        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-neutral-900 hover:bg-[#F97316] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
        >
          <CalendarPlus className="w-4 h-4 text-[#E5A93B]" />
          Add to Calendar
        </a>

        <button
          type="button"
          onClick={onClose || onBackToSuccess}
          className="w-full py-3 bg-[#FAF8F5] border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-center font-sans"
        >
          <Ticket className="w-4 h-4 text-[#F97316]" />
          Go to My Tickets
        </button>

        {onBackToSuccess && (
          <button
            type="button"
            onClick={onBackToSuccess}
            className="text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors py-2 text-center mt-2 cursor-pointer"
          >
            ← Back to receipt
          </button>
        )}
      </div>

    </div>
  );
}

// ==========================================
// STEP 4: MY TICKETS DASHBOARD VIEW
// ==========================================
interface MyTicketsDashboardProps {
  events: Event[];
  registeredEventIds: string[];
  onSelectTicket: (ticket: TicketRegistration) => void;
  onNavigateToExplore: () => void;
}

export function MyTicketsDashboard({
  events,
  registeredEventIds,
  onSelectTicket,
  onNavigateToExplore
}: MyTicketsDashboardProps) {
  const [tickets, setTickets] = useState<TicketRegistration[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");

  useEffect(() => {
    // Load custom tickets or map fallback registered IDs
    const saved = loadSavedTickets();
    
    // Auto populate fallback records if they have registered IDs but no custom forms saved
    const missingMetadataIds = registeredEventIds.filter(id => !saved.some(t => t.eventId === id));
    if (missingMetadataIds.length > 0) {
      const fallbacks: TicketRegistration[] = missingMetadataIds.map((eid, idx) => {
        const ev = events.find(e => e.id === eid);
        return {
          id: `AE-TK-9${Math.floor(10000 + Math.random() * 89999)}`,
          eventId: eid,
          fullName: "Eleni Shiro",
          email: "eleniss3984@gmail.com",
          phone: "+250 788 123 456",
          organization: ev?.university || "African Leadership University",
          ticketType: "General Admission",
          quantity: 1,
          registeredAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          status: "active"
        };
      });
      const updated = [...saved, ...fallbacks];
      saveTickets(updated);
      setTickets(updated);
    } else {
      setTickets(saved.filter(t => registeredEventIds.includes(t.eventId)));
    }
  }, [registeredEventIds, events]);

  const upcomingTickets = tickets.filter(t => {
    // For sample dataset, consider anything registered as active unless past dates
    const ev = events.find(e => e.id === t.eventId);
    if (!ev) return false;
    const isPast = ev.date.toLowerCase().includes("completed") || ev.date.toLowerCase().includes("2024");
    return !isPast;
  });

  const pastTickets = tickets.filter(t => {
    const ev = events.find(e => e.id === t.eventId);
    if (!ev) return false;
    const isPast = ev.date.toLowerCase().includes("completed") || ev.date.toLowerCase().includes("2024");
    return isPast;
  });

  const activeDisplayTickets = filter === "all" 
    ? tickets 
    : filter === "upcoming" 
      ? upcomingTickets 
      : pastTickets;

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto font-sans">
      
      {/* Header section with African borders */}
      <div className="border-b border-neutral-200 pb-5">
        <h2 className="text-2xl font-display font-black text-neutral-900 tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#F97316] rounded-full inline-block" />
          Your Digital Admissions Hub
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Explore and manage your active academic seminar and workshop credentials. Present QR codes at gates.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2.5 border-b border-neutral-100 pb-3">
        {[
          { id: "upcoming", label: `Upcoming Tickets (${upcomingTickets.length})` },
          { id: "past", label: `Past Tickets (${pastTickets.length})` },
          { id: "all", label: `All passes (${tickets.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
              filter === tab.id 
                ? "bg-[#FAF8F5] border border-neutral-300 text-neutral-900 font-extrabold" 
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeDisplayTickets.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-neutral-200 p-12 text-center max-w-md mx-auto flex flex-col items-center gap-4 shadow-sm mt-4">
          <div className="w-14 h-14 bg-[#FAF8F5] border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-400 shadow-3xs">
            <Ticket className="w-7 h-7 text-[#F97316]" />
          </div>
          <div>
            <h4 className="font-display font-bold text-neutral-950 text-base">No Passes Found</h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              You do not have any {filter === "upcoming" ? "upcoming" : filter === "past" ? "past" : ""} registrations. Afro Event passes are completely free for students.
            </p>
          </div>
          <button
            onClick={onNavigateToExplore}
            className="mt-2 px-5 py-2.5 bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold rounded-full shadow-md transition-all cursor-pointer"
          >
            Discover Academic Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeDisplayTickets.map(ticket => {
            const ev = events.find(e => e.id === ticket.eventId);
            if (!ev) return null;
            const isPast = ev.date.toLowerCase().includes("completed") || ev.date.toLowerCase().includes("2024");

            return (
              <div 
                key={ticket.id}
                className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#F97316]/30 transition-all flex flex-col justify-between group"
              >
                {/* Upper banner stripe */}
                <div className="h-2 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />
                
                <div className="p-5 flex-1 flex gap-4">
                  <img src={ev.image} alt={ev.title} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-neutral-150 shrink-0 self-start" />
                  <div className="min-w-0 flex-1 flex flex-col justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-mono tracking-widest font-extrabold text-[#F97316] bg-[#F97316]/5 px-2 py-0.5 rounded-md uppercase">
                          {ev.category}
                        </span>
                        <span className="text-[8px] font-mono font-bold text-neutral-400">{ticket.id}</span>
                      </div>
                      
                      <h3 className="font-display font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-[#F97316] transition-colors leading-tight mt-1.5 truncate">
                        {ev.title}
                      </h3>
                      
                      <p className="text-[10px] text-neutral-500 font-medium truncate mt-1">{ev.university}</p>
                    </div>

                    <div className="flex flex-col gap-0.5 text-[10px] text-neutral-500 font-mono mt-1.5 border-t border-neutral-50 pt-1.5">
                      <span className="flex items-center gap-1 font-bold"><Calendar className="w-3 h-3 text-[#F97316]" /> {ev.date.split(", ")[1]}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-neutral-400" /> {ev.time}</span>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-3.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isPast 
                      ? "bg-neutral-250 text-neutral-600 border border-neutral-300" 
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}>
                    {isPast ? "PAST PASS" : "ACTIVE RSVP"}
                  </span>
                  
                  <button
                    onClick={() => onSelectTicket(ticket)}
                    className="text-[#F97316] hover:text-[#E5630F] font-bold text-xs flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    View Ticket <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

// ==========================================
// STEP 5: TICKET DETAILS VIEW
// ==========================================
interface TicketDetailsViewProps {
  ticket: TicketRegistration;
  event: Event;
  onBack: () => void;
}

export function TicketDetailsView({ ticket, event, onBack }: TicketDetailsViewProps) {
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleShareClick = () => {
    const url = `${window.location.origin}/tickets/verify?id=${ticket.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 3000);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 font-sans">
      
      {/* Upper return navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-950 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Tickets Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Complete Premium digital ticket glass layout */}
        <div className="lg:col-span-5 flex flex-col gap-4 self-center">
          <h4 className="text-xs font-mono font-bold text-[#F97316] uppercase tracking-wider mb-1">Your Admission Pass</h4>
          <DigitalTicket ticket={ticket} event={event} />
        </div>

        {/* Right Column: Full Event snapshot info + Organizer info + map */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Detailed Gathering overview */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs space-y-4">
            <span className="text-[9px] font-mono tracking-widest font-extrabold text-[#F97316] bg-[#F97316]/5 px-2.5 py-1 rounded-full uppercase">
              {event.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-black text-neutral-900 leading-tight">
              {event.title}
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans pt-2 border-t border-neutral-100">
              {event.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100 font-mono text-[11px] font-bold">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-neutral-100 rounded-lg text-neutral-600"><CalendarDays className="w-4 h-4 text-[#F97316]" /></div>
                <div>
                  <span className="text-[8px] text-neutral-450 block uppercase font-bold">Date Scheduled</span>
                  <span className="text-neutral-800 text-[11px]">{event.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-neutral-100 rounded-lg text-neutral-600"><Clock className="w-4 h-4 text-[#F97316]" /></div>
                <div>
                  <span className="text-[8px] text-neutral-450 block uppercase font-bold">Hours Scheduled</span>
                  <span className="text-neutral-800 text-[11px]">{event.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Host Contact details */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs space-y-4">
            <h3 className="text-xs font-mono font-black text-[#059669] tracking-wider uppercase flex items-center gap-1.5">
              <UserCheck className="w-4.5 h-4.5 text-[#059669]" />
              Organizer Contact
            </h3>
            
            <div className="flex gap-4 items-start pt-2">
              <img src={event.organizerAvatar} alt={event.organizer} className="w-12 h-12 rounded-xl object-cover border border-neutral-150 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">{event.organizerRole}</span>
                <h4 className="font-display font-bold text-sm text-neutral-900 leading-tight mt-0.5">{event.organizer}</h4>
                <p className="text-xs text-neutral-500 font-sans mt-1.5 leading-relaxed">
                  Chapter representatives coordinate all student admissions. Reach out for parking passes or remote sync coordinates.
                </p>
                
                <div className="flex gap-4 text-xs font-semibold text-neutral-700 mt-3 border-t border-neutral-100 pt-3">
                  <a href="mailto:coordinator@afroevent.org" className="hover:text-[#F97316] flex items-center gap-1">
                    <Mail className="w-4 h-4 text-neutral-400" /> coordinator@afroevent.org
                  </a>
                  <a href="https://afroevent.org" target="_blank" rel="noreferrer" className="hover:text-[#F97316] flex items-center gap-1">
                    <ExternalLink className="w-4 h-4 text-neutral-400" /> afroevent.org
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Venue map placeholder with geometric aesthetics */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs space-y-4">
            <h3 className="text-xs font-mono font-black text-purple-600 tracking-wider uppercase flex items-center gap-1.5">
              <MapIcon className="w-4.5 h-4.5 text-purple-600" />
              Venue Location Mapping
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-1">
              <div className="sm:col-span-5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] font-mono text-neutral-400 block uppercase font-bold tracking-wider">Campus Auditorium</span>
                  <p className="text-sm font-semibold text-neutral-800 mt-1">{event.location}</p>
                  <p className="text-xs text-neutral-500 font-sans leading-normal mt-1">
                    {event.university} <br />
                    {event.city}, {event.country}
                  </p>
                </div>
                
                <button
                  onClick={() => alert(`Directions loaded for ${event.location}. Map coordinates sync initiated.`)}
                  className="w-full py-2.5 bg-[#FAF8F5] hover:bg-neutral-50 text-neutral-800 text-xs font-bold rounded-xl border border-neutral-200 flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#F97316]" /> Get Directions
                </button>
              </div>

              {/* Map Placeholder */}
              <div className="sm:col-span-7 bg-[#FAF8F5] border-2 border-dashed border-neutral-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative group min-h-[140px]">
                <div className="p-2.5 bg-white border border-neutral-250 rounded-full text-[#F97316] shadow-3xs">
                  <MapIcon className="w-5 h-5 text-[#F97316]" />
                </div>
                <div className="mt-2 text-center max-w-xs">
                  <span className="text-xs font-bold text-neutral-900 block">Interactive Local Area Map</span>
                  <span className="text-[9px] text-neutral-400 block mt-0.5">GPS: LAT 1.9441° S / LON 30.0619° E</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
