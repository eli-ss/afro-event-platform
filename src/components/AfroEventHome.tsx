/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Search, MapPin, Calendar, Plus, ChevronRight, Mail, ArrowRight, Check,
  Sparkles, Shield, User, LogOut, CheckCircle2, ChevronDown, Menu, X, Info,
  Laptop, Briefcase, Music, GraduationCap, Heart, Pizza, ShieldAlert, Award, Ticket,
  ChevronLeft, HelpCircle, Facebook, Linkedin, Send, MessageSquare, LayoutDashboard
} from "lucide-react";
import AfroEventLogo from "./AfroEventLogo";
import { INITIAL_EVENTS, FEATURED_ORGANIZERS, Event } from "./mockEvents";
import EventDetailModal from "./EventDetailModal";
import CreateEventModal from "./CreateEventModal";
import AuthModal from "./AuthModal";

const CATEGORIES = [
  "Academic Seminar",
  "Workshop",
  "Career Fair",
  "Startup Pitch",
  "Hackathon",
  "Cultural Event",
  "Competition"
];

const UNIVERSITIES = [
  {
    name: "African Leadership University (ALU)",
    location: "Kigali, Rwanda",
    abbreviation: "ALU",
    eventsCount: 12,
    avatarColor: "bg-emerald-50 text-emerald-700",
    bgPattern: "from-emerald-500/10 to-transparent",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "University of Cape Town",
    location: "Cape Town, South Africa",
    abbreviation: "UCT",
    eventsCount: 8,
    avatarColor: "bg-blue-50 text-blue-700",
    bgPattern: "from-blue-500/10 to-transparent",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "University of Lagos",
    location: "Lagos, Nigeria",
    abbreviation: "UNILAG",
    eventsCount: 15,
    avatarColor: "bg-indigo-50 text-indigo-700",
    bgPattern: "from-indigo-500/10 to-transparent",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Ashesi University",
    location: "Berekuso, Ghana",
    abbreviation: "Ashesi",
    eventsCount: 6,
    avatarColor: "bg-[#F97316]/10 text-[#F97316]",
    bgPattern: "from-orange-500/10 to-transparent",
    image: "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Kenyatta University",
    location: "Nairobi, Kenya",
    abbreviation: "KU",
    eventsCount: 9,
    avatarColor: "bg-teal-50 text-teal-700",
    bgPattern: "from-teal-500/10 to-transparent",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "University of Ghana",
    location: "Accra, Ghana",
    abbreviation: "UG",
    eventsCount: 11,
    avatarColor: "bg-amber-50 text-amber-700",
    bgPattern: "from-amber-500/10 to-transparent",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  }
];

const FAQS = [
  {
    id: "faq-1",
    question: "How do I register or secure tickets for university events?",
    answer: "Securing tickets on Afro Event is simple. Simply browse the events grid, select any event that interests you, and click 'Register'. Fill in your name and email, and your digital ticket with a unique check-in QR code is generated instantly."
  },
  {
    id: "faq-2",
    question: "Is Afro Event completely free for students?",
    answer: "Yes, Afro Event is 100% free for students, researchers, and academics looking to discover and attend educational seminars, hackathons, career workshops, and university guest panels."
  },
  {
    id: "faq-3",
    question: "Can student clubs or departments host events here?",
    answer: "Absolutely! Student organizations, academic departments, research labs, and guest networks can register as hosts. Click 'Create Event' in the header to set up your event page and collect RSVP registrations."
  },
  {
    id: "faq-4",
    question: "How do I check in at the event venue?",
    answer: "Simply present your digital ticket on your smartphone at the entrance. The student organizers will scan your unique, Gye Nyame watermarked QR code for rapid, paperless verification."
  }
];

const TESTIMONIALS = [
  {
    name: "Amina Bello",
    role: "Engineering Student",
    school: "Kenyatta University",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    quote: "Afro Event made it incredibly simple to register for the GreenTech hackathon. I met my co-founders at the event, and our solar-grid project has already entered the university incubator!"
  },
  {
    name: "David Keita",
    role: "President, Computer Club",
    school: "African Leadership University",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    quote: "As a student organizer at ALU, managing RSVP spreadsheets used to be a complete nightmare. With Afro Event, we set up our seminar pages and checked in 250+ attendees in minutes."
  },
  {
    name: "Chioma Okoro",
    role: "Computer Science Junior",
    school: "University of Lagos",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    quote: "I secured my summer software engineering internship directly at the UNILAG Career Fair. The QR ticket check-in at the multipurpose hall gate took less than five seconds!"
  },
  {
    name: "Thabo Mokwena",
    role: "Debate Union Coordinator",
    school: "University of Cape Town",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    quote: "The AI Ethics debate cup was deeply intellectual and beautifully organized. The Gye Nyame themed watermarked passes felt incredibly custom and premium. Fantastic experience."
  }
];

interface AfroEventHomeProps {
  onToggleStyleGuide: () => void;
  showStyleGuideToggle: boolean;
  // Lifted global states
  user?: any;
  setUser?: (userData: any) => void;
  events?: Event[];
  setEvents?: React.Dispatch<React.SetStateAction<Event[]>>;
  registeredEventIds?: string[];
  setRegisteredEventIds?: React.Dispatch<React.SetStateAction<string[]>>;
  savedEventIds?: string[];
  setSavedEventIds?: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigateToDashboard?: () => void;
}

export default function AfroEventHome({
  onToggleStyleGuide,
  showStyleGuideToggle,
  user: propUser,
  setUser: propSetUser,
  events: propEvents,
  setEvents: propSetEvents,
  registeredEventIds: propRegisteredEventIds,
  setRegisteredEventIds: propSetRegisteredEventIds,
  savedEventIds: propSavedEventIds,
  setSavedEventIds: propSetSavedEventIds,
  onNavigateToDashboard
}: AfroEventHomeProps) {
  // Fallback states for standalone execution
  const [localEvents, setLocalEvents] = React.useState<Event[]>(INITIAL_EVENTS);
  const events = propEvents !== undefined ? propEvents : localEvents;
  const setEvents = propSetEvents !== undefined ? propSetEvents : setLocalEvents;

  const [localUser, setLocalUser] = React.useState<any | null>(null);
  const user = propUser !== undefined ? propUser : localUser;
  const setUser = propSetUser !== undefined ? propSetUser : setLocalUser;

  const [localRegisteredEventIds, setLocalRegisteredEventIds] = React.useState<string[]>([]);
  const registeredEventIds = propRegisteredEventIds !== undefined ? propRegisteredEventIds : localRegisteredEventIds;
  const setRegisteredEventIds = propSetRegisteredEventIds !== undefined ? propSetRegisteredEventIds : setLocalRegisteredEventIds;

  const [localSavedEventIds, setLocalSavedEventIds] = React.useState<string[]>([]);
  const savedEventIds = propSavedEventIds !== undefined ? propSavedEventIds : localSavedEventIds;
  const setSavedEventIds = propSetSavedEventIds !== undefined ? propSetSavedEventIds : setLocalSavedEventIds;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("All Africa");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedDate, setSelectedDate] = React.useState("");

  // Modal control states
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [selectedEventForDetail, setSelectedEventForDetail] = React.useState<Event | null>(null);

  // Interactive menu states
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  // FAQ interactive state
  const [openFaqId, setOpenFaqId] = React.useState<string | null>(null);

  // Upcoming Carousel reference
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Newsletter subscription success flag
  const [subscribedEmail, setSubscribedEmail] = React.useState("");
  const [showNewsSuccess, setShowNewsSuccess] = React.useState(false);

  // Filter events dynamically
  const filteredEvents = React.useMemo(() => {
    return events.filter(evt => {
      const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            evt.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            evt.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCity = selectedCity === "All Africa" || evt.city === selectedCity;
      const matchesCategory = selectedCategory === "All" || evt.category === selectedCategory;
      
      let matchesDate = true;
      if (selectedDate) {
        const parsedSelectedDate = new Date(selectedDate);
        if (!isNaN(parsedSelectedDate.getTime())) {
          const parsedEventDate = new Date(evt.date);
          if (!isNaN(parsedEventDate.getTime())) {
            matchesDate = parsedSelectedDate.getMonth() === parsedEventDate.getMonth() &&
                          parsedSelectedDate.getFullYear() === parsedEventDate.getFullYear();
          }
        }
      }

      return matchesSearch && matchesCity && matchesCategory && matchesDate;
    });
  }, [events, searchQuery, selectedCity, selectedCategory, selectedDate]);

  // Handler to register the user for an event
  const handleRegisterEvent = (eventId: string) => {
    if (!registeredEventIds.includes(eventId)) {
      setRegisteredEventIds(prev => [...prev, eventId]);
      setEvents(prev => prev.map(evt => {
        if (evt.id === eventId) {
          return { ...evt, rsvpCount: evt.rsvpCount + 1 };
        }
        return evt;
      }));
    }
  };

  // Handler to add a newly created event
  const handleAddEvent = (newEvent: Event) => {
    setEvents(prev => [newEvent, ...prev]);
    const feed = document.getElementById("events-feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler for login modal success
  const handleLoginSuccess = (userData: { name: string; email: string; avatar: string }) => {
    setUser(userData);
  };

  // Category Icon Resolver mapping to our new categories
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Academic Seminar": return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case "Workshop": return <Laptop className="w-5 h-5 text-blue-600" />;
      case "Career Fair": return <Briefcase className="w-5 h-5 text-indigo-600" />;
      case "Startup Pitch": return <Sparkles className="w-5 h-5 text-[#F97316]" />;
      case "Hackathon": return <Award className="w-5 h-5 text-violet-600" />;
      case "Cultural Event": return <Music className="w-5 h-5 text-amber-600" />;
      case "Competition": return <Ticket className="w-5 h-5 text-red-600" />;
      default: return <Sparkles className="w-5 h-5 text-[#F97316]" />;
    }
  };

  // Horizontal Scroll handler for Carousel
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.85;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Handler for popular university cards click
  const handleUniversityClick = (uniName: string) => {
    setSelectedCity("All Africa");
    setSearchQuery(uniName);
    const feed = document.getElementById("events-feed");
    if (feed) feed.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-charcoal-900 font-sans selection:bg-[#F97316]/20 relative">
      
      {/* Absolute Ambient Glow Elements */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/[0.04] blur-[150px] z-0" />
      <div className="pointer-events-none absolute top-[1200px] right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[130px] z-0" />

      {/* STICKY NAVIGATION BAR */}
      <nav 
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-charcoal-100/85 transition-all duration-200"
        id="navbar-sticky"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo area */}
            <div className="flex items-center gap-2">
              <a href="#" className="flex items-center">
                <AfroEventLogo scale={0.8} />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => {
                  setSelectedCategory("All");
                  const feed = document.getElementById("events-feed");
                  if (feed) feed.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-display font-semibold text-charcoal-700 hover:text-[#F97316] transition-colors cursor-pointer"
              >
                Explore Events
              </button>
              <button 
                onClick={() => {
                  const cats = document.getElementById("categories-section");
                  if (cats) cats.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-display font-semibold text-charcoal-700 hover:text-[#F97316] transition-colors cursor-pointer"
              >
                Categories
              </button>
              <button 
                onClick={() => {
                  const unis = document.getElementById("universities-section");
                  if (unis) unis.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-display font-semibold text-charcoal-700 hover:text-[#F97316] transition-colors cursor-pointer"
              >
                Universities
              </button>
              <button 
                onClick={() => {
                  if (user) {
                    setIsCreateOpen(true);
                  } else {
                    setAuthMode("signup");
                    setIsAuthOpen(true);
                  }
                }}
                className="text-sm font-display font-semibold text-charcoal-700 hover:text-[#F97316] transition-colors cursor-pointer flex items-center gap-1"
              >
                Create Event
                <Plus className="w-4 h-4 text-[#F97316]" />
              </button>
              <button 
                onClick={() => {
                  const works = document.getElementById("how-it-works-section");
                  if (works) works.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-display font-semibold text-charcoal-700 hover:text-[#F97316] transition-colors cursor-pointer"
              >
                How It Works
              </button>
            </div>

            {/* Right Side Buttons (Auth / Profile) - Cleaned of Design System */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                /* Logged in User Profile Dropdown */
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 hover:bg-neutral-50 rounded-full border border-charcoal-150 transition-all cursor-pointer bg-white"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover border border-charcoal-200" 
                    />
                    <span className="text-xs font-display font-bold text-charcoal-800">{user.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-charcoal-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-2xl shadow-xl border border-charcoal-100 py-2.5 z-50 animate-in fade-in-50 slide-in-from-top-3">
                      <div className="px-4 py-2 border-b border-charcoal-100">
                        <span className="text-[10px] font-mono text-charcoal-400 block uppercase">SIGNED IN AS</span>
                        <span className="font-semibold text-charcoal-900 text-xs truncate block">{user.email}</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onNavigateToDashboard) onNavigateToDashboard();
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-charcoal-700 hover:bg-[#F97316]/5 hover:text-[#C04E22] transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#F97316]" /> User Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setIsCreateOpen(true);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-charcoal-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#F97316]" /> Host an Event
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (registeredEventIds.length === 0) {
                            alert("You haven't registered for any events yet. Secure a ticket on our feed!");
                            return;
                          }
                          const firstRegId = registeredEventIds[0];
                          const evt = events.find(e => e.id === firstRegId);
                          if (evt) setSelectedEventForDetail(evt);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-charcoal-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Ticket className="w-4 h-4 text-[#059669]" /> My Tickets ({registeredEventIds.length})
                      </button>

                      <div className="border-t border-charcoal-100 my-1.5" />

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setUser(null);
                          setRegisteredEventIds([]);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Anonymous User LogIn / Sign Up */
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setIsAuthOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold text-charcoal-750 hover:text-[#F97316] transition-colors cursor-pointer font-display"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setIsAuthOpen(true);
                    }}
                    className="px-5 py-2.5 text-xs font-bold bg-black hover:bg-[#F97316] text-white rounded-full transition-all shadow-xs hover:shadow-md cursor-pointer font-display"
                  >
                    Sign Up Free
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal-600 hover:text-charcoal-900 focus:outline-hidden cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-charcoal-100 bg-white py-4 px-4 shadow-lg flex flex-col gap-4 animate-in slide-in-from-top-5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const feed = document.getElementById("events-feed");
                if (feed) feed.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left py-2.5 font-display font-semibold text-charcoal-800 text-sm hover:text-[#F97316] border-b border-charcoal-50"
            >
              Explore Events
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const cats = document.getElementById("categories-section");
                if (cats) cats.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left py-2.5 font-display font-semibold text-charcoal-800 text-sm hover:text-[#F97316] border-b border-charcoal-50"
            >
              Categories
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const unis = document.getElementById("universities-section");
                if (unis) unis.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left py-2.5 font-display font-semibold text-charcoal-800 text-sm hover:text-[#F97316] border-b border-charcoal-50"
            >
              Universities
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (user) {
                  setIsCreateOpen(true);
                } else {
                  setAuthMode("signup");
                  setIsAuthOpen(true);
                }
              }}
              className="text-left py-2.5 font-display font-semibold text-charcoal-800 text-sm hover:text-[#F97316] border-b border-charcoal-50 flex items-center justify-between"
            >
              <span>Create Event</span>
              <Plus className="w-4 h-4 text-[#F97316]" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const works = document.getElementById("how-it-works-section");
                if (works) works.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left py-2.5 font-display font-semibold text-charcoal-800 text-sm hover:text-[#F97316] border-b border-charcoal-50"
            >
              How It Works
            </button>

            {/* Auth area for Mobile */}
            {user ? (
              <div className="bg-neutral-50 p-3.5 rounded-2xl border border-charcoal-150 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <span className="text-xs font-display font-bold text-charcoal-900 block leading-tight">{user.name}</span>
                    <span className="text-[10px] text-charcoal-500 block truncate max-w-[150px]">{user.email}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onNavigateToDashboard) onNavigateToDashboard();
                    }}
                    className="py-1.5 px-3 text-center text-[10px] font-bold bg-[#F97316] text-white rounded-full font-display cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setUser(null);
                      setRegisteredEventIds([]);
                    }}
                    className="py-1.5 px-3 text-center text-[10px] font-bold bg-neutral-100 text-red-600 rounded-full font-display cursor-pointer border border-charcoal-200"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode("login");
                    setIsAuthOpen(true);
                  }}
                  className="py-2.5 text-center text-xs font-bold text-charcoal-800 border border-charcoal-250 rounded-full font-display"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode("signup");
                    setIsAuthOpen(true);
                  }}
                  className="py-2.5 text-center text-xs font-bold bg-black text-white rounded-full font-display"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* HERO SECTION WITH GEOMETRIC BACKGROUND PATTERN */}
      <header 
        className="relative bg-white pt-12 pb-14 sm:pt-20 sm:pb-16 overflow-hidden border-b border-charcoal-100"
        id="hero-header"
      >
        {/* African Minimalist Geometric Line/Diamond SVG Background Pattern - Reduced Opacity to 0.015 for extreme premium feel */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="african-geometric" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 0 40 L 40 0 L 80 40 L 40 80 Z" fill="none" stroke="#2B1E16" strokeWidth="2" />
                <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="#F27D26" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="40" cy="40" r="6" fill="none" stroke="#1A5235" strokeWidth="1.5" />
                <path d="M 15 15 L 25 15 L 20 25 Z" fill="none" stroke="#C04E22" strokeWidth="1" />
                <path d="M 55 55 L 65 55 L 60 65 Z" fill="none" stroke="#C04E22" strokeWidth="1" />
                <path d="M 15 55 L 25 55 L 20 45 Z" fill="none" stroke="#E5A93B" strokeWidth="1" />
                <path d="M 55 15 L 65 15 L 60 5 Z" fill="none" stroke="#E5A93B" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#african-geometric)" />
          </svg>
        </div>

        {/* Ambient Warm Sunset Sun Shape */}
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#F97316]/8 to-[#E5A93B]/2 blur-3xl pointer-events-none select-none -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top small banner */}
          <div className="inline-flex items-center gap-2 bg-[#F97316]/8 text-[#F97316] border border-[#F97316]/20 px-4 py-1.5 rounded-full text-xs font-display font-extrabold uppercase tracking-wider mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 fill-current animate-pulse text-[#F97316]" />
            ACADEMIA & INNOVATION HUB
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-charcoal-900 max-w-5xl mx-auto leading-[1.1] text-balance">
            Discover Africa's Best <span className="text-[#F97316] relative inline-block">
              University Events
              <svg className="absolute left-0 bottom-1 w-full h-2.5 text-[#E5A93B] fill-current opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 9, 50 5 T 100 5 L 100 10 L 0 10 Z" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-charcoal-600 text-sm sm:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            Join seminars, workshops, hackathons, research conferences, startup meetups, and career events across Africa.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => {
                const feed = document.getElementById("events-feed");
                if (feed) feed.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-[#F97316] text-white font-display font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Explore Events
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => {
                if (user) {
                  setIsCreateOpen(true);
                } else {
                  setAuthMode("signup");
                  setIsAuthOpen(true);
                }
              }}
              className="w-full sm:w-auto px-8 py-3.5 border-2 border-charcoal-250 hover:border-[#F97316] text-charcoal-800 hover:text-[#F97316] bg-white font-display font-bold rounded-full shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Plus className="w-4.5 h-4.5" />
              Create Event
            </button>
          </div>

          {/* INTERACTIVE COMPREHENSIVE SEARCH BOARD */}
          <div className="mt-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-charcoal-150 p-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-all duration-300">
            
            {/* Search Input */}
            <div className="md:col-span-5 flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-charcoal-100">
              <Search className="w-5 h-5 text-charcoal-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seminars, workshops, hackathons, conferences..."
                className="w-full bg-transparent border-0 focus:outline-hidden text-sm placeholder-charcoal-450 text-charcoal-900"
              />
            </div>

            {/* City Location Select */}
            <div className="md:col-span-3 flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-charcoal-100">
              <MapPin className="w-5 h-5 text-[#059669] shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent border-0 focus:outline-hidden text-sm text-charcoal-800 font-semibold cursor-pointer"
              >
                <option value="All Africa">All Africa (All Cities)</option>
                <option value="Kigali">Kigali, Rwanda</option>
                <option value="Lagos">Lagos, Nigeria</option>
                <option value="Nairobi">Nairobi, Kenya</option>
                <option value="Accra">Accra, Ghana</option>
                <option value="Cape Town">Cape Town, South Africa</option>
                <option value="Johannesburg">Johannesburg, South Africa</option>
              </select>
            </div>

            {/* Date Picker */}
            <div className="md:col-span-4 flex items-center gap-2.5 px-3 py-2 justify-between">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <Calendar className="w-5 h-5 text-[#E5A93B] shrink-0" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-hidden text-xs text-charcoal-700 cursor-pointer"
                />
              </div>

              {/* Clear button if any filter is set */}
              {(searchQuery || selectedCity !== "All Africa" || selectedCategory !== "All" || selectedDate) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCity("All Africa");
                    setSelectedCategory("All");
                    setSelectedDate("");
                  }}
                  className="text-[10px] font-mono uppercase bg-neutral-100 hover:bg-neutral-200 text-charcoal-600 px-2.5 py-1 rounded-md border border-charcoal-200 font-bold shrink-0 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* BROWSE CATEGORIES SECTION */}
      <section 
        className="py-16 bg-neutral-50/40 border-b border-charcoal-100 scroll-mt-20"
        id="categories-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#F97316] uppercase">CURATED EXPERIENCES</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-charcoal-900 mt-2">Event Categories</h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Filter the gatherings instantly based on your preferred sphere of learning, networking, or engagement.
            </p>
          </div>

          {/* Grid of rounded cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
            {CATEGORIES.map(category => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(isActive ? "All" : category);
                    const feed = document.getElementById("events-feed");
                    if (feed) feed.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-5 rounded-2xl border transition-all duration-200 text-center flex flex-col items-center justify-between gap-3 group cursor-pointer
                    ${isActive 
                      ? "bg-black border-black text-white shadow-md scale-[1.03]" 
                      : "bg-white border-charcoal-200 hover:border-[#F97316]/50 hover:shadow-md text-charcoal-800"}`}
                >
                  <div className={`p-3 rounded-full transition-colors
                    ${isActive ? 'bg-neutral-800' : 'bg-neutral-50 group-hover:bg-[#F97316]/10'}`}>
                    {getCategoryIcon(category)}
                  </div>
                  
                  <div>
                    <span className="font-display font-bold text-xs block leading-tight">{category}</span>
                    <span className={`text-[9px] font-mono mt-1 block
                      ${isActive ? 'text-orange-200' : 'text-charcoal-500'}`}>
                      {events.filter(e => e.category === category).length} active
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* FEATURED EVENTS GRID */}
      <section 
        className="py-16 sm:py-20 scroll-mt-20"
        id="events-feed"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title & filter indicators */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#F97316] rounded-full" />
                <span className="text-[10px] font-mono tracking-widest font-bold text-black uppercase">ACADEMIC EXCELLENCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-charcoal-900 mt-1">
                {selectedCategory === "All" ? "Featured Events" : `${selectedCategory}s`}
              </h2>
              <p className="text-xs text-charcoal-600 mt-1">
                Explore handpicked meetings, hackathons, and prestigious university conventions across major capitals.
              </p>
            </div>

            {/* Simple pills for Category toggle */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer
                  ${selectedCategory === "All" 
                    ? "bg-black text-white shadow-xs" 
                    : "bg-neutral-100 hover:bg-neutral-200 text-charcoal-700"}`}
              >
                All Events ({events.length})
              </button>
              {CATEGORIES.filter(cat => events.some(e => e.category === cat)).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer
                    ${selectedCategory === cat 
                      ? "bg-black text-white shadow-xs" 
                      : "bg-neutral-100 hover:bg-neutral-200 text-charcoal-700"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* EVENTS LIST GRID */}
          {filteredEvents.length === 0 ? (
            /* No Results State */
            <div className="bg-neutral-50 rounded-3xl p-12 text-center border border-charcoal-200 max-w-lg mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-charcoal-100 flex items-center justify-center text-charcoal-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal-950 text-base">No Gatherings Found</h3>
                <p className="text-xs text-charcoal-600 mt-1.5 leading-relaxed">
                  We couldn't find any events matching your current filter choices. Try resetting filters to explore all available university gatherings.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity("All Africa");
                  setSelectedCategory("All");
                  setSelectedDate("");
                }}
                className="px-5 py-2 text-xs font-bold bg-[#F97316] hover:bg-[#E5630F] text-white rounded-full transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Grid layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(evt => {
                const isReg = registeredEventIds.includes(evt.id);
                return (
                  <article 
                    key={evt.id}
                    className="bg-white rounded-3xl border border-charcoal-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 group"
                  >
                    {/* Event Banner Image Wrapper */}
                    <div className="relative h-52 overflow-hidden shrink-0">
                      <img 
                        src={evt.image} 
                        alt={evt.title} 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                      />
                      
                      {/* Price / RSVP Badge */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="text-[10px] font-mono tracking-wider font-bold bg-white text-charcoal-900 px-2.5 py-1 rounded-full shadow-xs uppercase border border-charcoal-150">
                          {evt.price}
                        </span>
                        {isReg && (
                          <span className="text-[10px] font-mono tracking-wider font-bold bg-[#059669] text-white px-2.5 py-1 rounded-full shadow-xs uppercase flex items-center gap-1">
                            ✓ Registered
                          </span>
                        )}
                      </div>

                      {/* Category Badge */}
                      <span className="absolute bottom-4 right-4 text-[9px] font-mono tracking-widest font-bold bg-black/85 backdrop-blur-3xs text-white px-2.5 py-1 rounded-full uppercase">
                        {evt.category}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        {/* Time & Date */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F97316] font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                          <span>{evt.date} • {evt.time}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-lg text-charcoal-900 group-hover:text-[#F97316] transition-colors leading-snug">
                          {evt.title}
                        </h3>

                        {/* University */}
                        <div className="flex items-center gap-1.5 text-xs text-charcoal-850 font-bold mt-1">
                          <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate" title={evt.university}>{evt.university}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-1.5 text-xs text-charcoal-500 font-sans mt-0.5">
                          <MapPin className="w-4 h-4 text-charcoal-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{evt.location}</span>
                        </div>
                      </div>

                      {/* Card Footer: Host avatar + Register Button */}
                      <div className="flex items-center justify-between border-t border-charcoal-100 pt-4 mt-2">
                        <div className="flex items-center gap-2">
                          <img 
                            src={evt.organizerAvatar} 
                            alt={evt.organizer} 
                            className="w-7 h-7 rounded-full object-cover border border-charcoal-150" 
                          />
                          <span className="text-[11px] text-charcoal-600 font-semibold truncate max-w-[100px]" title={evt.organizer}>
                            {evt.organizer}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedEventForDetail(evt)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border
                            ${isReg 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                              : "bg-black text-white border-black hover:bg-[#F97316] hover:border-[#F97316]"}`}
                        >
                          {isReg ? "View Ticket" : "Register"}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* NEW SECTION 3: POPULAR UNIVERSITIES */}
      <section 
        className="py-16 bg-neutral-50/40 border-y border-charcoal-100 scroll-mt-20"
        id="universities-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#F97316] uppercase">CENTRES OF LEARNING</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-charcoal-900 mt-2">Popular Universities</h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 leading-relaxed">
              Explore leading campuses and institutional hubs hosting high-impact workshops, conferences, and student forums.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {UNIVERSITIES.map(uni => (
              <div 
                key={uni.name}
                onClick={() => handleUniversityClick(uni.abbreviation)}
                className="bg-white rounded-3xl border border-charcoal-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group hover:-translate-y-0.5"
              >
                <div className="h-32 overflow-hidden relative">
                  <img 
                    src={uni.image} 
                    alt={uni.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${uni.bgPattern}`} />
                  <span className="absolute bottom-4 left-4 text-xs font-mono tracking-widest bg-black text-white px-3 py-1 rounded-full font-bold">
                    {uni.abbreviation}
                  </span>
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-charcoal-900 group-hover:text-[#F97316] transition-colors leading-snug">
                      {uni.name}
                    </h3>
                    <p className="text-xs text-charcoal-500 flex items-center gap-1 mt-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
                      {uni.location}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-charcoal-100 pt-3.5">
                    <span className="text-xs text-charcoal-600 font-medium">
                      <strong>{uni.eventsCount}</strong> Active Events
                    </span>
                    <span className="text-[#F97316] text-xs font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      View Guild <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION (Discover → Register → Attend → Network) */}
      <section 
        className="py-16 sm:py-20 bg-white border-b border-charcoal-100 scroll-mt-20"
        id="how-it-works-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#F97316] uppercase">SECURE VERIFIED PASSES</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-charcoal-900 mt-2">How Afro Event Works</h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 leading-relaxed">
              Afro Event is a modern, paperless platform bridging student developers, recruiters, and creative operators through seamless event administration.
            </p>
          </div>

          {/* Four clean cards: Discover -> Register -> Attend -> Network */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-2xs relative flex flex-col gap-4">
              <span className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#F97316] text-white flex items-center justify-center font-display font-black text-sm shadow-md">
                01
              </span>
              <div className="mt-2 shrink-0">
                <Search className="w-8 h-8 text-[#F97316]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal-900 text-sm">Discover</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed mt-2">
                  Browse curated university guest lectures, regional hackathons, career workshops, or student summits happening across active African cities.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-2xs relative flex flex-col gap-4">
              <span className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-display font-black text-sm shadow-md">
                02
              </span>
              <div className="mt-2 shrink-0">
                <Ticket className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal-900 text-sm">Register</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed mt-2">
                  Secure your pass in seconds. Our platform generates a custom digital ticket with an offline-compatible QR check-in code.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-2xs relative flex flex-col gap-4">
              <span className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-display font-black text-sm shadow-md">
                03
              </span>
              <div className="mt-2 shrink-0">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal-900 text-sm">Attend</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed mt-2">
                  Scan your QR code directly on your smartphone at the hall gates. Fast check-ins mean zero paper lists and zero long queues.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 border border-charcoal-200 shadow-2xs relative flex flex-col gap-4">
              <span className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-display font-black text-sm shadow-md">
                04
              </span>
              <div className="mt-2 shrink-0">
                <Sparkles className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal-900 text-sm">Network</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed mt-2">
                  Link with fellow student developers, research speakers, and hiring recruiters during structured networking hours after check-out.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* NEW SECTION 5: UPCOMING EVENTS CAROUSEL */}
      <section className="py-16 bg-neutral-50/40 border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 max-w-6xl mx-auto">
            <div>
              <span className="text-[10px] font-mono tracking-widest font-bold text-[#F97316] uppercase block mb-1">
                CHRONOLOGICAL FEEDS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-charcoal-900">
                Upcoming Events
              </h2>
              <p className="text-xs text-charcoal-600 mt-1">
                Swipe or slide to discover what is happening next across the continent's major universities.
              </p>
            </div>
            
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => scrollCarousel("left")}
                className="w-10 h-10 rounded-full border border-charcoal-250 hover:bg-neutral-100 flex items-center justify-center text-charcoal-800 hover:text-[#F97316] transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollCarousel("right")}
                className="w-10 h-10 rounded-full border border-charcoal-250 hover:bg-neutral-100 flex items-center justify-center text-charcoal-800 hover:text-[#F97316] transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-1 max-w-6xl mx-auto"
          >
            {events.map(evt => {
              const isReg = registeredEventIds.includes(evt.id);
              return (
                <div 
                  key={`carousel-${evt.id}`}
                  className="w-[290px] sm:w-[350px] shrink-0 snap-start bg-white rounded-3xl border border-charcoal-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 text-[9px] font-mono tracking-widest font-bold bg-white text-black px-2.5 py-1 rounded-full uppercase border border-charcoal-150">
                      {evt.price}
                    </span>
                    <span className="absolute bottom-3 right-3 text-[9px] font-mono tracking-widest font-bold bg-black/80 text-white px-2.5 py-1 rounded-full uppercase">
                      {evt.category}
                    </span>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-mono text-[#F97316] font-bold">
                        {evt.date}
                      </div>
                      <h3 className="font-display font-bold text-sm text-charcoal-900 mt-1 line-clamp-1">
                        {evt.title}
                      </h3>
                      <p className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {evt.university}
                      </p>
                    </div>
                    
                    <div className="border-t border-charcoal-100 pt-3 flex items-center justify-between">
                      <span className="text-[11px] text-charcoal-500 font-medium">
                        RSVPs: <strong>{evt.rsvpCount}</strong>
                      </span>
                      <button
                        onClick={() => setSelectedEventForDetail(evt)}
                        className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        Register <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* NEW SECTION 6: COMMUNITY TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#F97316] uppercase">GENUINE ENGAGEMENT</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-charcoal-900 mt-2">Student & Organizer Feedback</h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 leading-relaxed">
              Discover how campus builders and ambitious students discuss their experiences navigating Afro Event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map(t => (
              <div 
                key={t.name}
                className="bg-neutral-50/70 border border-charcoal-200 rounded-3xl p-6 flex flex-col justify-between gap-6"
              >
                <p className="text-xs text-charcoal-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-charcoal-200" />
                  <div>
                    <h4 className="font-display font-bold text-charcoal-900 text-xs">
                      {t.name}
                    </h4>
                    <span className="text-[10px] text-[#F97316] font-bold block">{t.role}</span>
                    <span className="text-[9px] text-charcoal-400 block font-mono font-semibold">{t.school}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* NEW SECTION 7: FAQ SECTION Accordion */}
      <section className="py-16 bg-neutral-50/40 border-t border-charcoal-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#F97316] uppercase">COMMON QUERY CENTER</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-charcoal-900 mt-2">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 leading-relaxed">
              Have questions about registration, QR passes, or hosting academic summits? Find answers instantly.
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {FAQS.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-charcoal-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 focus:outline-hidden cursor-pointer hover:bg-neutral-50/50"
                  >
                    <span className="font-display font-bold text-xs sm:text-sm text-charcoal-950 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#F97316] shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-charcoal-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-charcoal-600 leading-relaxed border-t border-neutral-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-neutral-50/70 border border-charcoal-200 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xs">
            <div className="max-w-2xl mx-auto text-center relative z-10">
              <span className="text-[10px] font-mono tracking-widest font-bold text-[#F97316] uppercase block mb-3">
                weekly digest
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-charcoal-900 leading-tight">
                Get Weekly Gatherings in Your Inbox
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-3 leading-relaxed">
                Subscribe to our weekly university dispatch for academic seminars, hackathons, job fairs, and campus competitions happening across Africa.
              </p>

              {showNewsSuccess ? (
                <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-left max-w-md mx-auto animate-in zoom-in-95">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-emerald-950 text-xs">Subscribed Successfully!</h4>
                    <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                      Welcome to the Afro Event family! We have sent a confirmation message to <strong className="font-semibold">{subscribedEmail}</strong>.
                    </p>
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!subscribedEmail.trim()) return;
                    setShowNewsSuccess(true);
                  }}
                  className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
                >
                  <div className="relative w-full">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-charcoal-400" />
                    <input
                      type="email"
                      required
                      value={subscribedEmail}
                      onChange={(e) => setSubscribedEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full bg-white border border-charcoal-200 rounded-full py-3.5 pl-11 pr-4 text-xs focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] shadow-2xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    Subscribe Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              <p className="text-[10px] text-charcoal-400 mt-4 font-medium flex items-center justify-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                Zero spam. Unsubscribe at any time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PROFESSIONAL FOOTER with complete required links & Social channels */}
      <footer className="bg-neutral-900 text-white pt-16 pb-12 relative z-10 border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-charcoal-850">
            {/* Logo column */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <AfroEventLogo variant="dark" hideTagline={false} scale={0.9} />
              <p className="text-xs text-charcoal-400 leading-relaxed mt-4 max-w-sm">
                Afro Event is a premium, paperless university gathering portal engineered to link student researchers, developers, designers, and career recruiters across Africa's major educational hubs.
              </p>
              <div className="text-xs text-charcoal-400 font-medium">
                <strong>Contact:</strong> support@afroevent.org <br />
                <strong>Address:</strong> Kigali Innovation City, Rwanda
              </div>
            </div>

            {/* Quick links columns */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-charcoal-350">Popular Cities</h4>
                <ul className="flex flex-col gap-2.5 text-xs text-charcoal-400">
                  <li><button onClick={() => { setSelectedCity("Kigali"); }} className="hover:text-white transition-colors cursor-pointer">Kigali, Rwanda</button></li>
                  <li><button onClick={() => { setSelectedCity("Lagos"); }} className="hover:text-white transition-colors cursor-pointer">Lagos, Nigeria</button></li>
                  <li><button onClick={() => { setSelectedCity("Nairobi"); }} className="hover:text-white transition-colors cursor-pointer">Nairobi, Kenya</button></li>
                  <li><button onClick={() => { setSelectedCity("Accra"); }} className="hover:text-white transition-colors cursor-pointer">Accra, Ghana</button></li>
                  <li><button onClick={() => { setSelectedCity("Cape Town"); }} className="hover:text-white transition-colors cursor-pointer">Cape Town, South Africa</button></li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-charcoal-350">Platform</h4>
                <ul className="flex flex-col gap-2.5 text-xs text-charcoal-400">
                  <li><button onClick={() => { const feed = document.getElementById("events-feed"); if (feed) feed.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer">Explore Events</button></li>
                  <li><button onClick={() => { if (user) { setIsCreateOpen(true); } else { setAuthMode("signup"); setIsAuthOpen(true); } }} className="hover:text-white transition-colors cursor-pointer">Host an Event</button></li>
                  <li><button onClick={() => { const works = document.getElementById("how-it-works-section"); if (works) works.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer">How It Works</button></li>
                  <li><button onClick={() => { const unis = document.getElementById("universities-section"); if (unis) unis.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer">Popular Universities</button></li>
                </ul>
              </div>

              <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-charcoal-350">Social Channels</h4>
                <div className="flex gap-2.5 mt-1">
                  {/* Facebook */}
                  <a href="#" className="p-2.5 rounded-full bg-charcoal-800 text-charcoal-300 hover:text-white transition-colors" title="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  {/* LinkedIn */}
                  <a href="#" className="p-2.5 rounded-full bg-charcoal-800 text-charcoal-300 hover:text-white transition-colors" title="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  {/* Telegram */}
                  <a href="#" className="p-2.5 rounded-full bg-charcoal-800 text-charcoal-300 hover:text-white transition-colors" title="Telegram">
                    <Send className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-[10px] text-charcoal-400 leading-relaxed font-medium">
                  Join our official Telegram community of student developers and designers.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright and compliance row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 font-medium">
            <p>© 2026 Afro Event Inc. All rights reserved. Designed with modern Pan-African integrity.</p>
            <div className="flex gap-5 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">About Us</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>

        </div>
      </footer>

      {/* DYNAMIC COMPONENT MODALS */}
      
      {/* 1. Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 2. Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddEvent={handleAddEvent}
        userName={user?.name || ""}
      />

      {/* 3. Event Details Modal */}
      <EventDetailModal
        isOpen={selectedEventForDetail !== null}
        onClose={() => setSelectedEventForDetail(null)}
        event={selectedEventForDetail}
        onRegisterSuccess={handleRegisterEvent}
        isAlreadyRegistered={selectedEventForDetail ? registeredEventIds.includes(selectedEventForDetail.id) : false}
        userName={user?.name}
        userEmail={user?.email}
        allEvents={events}
        savedEventIds={savedEventIds}
        onToggleSave={(id) => {
          if (savedEventIds.includes(id)) {
            setSavedEventIds(prev => prev.filter(x => x !== id));
          } else {
            setSavedEventIds(prev => [...prev, id]);
          }
        }}
        onSelectEvent={(evt) => setSelectedEventForDetail(evt)}
      />

    </div>
  );
}
