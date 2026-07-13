/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  X, Calendar, MapPin, Clock, Users, Check, AlertCircle, 
  ChevronRight, ChevronLeft, Image as ImageIcon, Plus, Trash2, Globe, Sparkles, 
  ShieldCheck, HelpCircle, Phone, Mail, Link as LinkIcon, User, Layers, ArrowRight, Save,
  Upload, Info, Lock, Unlock, MessageSquare, Settings, Share2, Twitter, Instagram, 
  Linkedin, ExternalLink, Eye, EyeOff, Laptop
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Event } from "./mockEvents";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
  userName: string;
}

// Premium preset covers celebrating African culture, education, tech, and collaboration
const PRESET_COVERS = [
  { key: "culture", url: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80", label: "Cultural & Arts", desc: "Traditional textures and live festivals" },
  { key: "tech", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", label: "Tech & AI Innovation", desc: "Pan-African hackathons and labs" },
  { key: "business", url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80", label: "Business & Pitch Day", desc: "Startup forums and accelerators" },
  { key: "academia", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", label: "Academic Seminar", desc: "Lectures, panels, and masterclasses" },
  { key: "networking", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", label: "Creative Lounge", desc: "Student meetups and fire chats" }
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

const EVENT_TYPES = [
  "Seminar",
  "Workshop",
  "Conference",
  "Hackathon",
  "Festival",
  "Networking",
  "Career Fair",
  "Webinar"
];

const TIMEZONES = [
  { value: "WAT", label: "West Africa Time (GMT+1)" },
  { value: "CAT", label: "Central Africa Time (GMT+2)" },
  { value: "EAT", label: "East Africa Time (GMT+3)" },
  { value: "GMT", label: "Greenwich Mean Time (GMT+0)" },
  { value: "SAST", label: "South Africa Standard (GMT+2)" }
];

export default function CreateEventModal({
  isOpen,
  onClose,
  onAddEvent,
  userName
}: CreateEventModalProps) {
  // Navigation steps: 1 to 4
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Immersive Fullscreen Preview mode toggle
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  // Draft save alert and toaster states
  const [showToast, setShowToast] = useState<{ type: 'draft' | 'publish' | 'error', message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Form errors tracking
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: "",
    tagline: "",
    description: "",
    coverImage: PRESET_COVERS[0].url,
    category: "Cultural Event" as Event["category"],
    eventType: "Festival", // Seminar, Workshop, Conference, etc.
    visibility: "Public", // Public, Private

    // Step 2: Schedule & Venue
    date: "",
    startTime: "",
    endTime: "",
    timezone: "CAT",
    venueType: "Physical", // Physical, Online, Hybrid
    venueName: "",
    address: "",
    city: "",
    country: "",
    mapsLink: "",

    // Step 3: Tickets & Capacity
    capacity: "100",
    unlimitedCapacity: false,
    ticketType: "Free", // Free, Paid, Donation, Invite Only
    ticketPrice: "",
    ticketQuantity: "100",
    allowComments: true,
    requireApproval: false,

    // Step 4: Review & Organizer
    organizerName: userName || "Campus Community Lead",
    organizerWebsite: "",
    contactEmail: "",
    phoneNumber: "",
    twitterLink: "",
    instagramLink: "",
    linkedinLink: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync organizer name if logged in user changes
  useEffect(() => {
    if (userName) {
      setFormData(prev => ({ ...prev, organizerName: userName }));
    }
  }, [userName]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleToggleChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Drag and Drop Cover Image handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, coverImage: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Step-by-Step Validation rules
  const validateStep = (step: number) => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) stepErrors.title = "Event Title is required";
      else if (formData.title.length < 5) stepErrors.title = "Title should be at least 5 characters";
      
      if (!formData.tagline.trim()) stepErrors.tagline = "A short catchy tagline is required";
      if (!formData.description.trim()) stepErrors.description = "Rich event description is required";
    }

    if (step === 2) {
      if (!formData.date) stepErrors.date = "Event Date is required";
      if (!formData.startTime) stepErrors.startTime = "Start Time is required";
      if (!formData.endTime) stepErrors.endTime = "End Time is required";
      
      if (formData.venueType !== "Online") {
        if (!formData.venueName.trim()) stepErrors.venueName = "Venue Name is required";
        if (!formData.address.trim()) stepErrors.address = "Street Address is required";
        if (!formData.city.trim()) stepErrors.city = "City is required";
        if (!formData.country.trim()) stepErrors.country = "Country is required";
      }
    }

    if (step === 3) {
      if (!formData.unlimitedCapacity && (!formData.capacity || parseInt(formData.capacity) <= 0)) {
        stepErrors.capacity = "A valid capacity number is required";
      }
      if (formData.ticketType === "Paid" && (!formData.ticketPrice || parseFloat(formData.ticketPrice) <= 0)) {
        stepErrors.ticketPrice = "Ticket Price is required for paid events";
      }
      if (!formData.ticketQuantity || parseInt(formData.ticketQuantity) < 0) {
        stepErrors.ticketQuantity = "Enter ticket quantity available";
      }
    }

    if (step === 4) {
      if (!formData.organizerName.trim()) stepErrors.organizerName = "Organizer Name is required";
      if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
        stepErrors.contactEmail = "Enter a valid email address";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  // Mock saving event draft
  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Store in local storage for durability
      try {
        localStorage.setItem("afro_event_draft", JSON.stringify(formData));
      } catch (err) {
        console.error("Local draft saving failed", err);
      }
      triggerToast('draft', 'Event draft saved safely to your dashboard local profile!');
    }, 800);
  };

  // Mock publishing event
  const handlePublish = () => {
    // Validate all steps before publishing
    let allValid = true;
    for (let s = 1; s <= totalSteps; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        allValid = false;
        triggerToast('error', `Please fix details in Step ${s} before publishing.`);
        break;
      }
    }

    if (!allValid) return;

    setIsPublishing(true);
    setTimeout(() => {
      // Create final Event object
      const formattedDate = new Date(formData.date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      }).toUpperCase();

      let calculatedPrice = "Free";
      if (formData.ticketType === "Paid") {
        calculatedPrice = `$${parseFloat(formData.ticketPrice).toFixed(2)}`;
      } else if (formData.ticketType === "Donation") {
        calculatedPrice = "Donation";
      } else if (formData.ticketType === "Invite Only") {
        calculatedPrice = "Invite Only";
      }

      const newEvent: Event = {
        id: `evt-custom-${Date.now()}`,
        title: formData.title,
        date: formattedDate || "TBD",
        time: `${formData.startTime} ${formData.timezone}`,
        location: formData.venueType === "Online" ? "Virtual Webinar" : `${formData.venueName}, ${formData.city}`,
        university: formData.venueName.includes("Campus") || formData.venueName.includes("University")
          ? formData.venueName 
          : `${formData.city || "African"} University Hub`,
        city: formData.city || "Virtual",
        country: formData.country || "Online",
        organizer: formData.organizerName,
        organizerAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.organizerName)}`,
        organizerRole: "Afro Event Host & Lead",
        image: formData.coverImage,
        category: formData.category,
        price: calculatedPrice,
        isFree: formData.ticketType === "Free",
        rsvpCount: 0,
        description: formData.description,
        capacity: formData.unlimitedCapacity ? 9999 : (parseInt(formData.capacity) || 100),
        tags: [formData.category, formData.eventType, formData.city].filter(Boolean)
      };

      onAddEvent(newEvent);
      setIsPublishing(false);
      triggerToast('publish', 'Congratulations! Your premium Afro Event gathering has been published live!');
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1500);
  };

  const triggerToast = (type: 'draft' | 'publish' | 'error', message: string) => {
    setShowToast({ type, message });
    setTimeout(() => {
      setShowToast(null);
    }, 3500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 overflow-hidden"
      id="create-event-overlay"
    >
      {/* Immersive backdrop blur */}
      <div 
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Draft & Publish Toaster alerts */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 border text-xs font-bold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-55 max-w-md ${
              showToast.type === 'error' 
                ? 'bg-rose-950 border-rose-800 text-rose-100' 
                : showToast.type === 'publish'
                ? 'bg-emerald-950 border-emerald-800 text-emerald-100'
                : 'bg-neutral-900 border-charcoal-700 text-white'
            }`}
          >
            {showToast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {showToast.type === 'publish' && <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />}
            {showToast.type === 'draft' && <Save className="w-5 h-5 text-[#F97316] shrink-0" />}
            <div>
              <span>{showToast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace Frame: Spans 95% on desktop to enable split side-by-side preview */}
      <div 
        className={`bg-[#FAF8F5] text-neutral-950 w-full h-full md:h-[95vh] md:rounded-[32px] overflow-hidden relative shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] border border-neutral-200 z-10 flex flex-col transition-all duration-500 ${
          isFullscreenPreview ? 'md:max-w-4xl' : 'md:max-w-6xl'
        }`}
        id="create-event-container"
      >
        {/* Dynamic African-inspired Geometric Brand Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669] shrink-0 flex">
          <div className="flex-1 h-full bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] bg-[size:8px_8px] opacity-10" />
        </div>

        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-950 rounded-full transition-all duration-200 z-30 shadow-xs border border-neutral-200 cursor-pointer"
          title="Close Workspace"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Workspace Title & Responsive Step Indicators */}
        <div className="px-6 py-4 md:py-5 border-b border-neutral-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-[#F97316] text-[10px] font-mono tracking-widest font-extrabold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93B] animate-pulse" />
              Creator Studio
            </div>
            <h2 className="font-display font-black text-lg md:text-xl text-neutral-900 tracking-tight mt-0.5">
              Draft Premium Gathering
            </h2>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center gap-1.5">
            {[
              { num: 1, label: "Basic Info" },
              { num: 2, label: "Venue & Date" },
              { num: 3, label: "Tickets" },
              { num: 4, label: "Publish" }
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isCompleted = currentStep > step.num;
              return (
                <div key={step.num} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (step.num < currentStep) {
                        setCurrentStep(step.num);
                      } else if (step.num > currentStep && validateStep(currentStep)) {
                        let isOk = true;
                        for (let check = currentStep; check < step.num; check++) {
                          if (!validateStep(check)) {
                            setCurrentStep(check);
                            isOk = false;
                            break;
                          }
                        }
                        if (isOk) setCurrentStep(step.num);
                      }
                    }}
                    className={`h-7 px-3 rounded-lg text-[10px] font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive 
                        ? 'bg-[#F97316] text-white shadow-xs' 
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-neutral-50 text-neutral-400 border border-neutral-200 hover:text-neutral-700'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                      isActive ? 'bg-white text-[#F97316]' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[4]" /> : step.num}
                    </span>
                    <span className="hidden md:inline">{step.label}</span>
                  </button>
                  {step.num < totalSteps && (
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300 mx-1 hidden sm:inline" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* WORKSPACE MIDDLE BODY: Split Pane Form & Live Preview */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative">
          
          {/* LEFT SIDE: Scrollable multi-step Creator Form */}
          <div 
            className={`flex-1 overflow-y-auto p-6 md:p-8 space-y-6 ${
              isFullscreenPreview ? 'hidden' : 'block'
            }`}
            id="create-event-scrollable-form"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                
                {/* STEP 1: BASIC INFORMATION */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="border-b border-neutral-150 pb-3">
                      <h3 className="text-sm font-display font-black text-neutral-900 tracking-wide uppercase flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-[#F97316] rounded-full inline-block" />
                        1. Basic Gathering Details
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        Introduce your event with a bold university title, category, and premium high-resolution cover image.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {/* Event Title */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                          Event Title <span className="text-red-500 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="e.g. AI Localization & African Language Models"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                            errors.title ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/20' : 'border-neutral-200'
                          }`}
                        />
                        {errors.title && (
                          <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
                          </span>
                        )}
                      </div>

                      {/* Short Tagline */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                          Short Tagline <span className="text-red-500 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          name="tagline"
                          value={formData.tagline}
                          onChange={handleInputChange}
                          maxLength={120}
                          placeholder="e.g. Connecting student researchers and industry pioneers in Kigali."
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                            errors.tagline ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                          }`}
                        />
                        <span className="text-[9px] text-neutral-400 self-end font-mono">
                          {formData.tagline.length}/120 characters
                        </span>
                        {errors.tagline && (
                          <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.tagline}
                          </span>
                        )}
                      </div>

                      {/* Category & Event Type Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                            Event Category
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all"
                          >
                            {CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                            Event Type
                          </label>
                          <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all"
                          >
                            {EVENT_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Rich Description */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                          Rich Description <span className="text-red-500 font-black">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Provide a comprehensive event plan, expected guest speakers, schedule layout, and other vital criteria for researchers and attendees..."
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                            errors.description ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                          }`}
                        />
                        {errors.description && (
                          <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
                          </span>
                        )}
                      </div>

                      {/* Drag & Drop Cover Image Upload */}
                      <div className="flex flex-col gap-2 mt-2">
                        <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                          Event Cover Image
                        </label>
                        
                        <div 
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 bg-white ${
                            dragActive 
                              ? 'border-[#F97316] bg-[#F97316]/5 scale-[0.99]' 
                              : 'border-neutral-300 hover:border-[#F97316] hover:bg-neutral-50/30'
                          }`}
                        >
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          
                          {formData.coverImage ? (
                            <div className="relative w-full max-h-40 rounded-xl overflow-hidden group">
                              <img 
                                src={formData.coverImage} 
                                alt="Cover preview" 
                                className="w-full h-40 object-cover"
                              />
                              <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                                <Upload className="w-4 h-4" /> Change Image
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="p-3 bg-[#F97316]/5 text-[#F97316] rounded-full">
                                <Upload className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-neutral-900 block">Drag & Drop Image here</span>
                                <span className="text-[10px] text-neutral-500 block mt-0.5">Or click to browse files (JPEG, PNG, WEBP up to 5MB)</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Presets Grid */}
                        <div className="mt-2 space-y-1.5">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Or Choose a Premium Preset Theme:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {PRESET_COVERS.map((preset) => {
                              const isSelected = formData.coverImage === preset.url;
                              return (
                                <button
                                  key={preset.key}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, coverImage: preset.url }))}
                                  className={`relative h-14 rounded-lg overflow-hidden border transition-all text-left group ${
                                    isSelected ? 'border-[#F97316] ring-2 ring-[#F97316]/20' : 'border-neutral-200 hover:border-[#F97316]'
                                  }`}
                                  title={preset.label}
                                >
                                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-1">
                                    <span className="text-[9px] font-bold text-white truncate w-full">{preset.label}</span>
                                  </div>
                                  {isSelected && (
                                    <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-xs">
                                      <Check className="w-2.5 h-2.5 stroke-[4]" />
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Event Visibility */}
                      <div className="flex items-center justify-between p-4 bg-white border border-neutral-150 rounded-2xl shadow-3xs mt-2">
                        <div>
                          <span className="text-xs font-bold text-neutral-900 block flex items-center gap-1.5">
                            {formData.visibility === "Public" ? (
                              <Globe className="w-4 h-4 text-[#059669]" />
                            ) : (
                              <Lock className="w-4 h-4 text-[#F97316]" />
                            )}
                            Gathering Visibility
                          </span>
                          <span className="text-[10px] text-neutral-500 block mt-0.5">
                            {formData.visibility === "Public" 
                              ? "Listed publicly. Anyone can search and discover this event on the university feed." 
                              : "Unlisted. Only individuals with the secret direct URL link can access."
                            }
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          {["Public", "Private"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, visibility: option }))}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono border transition-all ${
                                formData.visibility === option 
                                  ? 'bg-neutral-900 text-white border-neutral-900' 
                                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* STEP 2: SCHEDULE & VENUE */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="border-b border-neutral-150 pb-3">
                      <h3 className="text-sm font-display font-black text-neutral-900 tracking-wide uppercase flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-[#F97316] rounded-full inline-block" />
                        2. Schedule & Venue Mapping
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        Input the timing schedule, timezone, and location coordinates of your university auditorium or remote platform.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Date & Time block */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                            Gathering Date <span className="text-red-500 font-black">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                                errors.date ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                              }`}
                            />
                          </div>
                          {errors.date && (
                            <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                            Start Time <span className="text-red-500 font-black">*</span>
                          </label>
                          <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                              errors.startTime ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                            }`}
                          />
                          {errors.startTime && (
                            <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors.startTime}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                            End Time <span className="text-red-500 font-black">*</span>
                          </label>
                          <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                              errors.endTime ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                            }`}
                          />
                          {errors.endTime && (
                            <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors.endTime}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Timezone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                          Time Zone
                        </label>
                        <select
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all"
                        >
                          {TIMEZONES.map(tz => (
                            <option key={tz.value} value={tz.value}>{tz.label} ({tz.value})</option>
                          ))}
                        </select>
                      </div>

                      {/* Venue Type Selection */}
                      <div className="flex flex-col gap-2 mt-2">
                        <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                          Venue Type
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {["Physical", "Online", "Hybrid"].map((type) => {
                            const isSel = formData.venueType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, venueType: type }))}
                                className={`py-3.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                                  isSel 
                                    ? 'bg-[#F97316] text-white border-[#F97316] shadow-md' 
                                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                                }`}
                              >
                                {type === "Physical" && <MapPin className="w-4 h-4" />}
                                {type === "Online" && <Globe className="w-4 h-4" />}
                                {type === "Hybrid" && <Laptop className="w-4 h-4" />}
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dynamic Location Input Fields */}
                      {formData.venueType !== "Online" ? (
                        <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                          {/* Venue Name */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                              Venue / Auditorium Name <span className="text-red-500 font-black">*</span>
                            </label>
                            <input
                              type="text"
                              name="venueName"
                              value={formData.venueName}
                              onChange={handleInputChange}
                              placeholder="e.g. Archer Hall, ALU Campus / Multipurpose Pavilion"
                              className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                                errors.venueName ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                              }`}
                            />
                            {errors.venueName && (
                              <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5" /> {errors.venueName}
                              </span>
                            )}
                          </div>

                          {/* Address */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                              Street Address <span className="text-red-500 font-black">*</span>
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="e.g. Kigali Innovation City, Plot 22"
                              className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                                errors.address ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                              }`}
                            />
                            {errors.address && (
                              <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> {errors.address}
                              </span>
                            )}
                          </div>

                          {/* City & Country */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                                City <span className="text-red-500 font-black">*</span>
                              </label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="e.g. Kigali"
                                className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                                  errors.city ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                                }`}
                              />
                              {errors.city && (
                                <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                                Country <span className="text-red-500 font-black">*</span>
                              </label>
                              <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="e.g. Rwanda"
                                className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                                  errors.country ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                                }`}
                              />
                              {errors.country && (
                                <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5" /> {errors.country}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Google Maps link */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                              Google Maps Link (Optional)
                            </label>
                            <input
                              type="url"
                              name="mapsLink"
                              value={formData.mapsLink}
                              onChange={handleInputChange}
                              placeholder="e.g. https://maps.google.com/?q=..."
                              className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2 animate-in fade-in duration-200 flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                            Virtual Webinar Link / Platform coordinates
                          </label>
                          <input
                            type="text"
                            name="mapsLink"
                            value={formData.mapsLink}
                            onChange={handleInputChange}
                            placeholder="e.g. Zoom Conference, Google Meet URL, YouTube Live stream link"
                            className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all"
                          />
                          <p className="text-[10px] text-neutral-500 italic mt-1 leading-normal">
                            Note: Live webinar links are locked securely on Afro Event and only revealed to registered student guests via email & personalized tickets.
                          </p>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* STEP 3: TICKETS & CAPACITY */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="border-b border-neutral-150 pb-3">
                      <h3 className="text-sm font-display font-black text-neutral-900 tracking-wide uppercase flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-[#F97316] rounded-full inline-block" />
                        3. Tickets & Capacity Control
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        Establish pricing strategies, available quantity tiers, maximum hall capacities, and custom community options.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Ticket Type */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                          Ticket Type
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {["Free", "Paid", "Donation", "Invite Only"].map((type) => {
                            const isSel = formData.ticketType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ 
                                    ...prev, 
                                    ticketType: type,
                                    ticketPrice: type === "Paid" ? prev.ticketPrice || "10.00" : ""
                                  }));
                                }}
                                className={`py-3.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                                  isSel 
                                    ? 'bg-[#F97316] text-white border-[#F97316] shadow-md' 
                                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                                }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Ticket Price & Quantity Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Price if Paid is selected */}
                        {formData.ticketType === "Paid" && (
                          <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 duration-200">
                            <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                              Ticket Price ($ USD) <span className="text-red-500 font-black">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-3.5 text-neutral-400 font-bold text-xs">$</span>
                              <input
                                type="number"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                onChange={handleInputChange}
                                min="0.01"
                                step="0.01"
                                placeholder="10.00"
                                className={`w-full bg-white border rounded-xl pl-8 pr-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                                  errors.ticketPrice ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                                }`}
                              />
                            </div>
                            {errors.ticketPrice && (
                              <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> {errors.ticketPrice}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Ticket Quantity available */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                            Available Tickets Quantity <span className="text-red-500 font-black">*</span>
                          </label>
                          <input
                            type="number"
                            name="ticketQuantity"
                            value={formData.ticketQuantity}
                            onChange={handleInputChange}
                            min="1"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                              errors.ticketQuantity ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Capacity */}
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                            Hall Capacity limit
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer text-xs text-neutral-600 font-medium">
                            <input
                              type="checkbox"
                              checked={formData.unlimitedCapacity}
                              onChange={(e) => {
                                handleToggleChange("unlimitedCapacity", e.target.checked);
                                if (e.target.checked) {
                                  setFormData(prev => ({ ...prev, capacity: "9999" }));
                                } else {
                                  setFormData(prev => ({ ...prev, capacity: "100" }));
                                }
                              }}
                              className="rounded border-neutral-300 text-[#F97316] focus:ring-[#F97316]"
                            />
                            Unlimited Capacity
                          </label>
                        </div>

                        {!formData.unlimitedCapacity && (
                          <div className="animate-in fade-in duration-200">
                            <input
                              type="number"
                              name="capacity"
                              value={formData.capacity}
                              onChange={handleInputChange}
                              min="1"
                              placeholder="e.g. 150"
                              className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                                errors.capacity ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                              }`}
                            />
                            {errors.capacity && (
                              <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-1">
                                <AlertCircle className="w-3.5 h-3.5" /> {errors.capacity}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Toggle controls */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Attendee Management Toggles</span>
                        
                        {/* Require Registration Approval toggle */}
                        <div className="flex items-center justify-between p-3.5 bg-white border border-neutral-150 rounded-2xl shadow-3xs">
                          <div className="max-w-md pr-4">
                            <span className="text-xs font-bold text-neutral-900 block flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                              Require Organizer Approval
                            </span>
                            <span className="text-[10px] text-neutral-500 block mt-0.5 leading-relaxed">
                              Registrations remain pending until you explicitly approve or decline them from your dashboard.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleChange("requireApproval", !formData.requireApproval)}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center ${
                              formData.requireApproval ? "bg-[#F97316]" : "bg-neutral-200"
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 block ${
                              formData.requireApproval ? "translate-x-5" : "translate-x-0"
                            }`} />
                          </button>
                        </div>

                        {/* Allow Comments toggle */}
                        <div className="flex items-center justify-between p-3.5 bg-white border border-neutral-150 rounded-2xl shadow-3xs">
                          <div className="max-w-md pr-4">
                            <span className="text-xs font-bold text-neutral-900 block flex items-center gap-1.5">
                              <MessageSquare className="w-4 h-4 text-[#059669]" />
                              Enable Interactive Comments
                            </span>
                            <span className="text-[10px] text-neutral-500 block mt-0.5 leading-relaxed">
                              Allow approved student guests to leave feedback, coordinate ride-shares, and ask questions directly on the page.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleChange("allowComments", !formData.allowComments)}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center ${
                              formData.allowComments ? "bg-emerald-600" : "bg-neutral-200"
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 block ${
                              formData.allowComments ? "translate-x-5" : "translate-x-0"
                            }`} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* STEP 4: REVIEW & PUBLISH */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="border-b border-neutral-150 pb-3">
                      <h3 className="text-sm font-display font-black text-neutral-900 tracking-wide uppercase flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-[#F97316] rounded-full inline-block" />
                        4. Host Profile & Review
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        Finalize your campus organization credentials, social profiles, and prepare for immediate digital broadcast.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Host Profile Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                            Organizer / Host Name <span className="text-red-500 font-black">*</span>
                          </label>
                          <input
                            type="text"
                            name="organizerName"
                            value={formData.organizerName}
                            onChange={handleInputChange}
                            placeholder="e.g. ALU Research Department / Computer Club"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                              errors.organizerName ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                            }`}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                            Organizer Website
                          </label>
                          <input
                            type="url"
                            name="organizerWebsite"
                            value={formData.organizerWebsite}
                            onChange={handleInputChange}
                            placeholder="e.g. https://myclub.university.edu"
                            className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            placeholder="e.g. lead@afroevent.org"
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all ${
                              errors.contactEmail ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200'
                            }`}
                          />
                          {errors.contactEmail && (
                            <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors.contactEmail}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="e.g. +250 788 123 456"
                            className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs transition-all"
                          />
                        </div>
                      </div>

                      {/* Social Media Links */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Organizer Social Coordinates (Optional)</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Twitter */}
                          <div className="relative">
                            <Twitter className="absolute left-3.5 top-3.5 w-4 h-4 text-[#F97316]" />
                            <input
                              type="text"
                              name="twitterLink"
                              value={formData.twitterLink}
                              onChange={handleInputChange}
                              placeholder="Twitter handle"
                              className="w-full bg-white border border-neutral-200 rounded-xl pl-10 pr-3 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1"
                            />
                          </div>
                          
                          {/* Instagram */}
                          <div className="relative">
                            <Instagram className="absolute left-3.5 top-3.5 w-4 h-4 text-[#E5A93B]" />
                            <input
                              type="text"
                              name="instagramLink"
                              value={formData.instagramLink}
                              onChange={handleInputChange}
                              placeholder="Instagram handle"
                              className="w-full bg-white border border-neutral-200 rounded-xl pl-10 pr-3 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1"
                            />
                          </div>

                          {/* LinkedIn */}
                          <div className="relative">
                            <Linkedin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#059669]" />
                            <input
                              type="text"
                              name="linkedinLink"
                              value={formData.linkedinLink}
                              onChange={handleInputChange}
                              placeholder="LinkedIn profile URL"
                              className="w-full bg-white border border-neutral-200 rounded-xl pl-10 pr-3 py-3 text-xs text-neutral-950 focus:outline-hidden focus:border-[#F97316] focus:ring-1"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Review Checklist */}
                      <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-2 mt-4">
                        <span className="text-[10px] font-mono uppercase text-emerald-800 font-extrabold flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          Pre-Publish Compliance Verified
                        </span>
                        <p className="text-[10px] text-emerald-800 leading-normal">
                          By publishing this university gathering, you agree that this event matches the core ethics of Afro Event. We will generate watermarked paperless tickets featuring Pan-African Gye Nyame cultural emblems for all registering student guests.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: STICKY LIVE EVENT PREVIEW PANEL (Mimicking desktop Luma landing view) */}
          <div 
            className={`w-full lg:w-[410px] shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-200 bg-[#FAF8F5] p-5 flex flex-col justify-between overflow-y-auto select-none ${
              isFullscreenPreview ? 'lg:w-full p-8' : 'hidden lg:flex'
            }`}
          >
            {/* Live indicator overlay */}
            <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-neutral-200/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-600 uppercase">Live Event Preview</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Updates in Real-Time</span>
            </div>

            {/* HIGH FIDELITY LUMA-STYLE GATHERING CARD */}
            <div className="bg-white rounded-[24px] border border-neutral-200 overflow-hidden shadow-md flex-1 flex flex-col justify-between">
              
              {/* Cover Banner Area */}
              <div className="relative h-44 bg-neutral-900 overflow-hidden">
                {formData.coverImage ? (
                  <img 
                    src={formData.coverImage} 
                    alt="Live Event Cover Preview" 
                    className="w-full h-full object-cover opacity-90 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-950 text-neutral-700">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                {/* Backdrop shadow filter overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Float badges */}
                <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-neutral-950 text-[8px] font-mono font-black uppercase shadow-xs">
                    {formData.category || "General Event"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#059669] text-white text-[8px] font-mono font-black uppercase shadow-xs">
                    {formData.eventType || "Gathering"}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono font-black uppercase flex items-center gap-1 shadow-xs ${
                    formData.visibility === "Public" 
                      ? "bg-emerald-50 text-emerald-800" 
                      : "bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30 bg-white"
                  }`}>
                    {formData.visibility === "Public" ? <Globe className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                    {formData.visibility}
                  </span>
                </div>

                {/* Cover overlay title */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="text-[9px] font-mono uppercase font-bold text-[#E5A93B] flex items-center gap-1 leading-none">
                    <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                    {formData.date 
                      ? new Date(formData.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase() 
                      : "DATE PENDING"
                    }
                  </span>
                  <h3 className="font-display font-black text-sm md:text-base tracking-tight mt-1 truncate drop-shadow-xs">
                    {formData.title || "Untitled University Gathering"}
                  </h3>
                  <p className="text-[9px] text-neutral-300 italic truncate mt-0.5 max-w-sm font-medium">
                    {formData.tagline ? `"${formData.tagline}"` : '"No tagline drafted yet..."'}
                  </p>
                </div>
              </div>

              {/* Event Metadata Logistical Body */}
              <div className="p-4 flex-1 space-y-3.5 flex flex-col justify-between">
                
                {/* Logistics section */}
                <div className="space-y-2.5">
                  {/* Timing card */}
                  <div>
                    <span className="text-[8px] font-mono uppercase font-bold text-neutral-400 block tracking-wider">Schedule</span>
                    <div className="flex items-start gap-1.5 mt-1">
                      <Clock className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-tight text-neutral-800">
                        <span className="font-bold block">
                          {formData.startTime || "12:00 PM"} - {formData.endTime || "02:00 PM"}
                        </span>
                        <span className="text-[9px] text-neutral-500 block">
                          Local Timezone ({formData.timezone})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location card */}
                  <div className="border-t border-neutral-100 pt-2.5">
                    <span className="text-[8px] font-mono uppercase font-bold text-neutral-400 block tracking-wider">Venue mapping</span>
                    <div className="flex items-start gap-1.5 mt-1">
                      <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-tight text-neutral-800">
                        {formData.venueType === "Online" ? (
                          <span className="font-bold block text-[#059669]">Virtual Webinar Portal</span>
                        ) : (
                          <>
                            <span className="font-bold block truncate max-w-[280px]">
                              {formData.venueName || "Auditorium Name TBD"}
                            </span>
                            <span className="text-[9px] text-neutral-500 block truncate mt-0.5 max-w-[280px]">
                              {formData.address || "Street coordinates..."}
                            </span>
                          </>
                        )}
                        <span className="text-[9px] font-extrabold text-neutral-400 block uppercase font-mono mt-0.5">
                          {formData.city || "City"}, {formData.country || "Country"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Organizer Details */}
                  <div className="border-t border-neutral-100 pt-2.5">
                    <span className="text-[8px] font-mono uppercase font-bold text-neutral-400 block tracking-wider">Gathering Host</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-6 h-6 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center font-display font-black text-[10px] border border-[#F97316]/20 shadow-3xs">
                        {formData.organizerName ? formData.organizerName.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div className="text-[11px] leading-none text-neutral-800">
                        <span className="font-bold block truncate max-w-[200px]">{formData.organizerName || "Organizer"}</span>
                        <span className="text-[8px] text-neutral-500 block mt-0.5">Campus Creator Host</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Tickets */}
                  <div className="border-t border-neutral-100 pt-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-mono uppercase font-bold text-neutral-400 block tracking-wider">Admission RSVP</span>
                      <span className="text-[10px] font-extrabold text-neutral-800 font-mono mt-0.5 block">{formData.ticketType} Entry</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-500 block leading-none">Price Tag</span>
                      <span className="text-xs font-black text-[#F97316] font-mono block mt-0.5">
                        {formData.ticketType === "Free" && "FREE"}
                        {formData.ticketType === "Paid" && `$${parseFloat(formData.ticketPrice || "0.00").toFixed(2)}`}
                        {formData.ticketType === "Donation" && "DONATION"}
                        {formData.ticketType === "Invite Only" && "INVITE ONLY"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer RSVP simulated button & requirements */}
                <div className="border-t border-neutral-100 pt-3 space-y-2">
                  <div className="flex items-center justify-between text-[8px] font-mono font-bold text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Capacity: {formData.unlimitedCapacity ? "Unlimited" : `${formData.capacity} Hall Capacity`}
                    </span>
                    {formData.requireApproval && (
                      <span className="text-[#F97316] flex items-center gap-0.5">
                        <Lock className="w-3 h-3" /> Approval Required
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="w-full bg-neutral-900 text-white rounded-xl py-2.5 text-center text-xs font-bold shadow-xs flex items-center justify-center gap-1 hover:opacity-90 cursor-not-allowed pointer-events-none"
                  >
                    Register to Attend
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* WORKSPACE FOOTER ACTIONS: Save Draft, Preview Toggle, Publish */}
        <div className="px-6 py-4 md:py-5 border-t border-neutral-200 bg-white flex items-center justify-between shrink-0 gap-3">
          {/* Back Step */}
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 rounded-full border border-neutral-250 transition-all bg-white cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 rounded-full transition-all cursor-pointer"
              >
                Cancel Creation
              </button>
            )}
          </div>

          {/* Three core required actions */}
          <div className="flex items-center gap-2">
            {/* Action 1: Save Draft */}
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="px-4 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 bg-white border border-neutral-250 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
              title="Save event template"
            >
              {isSaving ? (
                <div className="w-3.5 h-3.5 border-2 border-neutral-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-[#F97316]" />
                  Save Draft
                </>
              )}
            </button>

            {/* Action 2: Preview Event Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreenPreview(!isFullscreenPreview)}
              className={`px-4 py-2.5 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs border ${
                isFullscreenPreview 
                  ? 'bg-neutral-900 text-white border-neutral-900' 
                  : 'bg-white text-neutral-700 border-neutral-250 hover:bg-neutral-50'
              }`}
              title={isFullscreenPreview ? "Back to Edit Form" : "Immersive Landing Preview"}
            >
              {isFullscreenPreview ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  Edit Form
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#059669]" />
                  Preview Event
                </>
              )}
            </button>

            {/* Action 3: Publish / Continue */}
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 text-xs font-bold bg-[#F97316] hover:bg-[#E5630F] text-white rounded-full flex items-center gap-1 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-6 py-2.5 text-xs font-bold bg-[#059669] hover:bg-[#047857] text-white rounded-full flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-75 cursor-pointer"
                id="btn-publish-gathering"
              >
                {isPublishing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Publish Gathering
                    <Check className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
