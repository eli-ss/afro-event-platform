/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  X, Calendar, MapPin, Tag, DollarSign, Clock, Users, FileText, Check, AlertCircle, 
  ChevronRight, ChevronLeft, Image as ImageIcon, Plus, Trash2, Globe, Sparkles, 
  ShieldCheck, HelpCircle, Phone, Mail, Link as LinkIcon, User, Layers, ArrowRight, Save
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Event } from "./mockEvents";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
  userName: string;
}

// Preset Covers with rich African and general event aesthetics
const PRESET_COVERS = [
  { key: "culture", url: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80", label: "Cultural Festival & Music", desc: "Vibrant community events" },
  { key: "tech", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", label: "Tech Hackathon & AI", desc: "Coding, science, & panels" },
  { key: "education", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", label: "Academic Seminar & Workshop", desc: "Classes and research boards" },
  { key: "startup", url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80", label: "Pitch Day & Business Summit", desc: "Founders and accelerators" },
  { key: "network", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", label: "Creative Lounge & Meetup", desc: "Interactive social hours" },
  { key: "nature", url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80", label: "GreenTech & AgriSummit", desc: "Sustainability forums" }
];

const CATEGORIES = [
  "Academic Seminar",
  "Workshop",
  "Career Fair",
  "Startup Pitch",
  "Hackathon",
  "Cultural Event",
  "Competition"
];

const TIMEZONES = [
  { value: "WAT", label: "West Africa Time (GMT+1)" },
  { value: "CAT", label: "Central Africa Time (GMT+2)" },
  { value: "EAT", label: "East Africa Time (GMT+3)" },
  { value: "GMT", label: "Greenwich Mean Time (GMT+0)" },
  { value: "SAST", label: "South Africa Standard Time (GMT+2)" }
];

const CURRENCIES = [
  { value: "USD", label: "US Dollar ($)" },
  { value: "RWF", label: "Rwandan Franc (RWF)" },
  { value: "NGN", label: "Nigerian Naira (₦)" },
  { value: "KES", label: "Kenyan Shilling (KSh)" },
  { value: "GHS", label: "Ghanaian Cedi (GH₵)" },
  { value: "ZAR", label: "South African Rand (R)" }
];

export default function CreateEventModal({
  isOpen,
  onClose,
  onAddEvent,
  userName
}: CreateEventModalProps) {
  // Stepper State (Steps 1 to 6, then 7 is Preview/Publish)
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 7;

  // Form State
  const [formData, setFormData] = React.useState({
    // Step 1: Basic Information
    title: "",
    tagline: "",
    description: "",
    coverImage: PRESET_COVERS[0].url,
    selectedCoverPreset: "culture",
    customCoverUrl: "",
    galleryUrlInput: "",
    galleryImages: [] as string[],

    // Step 2: Event Details
    category: "Academic Seminar" as Event["category"],
    eventType: "Free" as "Free" | "Paid" | "Invite Only",
    date: "",
    startTime: "",
    endTime: "",
    timezone: "CAT",

    // Step 3: Location
    country: "",
    city: "",
    venueName: "",
    fullAddress: "",
    mapsLink: "",

    // Step 4: Tickets & Capacity
    maxAttendees: "100",
    unlimitedCapacity: false,
    ticketType: "General Admission",
    ticketPrice: "",
    currency: "USD",
    earlyBirdEnabled: false,
    earlyBirdPrice: "",
    earlyBirdCapacity: "",
    vipEnabled: false,
    vipPrice: "",
    vipCapacity: "",
    studentEnabled: false,
    studentPrice: "",
    studentCapacity: "",

    // Step 5: Organizer
    organizerName: userName || "Anonymous Community Lead",
    organizerEmail: "",
    organizerPhone: "",
    organizerWebsite: "",
    twitterLink: "",
    instagramLink: "",
    linkedinLink: "",
    speakerNameInput: "",
    speakerRoleInput: "",
    speakerCompanyInput: "",
    speakerAvatarInput: "",
    speakers: [] as Array<{ id: string; name: string; role: string; company?: string; avatar?: string }>,

    // Step 6: Settings
    isPublic: true,
    registrationRequired: true,
    waitingListEnabled: false,
    isFeatured: false
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSaveDrafting, setIsSaveDrafting] = React.useState(false);
  const [showDraftToast, setShowDraftToast] = React.useState(false);

  // Sync organizer name if logged in user changes
  React.useEffect(() => {
    if (userName) {
      setFormData(prev => ({ ...prev, organizerName: userName }));
    }
  }, [userName]);

  if (!isOpen) return null;

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleToggleChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Add gallery image
  const addGalleryImage = () => {
    if (formData.galleryUrlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        galleryImages: [...prev.galleryImages, prev.galleryUrlInput.trim()],
        galleryUrlInput: ""
      }));
    }
  };

  // Remove gallery image
  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  // Add Speaker
  const addSpeaker = () => {
    if (formData.speakerNameInput.trim() && formData.speakerRoleInput.trim()) {
      const newSpeaker = {
        id: `spk-${Date.now()}`,
        name: formData.speakerNameInput.trim(),
        role: formData.speakerRoleInput.trim(),
        company: formData.speakerCompanyInput.trim() || undefined,
        avatar: formData.speakerAvatarInput.trim() || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.speakerNameInput)}`
      };
      setFormData(prev => ({
        ...prev,
        speakers: [...prev.speakers, newSpeaker],
        speakerNameInput: "",
        speakerRoleInput: "",
        speakerCompanyInput: "",
        speakerAvatarInput: ""
      }));
    }
  };

  // Remove Speaker
  const removeSpeaker = (id: string) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.filter(s => s.id !== id)
    }));
  };

  // Validate current step
  const validateStep = (step: number) => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) stepErrors.title = "Event title is required";
      if (!formData.tagline.trim()) stepErrors.tagline = "A short tagline is required for listing";
      if (!formData.description.trim()) stepErrors.description = "A description is required";
    }

    if (step === 2) {
      if (!formData.date) stepErrors.date = "Event date is required";
      if (!formData.startTime) stepErrors.startTime = "Start time is required";
      if (!formData.endTime) stepErrors.endTime = "End time is required";
    }

    if (step === 3) {
      if (!formData.country.trim()) stepErrors.country = "Country is required";
      if (!formData.city.trim()) stepErrors.city = "City is required";
      if (!formData.venueName.trim()) stepErrors.venueName = "Venue name is required";
      if (!formData.fullAddress.trim()) stepErrors.fullAddress = "Full physical address is required";
    }

    if (step === 4) {
      if (!formData.unlimitedCapacity && (!formData.maxAttendees || isNaN(Number(formData.maxAttendees)) || Number(formData.maxAttendees) <= 0)) {
        stepErrors.maxAttendees = "Enter a valid positive number for capacity";
      }
      if (formData.eventType === "Paid" && (!formData.ticketPrice || isNaN(Number(formData.ticketPrice)) || Number(formData.ticketPrice) < 0)) {
        stepErrors.ticketPrice = "Paid events require a numeric price";
      }
      if (formData.earlyBirdEnabled && (!formData.earlyBirdPrice || isNaN(Number(formData.earlyBirdPrice)))) {
        stepErrors.earlyBirdPrice = "Enter a valid early bird price";
      }
      if (formData.vipEnabled && (!formData.vipPrice || isNaN(Number(formData.vipPrice)))) {
        stepErrors.vipPrice = "Enter a valid VIP price";
      }
      if (formData.studentEnabled && (!formData.studentPrice || isNaN(Number(formData.studentPrice)))) {
        stepErrors.studentPrice = "Enter a valid student price";
      }
    }

    if (step === 5) {
      if (!formData.organizerName.trim()) stepErrors.organizerName = "Organizer name is required";
      if (formData.organizerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.organizerEmail)) {
        stepErrors.organizerEmail = "Enter a valid email address";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      // Scroll modal contents back to top
      const scrollableDiv = document.getElementById("multi-step-modal-scrollable");
      if (scrollableDiv) scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
    const scrollableDiv = document.getElementById("multi-step-modal-scrollable");
    if (scrollableDiv) scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveDraft = () => {
    setIsSaveDrafting(true);
    setTimeout(() => {
      setIsSaveDrafting(false);
      setShowDraftToast(true);
      setTimeout(() => {
        setShowDraftToast(false);
        onClose();
      }, 2500);
    }, 1000);
  };

  const handlePublish = () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4) || !validateStep(5)) {
      // Find the first step with error and navigate to it
      for (let s = 1; s <= 5; s++) {
        if (!validateStep(s)) {
          setCurrentStep(s);
          return;
        }
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Structure the new Event object
      const displayDate = new Date(formData.date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      }).toUpperCase();

      // Formulate price tag
      let finalPrice = "Free";
      if (formData.eventType === "Paid") {
        const symbol = formData.currency === "USD" ? "$" : formData.currency + " ";
        finalPrice = `${symbol}${parseFloat(formData.ticketPrice).toFixed(2)}`;
      } else if (formData.eventType === "Invite Only") {
        finalPrice = "Invite Only";
      }

      const newEvent: Event = {
        id: `evt-custom-${Date.now()}`,
        title: formData.title,
        date: displayDate,
        time: `${formData.startTime} ${formData.timezone}`,
        location: `${formData.venueName}, ${formData.city}`,
        university: formData.venueName.includes("Campus") || formData.venueName.includes("University")
          ? formData.venueName 
          : `${formData.city} Campus Hub`,
        city: formData.city,
        country: formData.country,
        organizer: formData.organizerName,
        organizerAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.organizerName)}`,
        organizerRole: "Afro Event Host & Creator",
        image: formData.customCoverUrl.trim() || formData.coverImage,
        category: formData.category,
        price: finalPrice,
        isFree: formData.eventType === "Free",
        rsvpCount: 0,
        description: formData.description,
        capacity: formData.unlimitedCapacity ? 9999 : (Number(formData.maxAttendees) || 100),
        tags: [formData.category, formData.eventType, formData.city].filter(Boolean)
      };

      onAddEvent(newEvent);
      setIsSubmitting(false);
      onClose();
    }, 1200);
  };

  // Quick preset cover image apply
  const selectCoverPreset = (url: string, key: string) => {
    setFormData(prev => ({
      ...prev,
      coverImage: url,
      selectedCoverPreset: key,
      customCoverUrl: ""
    }));
  };

  // Helper step metadata
  const stepsMeta = [
    { num: 1, title: "Basic Info", desc: "Title & Media" },
    { num: 2, title: "Schedule", desc: "Dates & Times" },
    { num: 3, title: "Venue", desc: "Map & Coordinates" },
    { num: 4, title: "Tickets", desc: "Pricing & Limits" },
    { num: 5, title: "Host Profile", desc: "Organizer details" },
    { num: 6, title: "Settings", desc: "Audience parameters" },
    { num: 7, title: "Preview", desc: "Review & Publish" }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
      id="modal-create-event-overlay"
    >
      {/* Dark Backdrop with heavy blur for high-end SaaS focus */}
      <div 
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Draft Notification Toast */}
      <AnimatePresence>
        {showDraftToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-neutral-900 border border-charcoal-800 text-white text-xs font-semibold px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-2 z-55"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
            <Save className="w-4 h-4 text-[#E5A93B]" />
            <span>Event Draft saved safely to local profile!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container: Wide Luma layout style */}
      <div 
        className="bg-[#FAF8F5] text-charcoal-900 rounded-[28px] w-full max-w-4xl h-[92vh] sm:h-[85vh] overflow-hidden relative shadow-[0_24px_50px_-12px_rgba(30,20,10,0.22)] border border-charcoal-150 z-10 flex flex-col transition-all duration-300 transform scale-100"
        id="modal-create-event-card"
      >
        {/* Colorful Afrocentric Visual Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669] shrink-0" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-charcoal-400 hover:text-charcoal-800 hover:bg-white rounded-full transition-all duration-200 z-30 shadow-xs border border-charcoal-100 cursor-pointer"
          id="btn-create-close"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* TOP WORKFLOW HEADER (Left titles, Right live stepper progress indicator) */}
        <div className="px-6 py-4 border-b border-charcoal-150 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold font-mono tracking-wider uppercase">
                Creator Studio
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93B] animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <h3 className="font-display font-black text-lg sm:text-xl text-charcoal-950 mt-1 flex items-center gap-1.5">
              Create Your Gathering
            </h3>
          </div>

          {/* SaaS Stepper progress */}
          <div className="hidden sm:flex items-center gap-1.5 bg-neutral-50 p-1.5 rounded-xl border border-charcoal-100">
            {stepsMeta.map((s) => {
              const isCompleted = currentStep > s.num;
              const isActive = currentStep === s.num;
              return (
                <div key={s.num} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      // Allow navigating back or forward only if valid
                      if (s.num < currentStep) {
                        setCurrentStep(s.num);
                      } else if (s.num > currentStep && validateStep(currentStep)) {
                        let ok = true;
                        for (let check = currentStep; check < s.num; check++) {
                          if (!validateStep(check)) {
                            setCurrentStep(check);
                            ok = false;
                            break;
                          }
                        }
                        if (ok) setCurrentStep(s.num);
                      }
                    }}
                    className={`h-7 px-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer
                      ${isActive 
                        ? "bg-[#F97316] text-white shadow-xs" 
                        : isCompleted 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-150" 
                          : "text-charcoal-400 hover:text-charcoal-700 hover:bg-neutral-100"}`}
                  >
                    <span>{s.num}</span>
                    <span className="hidden md:inline text-[9px] font-medium opacity-90">{s.title}</span>
                    {isCompleted && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                  {s.num < totalSteps && (
                    <ChevronRight className="w-3 h-3 text-charcoal-300 mx-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile simplistic stepper status */}
          <div className="sm:hidden flex items-center justify-between bg-neutral-50 px-3 py-1.5 rounded-xl border border-charcoal-100 text-xs w-full">
            <span className="font-bold text-charcoal-700">Step {currentStep} of {totalSteps}</span>
            <span className="font-semibold text-charcoal-500 text-[10px] uppercase font-mono tracking-wider">
              {stepsMeta[currentStep - 1].title}
            </span>
          </div>
        </div>

        {/* MIDDLE CONTENT: SCROLLABLE FORM PANES */}
        <div 
          id="multi-step-modal-scrollable"
          className="flex-1 overflow-y-auto p-4 sm:p-6 bg-radial-gradient"
        >
          <div className="max-w-3xl mx-auto bg-white border border-charcoal-150 shadow-xs rounded-[20px] p-4 sm:p-6 relative">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                
                {/* =======================================================
                    STEP 1: BASIC INFORMATION
                    ======================================================= */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="border-b border-charcoal-100 pb-3">
                      <h4 className="font-display font-bold text-base text-charcoal-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#F97316]" />
                        Step 1: Event Identity & Artwork
                      </h4>
                      <p className="text-[11px] text-charcoal-500 mt-1">
                        Give your event a memorable title, brief tagline, and select a premium Afrocentric cover banner.
                      </p>
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-charcoal-700">
                        Event Title <span className="text-[#F97316]">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFieldChange}
                        placeholder="e.g. Lagos Decentralized Tech Innovation Summit"
                        className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                          ${errors.title 
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                            : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
                      />
                      {errors.title ? (
                        <span className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.title}
                        </span>
                      ) : (
                        <p className="text-[10px] text-charcoal-400">Keep it clear and exciting. Use title case capitalization.</p>
                      )}
                    </div>

                    {/* Tagline */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-charcoal-700">
                        Short Tagline <span className="text-[#F97316]">*</span>
                      </label>
                      <input
                        type="text"
                        name="tagline"
                        value={formData.tagline}
                        onChange={handleFieldChange}
                        placeholder="e.g. Unlocking offline-first mobile scalability for next-generation African hubs."
                        className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                          ${errors.tagline 
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                            : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
                      />
                      {errors.tagline ? (
                        <span className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.tagline}
                        </span>
                      ) : (
                        <p className="text-[10px] text-charcoal-400">A 1-sentence hook shown on search results. Max 100 characters.</p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-charcoal-700">
                        Rich Description <span className="text-[#F97316]">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleFieldChange}
                        rows={4}
                        placeholder="Describe what attendees will learn, speakers lined up, schedule outlines, or social networking details..."
                        className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                          ${errors.description 
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                            : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
                      />
                      {errors.description && (
                        <span className="text-[10px] text-red-500 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.description}
                        </span>
                      )}
                    </div>

                    {/* Cover Image Upload (Preset cover cards or custom url entry) */}
                    <div className="space-y-3">
                      <label className="font-display font-bold text-xs text-charcoal-700 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-[#F97316]" />
                        Select Cover Artwork Preset
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {PRESET_COVERS.map(cover => (
                          <button
                            type="button"
                            key={cover.key}
                            onClick={() => selectCoverPreset(cover.url, cover.key)}
                            className={`relative text-left h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group
                              ${formData.selectedCoverPreset === cover.key && !formData.customCoverUrl 
                                ? "border-[#F97316] scale-[1.02] shadow-sm" 
                                : "border-charcoal-150 opacity-70 hover:opacity-100"}`}
                          >
                            <img src={cover.url} alt={cover.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-900/30 to-transparent flex flex-col justify-end p-2.5">
                              <span className="text-[9px] font-extrabold text-white uppercase tracking-wider">{cover.label}</span>
                              <span className="text-[8px] text-charcoal-300 mt-0.5 truncate">{cover.desc}</span>
                            </div>
                            {formData.selectedCoverPreset === cover.key && !formData.customCoverUrl && (
                              <div className="absolute top-2 right-2 bg-[#F97316] text-white p-0.5 rounded-full shadow-xs">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Custom cover link entry */}
                      <div className="flex flex-col gap-1.5 mt-2 bg-neutral-50 p-3.5 rounded-2xl border border-charcoal-150">
                        <span className="text-[10px] font-mono uppercase font-bold text-charcoal-600">Or Paste Custom Image URL</span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="customCoverUrl"
                            value={formData.customCoverUrl}
                            onChange={handleFieldChange}
                            placeholder="https://images.unsplash.com/... or other secure URL"
                            className="flex-1 bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-[11px] focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                          />
                          {formData.customCoverUrl && (
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, customCoverUrl: "" }))}
                              className="px-2 bg-red-50 text-red-600 rounded-xl border border-red-150 text-xs hover:bg-red-100 cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        {formData.customCoverUrl && (
                          <div className="mt-2 h-20 rounded-xl overflow-hidden border border-charcoal-200">
                            <img src={formData.customCoverUrl} alt="Preview custom banner" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 1 extension: Gallery images list */}
                    <div className="bg-neutral-50 p-4 rounded-2xl border border-charcoal-150 space-y-3">
                      <span className="text-xs font-display font-bold text-charcoal-800 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-charcoal-500" />
                        Optional Gallery Showcase (Max 3)
                      </span>
                      <p className="text-[10px] text-charcoal-500">
                        Add supporting photos that are displayed in your event details carousel.
                      </p>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="galleryUrlInput"
                          value={formData.galleryUrlInput}
                          onChange={handleFieldChange}
                          placeholder="Paste image URL..."
                          className="flex-1 bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-[11px] focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={addGalleryImage}
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-charcoal-800 text-white rounded-xl font-display font-bold text-[10px] uppercase cursor-pointer"
                        >
                          Add URL
                        </button>
                      </div>

                      {formData.galleryImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-2.5 mt-2">
                          {formData.galleryImages.map((imgUrl, idx) => (
                            <div key={idx} className="relative h-14 rounded-lg overflow-hidden border border-charcoal-200 group">
                              <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(idx)}
                                className="absolute top-1 right-1 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                                title="Remove gallery picture"
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}


                {/* =======================================================
                    STEP 2: EVENT DETAILS
                    ======================================================= */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="border-b border-charcoal-100 pb-3">
                      <h4 className="font-display font-bold text-base text-charcoal-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#F97316]" />
                        Step 2: Core Details & Timing
                      </h4>
                      <p className="text-[11px] text-charcoal-500 mt-1">
                        Select an event catalog category, pricing archetype, and specify timing coordinates.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Category Selection */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700 flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-charcoal-400" />
                          Event Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleFieldChange}
                          className="w-full bg-white border border-charcoal-200 rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] cursor-pointer"
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Event Type (Free / Paid / Invite Only) */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700">Event Entry Type</label>
                        <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-1 rounded-xl border border-charcoal-150">
                          {(["Free", "Paid", "Invite Only"] as const).map((type) => (
                            <button
                              type="button"
                              key={type}
                              onClick={() => setFormData(prev => ({ ...prev, eventType: type }))}
                              className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer text-center
                                ${formData.eventType === type 
                                  ? "bg-white text-charcoal-950 shadow-xs border border-charcoal-200" 
                                  : "text-charcoal-500 hover:text-charcoal-800"}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
                          Event Date <span className="text-[#F97316]">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleFieldChange}
                          className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                            ${errors.date ? "border-red-400" : "border-charcoal-200"}`}
                        />
                        {errors.date && (
                          <span className="text-[10px] text-red-500 font-semibold">{errors.date}</span>
                        )}
                      </div>

                      {/* Time Zone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-charcoal-400" />
                          African Time Zone
                        </label>
                        <select
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleFieldChange}
                          className="w-full bg-white border border-charcoal-200 rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden cursor-pointer"
                        >
                          {TIMEZONES.map(tz => (
                            <option key={tz.value} value={tz.value}>{tz.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Start Time */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700">Start Time <span className="text-[#F97316]">*</span></label>
                        <input
                          type="text"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleFieldChange}
                          placeholder="e.g. 10:00 AM"
                          className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                            ${errors.startTime ? "border-red-400" : "border-charcoal-200"}`}
                        />
                        {errors.startTime && (
                          <span className="text-[10px] text-red-500 font-semibold">{errors.startTime}</span>
                        )}
                      </div>

                      {/* End Time */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700">End Time <span className="text-[#F97316]">*</span></label>
                        <input
                          type="text"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleFieldChange}
                          placeholder="e.g. 04:00 PM"
                          className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                            ${errors.endTime ? "border-red-400" : "border-charcoal-200"}`}
                        />
                        {errors.endTime && (
                          <span className="text-[10px] text-red-500 font-semibold">{errors.endTime}</span>
                        )}
                      </div>
                    </div>

                  </div>
                )}


                {/* =======================================================
                    STEP 3: LOCATION
                    ======================================================= */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="border-b border-charcoal-100 pb-3">
                      <h4 className="font-display font-bold text-base text-charcoal-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#F97316]" />
                        Step 3: Venue & Location Parameters
                      </h4>
                      <p className="text-[11px] text-charcoal-500 mt-1">
                        Tell guests where the event will happen. Include city/campus directories and a Google Maps linkage.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Country */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700">Country <span className="text-[#F97316]">*</span></label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleFieldChange}
                          placeholder="e.g. Rwanda"
                          className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                            ${errors.country ? "border-red-400" : "border-charcoal-200"}`}
                        />
                        {errors.country && (
                          <span className="text-[10px] text-red-500 font-semibold">{errors.country}</span>
                        )}
                      </div>

                      {/* City */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700">City / Municipality <span className="text-[#F97316]">*</span></label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleFieldChange}
                          placeholder="e.g. Kigali"
                          className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                            ${errors.city ? "border-red-400" : "border-charcoal-200"}`}
                        />
                        {errors.city && (
                          <span className="text-[10px] text-red-500 font-semibold">{errors.city}</span>
                        )}
                      </div>
                    </div>

                    {/* Venue Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-charcoal-700">Venue / Campus Hall Name <span className="text-[#F97316]">*</span></label>
                      <input
                        type="text"
                        name="venueName"
                        value={formData.venueName}
                        onChange={handleFieldChange}
                        placeholder="e.g. ALU Innovation Plaza, Kigali Heights"
                        className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                          ${errors.venueName ? "border-red-400" : "border-charcoal-200"}`}
                      />
                      {errors.venueName && (
                        <span className="text-[10px] text-red-500 font-semibold">{errors.venueName}</span>
                      )}
                    </div>

                    {/* Full Physical Address */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-charcoal-700">Full Physical Address <span className="text-[#F97316]">*</span></label>
                      <input
                        type="text"
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleFieldChange}
                        placeholder="e.g. KG 7 Ave, Kigali Innovation City, block C, Kigali"
                        className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                          ${errors.fullAddress ? "border-red-400" : "border-charcoal-200"}`}
                      />
                      {errors.fullAddress && (
                        <span className="text-[10px] text-red-500 font-semibold">{errors.fullAddress}</span>
                      )}
                    </div>

                    {/* Google Maps Link */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display font-bold text-xs text-charcoal-700 flex items-center gap-1">
                        <LinkIcon className="w-3.5 h-3.5 text-[#F97316]" />
                        Google Maps Shareable Link
                      </label>
                      <input
                        type="text"
                        name="mapsLink"
                        value={formData.mapsLink}
                        onChange={handleFieldChange}
                        placeholder="https://maps.app.goo.gl/... or general query"
                        className="w-full bg-white border border-charcoal-200 rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:border-[#F97316]"
                      />
                      <p className="text-[10px] text-charcoal-400">Allows attendees to tap for mobile GPS navigation.</p>
                    </div>

                  </div>
                )}


                {/* =======================================================
                    STEP 4: TICKETS & CAPACITY
                    ======================================================= */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="border-b border-charcoal-100 pb-3">
                      <h4 className="font-display font-bold text-base text-charcoal-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#F97316]" />
                        Step 4: Ticket Config & Capacities
                      </h4>
                      <p className="text-[11px] text-charcoal-500 mt-1">
                        Define maximum attendee limits and configure premium custom ticket tiers (Early Bird, VIP, Student).
                      </p>
                    </div>

                    {/* Maximum Capacity limit */}
                    <div className="bg-neutral-50 p-4 rounded-2xl border border-charcoal-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="max-w-md">
                        <span className="text-xs font-display font-bold text-charcoal-900 block">Attendance Threshold Limit</span>
                        <span className="text-[10px] text-charcoal-500 block mt-0.5">Control the volume of ticket inventory. If unchecked, ticketing operates as unlimited.</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 select-none cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.unlimitedCapacity}
                            onChange={(e) => handleToggleChange("unlimitedCapacity", e.target.checked)}
                            className="rounded text-[#F97316] focus:ring-[#F97316]"
                          />
                          <span>Unlimited Capacity</span>
                        </label>

                        {!formData.unlimitedCapacity && (
                          <div className="relative w-28">
                            <input
                              type="number"
                              name="maxAttendees"
                              value={formData.maxAttendees}
                              onChange={handleFieldChange}
                              className={`w-full bg-white border rounded-lg py-1.5 px-2.5 text-xs focus:outline-hidden
                                ${errors.maxAttendees ? "border-red-400" : "border-charcoal-200"}`}
                              placeholder="100"
                              min="1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.maxAttendees && (
                      <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.maxAttendees}</span>
                    )}

                    {/* Core Ticket configuration (Base Tier) */}
                    <div className="space-y-4">
                      <h5 className="font-display font-bold text-xs text-charcoal-800">Primary Ticket Tier Settings</h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1.5 col-span-1 md:col-span-1.5">
                          <label className="text-[10px] font-mono uppercase font-bold text-charcoal-500">Ticket Tier Name</label>
                          <input
                            type="text"
                            name="ticketType"
                            value={formData.ticketType}
                            onChange={handleFieldChange}
                            placeholder="e.g. General Admission"
                            className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                          />
                        </div>

                        {formData.eventType === "Paid" && (
                          <>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-mono uppercase font-bold text-charcoal-500">Price</label>
                              <div className="relative">
                                <span className="absolute left-3 top-2 text-charcoal-400 text-xs font-mono font-bold">
                                  {formData.currency === "USD" ? "$" : ""}
                                </span>
                                <input
                                  type="text"
                                  name="ticketPrice"
                                  value={formData.ticketPrice}
                                  onChange={handleFieldChange}
                                  placeholder="20.00"
                                  className={`w-full bg-white border rounded-xl py-2 pl-6 pr-3 text-xs focus:outline-hidden
                                    ${errors.ticketPrice ? "border-red-400" : "border-charcoal-200"}`}
                                />
                              </div>
                              {errors.ticketPrice && (
                                <span className="text-[10px] text-red-500 font-semibold">{errors.ticketPrice}</span>
                              )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-mono uppercase font-bold text-charcoal-500">Currency</label>
                              <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleFieldChange}
                                className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-2 text-xs focus:outline-hidden cursor-pointer"
                              >
                                {CURRENCIES.map(curr => (
                                  <option key={curr.value} value={curr.value}>{curr.label}</option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Optional Custom Tiers (Early Bird, VIP, Student) */}
                    {formData.eventType === "Paid" && (
                      <div className="space-y-3 bg-neutral-50/50 p-4 rounded-2xl border border-charcoal-150">
                        <span className="text-xs font-display font-bold text-charcoal-800 block">Optional Custom Tiers</span>
                        
                        {/* 1. Early Bird Ticket */}
                        <div className="border-t border-charcoal-100 pt-3 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-700 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={formData.earlyBirdEnabled}
                                onChange={(e) => handleToggleChange("earlyBirdEnabled", e.target.checked)}
                                className="rounded text-[#F97316]"
                              />
                              <span>Early Bird Special Discount</span>
                            </label>
                          </div>
                          
                          {formData.earlyBirdEnabled && (
                            <div className="grid grid-cols-2 gap-3 pl-6 animate-in slide-in-from-top-1 duration-150">
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">Early Bird Price ({formData.currency})</label>
                                <input
                                  type="text"
                                  name="earlyBirdPrice"
                                  value={formData.earlyBirdPrice}
                                  onChange={handleFieldChange}
                                  placeholder="10.00"
                                  className="w-full bg-white border border-charcoal-250 rounded-xl py-1.5 px-3 text-xs focus:outline-hidden"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">Tier Capacity</label>
                                <input
                                  type="number"
                                  name="earlyBirdCapacity"
                                  value={formData.earlyBirdCapacity}
                                  onChange={handleFieldChange}
                                  placeholder="30"
                                  className="w-full bg-white border border-charcoal-250 rounded-xl py-1.5 px-3 text-xs focus:outline-hidden"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 2. VIP Ticket */}
                        <div className="border-t border-charcoal-100 pt-3 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-700 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={formData.vipEnabled}
                                onChange={(e) => handleToggleChange("vipEnabled", e.target.checked)}
                                className="rounded text-[#F97316]"
                              />
                              <span>VIP Admission Tier</span>
                            </label>
                          </div>
                          
                          {formData.vipEnabled && (
                            <div className="grid grid-cols-2 gap-3 pl-6 animate-in slide-in-from-top-1 duration-150">
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">VIP Price ({formData.currency})</label>
                                <input
                                  type="text"
                                  name="vipPrice"
                                  value={formData.vipPrice}
                                  onChange={handleFieldChange}
                                  placeholder="50.00"
                                  className="w-full bg-white border border-charcoal-250 rounded-xl py-1.5 px-3 text-xs focus:outline-hidden"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">VIP Tier Capacity</label>
                                <input
                                  type="number"
                                  name="vipCapacity"
                                  value={formData.vipCapacity}
                                  onChange={handleFieldChange}
                                  placeholder="15"
                                  className="w-full bg-white border border-charcoal-250 rounded-xl py-1.5 px-3 text-xs focus:outline-hidden"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 3. Student Discount Ticket */}
                        <div className="border-t border-charcoal-100 pt-3 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-700 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={formData.studentEnabled}
                                onChange={(e) => handleToggleChange("studentEnabled", e.target.checked)}
                                className="rounded text-[#F97316]"
                              />
                              <span>Student Discount Tier</span>
                            </label>
                          </div>
                          
                          {formData.studentEnabled && (
                            <div className="grid grid-cols-2 gap-3 pl-6 animate-in slide-in-from-top-1 duration-150">
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">Student Price ({formData.currency})</label>
                                <input
                                  type="text"
                                  name="studentPrice"
                                  value={formData.studentPrice}
                                  onChange={handleFieldChange}
                                  placeholder="5.00"
                                  className="w-full bg-white border border-charcoal-250 rounded-xl py-1.5 px-3 text-xs focus:outline-hidden"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">Student Tier Capacity</label>
                                <input
                                  type="number"
                                  name="studentCapacity"
                                  value={formData.studentCapacity}
                                  onChange={handleFieldChange}
                                  placeholder="50"
                                  className="w-full bg-white border border-charcoal-250 rounded-xl py-1.5 px-3 text-xs focus:outline-hidden"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                )}


                {/* =======================================================
                    STEP 5: ORGANIZER
                    ======================================================= */}
                {currentStep === 5 && (
                  <div className="space-y-5">
                    <div className="border-b border-charcoal-100 pb-3">
                      <h4 className="font-display font-bold text-base text-charcoal-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#F97316]" />
                        Step 5: Organizer Credentials & Speakers
                      </h4>
                      <p className="text-[11px] text-charcoal-500 mt-1">
                        Complete your host profile so guests can reach out, and list distinguished guest speakers.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Host Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700">Organizer / Host Name <span className="text-[#F97316]">*</span></label>
                        <input
                          type="text"
                          name="organizerName"
                          value={formData.organizerName}
                          onChange={handleFieldChange}
                          placeholder="e.g. Ashesi D-Lab Team"
                          className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                            ${errors.organizerName ? "border-red-400" : "border-charcoal-200"}`}
                        />
                        {errors.organizerName && (
                          <span className="text-[10px] text-red-500 font-semibold">{errors.organizerName}</span>
                        )}
                      </div>

                      {/* Contact Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-charcoal-400" />
                          Support Email
                        </label>
                        <input
                          type="email"
                          name="organizerEmail"
                          value={formData.organizerEmail}
                          onChange={handleFieldChange}
                          placeholder="e.g. ventures@ashesi.edu.gh"
                          className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden focus:ring-1 transition-all
                            ${errors.organizerEmail ? "border-red-400" : "border-charcoal-200"}`}
                        />
                        {errors.organizerEmail && (
                          <span className="text-[10px] text-red-500 font-semibold">{errors.organizerEmail}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-charcoal-400" />
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="organizerPhone"
                          value={formData.organizerPhone}
                          onChange={handleFieldChange}
                          placeholder="e.g. +233 50 123 4567"
                          className="w-full bg-white border border-charcoal-200 rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden"
                        />
                      </div>

                      {/* Website */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-display font-bold text-xs text-charcoal-700 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-charcoal-400" />
                          Official Website URL
                        </label>
                        <input
                          type="text"
                          name="organizerWebsite"
                          value={formData.organizerWebsite}
                          onChange={handleFieldChange}
                          placeholder="https://ashesi.edu.gh"
                          className="w-full bg-white border border-charcoal-200 rounded-xl py-2.5 px-3.5 text-xs focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="bg-neutral-50 p-4 rounded-2xl border border-charcoal-150 space-y-3.5">
                      <span className="text-xs font-display font-bold text-charcoal-800 block">Host Social Networking Accounts</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">Twitter / X Link</label>
                          <input
                            type="text"
                            name="twitterLink"
                            value={formData.twitterLink}
                            onChange={handleFieldChange}
                            placeholder="https://x.com/username"
                            className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">Instagram Link</label>
                          <input
                            type="text"
                            name="instagramLink"
                            value={formData.instagramLink}
                            onChange={handleFieldChange}
                            placeholder="https://instagram.com/username"
                            className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-mono uppercase font-bold text-charcoal-500">LinkedIn Profile</label>
                          <input
                            type="text"
                            name="linkedinLink"
                            value={formData.linkedinLink}
                            onChange={handleFieldChange}
                            placeholder="https://linkedin.com/in/company"
                            className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Speaker Management (Optional add list) */}
                    <div className="border border-charcoal-150 rounded-2xl p-4 bg-white space-y-4">
                      <span className="text-xs font-display font-bold text-charcoal-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#059669]" />
                        Speaker Directory (Optional)
                      </span>
                      <p className="text-[10px] text-charcoal-500">
                        Introduce your distinguished guest speakers with custom roles or organizations.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="speakerNameInput"
                          value={formData.speakerNameInput}
                          onChange={handleFieldChange}
                          placeholder="Speaker Full Name"
                          className="bg-neutral-50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                        />
                        <input
                          type="text"
                          name="speakerRoleInput"
                          value={formData.speakerRoleInput}
                          onChange={handleFieldChange}
                          placeholder="Speaker Professional Title (e.g. AI Lead)"
                          className="bg-neutral-50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="speakerCompanyInput"
                          value={formData.speakerCompanyInput}
                          onChange={handleFieldChange}
                          placeholder="Company / Institution (e.g. Google AI)"
                          className="bg-neutral-50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="speakerAvatarInput"
                            value={formData.speakerAvatarInput}
                            onChange={handleFieldChange}
                            placeholder="Avatar URL (Optional)"
                            className="flex-1 bg-neutral-50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={addSpeaker}
                            className="px-4 py-2 bg-neutral-900 text-white hover:bg-charcoal-800 rounded-xl font-display font-bold text-[10px] uppercase cursor-pointer shrink-0"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Speakers List */}
                      {formData.speakers.length > 0 && (
                        <div className="divide-y divide-charcoal-100 border-t border-charcoal-150 mt-3">
                          {formData.speakers.map((s) => (
                            <div key={s.id} className="flex items-center justify-between py-2.5">
                              <div className="flex items-center gap-2.5">
                                <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover border border-charcoal-200" />
                                <div>
                                  <span className="text-xs font-bold text-charcoal-900 block leading-tight">{s.name}</span>
                                  <span className="text-[10px] text-charcoal-500 block">
                                    {s.role} {s.company ? `at ${s.company}` : ""}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeSpeaker(s.id)}
                                className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                title="Remove speaker"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}


                {/* =======================================================
                    STEP 6: EVENT SETTINGS
                    ======================================================= */}
                {currentStep === 6 && (
                  <div className="space-y-5">
                    <div className="border-b border-charcoal-100 pb-3">
                      <h4 className="font-display font-bold text-base text-charcoal-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#F97316]" />
                        Step 6: Discovery & Access Controls
                      </h4>
                      <p className="text-[11px] text-charcoal-500 mt-1">
                        Control how the public interacts with your event page and enable special promotion filters.
                      </p>
                    </div>

                    <div className="space-y-4">
                      
                      {/* Public vs Private */}
                      <div className="flex items-center justify-between p-4 bg-white border border-charcoal-150 rounded-2xl shadow-3xs">
                        <div className="max-w-md">
                          <span className="text-xs font-display font-bold text-charcoal-900 block">Public Gathering Discovery</span>
                          <span className="text-[10px] text-charcoal-500 block mt-0.5">If disabled, the event is unlisted and can only be accessed with a direct shareable URL.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-hidden cursor-pointer flex items-center
                            ${formData.isPublic ? "bg-[#F97316]" : "bg-charcoal-250"}`}
                        >
                          <span className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 block
                            ${formData.isPublic ? "translate-x-6" : "translate-x-0"}`} 
                          />
                        </button>
                      </div>

                      {/* Registration Required */}
                      <div className="flex items-center justify-between p-4 bg-white border border-charcoal-150 rounded-2xl shadow-3xs">
                        <div className="max-w-md">
                          <span className="text-xs font-display font-bold text-charcoal-900 block">Registration RSVP Required</span>
                          <span className="text-[10px] text-charcoal-500 block mt-0.5">Guests must log in and register to view private coordinates or download calendar entry barcodes.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, registrationRequired: !prev.registrationRequired }))}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-hidden cursor-pointer flex items-center
                            ${formData.registrationRequired ? "bg-[#F97316]" : "bg-charcoal-250"}`}
                        >
                          <span className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 block
                            ${formData.registrationRequired ? "translate-x-6" : "translate-x-0"}`} 
                          />
                        </button>
                      </div>

                      {/* Waiting List */}
                      <div className="flex items-center justify-between p-4 bg-white border border-charcoal-150 rounded-2xl shadow-3xs">
                        <div className="max-w-md">
                          <span className="text-xs font-display font-bold text-charcoal-900 block">Automatic Waiting List Queue</span>
                          <span className="text-[10px] text-charcoal-500 block mt-0.5">When maximum attendee capacity limit is reached, overflow RSVPs are placed into a pending waiting queue.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, waitingListEnabled: !prev.waitingListEnabled }))}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-hidden cursor-pointer flex items-center
                            ${formData.waitingListEnabled ? "bg-[#F97316]" : "bg-charcoal-250"}`}
                        >
                          <span className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 block
                            ${formData.waitingListEnabled ? "translate-x-6" : "translate-x-0"}`} 
                          />
                        </button>
                      </div>

                      {/* Featured Event toggle */}
                      <div className="flex items-center justify-between p-4 bg-white border border-charcoal-150 rounded-2xl shadow-3xs">
                        <div className="max-w-md">
                          <span className="text-xs font-display font-bold text-charcoal-900 block flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#E5A93B]" />
                            Feature on Banner Jumbotron
                          </span>
                          <span className="text-[10px] text-charcoal-500 block mt-0.5">Promote this event at the top of the homepage slider to drive immediate traction and RSVPs.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-hidden cursor-pointer flex items-center
                            ${formData.isFeatured ? "bg-[#059669]" : "bg-charcoal-250"}`}
                        >
                          <span className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 block
                            ${formData.isFeatured ? "translate-x-6" : "translate-x-0"}`} 
                          />
                        </button>
                      </div>

                    </div>
                  </div>
                )}


                {/* =======================================================
                    FINAL STEP: PREVIEW & PUBLISH
                    ======================================================= */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="border-b border-charcoal-100 pb-3 flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-bold text-base text-charcoal-900 flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-[#059669]" />
                          Final Step: Live Page Preview
                        </h4>
                        <p className="text-[11px] text-charcoal-500 mt-1">
                          Review how your landing page appears to students, recruiters, and guests before publishing.
                        </p>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded border border-emerald-150">
                        READY TO GO
                      </span>
                    </div>

                    {/* PREVIEW CONTAINER (Styled like an elite Luma page with Afro Event palette) */}
                    <div className="border border-charcoal-200 rounded-[24px] overflow-hidden bg-white shadow-md">
                      
                      {/* Hero Image */}
                      <div className="relative h-44 sm:h-56 bg-neutral-900">
                        <img 
                          src={formData.customCoverUrl.trim() || formData.coverImage} 
                          alt="Cover Banner Preview" 
                          className="w-full h-full object-cover opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/40 to-transparent" />
                        
                        {/* Interactive floating elements */}
                        <div className="absolute top-4 left-4 flex gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-charcoal-950 text-[9px] font-extrabold uppercase font-mono tracking-wider shadow-xs">
                            {formData.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#F97316] text-white text-[9px] font-extrabold uppercase font-mono tracking-wider shadow-xs">
                            {formData.eventType}
                          </span>
                        </div>

                        {/* Title & Tagline overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                          <span className="text-[10px] font-mono uppercase font-bold text-charcoal-200 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                            {formData.date ? new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" }).toUpperCase() : "DATE PENDING"}
                          </span>
                          <h2 className="font-display font-black text-base sm:text-xl md:text-2xl mt-1 tracking-tight drop-shadow-xs">
                            {formData.title || "Untitled University Gathering"}
                          </h2>
                          <p className="text-[10px] sm:text-xs text-charcoal-200 mt-1 line-clamp-2 italic font-medium opacity-90 max-w-2xl">
                            "{formData.tagline || "No tagline provided yet."}"
                          </p>
                        </div>
                      </div>

                      {/* Main Preview body Grid */}
                      <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                        
                        {/* Left Details */}
                        <div className="md:col-span-8 space-y-4">
                          {/* Rich Description */}
                          <div>
                            <span className="text-[10px] font-mono uppercase text-charcoal-400 font-bold block">About Gathering</span>
                            <div className="text-xs text-charcoal-700 leading-relaxed mt-1 whitespace-pre-wrap">
                              {formData.description || "No description provided."}
                            </div>
                          </div>

                          {/* Gallery images if present */}
                          {formData.galleryImages.length > 0 && (
                            <div>
                              <span className="text-[10px] font-mono uppercase text-charcoal-400 font-bold block mb-1.5">Event Gallery Gallery</span>
                              <div className="grid grid-cols-3 gap-2">
                                {formData.galleryImages.map((img, idx) => (
                                  <div key={idx} className="h-16 rounded-xl overflow-hidden border border-charcoal-150">
                                    <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Speakers List */}
                          {formData.speakers.length > 0 && (
                            <div className="pt-3 border-t border-charcoal-100">
                              <span className="text-[10px] font-mono uppercase text-charcoal-400 font-bold block">Featured Guest Speakers</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                {formData.speakers.map((s) => (
                                  <div key={s.id} className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-50 border border-charcoal-150">
                                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover border border-charcoal-200" />
                                    <div>
                                      <span className="text-xs font-bold text-charcoal-900 block leading-tight">{s.name}</span>
                                      <span className="text-[9px] text-charcoal-500 block truncate">
                                        {s.role} {s.company ? `(${s.company})` : ""}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right Panel: Logistics Sidebar (Luma inspired card) */}
                        <div className="md:col-span-4 space-y-4">
                          <div className="p-4 rounded-2xl bg-neutral-50/50 border border-charcoal-150 space-y-3">
                            
                            {/* Schedule details */}
                            <div>
                              <span className="text-[9px] font-mono uppercase text-charcoal-400 font-extrabold block">When</span>
                              <div className="flex items-start gap-1.5 mt-1">
                                <Clock className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                                <div className="text-xs">
                                  <span className="font-semibold block text-charcoal-800">
                                    {formData.startTime || "12:00 PM"} - {formData.endTime || "02:00 PM"}
                                  </span>
                                  <span className="text-[10px] text-charcoal-500 block">
                                    GMT {formData.timezone === "CAT" ? "+2" : formData.timezone === "EAT" ? "+3" : "+1"} ({formData.timezone})
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Location Details */}
                            <div className="border-t border-charcoal-100 pt-3">
                              <span className="text-[9px] font-mono uppercase text-charcoal-400 font-extrabold block">Where</span>
                              <div className="flex items-start gap-1.5 mt-1">
                                <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                                <div className="text-xs">
                                  <span className="font-bold block text-charcoal-800">{formData.venueName || "Venue Name Pending"}</span>
                                  <span className="text-[10px] text-charcoal-500 block mt-0.5 leading-tight">{formData.fullAddress || "Full address not specified"}</span>
                                  <span className="text-[9px] font-bold text-charcoal-400 block mt-1 uppercase font-mono">{formData.city}, {formData.country}</span>
                                </div>
                              </div>
                            </div>

                            {/* Organizer Credentials */}
                            <div className="border-t border-charcoal-100 pt-3">
                              <span className="text-[9px] font-mono uppercase text-charcoal-400 font-extrabold block">Organizer profile</span>
                              <div className="flex items-center gap-2 mt-1.5">
                                <div className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center font-display font-black text-xs">
                                  {formData.organizerName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-charcoal-800 block leading-none">{formData.organizerName}</span>
                                  <span className="text-[9px] text-charcoal-500 mt-1 block">Campus Community Creator</span>
                                </div>
                              </div>
                            </div>

                            {/* Tickets detail & RSVPs */}
                            <div className="border-t border-[#E5E7EB] pt-3">
                              <span className="text-[9px] font-mono uppercase text-charcoal-400 font-extrabold block">RSVP Entry Ticket</span>
                              <div className="flex items-center justify-between mt-1 text-xs">
                                <span className="font-bold text-charcoal-800">{formData.ticketType}</span>
                                <span className="font-black text-[#F97316] text-sm">
                                  {formData.eventType === "Free" 
                                    ? "Free" 
                                    : `${formData.currency === "USD" ? "$" : formData.currency + " "}${formData.ticketPrice || "0.00"}`}
                                </span>
                              </div>
                              {formData.unlimitedCapacity ? (
                                <span className="text-[9px] text-emerald-600 font-bold block mt-1 uppercase font-mono">Unlimited Capacity</span>
                              ) : (
                                <span className="text-[9px] text-charcoal-500 block mt-1">Limited to <strong>{formData.maxAttendees}</strong> total admissions</span>
                              )}
                            </div>

                            {/* Registration RSVP Button mock */}
                            <button
                              type="button"
                              className="w-full bg-neutral-900 text-white rounded-xl py-2 text-center text-xs font-bold shadow-xs flex items-center justify-center gap-1 cursor-default pointer-events-none mt-2"
                            >
                              Register to Attend
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* BOTTOM STEERER BUTTONS FOOTER */}
        <div className="px-6 py-4 border-t border-charcoal-150 bg-white flex items-center justify-between shrink-0 gap-3">
          {/* Left action: Save Draft / Cancel */}
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2.5 text-xs font-bold text-charcoal-700 hover:bg-neutral-50 rounded-full border border-charcoal-250 transition-all bg-white cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-charcoal-600 hover:text-charcoal-800 hover:bg-neutral-50 rounded-full transition-all cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Right actions: Next Step or Publish */}
          <div className="flex items-center gap-2.5">
            {currentStep < totalSteps ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSaveDrafting}
                  className="px-4 py-2.5 text-xs font-bold text-charcoal-700 hover:bg-[#FAF8F5] bg-white border border-charcoal-250 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {isSaveDrafting ? (
                    <div className="w-3.5 h-3.5 border-2 border-charcoal-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-charcoal-500" />
                      Save Draft
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 text-xs font-bold bg-[#F97316] hover:bg-[#E5630F] text-white rounded-full flex items-center gap-1 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-xs font-bold text-charcoal-700 hover:bg-[#FAF8F5] bg-white border border-charcoal-250 rounded-full transition-all cursor-pointer"
                >
                  Edit Settings
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-75 cursor-pointer"
                  id="btn-create-submit"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Publish Gathering
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
