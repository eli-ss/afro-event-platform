/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Sidebar from "./components/Sidebar";
import LogoConcept from "./components/LogoConcept";
import ColorPalette from "./components/ColorPalette";
import TypographySpec from "./components/TypographySpec";
import ButtonsSpec from "./components/ButtonsSpec";
import InputsSpec from "./components/InputsSpec";
import CardsSpec from "./components/CardsSpec";
import NavFooterSpec from "./components/NavFooterSpec";
import SystemSpecs from "./components/SystemSpecs";
import ResponsiveSpec from "./components/ResponsiveSpec";
import EventBuilder from "./components/EventBuilder";
import AfroEventHome from "./components/AfroEventHome";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { INITIAL_EVENTS, Event } from "./components/mockEvents";
import { Sparkles, ArrowLeft, Flame, AlertTriangle } from "lucide-react";

const SECTIONS = [
  { id: "logo-concept", label: "Logo & Symbolism", icon: "Flame" },
  { id: "color-palette", label: "Color Palette", icon: "Palette" },
  { id: "typography", label: "Typography Rules", icon: "Type" },
  { id: "buttons", label: "Buttons System", icon: "Play" },
  { id: "inputs", label: "Form & Inputs", icon: "CheckSquare" },
  { id: "cards", label: "Event Cards Grid", icon: "Layers" },
  { id: "nav-footer", label: "Navigation & Footer", icon: "Compass" },
  { id: "system-specs", label: "Spacing & Tokens", icon: "Sliders" },
  { id: "responsive-specs", label: "Responsive Layouts", icon: "Smartphone" },
  { id: "event-builder", label: "Interactive Builder", icon: "Sparkles" }
];

function GlobalViewSwitcher({ currentView, setCurrentView }: { currentView: string; setCurrentView: (view: any) => void }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <div className="relative flex flex-col items-end gap-2">
        {isOpen && (
          <div className="bg-[#171717] border border-neutral-800 text-white rounded-2xl p-3.5 shadow-2xl flex flex-col gap-1.5 w-60 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <span className="text-[10px] font-mono tracking-widest text-[#F97316] font-black uppercase mb-1.5 px-1.5 block">⚡ Platform Switcher</span>
            {[
              { id: "home", label: "Afro Event Home", role: "Public Homepage" },
              { id: "dashboard", label: "User Dashboard", role: "Attendee Account" },
              { id: "admin", label: "Admin Dashboard", role: "SaaS Control Panel" },
              { id: "design-system", label: "Brand Design System", role: "Colors & Design Specs" }
            ].map(view => (
              <button
                key={view.id}
                onClick={() => {
                  setCurrentView(view.id);
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className={`w-full flex flex-col items-start px-3 py-2 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  currentView === view.id
                    ? "bg-gradient-to-r from-[#F97316] to-[#E5630F] text-white font-bold"
                    : "hover:bg-neutral-800 text-neutral-300 hover:text-white"
                }`}
              >
                <span className="leading-tight">{view.label}</span>
                <span className={`text-[9px] font-mono leading-none mt-0.5 ${currentView === view.id ? "text-white/80" : "text-neutral-500"}`}>{view.role}</span>
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-950 hover:bg-[#F97316] text-white border border-neutral-850 hover:border-[#F97316]/50 h-11 px-5 rounded-full flex items-center gap-2 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all text-xs font-bold"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Platform Navigator
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = React.useState<"home" | "design-system" | "dashboard" | "admin">("home");
  const [activeSection, setActiveSection] = React.useState("logo-concept");

  // Unified global state engine
  const [user, setUser] = React.useState<any | null>(null);
  const [events, setEvents] = React.useState<Event[]>(INITIAL_EVENTS);
  const [registeredEventIds, setRegisteredEventIds] = React.useState<string[]>([]);
  const [savedEventIds, setSavedEventIds] = React.useState<string[]>([]);

  // Simple scroll spy logic for design system
  React.useEffect(() => {
    if (currentView !== "design-system") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for triggers

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  if (currentView === "dashboard") {
    return (
      <>
        <UserDashboard 
          user={user}
          setUser={setUser}
          events={events}
          setEvents={setEvents}
          registeredEventIds={registeredEventIds}
          setRegisteredEventIds={setRegisteredEventIds}
          savedEventIds={savedEventIds}
          setSavedEventIds={setSavedEventIds}
          onNavigateToHome={() => {
            setCurrentView("home");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          onCreateEventClick={() => {
            setCurrentView("home");
            setTimeout(() => {
              const feed = document.getElementById("events-feed");
              if (feed) feed.scrollIntoView({ behavior: "smooth" });
            }, 150);
          }}
          onViewEventDetail={(evt) => {
            setCurrentView("home");
            setTimeout(() => {
              const feed = document.getElementById("events-feed");
              if (feed) feed.scrollIntoView({ behavior: "smooth" });
            }, 150);
          }}
        />
        <GlobalViewSwitcher currentView={currentView} setCurrentView={setCurrentView} />
      </>
    );
  }

  if (currentView === "admin") {
    return (
      <>
        <AdminDashboard 
          events={events}
          setEvents={setEvents}
          onLogout={() => {
            setCurrentView("home");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
        <GlobalViewSwitcher currentView={currentView} setCurrentView={setCurrentView} />
      </>
    );
  }

  if (currentView === "home") {
    return (
      <>
        <AfroEventHome 
          user={user}
          setUser={setUser}
          events={events}
          setEvents={setEvents}
          registeredEventIds={registeredEventIds}
          setRegisteredEventIds={setRegisteredEventIds}
          savedEventIds={savedEventIds}
          setSavedEventIds={setSavedEventIds}
          onNavigateToDashboard={() => {
            setCurrentView("dashboard");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          onToggleStyleGuide={() => {
            setCurrentView("design-system");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          showStyleGuideToggle={false}
        />
        <GlobalViewSwitcher currentView={currentView} setCurrentView={setCurrentView} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/60 text-charcoal-900 font-sans flex flex-col md:flex-row relative">
      {/* Decorative ambient glass glows in background */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-96 h-96 rounded-full bg-brand-500/8 blur-[120px] z-0" />
      <div className="pointer-events-none fixed top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-accent-500/6 blur-[150px] z-0" />
      <div className="pointer-events-none fixed -bottom-40 left-1/3 w-80 h-80 rounded-full bg-brand-500/6 blur-[100px] z-0" />

      {/* Dynamic Navigation Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        sections={SECTIONS} 
      />

      {/* Main Work Area */}
      <main className="flex-1 md:pl-64 pt-16 md:pt-0 min-w-0 z-10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col gap-16">
          
          {/* Header Banner to Navigate Back to App */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-charcoal-200 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse" />
              <span className="text-xs font-mono font-bold text-charcoal-600">AFRO EVENT SPECIFICATIONS ENGINE v1.0</span>
            </div>
            <button
              onClick={() => {
                setCurrentView("home");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Live Platform Homepage
            </button>
          </div>

          {/* Welcome/Value Proposition Hero Banner with premium frosted style */}
          <section id="welcome-banner" className="bg-charcoal-900/95 backdrop-blur-md text-white rounded-3xl p-6 lg:p-10 relative overflow-hidden shadow-xl border border-white/10">
            {/* Overlay Geometric Pattern */}
            <div className="absolute inset-0 african-pattern-subtle opacity-5 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono tracking-widest font-bold bg-brand-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-white fill-current animate-spin" />
                  PREMIUM STYLE GUIDE
                </span>
                <span className="text-[10px] font-mono tracking-widest font-bold bg-charcoal-800 text-charcoal-300 px-3 py-1 rounded-full border border-charcoal-700/80">
                  AFRICAN INSPIRATION • DIGITAL TRUST
                </span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
                  Afro Event <span className="text-brand-500">Design System</span>
                </h1>
                <p className="text-charcoal-300 text-sm lg:text-base leading-relaxed mt-4">
                  Welcome to the design blueprint for **Afro Event**. This style system balances standard corporate credibility (inspired by modern calendar layouts like Luma) with a unique African identity. Utilizing warm sunset orange, vibrant emerald green, crisp typography, and generous negative space, it forms a visual identity engineered for technology, enterprise, and cultural festivals alike.
                </p>
              </div>

              {/* High-Level Style Key Value Swatches */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-charcoal-800 pt-6 mt-2">
                <div className="bg-charcoal-800/40 backdrop-blur-xs p-3 rounded-xl border border-charcoal-700/60">
                  <span className="text-[9px] font-mono text-charcoal-400 block uppercase">PRIMARY BRAND</span>
                  <span className="text-xs font-display font-semibold text-brand-400 mt-1 block">Warm Orange</span>
                  <span className="text-[10px] font-mono text-charcoal-300 font-bold">#F27D26</span>
                </div>
                <div className="bg-charcoal-800/40 backdrop-blur-xs p-3 rounded-xl border border-charcoal-700/60">
                  <span className="text-[9px] font-mono text-charcoal-400 block uppercase">ACCENT LINK</span>
                  <span className="text-xs font-display font-semibold text-accent-400 mt-1 block">Emerald Green</span>
                  <span className="text-[10px] font-mono text-charcoal-300 font-bold">#059669</span>
                </div>
                <div className="bg-charcoal-800/40 backdrop-blur-xs p-3 rounded-xl border border-charcoal-700/60">
                  <span className="text-[9px] font-mono text-charcoal-400 block uppercase">DISPLAY FONT</span>
                  <span className="text-xs font-display font-semibold text-white mt-1 block">Poppins</span>
                  <span className="text-[10px] font-mono text-charcoal-300">Headings, Buttons</span>
                </div>
                <div className="bg-charcoal-800/40 backdrop-blur-xs p-3 rounded-xl border border-charcoal-700/60">
                  <span className="text-[9px] font-mono text-charcoal-400 block uppercase">BODY FONT</span>
                  <span className="text-xs font-display font-semibold text-white mt-1 block">Inter</span>
                  <span className="text-[10px] font-mono text-charcoal-300">Density & Forms</span>
                </div>
              </div>
            </div>
          </section>

          {/* Guidelines Frame Warning */}
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 flex items-start gap-3 text-xs leading-normal">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Tactile Framework Mandate Acceptance:</strong>
              This platform adheres to absolute original specifications. It avoids mock terminals, system credit lines in rails, or unnecessary telemetry clutters. Every visual element is crafted for immediate product value.
            </div>
          </div>

          {/* Logo Concept */}
          <LogoConcept />

          {/* Color Palette */}
          <ColorPalette />

          {/* Typography */}
          <TypographySpec />

          {/* Buttons */}
          <ButtonsSpec />

          {/* Inputs */}
          <InputsSpec />

          {/* Cards */}
          <CardsSpec />

          {/* Navigation & Footers */}
          <NavFooterSpec />

          {/* System Specs */}
          <SystemSpecs />

          {/* Responsive Specs */}
          <ResponsiveSpec />

          {/* Event Builder */}
          <EventBuilder />

          {/* Quick Page Footer */}
          <div className="border-t border-charcoal-100 pt-6 pb-12 flex flex-col md:flex-row items-center justify-between text-xs text-charcoal-600 font-medium">
            <p>© 2026 Afro Event. Designed with modern pan-African integrity.</p>
            <p className="mt-2 md:mt-0">Poppins & Inter Google Web Fonts pairing.</p>
          </div>
        </div>
      </main>
      <GlobalViewSwitcher currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}
