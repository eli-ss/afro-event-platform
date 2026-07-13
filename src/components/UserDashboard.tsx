/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  LayoutDashboard, Compass, CalendarRange, Heart, Ticket, Bell, MessageSquare, 
  User, Settings, LogOut, Search, Plus, Calendar, MapPin, ChevronRight, 
  Sparkles, CheckCircle2, ArrowRight, Menu, X, Trash2, Edit3, Send, Shield, 
  Globe, Laptop, FileText, Check, AlertCircle, Eye, EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Event } from "./mockEvents";
import AfroEventLogo from "./AfroEventLogo";
import { MyTicketsDashboard, TicketDetailsView, TicketRegistration } from "./RegistrationTicketFlow";

interface UserDashboardProps {
  user: any;
  setUser: (userData: any) => void;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  registeredEventIds: string[];
  setRegisteredEventIds: React.Dispatch<React.SetStateAction<string[]>>;
  savedEventIds: string[];
  setSavedEventIds: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigateToHome: () => void;
  onCreateEventClick: () => void;
  onViewEventDetail: (event: Event) => void;
}

type TabType = 
  | "dashboard" 
  | "explore" 
  | "my-events" 
  | "saved" 
  | "tickets" 
  | "notifications" 
  | "messages" 
  | "profile" 
  | "settings";

export default function UserDashboard({
  user,
  setUser,
  events,
  setEvents,
  registeredEventIds,
  setRegisteredEventIds,
  savedEventIds,
  setSavedEventIds,
  onNavigateToHome,
  onCreateEventClick,
  onViewEventDetail
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = React.useState<TabType>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTicket, setSelectedTicket] = React.useState<TicketRegistration | null>(null);

  // Edit Profile States
  const [profileForm, setProfileForm] = React.useState({
    name: user?.name || "Eleni S.",
    email: user?.email || "eleniss3984@gmail.com",
    phone: user?.phone || "+250 788 123 456",
    university: user?.university || "African Leadership University (ALU)",
    bio: user?.bio || "Computer Science senior passionate about AI localization, open-source technology, and building developer communities across East Africa.",
    country: user?.country || "Rwanda",
    city: user?.city || "Kigali",
    skills: user?.skills || ["React", "TypeScript", "AI Research", "Community Organizing", "Python"]
  });
  const [newSkill, setNewSkill] = React.useState("");
  const [profileSuccessMsg, setProfileSuccessMsg] = React.useState("");

  // Settings States
  const [settingsForm, setSettingsForm] = React.useState({
    emailNotif: true,
    smsNotif: false,
    academicReminders: true,
    publicProfile: true,
    appearance: "light-sunset",
    language: "English",
    twoFactor: false
  });
  const [settingsSuccessMsg, setSettingsSuccessMsg] = React.useState("");

  // Messages States
  const [selectedChat, setSelectedChat] = React.useState("alu-dev");
  const [messageInput, setMessageInput] = React.useState("");
  const [chats, setChats] = React.useState<Record<string, { sender: string; avatar: string; unread: boolean; online: boolean; messages: { text: string; time: string; isUser: boolean }[] }>>({
    "alu-dev": {
      sender: "ALU Dev Student Club",
      avatar: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=100&q=80",
      unread: true,
      online: true,
      messages: [
        { text: "Hello Eleni, are you attending the AI Localization seminar tomorrow?", time: "10:15 AM", isUser: false },
        { text: "Yes, definitely! I already registered on Afro Event.", time: "10:18 AM", isUser: true },
        { text: "Awesome! Could you help us co-host the Q&A segment during the research panel?", time: "10:20 AM", isUser: false }
      ]
    },
    "unilag-career": {
      sender: "UNILAG Placement Office",
      avatar: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=100&q=80",
      unread: false,
      online: false,
      messages: [
        { text: "Hi Eleni, thank you for submitting your research interest summary.", time: "Yesterday", isUser: false },
        { text: "Your credentials have been matched with top recruiters at the upcoming Career Fair.", time: "Yesterday", isUser: false }
      ]
    },
    "david-keita": {
      sender: "David Keita (ALU)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      unread: false,
      online: true,
      messages: [
        { text: "Hey! We need to finalize the presentation slides for the hackathon prototype check.", time: "2 days ago", isUser: false },
        { text: "Sure, let's meet at the innovation hub around 4 PM.", time: "2 days ago", isUser: true }
      ]
    }
  });

  // Recent notifications state
  const [notifications, setNotifications] = React.useState([
    { id: "notif-1", title: "New Event in ALU", desc: "AI Localization seminar uploaded. Register now to secure your seat.", time: "2 hours ago", read: false },
    { id: "notif-2", title: "Registration Successful", desc: "Your Gye Nyame digital pass for Mobile Web Workshop is active.", time: "1 day ago", read: false },
    { id: "notif-3", title: "Speaker confirmed", desc: "Dr. Chioma Okere is confirmed as keynote speaker for AI Panel.", time: "3 days ago", read: true }
  ]);

  // Handle messages sending
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    setChats(prev => {
      const currentChat = prev[selectedChat];
      return {
        ...prev,
        [selectedChat]: {
          ...currentChat,
          messages: [
            ...currentChat.messages,
            { text: messageInput, time: "Just now", isUser: true }
          ]
        }
      };
    });

    setMessageInput("");

    // Simple reply simulation
    const chatKey = selectedChat;
    setTimeout(() => {
      setChats(prev => {
        const currentChat = prev[chatKey];
        if (!currentChat) return prev;
        return {
          ...prev,
          [chatKey]: {
            ...currentChat,
            messages: [
              ...currentChat.messages,
              { text: "Thank you for the update! Let's build something beautiful together.", time: "Just now", isUser: false }
            ]
          }
        };
      });
    }, 1500);
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Remove a notification
  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Handle profile edit save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      university: profileForm.university,
      bio: profileForm.bio,
      country: profileForm.country,
      city: profileForm.city,
      skills: profileForm.skills
    });
    setProfileSuccessMsg("Academic profile saved successfully!");
    setTimeout(() => setProfileSuccessMsg(""), 3000);
  };

  // Handle add skill
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (profileForm.skills.includes(newSkill.trim())) {
      setNewSkill("");
      return;
    }
    setProfileForm(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }));
    setNewSkill("");
  };

  // Handle remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Handle settings save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccessMsg("Preferences saved successfully!");
    setTimeout(() => setSettingsSuccessMsg(""), 3000);
  };

  // User actions
  const handleLogout = () => {
    setUser(null);
    onNavigateToHome();
  };

  // Toggle saving an event
  const handleToggleSaveEvent = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedEventIds.includes(eventId)) {
      setSavedEventIds(prev => prev.filter(id => id !== eventId));
    } else {
      setSavedEventIds(prev => [...prev, eventId]);
    }
  };

  // Toggle registered status (refund ticket/cancel RSVP)
  const handleCancelRSVP = (eventId: string) => {
    if (window.confirm("Are you sure you want to cancel this ticket registration?")) {
      setRegisteredEventIds(prev => prev.filter(id => id !== eventId));
      setEvents(prev => prev.map(evt => {
        if (evt.id === eventId) {
          return { ...evt, rsvpCount: Math.max(0, evt.rsvpCount - 1) };
        }
        return evt;
      }));
    }
  };

  // Get matching lists
  const myRegisteredEvents = events.filter(e => registeredEventIds.includes(e.id));
  const mySavedEvents = events.filter(e => savedEventIds.includes(e.id));
  const myCreatedEvents = events.filter(e => e.organizer === user?.name || e.organizer === "Anonymous Host");

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Calendar dates for mock calendar
  const currentMonth = "OCTOBER 2026";
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const eventDays = [15, 21, 28]; // Mock days with events

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-charcoal-900 font-sans flex relative overflow-hidden">
      
      {/* Background ambient warm vector glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#F97316]/5 blur-[120px] z-0" />
      <div className="pointer-events-none absolute -bottom-45 right-1/4 w-[500px] h-[500px] rounded-full bg-[#059669]/4 blur-[150px] z-0" />

      {/* --- SIDEBAR FOR DESKTOP --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-charcoal-150 h-screen sticky top-0 z-30 shrink-0">
        <div className="p-6 border-b border-charcoal-100 flex items-center justify-between">
          <AfroEventLogo variant="default" hideTagline={true} scale={0.8} />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
          <span className="text-[10px] font-mono font-bold tracking-widest text-charcoal-400 uppercase px-3 mb-2 block">Main Portal</span>
          
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "dashboard" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            Dashboard
          </button>

          <button
            onClick={onNavigateToHome}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Compass className="w-4.5 h-4.5" />
              Explore Events
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("my-events")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "my-events" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
          >
            <div className="flex items-center gap-3">
              <CalendarRange className="w-4.5 h-4.5" />
              Hosted Events
            </div>
            {myCreatedEvents.length > 0 && (
              <span className="bg-charcoal-100 text-charcoal-700 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold">{myCreatedEvents.length}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "saved" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4.5 h-4.5" />
              Saved Events
            </div>
            {mySavedEvents.length > 0 && (
              <span className="bg-[#F97316]/15 text-[#C04E22] font-mono text-[10px] px-2 py-0.5 rounded-md font-bold">{savedEventIds.length}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("tickets")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "tickets" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-4.5 h-4.5" />
              My Tickets
            </div>
            {registeredEventIds.length > 0 && (
              <span className="bg-[#059669]/10 text-[#059669] font-mono text-[10px] px-2 py-0.5 rounded-md font-bold">{registeredEventIds.length}</span>
            )}
          </button>

          <span className="text-[10px] font-mono font-bold tracking-widest text-charcoal-400 uppercase px-3 mt-6 mb-2 block">Updates & Socials</span>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "notifications" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4.5 h-4.5" />
              Notifications
            </div>
            {unreadNotifCount > 0 && (
              <span className="bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">{unreadNotifCount}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "messages" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4.5 h-4.5" />
              Messages
            </div>
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "profile" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
          >
            <User className="w-4.5 h-4.5" />
            My Profile
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "settings" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
          >
            <Settings className="w-4.5 h-4.5" />
            Settings
          </button>
        </nav>

        {/* Sidebar Footer User detail card */}
        <div className="p-4 border-t border-charcoal-100 bg-neutral-50/50">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
              alt={profileForm.name} 
              className="w-9 h-9 rounded-full object-cover border border-charcoal-250 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-charcoal-900 truncate">{profileForm.name}</p>
              <p className="text-[10px] font-medium text-charcoal-500 truncate" title={profileForm.university}>{profileForm.university.split(" (")[0]}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* --- MAIN PAGE AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        
        {/* TOP NAVIGATION BAR */}
        <header className="bg-white border-b border-charcoal-150 h-16 sm:h-20 flex items-center px-4 sm:px-8 justify-between sticky top-0 z-20">
          
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-xl cursor-pointer text-charcoal-700"
              id="btn-sidebar-toggle"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Input widget */}
            <div className="hidden sm:flex items-center gap-2.5 bg-neutral-50 border border-charcoal-200 py-2 px-4 rounded-full w-80 max-w-md focus-within:ring-1 focus-within:ring-[#F97316] focus-within:border-[#F97316] transition-all">
              <Search className="w-4 h-4 text-charcoal-450" />
              <input 
                type="text" 
                placeholder="Search dashboard events, tickets, messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 text-xs focus:outline-hidden placeholder-charcoal-400 text-charcoal-800 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Quick Host/Create button */}
            <button
              onClick={onCreateEventClick}
              className="px-4 py-2 sm:py-2.5 bg-[#F97316] hover:bg-[#E5630F] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Host Event</span>
            </button>

            {/* Notification bell dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 text-charcoal-600 hover:text-[#F97316] hover:bg-neutral-50 rounded-full transition-colors cursor-pointer relative border border-charcoal-150 bg-white"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse border border-white" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-charcoal-100 py-3 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-charcoal-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-charcoal-900">Campus Alerts</span>
                        {unreadNotifCount > 0 && (
                          <button 
                            onClick={markAllNotificationsAsRead}
                            className="text-[10px] font-mono uppercase text-[#F97316] hover:underline font-bold"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto divide-y divide-neutral-50">
                        {notifications.length === 0 ? (
                          <p className="p-6 text-xs text-charcoal-500 text-center">No recent alerts.</p>
                        ) : (
                          notifications.map(n => (
                            <div key={n.id} className={`p-3.5 hover:bg-neutral-50 transition-colors flex gap-2.5 ${n.read ? 'opacity-70' : 'bg-[#F97316]/3'}`}>
                              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-charcoal-300' : 'bg-[#F97316]'}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-charcoal-850 truncate">{n.title}</p>
                                <p className="text-[11px] text-charcoal-600 mt-0.5 leading-snug">{n.desc}</p>
                                <span className="text-[9px] font-mono text-charcoal-400 mt-1 block">{n.time}</span>
                              </div>
                              <button 
                                onClick={() => handleRemoveNotification(n.id)}
                                className="text-charcoal-300 hover:text-red-500 p-1 shrink-0 self-center"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="border-t border-charcoal-100 pt-2 px-3 text-center">
                        <button 
                          onClick={() => { setActiveTab("notifications"); setIsNotificationsOpen(false); }}
                          className="text-xs text-charcoal-600 font-bold hover:text-[#F97316] hover:underline"
                        >
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Dropdown dropdown button */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full border border-charcoal-200 bg-white hover:bg-neutral-50 transition-colors cursor-pointer shrink-0"
              >
                <img 
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
                  alt={profileForm.name} 
                  className="w-8 h-8 rounded-full object-cover border border-charcoal-200"
                />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-charcoal-100 py-2.5 z-50"
                    >
                      <div className="px-4 py-2 border-b border-charcoal-100">
                        <span className="text-[9px] font-mono text-charcoal-400 block uppercase font-bold">ALU Campus Account</span>
                        <span className="font-bold text-charcoal-900 text-xs truncate block mt-0.5">{profileForm.name}</span>
                        <span className="text-[10px] text-charcoal-500 truncate block">{profileForm.email}</span>
                      </div>
                      
                      <button
                        onClick={() => { setActiveTab("profile"); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-charcoal-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-charcoal-400" /> My Profile
                      </button>

                      <button
                        onClick={() => { setActiveTab("settings"); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-charcoal-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-charcoal-400" /> Settings
                      </button>

                      <div className="border-t border-charcoal-100 my-1.5" />

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* --- PAGE PANEL WRAPPER --- */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto relative z-10">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >

              {/* =======================================================
                  1. TAB: DASHBOARD OVERVIEW 
                  ======================================================= */}
              {activeTab === "dashboard" && (
                <div className="flex flex-col gap-8">
                  
                  {/* Premium Welcome banner with African-inspired patterns */}
                  <div className="bg-charcoal-900/95 backdrop-blur-xs text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-white/10">
                    <div className="absolute inset-0 african-pattern-subtle opacity-5 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-mono tracking-widest font-bold bg-[#F97316] text-white px-3 py-1 rounded-full w-fit flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3 fill-current animate-pulse text-white" />
                          ALU CAMPUS SENIOR INTEGRATION
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
                          Welcome back, {profileForm.name.split(" ")[0]} 👋
                        </h2>
                        <p className="text-charcoal-300 text-xs sm:text-sm max-w-xl">
                          You have <strong className="font-semibold text-[#F97316]">{myRegisteredEvents.length} active event passes</strong>. Tap any Gye Nyame digital pass to verify gate credentials.
                        </p>
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          onClick={() => setActiveTab("tickets")}
                          className="px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/20 text-white text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Ticket className="w-4 h-4 text-white" />
                          View Passes
                        </button>
                        <button
                          onClick={onCreateEventClick}
                          className="px-5 py-3 bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          Quick Create
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick summary analytics cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* card 1 */}
                    <div className="bg-white rounded-2xl border border-charcoal-200 p-4 flex items-center gap-3.5 shadow-2xs hover:shadow-md transition-shadow">
                      <div className="p-3 rounded-xl bg-[#F97316]/8 text-[#F97316] shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-charcoal-400 block uppercase font-bold">Upcoming</span>
                        <span className="text-lg font-display font-black text-charcoal-900 block mt-0.5">2 Events</span>
                      </div>
                    </div>

                    {/* card 2 */}
                    <div className="bg-white rounded-2xl border border-charcoal-200 p-4 flex items-center gap-3.5 shadow-2xs hover:shadow-md transition-shadow">
                      <div className="p-3 rounded-xl bg-[#059669]/8 text-[#059669] shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-charcoal-400 block uppercase font-bold">Registered</span>
                        <span className="text-lg font-display font-black text-charcoal-900 block mt-0.5">{registeredEventIds.length} Passes</span>
                      </div>
                    </div>

                    {/* card 3 */}
                    <div className="bg-white rounded-2xl border border-charcoal-200 p-4 flex items-center gap-3.5 shadow-2xs hover:shadow-md transition-shadow">
                      <div className="p-3 rounded-xl bg-red-50 text-red-500 shrink-0">
                        <Heart className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-charcoal-400 block uppercase font-bold">Saved</span>
                        <span className="text-lg font-display font-black text-charcoal-900 block mt-0.5">{savedEventIds.length} Favorites</span>
                      </div>
                    </div>

                    {/* card 4 */}
                    <div className="bg-white rounded-2xl border border-charcoal-200 p-4 flex items-center gap-3.5 shadow-2xs hover:shadow-md transition-shadow">
                      <div className="p-3 rounded-xl bg-violet-50 text-violet-600 shrink-0">
                        <LayoutDashboard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-charcoal-400 block uppercase font-bold">Hosted</span>
                        <span className="text-lg font-display font-black text-charcoal-900 block mt-0.5">{myCreatedEvents.length} Seminars</span>
                      </div>
                    </div>

                  </div>

                  {/* Main content grid split (8cols - 4cols) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT MAIN PANEL (8 Cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                      
                      {/* Upcoming / Recommended Section */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-display font-black text-charcoal-900 text-sm flex items-center gap-2">
                            <span className="w-1 h-4.5 bg-[#F97316] rounded-full" />
                            Recommended for You
                          </h3>
                          <button 
                            onClick={onNavigateToHome}
                            className="text-[11px] font-mono text-[#F97316] hover:underline font-bold uppercase flex items-center gap-0.5 cursor-pointer"
                          >
                            Explore all <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* List of recommended events based on student's university */}
                        <div className="flex flex-col gap-4">
                          {events.slice(0, 3).map(evt => {
                            const isSaved = savedEventIds.includes(evt.id);
                            const isReg = registeredEventIds.includes(evt.id);
                            return (
                              <div 
                                key={`rec-${evt.id}`}
                                onClick={() => onViewEventDetail(evt)}
                                className="bg-white rounded-2xl border border-charcoal-200 p-4 flex gap-4 hover:border-[#F97316]/45 hover:shadow-md transition-all cursor-pointer group relative"
                              >
                                <img 
                                  src={evt.image} 
                                  alt={evt.title} 
                                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-charcoal-150"
                                />
                                <div className="min-w-0 flex-1 flex flex-col justify-between gap-1">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[8px] font-mono tracking-widest font-bold text-[#F97316] bg-[#F97316]/8 px-2 py-0.5 rounded-full uppercase">
                                        {evt.category}
                                      </span>
                                      <span className="text-[10px] font-mono text-charcoal-400 font-bold">{evt.date.split(", ")[1]}</span>
                                    </div>
                                    <h4 className="font-display font-bold text-xs sm:text-sm text-charcoal-900 group-hover:text-[#F97316] transition-colors leading-snug mt-1 truncate">
                                      {evt.title}
                                    </h4>
                                    <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-0.5 mt-0.5 truncate">
                                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                                      {evt.university}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col items-end justify-between shrink-0 pl-2">
                                  <button
                                    onClick={(e) => handleToggleSaveEvent(evt.id, e)}
                                    className={`p-1.5 rounded-full border transition-all cursor-pointer ${isSaved ? "bg-red-50 border-red-200 text-red-500" : "bg-neutral-50 border-charcoal-200 text-charcoal-400 hover:text-red-500 hover:bg-red-50/50"}`}
                                  >
                                    <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                                  </button>
                                  <span className="text-[11px] font-bold text-charcoal-700 bg-neutral-100 py-1 px-2.5 rounded-full border border-charcoal-200">
                                    {isReg ? "✓ Attending" : "Free"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recent Academic activity logs */}
                      <div>
                        <h3 className="font-display font-black text-charcoal-900 text-sm flex items-center gap-2 mb-4">
                          <span className="w-1 h-4.5 bg-[#059669] rounded-full" />
                          Recent Portal Activity
                        </h3>
                        
                        <div className="bg-white rounded-2xl border border-charcoal-150 p-4 divide-y divide-neutral-100 flex flex-col">
                          <div className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                              <div>
                                <p className="text-xs font-bold text-charcoal-800">Registered for AI Localization Seminar</p>
                                <p className="text-[10px] text-charcoal-500 mt-0.5">Checked-in pass is active and Gye Nyame watermarked.</p>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono text-charcoal-400 font-bold uppercase">Today</span>
                          </div>

                          <div className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                              <div>
                                <p className="text-xs font-bold text-charcoal-800">Saved Kenyatta Uni GreenTech Hackathon</p>
                                <p className="text-[10px] text-charcoal-500 mt-0.5">Added to favorites catalog for quick RSVPs later.</p>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono text-charcoal-400 font-bold uppercase">Yesterday</span>
                          </div>

                          <div className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                              <div>
                                <p className="text-xs font-bold text-charcoal-800">Joined official ALU Campus Representatives</p>
                                <p className="text-[10px] text-charcoal-500 mt-0.5">Enabled academic collaboration dispatcher.</p>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono text-charcoal-400 font-bold uppercase">3 days ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Portal Actions */}
                      <div className="bg-gradient-to-br from-[#2B1E16] to-charcoal-900 text-white rounded-3xl p-6 relative overflow-hidden border border-charcoal-800">
                        <div className="absolute inset-0 african-pattern-subtle opacity-5 pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <h4 className="font-display font-black text-white text-base">Student Collaboration Station</h4>
                            <p className="text-xs text-charcoal-350 leading-relaxed mt-1 max-w-md">
                              Host a hackathon, run a regional research seminar, or draft a guest workshop. Your student group verified pass handles all paperless check-ins!
                            </p>
                          </div>
                          <button
                            onClick={onCreateEventClick}
                            className="px-6 py-3 bg-white text-charcoal-900 hover:bg-[#F97316] hover:text-white rounded-full text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
                          >
                            Host an Event
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT COLUMN SIDEBAR (4 Cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                      
                      {/* Interactive Calendar Widget */}
                      <div className="bg-white rounded-2xl border border-charcoal-200 p-4">
                        <div className="flex items-center justify-between border-b border-charcoal-100 pb-3 mb-4">
                          <h4 className="text-xs font-black font-display text-charcoal-900 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[#F97316]" />
                            {currentMonth}
                          </h4>
                          <span className="text-[10px] font-mono text-charcoal-400 font-bold uppercase">Kigali CAT</span>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-charcoal-400 font-mono mb-2">
                          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1.5">
                          {/* Shift October 1st to begin on Thursday (4 empty cells first) */}
                          <span className="text-neutral-200 h-6 flex items-center justify-center font-mono">27</span>
                          <span className="text-neutral-200 h-6 flex items-center justify-center font-mono">28</span>
                          <span className="text-neutral-200 h-6 flex items-center justify-center font-mono">29</span>
                          <span className="text-neutral-200 h-6 flex items-center justify-center font-mono">30</span>
                          
                          {daysInMonth.map(d => {
                            const hasEvt = eventDays.includes(d);
                            return (
                              <span 
                                key={`cal-${d}`} 
                                className={`h-6 text-xs font-mono font-bold rounded-md flex items-center justify-center relative cursor-pointer
                                  ${hasEvt ? "bg-[#F97316]/15 text-[#C04E22] border border-[#F97316]/30 font-black scale-105" : "text-charcoal-800 hover:bg-neutral-50"}`}
                                title={hasEvt ? "Academic event scheduled" : ""}
                              >
                                {d}
                                {hasEvt && (
                                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#C04E22]" />
                                )}
                              </span>
                            );
                          })}
                        </div>
                        
                        {/* Selected event hints */}
                        <div className="mt-4 pt-3.5 border-t border-charcoal-100 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-[10px] font-medium text-charcoal-650">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                            <span>15th Oct: AI Seminar (ALU)</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-medium text-charcoal-650">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <span>21st Nov: Mobile Web (UG)</span>
                          </div>
                        </div>
                      </div>

                      {/* Recent Student alerts board */}
                      <div className="bg-white rounded-2xl border border-charcoal-200 p-4">
                        <div className="flex items-center justify-between border-b border-charcoal-100 pb-3 mb-4">
                          <h4 className="text-xs font-black font-display text-charcoal-900 flex items-center gap-1.5">
                            <Bell className="w-4 h-4 text-[#059669]" />
                            Recent Alerts
                          </h4>
                          <span className="bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">New</span>
                        </div>

                        <div className="flex flex-col gap-3.5">
                          {notifications.slice(0, 2).map(n => (
                            <div key={`side-notif-${n.id}`} className="text-xs">
                              <span className="font-bold text-charcoal-850 block">{n.title}</span>
                              <span className="text-charcoal-550 block text-[11px] leading-relaxed mt-0.5">{n.desc}</span>
                              <span className="text-[9px] font-mono text-charcoal-400 block mt-1">{n.time}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setActiveTab("notifications")}
                          className="w-full text-center py-2 bg-neutral-50 hover:bg-neutral-100 border border-charcoal-200 rounded-xl text-[10px] font-mono font-bold uppercase text-charcoal-700 mt-4 transition-all cursor-pointer"
                        >
                          Show all alerts ({notifications.length})
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* =======================================================
                  2. TAB: MY HOSTED EVENTS
                  ======================================================= */}
              {activeTab === "my-events" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-5">
                    <div>
                      <h2 className="text-2xl font-display font-black text-charcoal-900">Hosted University Events</h2>
                      <p className="text-xs text-charcoal-650 mt-1">
                        Review, monitor, and configure the academic summits or student workshops you have set up.
                      </p>
                    </div>
                    <button
                      onClick={onCreateEventClick}
                      className="px-5 py-2.5 bg-black hover:bg-[#F97316] text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                    >
                      <Plus className="w-4.5 h-4.5" />
                      Host Another Event
                    </button>
                  </div>

                  {myCreatedEvents.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-charcoal-200 p-12 text-center max-w-lg mx-auto flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-charcoal-100 flex items-center justify-center text-charcoal-500">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-charcoal-950 text-base">No Hosted Events Yet</h4>
                        <p className="text-xs text-charcoal-600 mt-1.5 leading-relaxed">
                          Your account doesn't have any hosted campus seminars or student developer competitions. Click 'Host Event' to set up a brand new portal in seconds!
                        </p>
                      </div>
                      <button
                        onClick={onCreateEventClick}
                        className="px-5 py-2.5 bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
                      >
                        Host Event Now
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myCreatedEvents.map(evt => (
                        <div 
                          key={`hosted-${evt.id}`}
                          onClick={() => onViewEventDetail(evt)}
                          className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="h-40 overflow-hidden relative">
                            <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                            <span className="absolute top-3 left-3 text-[9px] font-mono font-bold bg-white px-2 py-0.5 rounded-full uppercase border border-charcoal-150">
                              {evt.category}
                            </span>
                            <span className="absolute bottom-3 right-3 text-[9px] font-mono font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full uppercase">
                              Active State
                            </span>
                          </div>
                          <div className="p-5 flex flex-col justify-between gap-4">
                            <div>
                              <span className="text-[10px] font-mono text-[#F97316] font-bold block">{evt.date}</span>
                              <h3 className="font-display font-bold text-sm text-charcoal-900 group-hover:text-[#F97316] transition-colors mt-1 line-clamp-1">
                                {evt.title}
                              </h3>
                              <p className="text-xs text-charcoal-500 mt-1 truncate">{evt.university}</p>
                            </div>
                            <div className="border-t border-charcoal-100 pt-3 flex items-center justify-between text-xs text-charcoal-600">
                              <span>Registered: <strong>{evt.rsvpCount} / {evt.capacity}</strong></span>
                              <span className="text-[#F97316] font-bold hover:underline">Monitor RSVP</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* =======================================================
                  3. TAB: SAVED EVENTS
                  ======================================================= */}
              {activeTab === "saved" && (
                <div className="flex flex-col gap-6">
                  <div className="border-b border-charcoal-200 pb-5">
                    <h2 className="text-2xl font-display font-black text-charcoal-900">Saved Campus Gatherings</h2>
                    <p className="text-xs text-charcoal-650 mt-1">
                      Explore the list of academic forums and competitions you saved to attend or monitor.
                    </p>
                  </div>

                  {mySavedEvents.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-charcoal-200 p-12 text-center max-w-lg mx-auto flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-charcoal-100 flex items-center justify-center text-charcoal-500">
                        <Heart className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-charcoal-950 text-base">No Saved Events</h4>
                        <p className="text-xs text-charcoal-600 mt-1.5 leading-relaxed">
                          Your favorites archive is currently empty. Tap the heart button on any university seminar card in the explorer to save it here!
                        </p>
                      </div>
                      <button
                        onClick={onNavigateToHome}
                        className="px-5 py-2.5 bg-black hover:bg-[#F97316] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
                      >
                        Browse Campus Events
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mySavedEvents.map(evt => (
                        <div 
                          key={`saved-${evt.id}`}
                          onClick={() => onViewEventDetail(evt)}
                          className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
                        >
                          <div className="h-40 overflow-hidden relative">
                            <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                            <span className="absolute top-3 left-3 text-[9px] font-mono font-bold bg-white px-2 py-0.5 rounded-full uppercase border border-charcoal-150">
                              {evt.price}
                            </span>
                            <button
                              onClick={(e) => handleToggleSaveEvent(evt.id, e)}
                              className="absolute top-3 right-3 p-1.5 rounded-full bg-white border border-red-200 text-red-500 hover:scale-105 transition-all shadow-xs cursor-pointer"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                          </div>
                          <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                            <div>
                              <span className="text-[10px] font-mono text-[#F97316] font-bold block">{evt.date}</span>
                              <h3 className="font-display font-bold text-sm text-charcoal-900 group-hover:text-[#F97316] transition-colors mt-1 line-clamp-1">
                                {evt.title}
                              </h3>
                              <p className="text-xs text-charcoal-500 mt-1 truncate">{evt.university}</p>
                            </div>
                            <div className="border-t border-charcoal-100 pt-3.5 flex items-center justify-between text-xs">
                              <span className="text-charcoal-550">RSVPs: <strong>{evt.rsvpCount}</strong></span>
                              <span className="text-[#059669] font-bold flex items-center gap-0.5">Register Pass <ChevronRight className="w-3.5 h-3.5" /></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* =======================================================
                  4. TAB: MY TICKETS (PASSES)
                  ======================================================= */}
              {activeTab === "tickets" && (
                <div className="w-full">
                  {selectedTicket ? (
                    <TicketDetailsView
                      ticket={selectedTicket}
                      event={events.find(e => e.id === selectedTicket.eventId)!}
                      onBack={() => setSelectedTicket(null)}
                    />
                  ) : (
                    <MyTicketsDashboard
                      events={events}
                      registeredEventIds={registeredEventIds}
                      onSelectTicket={(ticket) => setSelectedTicket(ticket)}
                      onNavigateToExplore={onNavigateToHome}
                    />
                  )}
                </div>
              )}

              {/* =======================================================
                  5. TAB: NOTIFICATIONS (CAMPUS ALERTS)
                  ======================================================= */}
              {activeTab === "notifications" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-charcoal-200 pb-5">
                    <div>
                      <h2 className="text-2xl font-display font-black text-charcoal-900">Campus Alerts Hub</h2>
                      <p className="text-xs text-charcoal-650 mt-1">
                        Updates from your university registrar, student council, and event organizers.
                      </p>
                    </div>
                    {unreadNotifCount > 0 && (
                      <button 
                        onClick={markAllNotificationsAsRead}
                        className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-charcoal-700 rounded-full text-xs font-bold transition-all cursor-pointer border border-charcoal-200"
                      >
                        Mark All as Read
                      </button>
                    )}
                  </div>

                  <div className="bg-white rounded-3xl border border-charcoal-150 overflow-hidden divide-y divide-neutral-100 shadow-2xs">
                    {notifications.length === 0 ? (
                      <div className="p-12 text-center text-xs text-charcoal-500">No alerts found.</div>
                    ) : (
                      notifications.map(n => (
                        <div key={`page-notif-${n.id}`} className={`p-6 hover:bg-neutral-50/50 transition-colors flex gap-4 items-start ${n.read ? 'opacity-70' : 'bg-[#F97316]/2'}`}>
                          <span className={`w-3 h-3 rounded-full mt-2 shrink-0 ${n.read ? 'bg-charcoal-300' : 'bg-[#F97316] animate-pulse'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-4">
                              <h3 className="font-display font-bold text-sm text-charcoal-900">{n.title}</h3>
                              <span className="text-[10px] font-mono text-charcoal-400 font-semibold">{n.time}</span>
                            </div>
                            <p className="text-xs text-charcoal-650 mt-1.5 leading-relaxed max-w-2xl">{n.desc}</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveNotification(n.id)}
                            className="p-2 text-charcoal-300 hover:text-red-500 rounded-full hover:bg-neutral-100 shrink-0 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* =======================================================
                  6. TAB: MESSAGES (STUDENT CHAT)
                  ======================================================= */}
              {activeTab === "messages" && (
                <div className="bg-white rounded-3xl border border-charcoal-150 h-[600px] overflow-hidden flex shadow-md">
                  
                  {/* Left Column: Chats List */}
                  <div className="w-80 border-r border-charcoal-150 flex flex-col h-full shrink-0">
                    <div className="p-4 border-b border-charcoal-100 bg-neutral-50/50">
                      <span className="text-[10px] font-mono tracking-widest font-bold text-charcoal-400 uppercase block">Active Conversations</span>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
                      {Object.entries(chats).map(([key, rawChat]) => {
                        const chat = rawChat as any;
                        const isSelected = selectedChat === key;
                        const lastMsg = chat.messages[chat.messages.length - 1];
                        return (
                          <div 
                            key={`chat-list-${key}`}
                            onClick={() => {
                              setSelectedChat(key);
                              // Mark as read
                              setChats(prev => ({
                                ...prev,
                                [key]: { ...prev[key], unread: false }
                              }));
                            }}
                            className={`p-4 flex gap-3 cursor-pointer hover:bg-neutral-50/60 transition-colors ${isSelected ? 'bg-[#F97316]/5' : ''}`}
                          >
                            <div className="relative shrink-0">
                              <img src={chat.avatar} alt={chat.sender} className="w-10 h-10 rounded-full object-cover border border-charcoal-200" />
                              {chat.online && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-white" />
                              )}
                            </div>
                            
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-xs font-bold text-charcoal-900 truncate">{chat.sender}</h4>
                                <span className="text-[9px] font-mono text-charcoal-400 font-semibold">{lastMsg?.time || ""}</span>
                              </div>
                              <p className={`text-[11px] truncate mt-1 ${chat.unread ? 'font-bold text-charcoal-900' : 'text-charcoal-500'}`}>
                                {lastMsg?.text || ""}
                              </p>
                            </div>

                            {chat.unread && (
                              <span className="w-2 h-2 rounded-full bg-[#F97316] self-center shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Chat Window */}
                  <div className="flex-1 flex flex-col h-full bg-[#FAF9F5]">
                    {chats[selectedChat] ? (
                      <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-charcoal-150 p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img 
                              src={chats[selectedChat].avatar} 
                              alt={chats[selectedChat].sender} 
                              className="w-10 h-10 rounded-full object-cover border border-charcoal-200" 
                            />
                            <div>
                              <h4 className="text-xs font-bold text-charcoal-900">{chats[selectedChat].sender}</h4>
                              <p className="text-[10px] text-emerald-600 flex items-center gap-1 mt-0.5 font-medium">
                                <span className={`w-1.5 h-1.5 rounded-full ${chats[selectedChat].online ? 'bg-emerald-500' : 'bg-charcoal-400'}`} />
                                {chats[selectedChat].online ? "Online Now" : "Offline"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Message Stream */}
                        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                          {chats[selectedChat].messages.map((m, i) => (
                            <div 
                              key={`msg-${i}`}
                              className={`flex flex-col max-w-[70%] ${m.isUser ? 'self-end items-end' : 'self-start items-start'}`}
                            >
                              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-3xs
                                ${m.isUser 
                                  ? 'bg-[#F97316] text-white rounded-br-none' 
                                  : 'bg-white text-charcoal-850 rounded-bl-none border border-charcoal-150'}`}
                              >
                                {m.text}
                              </div>
                              <span className="text-[9px] font-mono text-charcoal-400 mt-1 font-semibold">{m.time}</span>
                            </div>
                          ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-charcoal-150 flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type an academic query, startup sync message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1 bg-neutral-50 border border-charcoal-200 py-2.5 px-4 rounded-full text-xs focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                          />
                          <button 
                            type="submit"
                            className="p-2.5 bg-[#F97316] hover:bg-[#E5630F] text-white rounded-full transition-colors cursor-pointer shrink-0 shadow-xs"
                          >
                            <Send className="w-4.5 h-4.5" />
                          </button>
                        </form>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                        <MessageSquare className="w-10 h-10 text-charcoal-300 mb-2" />
                        <p className="text-xs text-charcoal-500">Select an active chat to collaborate.</p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* =======================================================
                  7. TAB: PROFILE PAGE (ACADEMIC CREDENTIALS)
                  ======================================================= */}
              {activeTab === "profile" && (
                <div className="flex flex-col gap-8">
                  <div className="border-b border-charcoal-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-display font-black text-charcoal-900">Academic Profile</h2>
                      <p className="text-xs text-charcoal-650 mt-1">
                        Configure your campus details, skills, country, and biography for student recruiters.
                      </p>
                    </div>
                  </div>

                  {profileSuccessMsg && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-left animate-in zoom-in-95">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-bold text-emerald-950 text-xs">Profile Saved</h4>
                        <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">{profileSuccessMsg}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Avatar & Skills (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
                      
                      {/* Profile Photo Card */}
                      <div className="bg-white rounded-3xl border border-charcoal-200 p-6 flex flex-col items-center text-center shadow-2xs">
                        <div className="relative">
                          <img 
                            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"} 
                            alt={profileForm.name} 
                            className="w-28 h-28 rounded-full object-cover border-2 border-charcoal-200 shadow-md"
                          />
                          <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                        </div>

                        <h3 className="font-display font-bold text-base text-charcoal-900 mt-4 leading-tight">{profileForm.name}</h3>
                        <p className="text-xs text-[#F97316] font-mono font-bold uppercase mt-1">ALU SENIOR STUDENT</p>
                        <p className="text-[11px] text-charcoal-500 mt-1.5">{profileForm.city}, {profileForm.country}</p>

                        <div className="border-t border-charcoal-100 my-4 w-full" />

                        <div className="text-left w-full">
                          <span className="text-[9px] font-mono text-charcoal-400 block uppercase font-bold">Brief Bio</span>
                          <p className="text-xs text-charcoal-650 leading-relaxed mt-1.5">{profileForm.bio}</p>
                        </div>
                      </div>

                      {/* Skills Tags Card */}
                      <div className="bg-white rounded-3xl border border-charcoal-200 p-6 shadow-2xs">
                        <h4 className="font-display font-bold text-xs text-charcoal-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#F97316]" />
                          Skills & Interests
                        </h4>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {profileForm.skills.map(s => (
                            <span 
                              key={`skill-${s}`}
                              className="text-[10px] font-mono font-bold bg-neutral-100 text-charcoal-800 py-1 px-2.5 rounded-full border border-charcoal-200 flex items-center gap-1 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors cursor-pointer group"
                              title="Click to remove"
                              onClick={() => handleRemoveSkill(s)}
                            >
                              {s}
                              <X className="w-3 h-3 text-charcoal-400 group-hover:text-red-500 shrink-0" />
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Add e.g. React, Python..."
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                            className="flex-1 bg-neutral-50 border border-charcoal-200 px-3 py-1.5 rounded-xl text-xs focus:outline-hidden focus:border-[#F97316]"
                          />
                          <button 
                            type="button"
                            onClick={handleAddSkill}
                            className="px-3 py-1.5 bg-black hover:bg-[#F97316] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                          >
                            Add
                          </button>
                        </div>
                        <span className="text-[9px] text-charcoal-400 mt-2 block font-medium">Click on a tag to remove it instantly.</span>
                      </div>

                    </div>

                    {/* Right Column: Edit Fields (8 cols) */}
                    <div className="lg:col-span-8 bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-2xs">
                      <h3 className="font-display font-black text-charcoal-900 text-sm border-b border-charcoal-100 pb-3 mb-6">
                        Edit Registration Credentials
                      </h3>

                      <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Full Name *</label>
                            <input 
                              type="text" 
                              required
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                              className="w-full bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] font-medium"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">University Email *</label>
                            <input 
                              type="email" 
                              required
                              value={profileForm.email}
                              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                              className="w-full bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] font-medium"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Phone Number</label>
                            <input 
                              type="text" 
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                              className="w-full bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] font-medium"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Primary University / Hub *</label>
                            <input 
                              type="text" 
                              required
                              value={profileForm.university}
                              onChange={(e) => setProfileForm({ ...profileForm, university: e.target.value })}
                              className="w-full bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] font-medium"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">City Location</label>
                            <input 
                              type="text" 
                              value={profileForm.city}
                              onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                              className="w-full bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] font-medium"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Country</label>
                            <input 
                              type="text" 
                              value={profileForm.country}
                              onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                              className="w-full bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] font-medium"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Biography (Display for student recruiters)</label>
                          <textarea 
                            rows={4}
                            value={profileForm.bio}
                            onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                            className="w-full bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden focus:border-[#F97316] font-medium resize-none leading-relaxed"
                          />
                        </div>

                        <div className="flex gap-4 pt-3 border-t border-charcoal-100">
                          <button 
                            type="submit"
                            className="px-6 py-3 bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold rounded-full shadow-md transition-all cursor-pointer"
                          >
                            Save Academic Profile
                          </button>
                          <button 
                            type="button"
                            onClick={() => {
                              if (window.confirm("Do you want to reset password?")) {
                                alert("Mock password reset dispatch sent to email!");
                              }
                            }}
                            className="px-5 py-3 border border-charcoal-250 hover:bg-neutral-50 text-charcoal-700 text-xs font-bold rounded-full transition-all cursor-pointer"
                          >
                            Reset Password
                          </button>
                        </div>

                      </form>
                    </div>

                  </div>
                </div>
              )}

              {/* =======================================================
                  8. TAB: SETTINGS PAGE (CAMPUS PREFERENCES)
                  ======================================================= */}
              {activeTab === "settings" && (
                <div className="flex flex-col gap-8">
                  <div className="border-b border-charcoal-200 pb-5">
                    <h2 className="text-2xl font-display font-black text-charcoal-900">Portal Settings</h2>
                    <p className="text-xs text-charcoal-650 mt-1">
                      Configure your security rules, notification toggles, and appearance style sheets.
                    </p>
                  </div>

                  {settingsSuccessMsg && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-left animate-in zoom-in-95">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-bold text-emerald-950 text-xs">Settings Saved</h4>
                        <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">{settingsSuccessMsg}</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-2xs">
                    <form onSubmit={handleSaveSettings} className="flex flex-col gap-8">
                      
                      {/* Section 1: Notifications */}
                      <div>
                        <h3 className="text-sm font-display font-bold text-charcoal-900 border-b border-charcoal-100 pb-2 mb-4">
                          Account Toggles & Alerts
                        </h3>

                        <div className="flex flex-col gap-4">
                          <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex-1 pr-4">
                              <span className="text-xs font-bold text-charcoal-850 block">Email Alerts</span>
                              <span className="text-[11px] text-charcoal-550 block leading-snug">Receive weekly university dispatch, event recommendations, and RSVP updates.</span>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={settingsForm.emailNotif}
                              onChange={(e) => setSettingsForm({ ...settingsForm, emailNotif: e.target.checked })}
                              className="rounded text-[#F97316] focus:ring-[#F97316] h-4.5 w-4.5 border-charcoal-300"
                            />
                          </label>

                          <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex-1 pr-4">
                              <span className="text-xs font-bold text-charcoal-850 block">SMS Notifications</span>
                              <span className="text-[11px] text-charcoal-550 block leading-snug">Receive instant gate check-in alerts, event delay advisories, and host replies.</span>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={settingsForm.smsNotif}
                              onChange={(e) => setSettingsForm({ ...settingsForm, smsNotif: e.target.checked })}
                              className="rounded text-[#F97316] focus:ring-[#F97316] h-4.5 w-4.5 border-charcoal-300"
                            />
                          </label>

                          <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex-1 pr-4">
                              <span className="text-xs font-bold text-charcoal-850 block">Calendar Reminders</span>
                              <span className="text-[11px] text-charcoal-550 block leading-snug">Auto-dispatch 1-day warning alerts before any active ticket events begin.</span>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={settingsForm.academicReminders}
                              onChange={(e) => setSettingsForm({ ...settingsForm, academicReminders: e.target.checked })}
                              className="rounded text-[#F97316] focus:ring-[#F97316] h-4.5 w-4.5 border-charcoal-300"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Section 2: Privacy */}
                      <div>
                        <h3 className="text-sm font-display font-bold text-charcoal-900 border-b border-charcoal-100 pb-2 mb-4">
                          Academic Privacy Controls
                        </h3>

                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex-1 pr-4">
                            <span className="text-xs font-bold text-charcoal-850 block">Public Academic Profile</span>
                            <span className="text-[11px] text-charcoal-550 block leading-snug">Allow recruiters, student coordinators, and verified partners to view your skills, bio, and country.</span>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={settingsForm.publicProfile}
                            onChange={(e) => setSettingsForm({ ...settingsForm, publicProfile: e.target.checked })}
                            className="rounded text-[#F97316] focus:ring-[#F97316] h-4.5 w-4.5 border-charcoal-300"
                          />
                        </label>
                      </div>

                      {/* Section 3: Visual Style and Language */}
                      <div>
                        <h3 className="text-sm font-display font-bold text-charcoal-900 border-b border-charcoal-100 pb-2 mb-4">
                          Appearance & Language
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Visual Themes</label>
                            <select 
                              value={settingsForm.appearance}
                              onChange={(e) => setSettingsForm({ ...settingsForm, appearance: e.target.value })}
                              className="bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden cursor-pointer text-charcoal-800 font-semibold"
                            >
                              <option value="light-sunset">Warm Sunset Light Theme</option>
                              <option value="dark-charcoal">Deep Charcoal Dark Theme</option>
                              <option value="forest-moss">Forest Moss Emerald Theme</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Localization Language</label>
                            <select 
                              value={settingsForm.language}
                              onChange={(e) => setSettingsForm({ ...settingsForm, language: e.target.value })}
                              className="bg-neutral-50/50 border border-charcoal-200 rounded-xl py-2 px-3 text-xs focus:outline-hidden cursor-pointer text-charcoal-800 font-semibold"
                            >
                              <option value="English">English</option>
                              <option value="French">Français</option>
                              <option value="Swahili">Kiswahili</option>
                              <option value="Yoruba">Yorùbá</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-4 border-t border-charcoal-100 flex gap-3">
                        <button 
                          type="submit"
                          className="px-6 py-3 bg-black hover:bg-[#F97316] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                        >
                          Save Preferences
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>

        {/* Dashboard Footer */}
        <footer className="border-t border-charcoal-150 py-5 px-8 bg-white text-xs text-charcoal-500 font-medium flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Afro Event Inc. All rights reserved. Designed with modern Pan-African integrity.</p>
          <div className="flex gap-4">
            <button onClick={onNavigateToHome} className="hover:text-charcoal-900 cursor-pointer">Public Homepage</button>
            <a href="#" className="hover:text-charcoal-900">Privacy Policy</a>
            <a href="#" className="hover:text-charcoal-900">Terms of Service</a>
          </div>
        </footer>

      </div>

      {/* --- MOBILE SIDEBAR DRAWER OVERLAY --- */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-charcoal-950/40 backdrop-blur-xs z-40 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-72 bg-white border-r border-charcoal-200 z-50 flex flex-col h-full lg:hidden"
            >
              <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
                <AfroEventLogo variant="default" hideTagline={true} scale={0.75} />
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 hover:bg-neutral-50 border border-charcoal-150 rounded-lg text-charcoal-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-5 flex flex-col gap-1 overflow-y-auto">
                <button
                  onClick={() => { setActiveTab("dashboard"); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "dashboard" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  Dashboard
                </button>

                <button
                  onClick={() => { onNavigateToHome(); setIsMobileSidebarOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Compass className="w-4.5 h-4.5" />
                    Explore Events
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>

                <button
                  onClick={() => { setActiveTab("my-events"); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "my-events" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
                >
                  <div className="flex items-center gap-3">
                    <CalendarRange className="w-4.5 h-4.5" />
                    Hosted Events
                  </div>
                  {myCreatedEvents.length > 0 && (
                    <span className="bg-charcoal-100 text-charcoal-700 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold">{myCreatedEvents.length}</span>
                  )}
                </button>

                <button
                  onClick={() => { setActiveTab("saved"); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "saved" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4.5 h-4.5" />
                    Saved Events
                  </div>
                  {mySavedEvents.length > 0 && (
                    <span className="bg-[#F97316]/15 text-[#C04E22] font-mono text-[10px] px-2 py-0.5 rounded-md font-bold">{savedEventIds.length}</span>
                  )}
                </button>

                <button
                  onClick={() => { setActiveTab("tickets"); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "tickets" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
                >
                  <div className="flex items-center gap-3">
                    <Ticket className="w-4.5 h-4.5" />
                    My Tickets
                  </div>
                  {registeredEventIds.length > 0 && (
                    <span className="bg-[#059669]/10 text-[#059669] font-mono text-[10px] px-2 py-0.5 rounded-md font-bold">{registeredEventIds.length}</span>
                  )}
                </button>

                <div className="border-t border-charcoal-100 my-4" />

                <button
                  onClick={() => { setActiveTab("notifications"); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "notifications" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4.5 h-4.5" />
                    Notifications
                  </div>
                  {unreadNotifCount > 0 && (
                    <span className="bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">{unreadNotifCount}</span>
                  )}
                </button>

                <button
                  onClick={() => { setActiveTab("messages"); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "messages" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4.5 h-4.5" />
                    Messages
                  </div>
                </button>

                <button
                  onClick={() => { setActiveTab("profile"); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "profile" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
                >
                  <User className="w-4.5 h-4.5" />
                  My Profile
                </button>

                <button
                  onClick={() => { setActiveTab("settings"); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "settings" ? "bg-[#F97316]/10 text-[#C04E22] font-bold" : "text-charcoal-650 hover:bg-neutral-50 hover:text-charcoal-900"}`}
                >
                  <Settings className="w-4.5 h-4.5" />
                  Settings
                </button>
              </nav>

              {/* Mobile Drawer Footer */}
              <div className="p-4 border-t border-charcoal-150 bg-neutral-50">
                <div className="flex items-center gap-3 mb-4">
                  <img src={user?.avatar} alt={profileForm.name} className="w-10 h-10 rounded-full object-cover border border-charcoal-250" />
                  <div>
                    <span className="text-xs font-bold text-charcoal-900 block leading-tight">{profileForm.name}</span>
                    <span className="text-[10px] text-charcoal-500 block truncate max-w-[150px]">{profileForm.email}</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsMobileSidebarOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout Session
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
