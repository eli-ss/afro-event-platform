/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Calendar, MapPin, Clock, Users, Check, AlertCircle, 
  ChevronRight, ChevronLeft, Image as ImageIcon, Plus, 
  Globe, Sparkles, Shield, Mail, Link as LinkIcon, User, 
  Save, Info, Lock, MessageSquare, Share2, Linkedin, ExternalLink, 
  Ticket, Printer, Download, CheckCircle2, ChevronDown, ChevronUp,
  Map, Navigation, CalendarPlus, Heart, Facebook, Send, Laptop
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Event } from "./mockEvents";
import RegistrationTicketFlow from "./RegistrationTicketFlow";

interface EventDetailsPageProps {
  event: Event;
  allEvents: Event[];
  isAlreadyRegistered: boolean;
  onRegisterSuccess: (eventId: string) => void;
  onClose: () => void; // To go back to the home page or main feed
  userEmail?: string;
  userName?: string;
  savedEventIds: string[];
  onToggleSave: (eventId: string) => void;
  onSelectEvent: (event: Event) => void; // To navigate to related events
}

// Custom mock speakers for specific categories to keep it extremely realistic
const MOCK_SPEAKERS = [
  {
    name: "Dr. Eliane Munyaneza",
    title: "Head of AI Research & Linguistics",
    org: "African Language Research Institute",
    bio: "Dedicated to building decentralized NLP pipelines for East African dialects including Kinyarwanda and Swahili. Former research fellow at Stanford NLP.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    linkedin: "https://linkedin.com/in/eliane-munyaneza-placeholder"
  },
  {
    name: "Tosin Adebayo",
    title: "Senior Cloud Architect & Author",
    org: "Kigali Tech Labs",
    bio: "Pioneer in offline-first distributed synchronization. Author of 'Distributed syncing under remote, bandwidth-constrained conditions'.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    linkedin: "https://linkedin.com/in/tosin-adebayo-placeholder"
  },
  {
    name: "Amina Alao",
    title: "Director of Talent Acquisition",
    org: "Pan-African Tech Ventures",
    bio: "Over 12 years connecting talented graduates with accelerators across West & East Africa. Passionate about youth leadership and micro-internships.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    linkedin: "https://linkedin.com/in/amina-alao-placeholder"
  }
];

// Curated schedule items
const MOCK_SCHEDULE = [
  { time: "09:00 AM", title: "Registrations & Badge Collection", desc: "Arrive early at the multipurpose lobby, present your QR ticket code, and grab your custom Afro Event conference pass." },
  { time: "10:00 AM", title: "Opening Ceremony & Cultural Welcoming", desc: "A lively kickoff featuring traditional drumming, local faculty opening remarks, and introduction of the convening committee." },
  { time: "10:30 AM", title: "Keynote Session: Reimagining Local Digital Pipelines", desc: "Dr. Munyaneza explores standard methodologies, sovereign language models, and practical frameworks for pan-African knowledge transfer." },
  { time: "12:00 PM", title: "Coffee & Networking Break", desc: "Sip spiced Ethiopian and Rwandan brews, taste local pastries, and connect with fellow student researchers and organizers at the main pavilion." },
  { time: "01:00 PM", title: "Interactive Technical Workshops", desc: "Parallel hands-on split rooms. Track A: Offline-first data sync architectures. Track B: Practical NLP model deployment with limited hardware compute." },
  { time: "03:30 PM", title: "Fireside Networking & Industry Recruiter Lounge", desc: "An open, unstructured dialogue where attendees interact directly with remote venture recruiters, sponsors, and engineering leads." },
  { time: "05:00 PM", title: "Closing Remarks & Digital Keepsakes", desc: "A wrap-up of research findings, distribution of attendance credentials, and a final photo session of all student participants." }
];

// Gallery assets
const MOCK_GALLERY = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80"
];

// Rich description lists
const MOCK_OBJECTIVES = [
  "Formulate practical, cost-effective methodologies for localizing generative technologies and decentralized applications.",
  "Create active student collaboration circles linking developers at ALU, UNILAG, Kenyatta, and Ashesi University.",
  "Deliver technical mastery on how to code offline-first databases and local storage synchronization patterns in low-network regions.",
  "Connect career-oriented seniors with active, premium corporate placement opportunities offering hybrid roles."
];

const MOCK_WHO_SHOULD_ATTEND = [
  "Undergraduate and postgraduate students specializing in Computer Science, Software Engineering, or Information Systems.",
  "Academic researchers, student club leaders, and tech enthusiasts looking to build practical solutions for sovereign African communities.",
  "Early-stage student startup founders wishing to meet co-founders, seed advisors, and industry mentors.",
  "Active corporate recruiters seeking outstanding software, product, and leadership talent across regional universities."
];

const MOCK_WHAT_YOU_LEARN = [
  "How to compile, fine-tune, and deploy localized open-source language models with minimal RAM parameters.",
  "Best practices for IndexedDB, Service Workers, and client-side replication mechanisms to build fully offline-first applications.",
  "Insights on how to format scientific research pitches to attract international grants and accelerator support.",
  "The key criteria global recruiters analyze during technical portfolio screenings and behavioral interviews."
];

export default function EventDetailsPage({
  event,
  allEvents,
  isAlreadyRegistered,
  onRegisterSuccess,
  onClose,
  userEmail = "",
  userName = "",
  savedEventIds,
  onToggleSave,
  onSelectEvent
}: EventDetailsPageProps) {
  // Navigation scrolling states
  const [activeTab, setActiveTab] = useState("about");
  const [showRegisterFlow, setShowRegisterFlow] = useState(false);
  const [registerFlowStep, setRegisterFlowStep] = useState<"form" | "success" | "ticket">("form");

  // Registration Form State
  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail || "",
    affiliation: "",
    allowSharing: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState<{
    ticketCode: string;
    holderName: string;
    holderEmail: string;
    registeredAt: string;
  } | null>(null);

  // FAQ Accordion Toggle States
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Social Share State
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Calendar State
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  // Contact Organizer State
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Sync user values if provided
  useEffect(() => {
    if (userName) setFormData(prev => ({ ...prev, name: userName }));
    if (userEmail) setFormData(prev => ({ ...prev, email: userEmail }));
    setTicketData(null);
    setContactSuccess(false);
    setContactMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [event, userName, userEmail]);

  // Tab navigation smooth scrolling helper
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and Email are required to claim your seat.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `AE-${Math.floor(1000 + Math.random() * 9000)}-${event.city.substring(0,3).toUpperCase()}`;
      setTicketData({
        ticketCode: code,
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
    }, 1200);
  };

  const handleShareClick = () => {
    const url = `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setShowShareTooltip(true);
      setTimeout(() => {
        setShareCopied(false);
        setShowShareTooltip(false);
      }, 3000);
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactMessage("");
    }, 4000);
  };

  // Filter 4 related events (same category if possible, or excluding current event)
  const relatedEvents = allEvents
    .filter(evt => evt.id !== event.id)
    .sort((a, b) => (a.category === event.category ? -1 : 1))
    .slice(0, 4);

  const isSaved = savedEventIds.includes(event.id);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(`${event.location}, ${event.city}, ${event.country}`);
    
    // Simulate dates
    const dateObj = new Date();
    dateObj.setMonth(dateObj.getMonth() + 2); // 2 months out
    const dateStr = dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const dateEndStr = new Date(dateObj.getTime() + 3 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateEndStr}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-950 font-sans pb-16 relative" id="event-details-page-viewport">
      {/* Dynamic African-inspired geometric branding banner at top */}
      <div className="h-2 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669] shrink-0" />

      {/* Decorative ambient blurred nodes */}
      <div className="pointer-events-none fixed top-40 left-10 w-80 h-80 rounded-full bg-[#F97316]/4 blur-[100px] z-0" />
      <div className="pointer-events-none fixed bottom-40 right-10 w-96 h-96 rounded-full bg-[#059669]/3 blur-[120px] z-0" />

      {/* STICKY QUICK HEADER NAV */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 z-40 px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home Feed
          </button>

          {/* Logo element placeholder to keep design coherent */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#F97316] rounded-full inline-block animate-pulse" />
            <span className="font-display font-black text-xs tracking-tight text-neutral-900 uppercase">
              Afro Event <span className="text-[#F97316]">Studio</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(event.id)}
              className={`p-2 rounded-full border transition-all ${
                isSaved 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-950'
              }`}
              title={isSaved ? "Saved to Profile" : "Save Event"}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <div className="relative">
              <button
                onClick={handleShareClick}
                className="p-2 rounded-full border bg-white border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all flex items-center gap-1 cursor-pointer"
                title="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {showShareTooltip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 mt-2 bg-neutral-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xl shrink-0 whitespace-nowrap z-50 flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    {shareCopied ? "Event Link Copied!" : "Ready to paste"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO BANNER SECTION */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden" id="event-hero">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        {/* Luma-like deep, elegant gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-neutral-950/50 to-neutral-950/20" />
        
        {/* Hero Overlay Content */}
        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col justify-end">
          <div className="max-w-3xl space-y-3.5 text-white">
            <span className="text-[10px] font-mono tracking-widest font-extrabold bg-[#F97316] text-white px-3 py-1 rounded-full uppercase shadow-md inline-block">
              {event.category}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight drop-shadow-md text-white">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-white/90 font-medium font-sans mt-2">
              <span className="flex items-center gap-1.5 bg-neutral-900/35 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#E5A93B]" />
                {event.date}
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-900/35 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#E5A93B]" />
                {event.time}
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-900/35 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#E5A93B]" />
                {event.city}, {event.country}
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-900/35 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 text-white">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <strong>{event.rsvpCount + (ticketData ? 1 : 0)}</strong> student researchers registered
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN CONTAINER WITH STICKY SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT COLUMN: NAVIGATION TAB BAR, DESCRIPTION, SCHEDULE, SPEAKERS, MAP, GALLERY, FAQs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Quick Section Tab Switcher bar */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-2 flex flex-wrap gap-1 sticky top-[53px] z-30 shadow-xs">
            {[
              { id: "about", label: "About" },
              { id: "schedule", label: "Schedule" },
              { id: "speakers", label: "Speakers" },
              { id: "venue", label: "Venue" },
              { id: "gallery", label: "Gallery" },
              { id: "faqs", label: "FAQs" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-[#F97316] text-white shadow-xs' 
                    : 'bg-transparent text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ABOUT THIS EVENT SECTION */}
          <div 
            id="about" 
            className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-xs space-y-6 scroll-mt-24"
          >
            <div>
              <h2 className="text-base font-display font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#F97316] rounded-full inline-block" />
                About This Gathering
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed mt-4 font-sans whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Custom geometric divider */}
            <div className="h-[1px] w-full bg-gradient-to-r from-neutral-200 via-[#E5A93B]/20 to-neutral-200" />

            {/* Structured Objectives bullets */}
            <div>
              <h3 className="text-xs font-display font-black text-neutral-800 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                Key Event Objectives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {MOCK_OBJECTIVES.map((obj, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start bg-[#FAF8F5] p-3 rounded-xl border border-neutral-100">
                    <span className="w-5 h-5 rounded-md bg-[#F97316]/10 text-[#F97316] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-neutral-600 text-xs leading-normal font-sans">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who should attend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <h3 className="text-xs font-display font-black text-neutral-800 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <Users className="w-4 h-4 text-[#059669]" />
                  Who Should Attend
                </h3>
                <ul className="space-y-2">
                  {MOCK_WHO_SHOULD_ATTEND.map((who, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600 leading-normal font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0 mt-1.5" />
                      <span>{who}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-display font-black text-neutral-800 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93B]" />
                  What You Will Learn
                </h3>
                <ul className="space-y-2">
                  {MOCK_WHAT_YOU_LEARN.map((learn, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600 leading-normal font-sans">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{learn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tag Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-[10px] font-mono font-bold bg-[#FAF8F5] text-neutral-600 px-3 py-1.5 rounded-lg border border-neutral-200/60"
                >
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* DETAILED SCHEDULE & TIMELINE */}
          <div 
            id="schedule" 
            className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-xs space-y-6 scroll-mt-24"
          >
            <div>
              <h2 className="text-base font-display font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#059669] rounded-full inline-block" />
                Gathering Schedule Timeline
              </h2>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                Carefully planned hours representing academic excellence, research panels, hands-on labs, and open recruitment conversations.
              </p>
            </div>

            {/* Chronological Timeline visual */}
            <div className="relative border-l border-neutral-200 pl-4 sm:pl-6 ml-2 sm:ml-4 space-y-6 mt-6">
              {MOCK_SCHEDULE.map((item, idx) => {
                const isBreak = item.title.toLowerCase().includes("break") || item.title.toLowerCase().includes("lunch");
                return (
                  <div key={idx} className="relative group">
                    {/* Pulsing indicator node */}
                    <div className={`absolute -left-[21px] sm:-left-[29px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-xs transition-colors ${
                      isBreak ? 'bg-[#E5A93B]' : 'bg-[#059669]'
                    } group-hover:scale-125 duration-150`} />

                    <div className="bg-[#FAF8F5] group-hover:bg-[#FFFDF9] border border-neutral-100 group-hover:border-[#E5A93B]/30 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-6 shadow-3xs">
                      {/* Time frame */}
                      <span className="text-xs font-mono font-extrabold text-[#F97316] shrink-0 block sm:pt-0.5">
                        {item.time}
                      </span>
                      
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-display font-black text-neutral-900 group-hover:text-[#F97316] transition-colors leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-neutral-500 text-xs leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SPEAKERS / PANELISTS MODULE */}
          <div 
            id="speakers" 
            className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-xs space-y-6 scroll-mt-24"
          >
            <div>
              <h2 className="text-base font-display font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#E5A93B] rounded-full inline-block" />
                Distinguished Speakers & Panelists
              </h2>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                Connect with leading research minds, tech directors, and national incubator leaders sharing custom research.
              </p>
            </div>

            {/* Speaker Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {MOCK_SPEAKERS.map((speaker, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FAF8F5] border border-neutral-200/80 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col group relative"
                >
                  <div className="h-44 w-full overflow-hidden relative">
                    <img 
                      src={speaker.avatar} 
                      alt={speaker.name} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                    
                    {/* LinkedIn overlay icon */}
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 p-1.5 bg-white/90 hover:bg-white text-[#0077B5] rounded-full shadow-xs transition-colors"
                      title={`${speaker.name} LinkedIn Profile`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="p-4 flex-1 flex flex-col gap-1 text-center sm:text-left">
                    <h4 className="font-display font-bold text-xs text-neutral-900 group-hover:text-[#F97316] transition-colors truncate">
                      {speaker.name}
                    </h4>
                    <span className="text-[10px] font-bold text-[#F97316] leading-tight">
                      {speaker.title}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">
                      {speaker.org}
                    </span>
                    <p className="text-neutral-500 text-[11px] leading-relaxed mt-2 font-sans border-t border-neutral-200/50 pt-2 flex-1 italic">
                      "{speaker.bio}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VENUE MAP & LOGISTICS CARD */}
          <div 
            id="venue" 
            className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-xs space-y-6 scroll-mt-24"
          >
            <div>
              <h2 className="text-base font-display font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-purple-600 rounded-full inline-block" />
                Venue Mapping & Logistics
              </h2>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                Whether attending physically, logging in remotely, or connecting via hybrid channels, explore entry routes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
              {/* Venue details */}
              <div className="md:col-span-5 flex flex-col justify-between gap-4">
                <div className="space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-neutral-100 border border-neutral-200">
                    {event.location.includes("Virtual") || event.location.includes("Online") ? (
                      <>
                        <Laptop className="w-3.5 h-3.5 text-purple-600" /> Virtual Webinar
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-rose-600" /> Physical Venue
                      </>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-black text-xs uppercase text-neutral-500 tracking-wider">Venue Name</h4>
                    <p className="text-sm font-semibold text-neutral-900">{event.location}</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-black text-xs uppercase text-neutral-500 tracking-wider">Address Location</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                      {event.university} <br />
                      {event.city}, {event.country}
                    </p>
                  </div>
                </div>

                {/* Simulated Google Maps directions routing */}
                <button
                  type="button"
                  onClick={() => alert(`Simulating navigation directions to: ${event.location}, ${event.city}`)}
                  className="w-full bg-[#FAF8F5] hover:bg-neutral-100 text-neutral-900 text-xs font-bold py-2.5 rounded-xl border border-neutral-200 flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#F97316]" />
                  Get Interactive Directions
                </button>
              </div>

              {/* Map Placeholder styled with elegant African border */}
              <div className="md:col-span-7 bg-[#FAF8F5] border-2 border-dashed border-neutral-200 rounded-2xl overflow-hidden min-h-[180px] p-4 flex flex-col items-center justify-center text-center relative group">
                <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                
                <div className="p-3 bg-[#FAF8F5] border border-neutral-200 rounded-full text-neutral-400 group-hover:scale-105 transition-transform shrink-0 shadow-3xs">
                  <Map className="w-6 h-6 text-[#F97316]" />
                </div>
                
                <div className="mt-2.5 z-10 max-w-sm">
                  <span className="text-xs font-bold text-neutral-900 block">Interactive Local Area Map</span>
                  <p className="text-[10px] text-neutral-500 mt-1 font-sans leading-relaxed">
                    Visualizing coords around <strong>{event.city} University Hub</strong>. GPS tracking will initiate in real-time on cellular and desktop views.
                  </p>
                </div>

                <div className="absolute right-3 bottom-3 text-[9px] font-mono bg-white px-2 py-0.5 rounded border border-neutral-150 text-neutral-400">
                  LAT 1.9441° S / LON 30.0619° E
                </div>
              </div>
            </div>
          </div>

          {/* GALLERY SPOTLIGHT */}
          <div 
            id="gallery" 
            className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-xs space-y-6 scroll-mt-24"
          >
            <div>
              <h2 className="text-base font-display font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-orange-600 rounded-full inline-block" />
                Interactive Highlight Gallery
              </h2>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                Highlights from previous campus gatherings, research conferences, and student project pitch sessions.
              </p>
            </div>

            {/* Gallery responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {MOCK_GALLERY.map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative group h-24 sm:h-32 rounded-xl overflow-hidden border border-neutral-200/60 shadow-3xs"
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* FAQ ACCORDION MODULE */}
          <div 
            id="faqs" 
            className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-xs space-y-6 scroll-mt-24"
          >
            <div>
              <h2 className="text-base font-display font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#F97316] rounded-full inline-block" />
                Common Attendee Questions (FAQs)
              </h2>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                Instant guidelines about student admissions, digital entrance QR passes, scheduling logistics, and remote coordinates.
              </p>
            </div>

            {/* Interactive Accordion list */}
            <div className="space-y-2.5 mt-4">
              {[
                { q: "How do I secure my free admission QR pass?", a: "To secure your ticket, scroll to the top or right-side 'Secure Seat' panel. Fill in your professional name and student or personal email. A custom PDF-ready pass will generate instantly with a secure, watermarked scan code." },
                { q: "Can I join remotely if I do not live near the university campus?", a: "Yes, many gatherings support Hybrid or Online platforms. Check the 'Venue' section. If the event is online, the live Zoom or Google Meet webinar coordinates will be locked and sent directly to your ticket registration receipt." },
                { q: "Is there food, lunch, or refreshments provided?", a: "Most full-day seminars and conferences include mid-session tea, Rwandan coffees, pastries, and lunch blocks as highlighted on our official Schedule Timeline timeline." },
                { q: "Who can I contact if my attendance details change?", a: "You can write a direct messaging inquiry using our interactive organizer contact box located at the bottom spotlight section on this exact page." }
              ].map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-neutral-200 rounded-2xl overflow-hidden bg-[#FAF8F5]"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 font-display font-semibold text-xs text-neutral-900 hover:text-[#F97316] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#F97316] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-4 text-xs text-neutral-500 font-sans leading-relaxed border-t border-neutral-100 pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ORGANIZER SPOTLIGHT SECTION */}
          <div className="bg-[#FAF8F5] border border-neutral-200/80 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <span className="text-[9px] font-mono tracking-widest font-bold text-[#F97316] uppercase">SPOTLIGHT SPECIAL</span>
              <h2 className="text-base font-display font-black text-neutral-900 uppercase tracking-tight mt-0.5">
                Convening Host Information
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Organization Profile Details */}
              <div className="sm:w-1/2 space-y-4">
                <div className="flex items-center gap-3.5">
                  <img 
                    src={event.organizerAvatar} 
                    alt={event.organizer} 
                    className="w-12 h-12 rounded-2xl object-cover border border-neutral-200 shrink-0"
                  />
                  <div>
                    <h3 className="font-display font-bold text-sm text-neutral-900">{event.organizer}</h3>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">{event.organizerRole}</p>
                  </div>
                </div>

                <p className="text-neutral-500 text-xs leading-relaxed font-sans">
                  The convening team coordinates educational meetups, open-source software sprints, and scientific research networks. Dedicated to driving digital literacy and trust across university campuses.
                </p>

                <div className="flex flex-col gap-2 border-t border-neutral-200/60 pt-4 text-xs text-neutral-600 font-medium">
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#F97316]" />
                    <a href="https://afroevent.org" target="_blank" rel="noreferrer" className="hover:text-[#F97316] hover:underline flex items-center gap-1">
                      afroevent.org/chapters <ExternalLink className="w-3 h-3" />
                    </a>
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#059669]" />
                    <span>coordinator@afroevent.org</span>
                  </span>
                </div>
              </div>

              {/* Interactive Message Organizer form */}
              <div className="sm:w-1/2 bg-white rounded-2xl border border-neutral-200/85 p-4 sm:p-5 flex flex-col gap-3.5 shadow-3xs">
                <div>
                  <h4 className="font-display font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#F97316]" />
                    Send Inquiry Message
                  </h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-sans leading-relaxed">
                    Have specific questions about local speaker schedules, badges, or special accommodations? Leave a line.
                  </p>
                </div>

                {contactSuccess ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4 bg-emerald-50 rounded-xl border border-emerald-150 animate-in fade-in duration-150">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-2" />
                    <span className="text-xs font-bold text-emerald-900 block">Message Sent Successfully!</span>
                    <p className="text-[10px] text-emerald-600 mt-0.5 font-sans">
                      The campus coordinator will email you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-2">
                    <textarea
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Write your brief inquiry here..."
                      rows={3}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer transition-colors mt-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: STICKY REGISTRATION REGISTRY SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="sticky top-[120px] space-y-4">
            
            {/* CORE REGISTRATION BOARD CARD */}
            <div 
              className="bg-white border-2 border-neutral-200 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-5"
              id="sticky-registration-card"
            >
              {/* Subtle top brand band accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />

              {/* Pricing section */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest font-extrabold text-[#F97316] uppercase">ADMISSION</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-display font-black text-neutral-900">
                      {event.price === "Free" ? "Free" : event.price}
                    </span>
                    {event.price !== "Free" && (
                      <span className="text-[10px] font-bold text-neutral-400 font-mono">USD</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-widest font-extrabold text-emerald-600 uppercase">AVAILABILITY</span>
                  <p className="text-xs font-bold text-neutral-900 mt-1">
                    {event.capacity - event.rsvpCount > 0 ? (
                      <span className="text-emerald-700 flex items-center justify-end gap-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                        {event.capacity - event.rsvpCount} seats left
                      </span>
                    ) : (
                      <span className="text-rose-700">Sold Out</span>
                    )}
                  </p>
                </div>
              </div>

              {/* TICKET / FORM RENDERING LOGIC */}
              {ticketData ? (
                /* Ticket Render newly registered */
                <div 
                  className="bg-[#FFFDF9] border-2 border-dashed border-[#E5A93B] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-4"
                  id="rendered-ticket-board"
                >
                  {/* Decorative circular notch cuts on sides like a real ticket */}
                  <div className="absolute top-1/2 -left-3.5 w-6 h-6 rounded-full bg-white border-r border-charcoal-150 transform -translate-y-1/2 z-10" />
                  <div className="absolute top-1/2 -right-3.5 w-6 h-6 rounded-full bg-white border-l border-charcoal-150 transform -translate-y-1/2 z-10" />

                  {/* Watermark Logo Background */}
                  <div className="absolute right-0 bottom-4 opacity-[0.03] pointer-events-none scale-[2.2] origin-bottom-right">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                      <path d="M30 10 L30 70 M30 20 C5 20, 5 60, 30 60 M30 20 C55 20, 55 60, 30 60" stroke="#059669" strokeWidth="6" />
                    </svg>
                  </div>

                  <div className="text-center pb-3 border-b border-dashed border-charcoal-200">
                    <span className="text-[9px] font-mono tracking-widest font-bold bg-[#059669]/10 text-[#059669] border border-[#059669]/20 px-3 py-1 rounded-full uppercase inline-block">
                      ✓ RSVP CONFIRMED
                    </span>
                    <h4 className="font-display font-black text-charcoal-900 text-xs mt-3 uppercase tracking-wider">
                      Afro Event Pass
                    </h4>
                  </div>

                  {/* Ticket Information */}
                  <div className="flex flex-col gap-2.5 text-[11px] text-charcoal-700 font-sans border-b border-dashed border-charcoal-150 pb-3">
                    <div>
                      <span className="text-[9px] font-mono text-charcoal-400 block uppercase">EVENT TITLE</span>
                      <span className="font-semibold text-charcoal-900 truncate block">{event.title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] font-mono text-charcoal-400 block uppercase">DATE</span>
                        <span className="font-semibold text-charcoal-900 block leading-tight text-[10px]">{event.date}</span>
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
                      <span className="font-mono font-bold text-charcoal-900 tracking-wider text-xs">{ticketData.ticketCode}</span>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-white border border-charcoal-150 rounded-xl shadow-xs">
                      {/* SVG Barcode/QR Mock */}
                      <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-90">
                        <rect x="0" y="0" width="20" height="20" fill="#2B1E16" />
                        <rect x="4" y="4" width="12" height="12" fill="#FFF" />
                        <rect x="8" y="8" width="4" height="4" fill="#2B1E16" />

                        <rect x="80" y="0" width="20" height="20" fill="#2B1E16" />
                        <rect x="84" y="4" width="12" height="12" fill="#FFF" />
                        <rect x="88" y="8" width="4" height="4" fill="#2B1E16" />

                        <rect x="0" y="80" width="20" height="20" fill="#2B1E16" />
                        <rect x="4" y="84" width="12" height="12" fill="#FFF" />
                        <rect x="88" y="88" width="4" height="4" fill="#2B1E16" />

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
                    <span className="text-[9px] font-mono text-charcoal-400 uppercase tracking-widest font-semibold">
                      Scan entrance pass at door
                    </span>
                  </div>

                  {/* PDF ticket commands */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold mt-1">
                    <button 
                      type="button"
                      onClick={() => alert("Mock PDF generated successfully for download!")}
                      className="flex items-center justify-center gap-1 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 bg-white cursor-pointer"
                    >
                      <Download className="w-3 h-3" /> Download
                    </button>
                    <button 
                      type="button"
                      onClick={() => window.print()}
                      className="flex items-center justify-center gap-1 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 bg-white cursor-pointer"
                    >
                      <Printer className="w-3 h-3" /> Print
                    </button>
                  </div>
                </div>
              ) : isAlreadyRegistered ? (
                /* Already Registered block */
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center flex flex-col items-center gap-3 animate-in fade-in duration-150">
                  <div className="w-10 h-10 bg-[#059669] rounded-full flex items-center justify-center text-white shrink-0 shadow-3xs">
                    <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-neutral-900">You are Registered!</h4>
                    <p className="text-[10px] text-neutral-500 mt-1 font-sans leading-normal">
                      We have your student seat secured. Your premium Gye Nyame ticket code is ready to scan.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRegisterFlowStep("ticket");
                      setShowRegisterFlow(true);
                    }}
                    className="w-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold py-3 rounded-full shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Ticket className="w-4 h-4" /> View Digital Ticket Pass
                  </button>
                </div>
              ) : (
                /* Interactive Registration Trigger */
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-neutral-500 leading-normal font-sans">
                    Register to instantly reserve a seat and generate a digital QR-coded pass.
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setRegisterFlowStep("form");
                      setShowRegisterFlow(true);
                    }}
                    className="w-full bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    Register For Gathering
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Secure guarantee label */}
              <p className="text-[10px] text-neutral-500 text-center flex items-center justify-center gap-1 font-sans mt-1">
                <Shield className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                Paperless RSVP secured via Afro Event Trust.
              </p>
            </div>

            {/* Quick Informational Box */}
            <div className="bg-orange-50 border border-orange-200 text-orange-950 rounded-2xl p-4 text-xs flex gap-2.5 leading-relaxed font-sans">
              <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Need Academic Credit?</strong>
                Student organizers will distribute specialized attendance verification logs right after the coffee-chat fireside blocks.
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* RELATED EVENTS / SIMILAR GATHERINGS MODULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24" id="related-events-grid">
        <div className="border-t border-neutral-200 pt-10 pb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[9px] font-mono tracking-widest font-extrabold text-[#F97316] uppercase">RECOMMENDED CONVENINGS</span>
              <h2 className="text-xl font-display font-black text-neutral-900 uppercase tracking-tight mt-0.5">
                Explore Related Campus Gatherings
              </h2>
            </div>
            <span className="text-xs font-mono text-[#F97316] font-bold hidden sm:inline">
              CURATED PAN-AFRICAN DISCOVERY
            </span>
          </div>
        </div>

        {/* 4 Related Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedEvents.map((evt) => {
            const isSavedEvt = savedEventIds.includes(evt.id);
            return (
              <div 
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#F97316]/50 hover:shadow-lg transition-all cursor-pointer flex flex-col group relative"
              >
                {/* Event Cover Photo */}
                <div className="h-36 w-full overflow-hidden relative shrink-0">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Category overlay badge */}
                  <span className="absolute top-3 left-3 text-[8px] font-mono tracking-wider font-extrabold bg-[#F97316] text-white px-2 py-0.5 rounded-full uppercase">
                    {evt.category}
                  </span>

                  {/* Date overlay stamp */}
                  <div className="absolute bottom-3 left-3 text-white text-[10px] font-bold flex items-center gap-1 bg-neutral-950/40 backdrop-blur-xs px-2 py-0.5 rounded">
                    <Calendar className="w-3 h-3 text-[#E5A93B]" />
                    {evt.date.substring(0, 11)}
                  </div>
                </div>

                {/* Event body */}
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <h3 className="font-display font-bold text-xs text-neutral-900 group-hover:text-[#F97316] transition-colors leading-tight line-clamp-2">
                    {evt.title}
                  </h3>
                  
                  <div className="text-[11px] text-neutral-500 font-sans space-y-1 mt-1 flex-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-neutral-400" />
                      <span>{evt.rsvpCount} Attending</span>
                    </div>
                  </div>

                  {/* Price info footer */}
                  <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-[11px] font-bold mt-2 font-mono">
                    <span className={evt.isFree ? "text-emerald-600" : "text-neutral-900"}>
                      {evt.isFree ? "FREE" : evt.price}
                    </span>
                    <span className="text-[#F97316] flex items-center gap-0.5 text-[9px] group-hover:translate-x-0.5 transition-transform">
                      VIEW GATHERING <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULLSCREEN OVERLAY FOR MULTI-STEP REGISTRATION & TICKET FLOW */}
      <AnimatePresence>
        {showRegisterFlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FAF8F5]/98 backdrop-blur-md overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center"
          >
            <div className="w-full max-w-3xl">
              <RegistrationTicketFlow
                event={event}
                onClose={() => setShowRegisterFlow(false)}
                onRegisterSuccess={(eventId) => {
                  onRegisterSuccess(eventId);
                }}
                userEmail={userEmail}
                userName={userName}
                initialStep={registerFlowStep}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
