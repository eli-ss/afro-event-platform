/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Calendar, MapPin, Tag, Users, Shield, ArrowRight, CheckCircle2, Ticket, Printer, Download, Sparkles } from "lucide-react";
import { Event } from "./mockEvents";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onRegisterSuccess: (eventId: string) => void;
  isAlreadyRegistered: boolean;
  userEmail?: string;
  userName?: string;
}

export default function EventDetailModal({
  isOpen,
  onClose,
  event,
  onRegisterSuccess,
  isAlreadyRegistered,
  userEmail = "",
  userName = ""
}: EventDetailModalProps) {
  const [formData, setFormData] = React.useState({
    name: userName || "",
    email: userEmail || "",
    job: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [ticketData, setTicketData] = React.useState<{
    ticketCode: string;
    holderName: string;
    holderEmail: string;
    registeredAt: string;
  } | null>(null);

  React.useEffect(() => {
    if (userName) setFormData(prev => ({ ...prev, name: userName }));
    if (userEmail) setFormData(prev => ({ ...prev, email: userEmail }));
    setTicketData(null);
  }, [userName, userEmail, isOpen, event]);

  if (!isOpen || !event) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and Email are required to claim your ticket.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketCode = `AE-${Math.floor(1000 + Math.random() * 9000)}-${event.city.substring(0,3).toUpperCase()}`;
      setTicketData({
        ticketCode,
        holderName: formData.name,
        holderEmail: formData.email,
        registeredAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      });
      setIsSubmitting(false);
      onRegisterSuccess(event.id);
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      id="modal-detail-overlay"
    >
      {/* Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Confetti Animation Layer if registered */}
      {ticketData && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Custom pure-CSS colorful confetti loops */}
          {[...Array(24)].map((_, idx) => {
            const colors = ["bg-[#F97316]", "bg-[#E5A93B]", "bg-[#059669]", "bg-[#DC2626]"];
            const delay = Math.random() * 3;
            const left = Math.random() * 100;
            const size = Math.random() * 10 + 6;
            const duration = Math.random() * 3 + 2;
            return (
              <div
                key={idx}
                className={`absolute rounded-full opacity-85 animate-bounce ${colors[idx % colors.length]}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `-20px`,
                  animation: `fall ${duration}s linear infinite`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
          {/* Inject style for keyframes locally */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fall {
              0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
              100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
            }
          `}} />
        </div>
      )}

      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden relative shadow-2xl border border-charcoal-100 z-10 transition-all duration-300 my-8 transform scale-100 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        id="modal-detail-card"
      >
        <div className="h-2 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669] shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white bg-charcoal-900/50 hover:bg-charcoal-900/80 rounded-full transition-all z-20 cursor-pointer shadow-md"
          id="btn-detail-close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Large Hero Cover Photo */}
          <div className="h-56 sm:h-72 w-full relative shrink-0">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover" 
            />
            {/* Dark gradient overlap */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
            
            {/* Event Header overlaid on cover image */}
            <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 text-white">
              <span className="text-[10px] font-mono tracking-widest font-bold bg-[#F97316] px-3 py-1 rounded-full uppercase shadow-sm">
                {event.category}
              </span>
              <h2 className="text-xl sm:text-3xl font-display font-extrabold tracking-tight mt-3 text-white leading-tight">
                {event.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Rich Details & Organizer */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Event Description */}
              <div>
                <h3 className="font-display font-bold text-charcoal-900 text-sm uppercase tracking-wider mb-2">About The Gathering</h3>
                <p className="text-charcoal-600 text-sm leading-relaxed whitespace-pre-line font-sans">
                  {event.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-mono font-semibold bg-neutral-100 text-charcoal-700 px-2.5 py-1 rounded-lg border border-charcoal-200/50">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Host Section */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-charcoal-100 flex items-start gap-3 mt-2">
                <img 
                  src={event.organizerAvatar} 
                  alt={event.organizer} 
                  className="w-10 h-10 rounded-full object-cover border border-charcoal-200 shrink-0" 
                />
                <div>
                  <span className="text-[10px] font-mono text-charcoal-500 block">HOSTED BY</span>
                  <h4 className="font-display font-semibold text-charcoal-900 text-xs mt-0.5">{event.organizer}</h4>
                  <p className="text-[11px] text-charcoal-600 mt-0.5 leading-relaxed">{event.organizerRole}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Action Card (Register OR Display Ticket) */}
            <div className="lg:col-span-5 flex flex-col gap-4 self-stretch lg:sticky lg:top-0">
              {ticketData ? (
                /* Ticket view if newly registered */
                <div 
                  className="bg-[#FFFDF9] border-2 border-dashed border-[#E5A93B] rounded-3xl p-5 shadow-lg relative overflow-hidden flex flex-col gap-4"
                  id="ticket-view-board"
                >
                  {/* Decorative circular notch cuts on sides like a real ticket */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-white border-r border-charcoal-150 transform -translate-y-1/2 z-10" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white border-l border-charcoal-150 transform -translate-y-1/2 z-10" />

                  {/* Watermark Logo Background */}
                  <div className="absolute right-0 bottom-4 opacity-[0.04] pointer-events-none scale-[2.2] origin-bottom-right">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                      <path d="M30 10 L30 70 M30 20 C5 20, 5 60, 30 60 M30 20 C55 20, 55 60, 30 60" stroke="#059669" strokeWidth="6" />
                    </svg>
                  </div>

                  <div className="text-center pb-3 border-b border-dashed border-charcoal-200">
                    <span className="text-[9px] font-mono tracking-widest font-bold bg-[#059669]/10 text-[#059669] border border-[#059669]/20 px-3 py-1 rounded-full uppercase inline-block">
                      ✓ RSVP CONFIRMED
                    </span>
                    <h4 className="font-display font-black text-charcoal-900 text-sm mt-3 uppercase tracking-wider">
                      Afro Event Pass
                    </h4>
                  </div>

                  {/* Ticket Information */}
                  <div className="flex flex-col gap-2.5 text-xs text-charcoal-700 font-sans border-b border-dashed border-charcoal-150 pb-3">
                    <div>
                      <span className="text-[9px] font-mono text-charcoal-400 block uppercase">EVENT TITLE</span>
                      <span className="font-semibold text-charcoal-900 truncate block">{event.title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] font-mono text-charcoal-400 block uppercase">DATE</span>
                        <span className="font-semibold text-charcoal-900 block text-[11px] leading-tight">{event.date}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-charcoal-400 block uppercase">TIME</span>
                        <span className="font-semibold text-[#F97316] block">{event.time}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-charcoal-400 block uppercase">TICKET HOLDER</span>
                      <span className="font-bold text-charcoal-900 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        {ticketData.holderName}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-charcoal-400 block uppercase">ACCESS KEY</span>
                      <span className="font-mono font-bold text-charcoal-900 text-xs tracking-wider">{ticketData.ticketCode}</span>
                    </div>
                  </div>

                  {/* Simulated QR Code check-in */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2.5 bg-white border border-charcoal-150 rounded-xl shadow-xs">
                      {/* SVG Barcode/QR Mock */}
                      <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-90">
                        {/* Fake structured QR grid */}
                        <rect x="0" y="0" width="20" height="20" fill="#2B1E16" />
                        <rect x="4" y="4" width="12" height="12" fill="#FFF" />
                        <rect x="8" y="8" width="4" height="4" fill="#2B1E16" />

                        <rect x="80" y="0" width="20" height="20" fill="#2B1E16" />
                        <rect x="84" y="4" width="12" height="12" fill="#FFF" />
                        <rect x="88" y="8" width="4" height="4" fill="#2B1E16" />

                        <rect x="0" y="80" width="20" height="20" fill="#2B1E16" />
                        <rect x="4" y="84" width="12" height="12" fill="#FFF" />
                        <rect x="88" y="88" width="4" height="4" fill="#2B1E16" />

                        {/* Random pixels */}
                        <rect x="25" y="4" width="6" height="6" fill="#2B1E16" />
                        <rect x="35" y="10" width="12" height="4" fill="#2B1E16" />
                        <rect x="55" y="2" width="4" height="12" fill="#2B1E16" />
                        <rect x="70" y="8" width="6" height="4" fill="#2B1E16" />

                        <rect x="4" y="25" width="8" height="4" fill="#2B1E16" />
                        <rect x="18" y="32" width="4" height="12" fill="#2B1E16" />
                        <rect x="30" y="28" width="14" height="6" fill="#2B1E16" />
                        <rect x="50" y="25" width="8" height="8" fill="#2B1E16" />
                        <rect x="65" y="35" width="22" height="4" fill="#2B1E16" />

                        <rect x="2" y="45" width="14" height="4" fill="#2B1E16" />
                        <rect x="24" y="48" width="6" height="10" fill="#2B1E16" />
                        <rect x="40" y="42" width="12" height="6" fill="#2B1E16" />
                        <rect x="60" y="48" width="18" height="4" fill="#2B1E16" />

                        <rect x="10" y="60" width="24" height="4" fill="#2B1E16" />
                        <rect x="42" y="60" width="8" height="8" fill="#2B1E16" />
                        <rect x="58" y="58" width="4" height="14" fill="#2B1E16" />
                        <rect x="74" y="65" width="16" height="4" fill="#2B1E16" />

                        <rect x="25" y="80" width="14" height="6" fill="#2B1E16" />
                        <rect x="45" y="82" width="12" height="4" fill="#2B1E16" />
                        <rect x="62" y="84" width="8" height="10" fill="#2B1E16" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono text-charcoal-400 uppercase tracking-widest font-semibold">
                      Present QR on phone for entry
                    </span>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-charcoal-150 text-xs">
                    <button 
                      type="button"
                      onClick={() => alert("Simulating download... Your PDF ticket is ready!")}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-charcoal-250 hover:bg-neutral-50 text-charcoal-700 bg-white font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                    <button 
                      type="button"
                      onClick={() => window.print()}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-charcoal-250 hover:bg-neutral-50 text-charcoal-700 bg-white font-semibold cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                  </div>
                </div>
              ) : isAlreadyRegistered ? (
                /* Already Registered Screen */
                <div 
                  className="bg-[#f0fdf4] border border-emerald-200 rounded-3xl p-6 shadow-md text-center flex flex-col items-center gap-4"
                  id="ticket-already-board"
                >
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-charcoal-900 text-base">You are registered!</h4>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                      You are already on the attendee list for this event. We have emailed you your QR entrance ticket.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Generate ticket details for display
                      setTicketData({
                        ticketCode: `AE-${Math.floor(1000 + Math.random() * 9000)}-${event.city.substring(0,3).toUpperCase()}`,
                        holderName: userName || "Elene S.",
                        holderEmail: userEmail || "elenis@gmail.com",
                        registeredAt: "Previously Booked"
                      });
                    }}
                    className="w-full bg-white hover:bg-neutral-50 text-emerald-800 text-xs font-bold py-2.5 px-4 rounded-xl border border-emerald-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <Ticket className="w-4 h-4" />
                    View Entrance Ticket
                  </button>
                </div>
              ) : (
                /* Standard Registration Form */
                <div 
                  className="bg-neutral-50 border border-charcoal-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4"
                  id="ticket-register-board"
                >
                  <div>
                    <h4 className="font-display font-bold text-charcoal-900 text-sm uppercase tracking-wider mb-1">Secure Your Spot</h4>
                    <p className="text-xs text-charcoal-600">
                      Fill out your details to immediately generate your entrance pass.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-charcoal-500 uppercase font-bold">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Elene S."
                        className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-charcoal-500 uppercase font-bold">Your Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-charcoal-500 uppercase font-bold">Professional Title / Org (Optional)</label>
                      <input
                        type="text"
                        name="job"
                        value={formData.job}
                        onChange={handleInputChange}
                        placeholder="e.g. VC Partner"
                        className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316]"
                      />
                    </div>

                    {/* Metadata specs */}
                    <div className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-charcoal-150 text-xs">
                      <div className="flex items-center justify-between text-charcoal-700">
                        <span>Admission Ticket:</span>
                        <span className="font-bold font-mono text-charcoal-900">{event.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-charcoal-700 border-t border-charcoal-100 pt-2">
                        <span>Tax & Platform fee:</span>
                        <span className="text-[#059669] font-mono font-bold">FREE ($0.00)</span>
                      </div>
                      <div className="flex items-center justify-between font-bold text-charcoal-900 border-t border-charcoal-100 pt-2">
                        <span>Total Due:</span>
                        <span className="font-mono text-[#F97316]">{event.price}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-75 cursor-pointer"
                      id="btn-detail-claim-ticket"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Claim Free Admission Ticket
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-[10px] text-charcoal-500 text-center flex items-center justify-center gap-1 leading-normal font-sans">
                    <Shield className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                    Instant confirmation. Encrypted and secured via Afro Event.
                  </p>
                </div>
              )}

              {/* General Date Location Information widgets */}
              <div className="bg-neutral-50/50 border border-charcoal-150 rounded-3xl p-5 flex flex-col gap-4 font-sans text-xs">
                {/* Date-time Row */}
                <div className="flex gap-3 items-start">
                  <div className="p-2.5 rounded-xl bg-white border border-charcoal-200 text-[#F97316] shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-charcoal-900 text-[11px] uppercase tracking-wider">Date & Timing</h4>
                    <p className="text-charcoal-700 font-semibold mt-1">{event.date}</p>
                    <p className="text-charcoal-500 mt-0.5">{event.time}</p>
                  </div>
                </div>

                {/* Venue Row */}
                <div className="flex gap-3 items-start border-t border-charcoal-150 pt-4">
                  <div className="p-2.5 rounded-xl bg-white border border-charcoal-200 text-[#059669] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-charcoal-900 text-[11px] uppercase tracking-wider">Gathering Venue</h4>
                    <p className="text-charcoal-700 font-semibold mt-1">{event.location}</p>
                    <p className="text-charcoal-500 mt-0.5">{event.city}, {event.country}</p>
                  </div>
                </div>

                {/* Cap/RSVP counts */}
                <div className="flex gap-3 items-start border-t border-charcoal-150 pt-4">
                  <div className="p-2.5 rounded-xl bg-white border border-charcoal-200 text-[#E5A93B] shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-charcoal-900 text-[11px] uppercase tracking-wider">Gathering Size</h4>
                    <p className="text-charcoal-700 font-semibold mt-1">
                      {event.rsvpCount + (ticketData ? 1 : 0)} Attending
                    </p>
                    <p className="text-charcoal-500 mt-0.5">Capacity limit: {event.capacity} seats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
