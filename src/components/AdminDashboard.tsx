import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Users, Calendar, UserCheck, Sparkles, TrendingUp,
  Search, Filter, Edit2, Trash2, Eye, ShieldAlert, Check, X,
  PlusCircle, Volume2, Settings, LogOut, FileText, ArrowUpRight,
  MapPin, Clock, Award, Shield, Mail, Globe, Bell, ChevronRight,
  MoreVertical, CalendarPlus, CheckSquare, RefreshCw, Star, Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Event, INITIAL_EVENTS } from "./mockEvents";

interface AdminDashboardProps {
  onLogout: () => void;
  events: Event[];
  setEvents?: React.Dispatch<React.SetStateAction<Event[]>>;
}

// Initial mockup data for robust, high-fidelity presentation
interface MockUser {
  id: string;
  fullName: string;
  email: string;
  role: "Student" | "Organizer" | "Admin";
  status: "Active" | "Suspended" | "Pending";
  joinDate: string;
  avatar: string;
}

const INITIAL_MOCK_USERS: MockUser[] = [
  {
    id: "usr-1",
    fullName: "Kofi Mensah",
    email: "kofi.mensah@alu.edu",
    role: "Student",
    status: "Active",
    joinDate: "Jan 12, 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "usr-2",
    fullName: "Amina Diop",
    email: "amina.diop@ashesi.edu.gh",
    role: "Organizer",
    status: "Active",
    joinDate: "Feb 04, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "usr-3",
    fullName: "Tariq Ibrahim",
    email: "tariq.ib@unilag.edu.ng",
    role: "Student",
    status: "Suspended",
    joinDate: "Mar 19, 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "usr-4",
    fullName: "Fatoumata Diallo",
    email: "f.diallo@uct.ac.za",
    role: "Admin",
    status: "Active",
    joinDate: "Nov 01, 2025",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "usr-5",
    fullName: "Chinedu Okafor",
    email: "c.okafor@unilag.edu.ng",
    role: "Organizer",
    status: "Active",
    joinDate: "Apr 02, 2026",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "usr-6",
    fullName: "Naledi Mandela",
    email: "naledi.m@uct.ac.za",
    role: "Student",
    status: "Pending",
    joinDate: "Jun 28, 2026",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "usr-7",
    fullName: "Elikia M'Bolo",
    email: "embolo@alu.edu",
    role: "Organizer",
    status: "Active",
    joinDate: "May 15, 2026",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
  }
];

interface MockApprovalEvent {
  id: string;
  title: string;
  organizer: string;
  category: string;
  submissionDate: string;
  image: string;
  university: string;
  description: string;
}

const INITIAL_APPROVAL_QUEUE: MockApprovalEvent[] = [
  {
    id: "app-1",
    title: "Afrobeats Rhythms & Music Theory",
    organizer: "Ashesi Music Society",
    category: "Cultural Event",
    submissionDate: "Jul 10, 2026",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    university: "Ashesi University",
    description: "An interactive masterclass discussing the rhythmic signatures, instrumentation, and global influence of contemporary West African afrobeats music."
  },
  {
    id: "app-2",
    title: "FinTech Innovation in Sub-Saharan Africa",
    organizer: "UCT Finance & Tech Club",
    category: "Academic Seminar",
    submissionDate: "Jul 11, 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    university: "University of Cape Town",
    description: "A panel discussion with banking experts and startup founders on blockchain integration, mobile money interoperability, and micro-loan systems."
  },
  {
    id: "app-3",
    title: "Pan-African Robotics Championship",
    organizer: "ALU Engineering Lab",
    category: "Competition",
    submissionDate: "Jul 12, 2026",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    university: "African Leadership University (ALU)",
    description: "Annual university competition featuring robotic models optimized for agricultural seed-planting and smart sorting."
  }
];

interface MockCategory {
  id: string;
  name: string;
  eventCount: number;
  description: string;
  accentColor: string;
}

const INITIAL_CATEGORIES: MockCategory[] = [
  { id: "cat-1", name: "Academic Seminar", eventCount: 12, description: "Keynotes, academic research panels, and guest lectures.", accentColor: "#F97316" },
  { id: "cat-2", name: "Workshop", eventCount: 18, description: "Hands-on tech learning and immersive collaborative sprints.", accentColor: "#059669" },
  { id: "cat-3", name: "Career Fair", eventCount: 6, description: "Recruitment pavilions connecting recruiters with campus talent.", accentColor: "#3B82F6" },
  { id: "cat-4", name: "Startup Pitch", eventCount: 8, description: "Venture pitch events and competitive incubator presentation days.", accentColor: "#8B5CF6" },
  { id: "cat-5", name: "Hackathon", eventCount: 14, description: "Multiday collaborative building sessions and development sprints.", accentColor: "#EC4899" },
  { id: "cat-6", name: "Cultural Event", eventCount: 22, description: "Festivals, art exhibitions, and musical representations of heritage.", accentColor: "#EF4444" },
  { id: "cat-7", name: "Competition", eventCount: 10, description: "Intellectual debate tournaments, sporting cups, and innovation prizes.", accentColor: "#E5A93B" }
];

interface MockAnnouncement {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  status: "Published" | "Draft";
}

const INITIAL_ANNOUNCEMENTS: MockAnnouncement[] = [
  {
    id: "ann-1",
    title: "Afro Event System Upgrade Complete",
    description: "We have fully upgraded our client-side ticket storage engine. Users can now securely view Gye Nyame watermarked passes, export receipts directly, and sync bookings to Google Calendar smoothly.",
    publishDate: "Jul 05, 2026",
    status: "Published"
  },
  {
    id: "ann-2",
    title: "Call for Hosts: University Clubs & Departments",
    description: "All university departments and registered student clubs are invited to request organizer credentials. Verified hosts gain access to real-time attendee scan statistics and instant Excel report exports.",
    publishDate: "Jul 12, 2026",
    status: "Published"
  },
  {
    id: "ann-3",
    title: "Guidelines for African Heritage Festivals 2026",
    description: "As the cultural festival season begins, we recommend that all organizers review our updated event capacity thresholds and emergency coordinator contact fields.",
    publishDate: "Jul 13, 2026",
    status: "Draft"
  }
];

interface MockActivity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: "user" | "event" | "ticket" | "system";
}

const RECENT_ACTIVITIES: MockActivity[] = [
  { id: "act-1", user: "Amina Diop", action: "created a new event", target: "Afrobeats Rhythms & Music Theory", time: "12 mins ago", type: "event" },
  { id: "act-2", user: "Kofi Mensah", action: "registered for ticket", target: "AI Localization Seminar", time: "45 mins ago", type: "ticket" },
  { id: "act-3", user: "System", action: "automatically approved event", target: "UG Mobile Web Workshop", time: "1 hour ago", type: "system" },
  { id: "act-4", user: "Tariq Ibrahim", action: "profile status was updated to", target: "Suspended", time: "2 hours ago", type: "user" },
  { id: "act-5", user: "Naledi Mandela", action: "signed up as a new", target: "Student", time: "3 hours ago", type: "user" },
  { id: "act-6", user: "Elikia M'Bolo", action: "submitted approval request for", target: "Robotics Championship", time: "5 hours ago", type: "event" }
];

export default function AdminDashboard({ onLogout, events, setEvents }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "users" | "events" | "organizers" | "categories" | "approvals" | "reports" | "announcements" | "settings"
  >("dashboard");

  // In-state management for rich interactivity
  const [users, setUsers] = useState<MockUser[]>(INITIAL_MOCK_USERS);
  const [approvals, setApprovals] = useState<MockApprovalEvent[]>(INITIAL_APPROVAL_QUEUE);
  const [categories, setCategories] = useState<MockCategory[]>(INITIAL_CATEGORIES);
  const [announcements, setAnnouncements] = useState<MockAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [featuredEvents, setFeaturedEvents] = useState<string[]>(["evt-afro-tech-uni", "evt-ashesi-pitch"]);

  // Global platform settings
  const [platformName, setPlatformName] = useState("Afro Event");
  const [platformLogo, setPlatformLogo] = useState("⚡ AFRO EVENT");
  const [senderEmail, setSenderEmail] = useState("no-reply@afroevent.org");
  const [emailProvider, setEmailProvider] = useState("SendGrid SMTP");
  const [selectedTheme, setSelectedTheme] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [notifyOnNewUser, setNotifyOnNewUser] = useState(true);
  const [notifyOnNewEvent, setNotifyOnNewEvent] = useState(true);

  // States for search & filters
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("All");
  const [userStatusFilter, setUserStatusFilter] = useState("All");

  const [eventSearchQuery, setEventSearchQuery] = useState("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState("All");

  // Modals / Selected Item states
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [userModalMode, setUserModalMode] = useState<"view" | "edit" | null>(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserRole, setEditUserRole] = useState<"Student" | "Organizer" | "Admin">("Student");
  const [editUserStatus, setEditUserStatus] = useState<"Active" | "Suspended" | "Pending">("Active");

  // Category creation / edit states
  const [categoryModalMode, setCategoryModalMode] = useState<"create" | "edit" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MockCategory | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryColor, setCategoryColor] = useState("#F97316");

  // Announcement creation / edit states
  const [announcementModalMode, setAnnouncementModalMode] = useState<"create" | "edit" | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<MockAnnouncement | null>(null);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [announcementStatus, setAnnouncementStatus] = useState<"Published" | "Draft">("Published");

  // Chart hover state
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Computed overview states
  const totalUsersCount = users.length + 420; // adding seed multiplier
  const totalEventsCount = events.length + approvals.length;
  const totalRegistrationsCount = useMemo(() => {
    return events.reduce((sum, e) => sum + e.rsvpCount, 0) + 1280;
  }, [events]);
  const activeOrganizersCount = useMemo(() => {
    return users.filter(u => u.role === "Organizer" && u.status === "Active").length + 24;
  }, [users]);

  // Handle User actions
  const handleOpenUserView = (user: MockUser) => {
    setSelectedUser(user);
    setUserModalMode("view");
  };

  const handleOpenUserEdit = (user: MockUser) => {
    setSelectedUser(user);
    setEditUserName(user.fullName);
    setEditUserEmail(user.email);
    setEditUserRole(user.role);
    setEditUserStatus(user.status);
    setUserModalMode("edit");
  };

  const handleSaveUserEdit = () => {
    if (!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? {
      ...u,
      fullName: editUserName,
      email: editUserEmail,
      role: editUserRole,
      status: editUserStatus
    } : u));
    setUserModalMode(null);
    setSelectedUser(null);
  };

  const handleToggleSuspendUser = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === "Suspended" ? "Active" : "Suspended";
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user profile?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  // Handle Event actions
  const handleToggleFeatureEvent = (eventId: string) => {
    if (featuredEvents.includes(eventId)) {
      setFeaturedEvents(prev => prev.filter(id => id !== eventId));
    } else {
      setFeaturedEvents(prev => [...prev, eventId]);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event? This action is permanent.")) {
      if (setEvents) {
        setEvents(prev => prev.filter(e => e.id !== eventId));
      }
    }
  };

  // Handle Approvals
  const handleApproveEvent = (app: MockApprovalEvent) => {
    // Add pending to active events list
    const newEvent: Event = {
      id: `evt-${app.id}`,
      title: app.title,
      date: "SAT, NOV 14, 2026",
      time: "03:00 PM CAT",
      location: "Campus Assembly Hall",
      university: app.university,
      city: "Kigali",
      country: "Rwanda",
      organizer: app.organizer,
      organizerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
      organizerRole: "Registered Organizer",
      image: app.image,
      category: app.category as any,
      price: "Free",
      isFree: true,
      rsvpCount: 0,
      description: app.description,
      capacity: 150,
      tags: ["Approved", "Campus Event", app.category]
    };

    if (setEvents) {
      setEvents(prev => [newEvent, ...prev]);
    }
    setApprovals(prev => prev.filter(a => a.id !== app.id));
    alert(`Successfully approved "${app.title}"! It is now listed live on the homepage.`);
  };

  const handleRequestChanges = (title: string) => {
    alert(`Change request notification dispatched to host of "${title}".`);
  };

  const handleRejectEvent = (id: string, title: string) => {
    if (confirm(`Are you sure you want to reject the submission "${title}"?`)) {
      setApprovals(prev => prev.filter(a => a.id !== id));
    }
  };

  // Handle Categories
  const handleOpenCategoryCreate = () => {
    setCategoryName("");
    setCategoryDescription("");
    setCategoryColor("#F97316");
    setSelectedCategory(null);
    setCategoryModalMode("create");
  };

  const handleOpenCategoryEdit = (cat: MockCategory) => {
    setSelectedCategory(cat);
    setCategoryName(cat.name);
    setCategoryDescription(cat.description);
    setCategoryColor(cat.accentColor);
    setCategoryModalMode("edit");
  };

  const handleSaveCategory = () => {
    if (categoryModalMode === "create") {
      const newCat: MockCategory = {
        id: `cat-${Date.now()}`,
        name: categoryName || "New Category",
        description: categoryDescription || "Custom platform category.",
        accentColor: categoryColor,
        eventCount: 0
      };
      setCategories(prev => [...prev, newCat]);
    } else if (categoryModalMode === "edit" && selectedCategory) {
      setCategories(prev => prev.map(c => c.id === selectedCategory.id ? {
        ...c,
        name: categoryName,
        description: categoryDescription,
        accentColor: categoryColor
      } : c));
    }
    setCategoryModalMode(null);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  // Handle Announcements
  const handleOpenAnnouncementCreate = () => {
    setAnnouncementTitle("");
    setAnnouncementDescription("");
    setAnnouncementStatus("Published");
    setSelectedAnnouncement(null);
    setAnnouncementModalMode("create");
  };

  const handleOpenAnnouncementEdit = (ann: MockAnnouncement) => {
    setSelectedAnnouncement(ann);
    setAnnouncementTitle(ann.title);
    setAnnouncementDescription(ann.description);
    setAnnouncementStatus(ann.status);
    setAnnouncementModalMode("edit");
  };

  const handleSaveAnnouncement = () => {
    if (announcementModalMode === "create") {
      const newAnn: MockAnnouncement = {
        id: `ann-${Date.now()}`,
        title: announcementTitle || "Untitled Announcement",
        description: announcementDescription || "Announcement details.",
        publishDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        status: announcementStatus
      };
      setAnnouncements(prev => [newAnn, ...prev]);
    } else if (announcementModalMode === "edit" && selectedAnnouncement) {
      setAnnouncements(prev => prev.map(a => a.id === selectedAnnouncement.id ? {
        ...a,
        title: announcementTitle,
        description: announcementDescription,
        status: announcementStatus
      } : a));
    }
    setAnnouncementModalMode(null);
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleToggleAnnouncementStatus = (id: string) => {
    setAnnouncements(prev => prev.map(a => {
      if (a.id === id) {
        const newStatus = a.status === "Published" ? "Draft" : "Published";
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  // Filtering users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.fullName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                            u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
      const matchesRole = userRoleFilter === "All" || u.role === userRoleFilter;
      const matchesStatus = userStatusFilter === "All" || u.status === userStatusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, userSearchQuery, userRoleFilter, userStatusFilter]);

  // Filtering events
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
                            e.organizer.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
                            e.university.toLowerCase().includes(eventSearchQuery.toLowerCase());
      const matchesCategory = eventCategoryFilter === "All" || e.category === eventCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [events, eventSearchQuery, eventCategoryFilter]);

  // Sample static SVG charts data
  const monthlyCreationData = [
    { label: "Jan", count: 4 },
    { label: "Feb", count: 6 },
    { label: "Mar", count: 12 },
    { label: "Apr", count: 18 },
    { label: "May", count: 14 },
    { label: "Jun", count: 24 },
    { label: "Jul", count: 32 }
  ];

  const popularCategoriesChart = [
    { name: "Seminars", percentage: 40, color: "bg-[#F97316]", fill: "#F97316" },
    { name: "Workshops", percentage: 28, color: "bg-[#059669]", fill: "#059669" },
    { name: "Cultural", percentage: 18, color: "bg-[#E5A93B]", fill: "#E5A93B" },
    { name: "Hackathons", percentage: 14, color: "bg-[#8B5CF6]", fill: "#8B5CF6" }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-800 flex flex-col lg:flex-row relative font-sans overflow-x-hidden antialiased">
      {/* Dynamic African Background Art Overlays */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#F97316]/5 to-transparent pointer-events-none rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#059669]/5 to-transparent pointer-events-none rounded-full blur-3xl" />

      {/* ADMIN DASHBOARD SIDEBAR */}
      <aside className="w-full lg:w-72 bg-[#171717] text-white shrink-0 flex flex-col justify-between border-r border-neutral-800/60 shadow-2xl relative z-20">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-neutral-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#F97316] to-[#E5A93B] rounded-xl flex items-center justify-center shadow-lg font-black text-white text-base">
                Æ
              </div>
              <div>
                <h1 className="font-display font-black text-sm tracking-tight text-white uppercase">
                  {platformName}
                </h1>
                <span className="text-[10px] font-mono tracking-widest text-[#F97316] uppercase font-bold block">
                  Admin Platform
                </span>
              </div>
            </div>
            <div className="lg:hidden">
              {/* Responsive Menu is handled gracefully via normal layout spacing on desktop */}
              <span className="text-[10px] bg-neutral-800 border border-neutral-700/60 px-2 py-0.5 rounded-md font-mono font-bold text-neutral-400">v1.2</span>
            </div>
          </div>

          {/* Decorative African Line Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-4">
            <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block mb-3">
              CORE CONTROL
            </span>

            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "users", label: "Users Management", icon: Users, badge: users.length.toString() },
              { id: "events", label: "Events Directory", icon: Calendar, badge: events.length.toString() },
              { id: "approvals", label: "Approval Queue", icon: UserCheck, badge: approvals.length.toString(), highlight: approvals.length > 0 },
              { id: "categories", label: "Categories", icon: Award },
              { id: "reports", label: "Reports & Analytics", icon: TrendingUp },
              { id: "announcements", label: "Announcements", icon: Volume2 },
              { id: "settings", label: "Platform Settings", icon: Settings }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? "bg-gradient-to-r from-[#F97316] to-[#E5630F] text-white shadow-md shadow-[#F97316]/10 font-bold"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : item.highlight 
                          ? "bg-[#F97316] text-white animate-pulse" 
                          : "bg-neutral-800 text-neutral-400 border border-neutral-700/60"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800/80 bg-[#121212] space-y-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-[#F97316]/30 flex items-center justify-center font-bold text-[#F97316] text-xs">
              AD
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-tight">Admin Master</p>
              <p className="text-[9px] font-mono text-neutral-400 block mt-0.5">eleniss3984@gmail.com</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-2.5 border border-neutral-800 hover:border-red-500/50 hover:bg-red-500/5 rounded-xl text-[11px] font-bold text-neutral-400 hover:text-red-400 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT PANEL */}
      <main className="flex-1 min-w-0 flex flex-col relative z-10">
        {/* Header toolbar */}
        <header className="bg-white border-b border-neutral-200/80 py-4 px-6 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse" />
            <h2 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
              Live SaaS Control Panel • Active Tab: {activeTab.toUpperCase()}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Quick action button for preview validation */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-extrabold text-[#059669] bg-[#059669]/10 px-3 py-1 rounded-full border border-[#059669]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-ping" />
              SYSTEM SECURED (LOCALSTATE)
            </span>
            <button 
              onClick={() => {
                setUsers(INITIAL_MOCK_USERS);
                setApprovals(INITIAL_APPROVAL_QUEUE);
                setCategories(INITIAL_CATEGORIES);
                setAnnouncements(INITIAL_ANNOUNCEMENTS);
                alert("Database reset to pristine mockup data!");
              }}
              title="Reset Database Simulation"
              className="p-2 border border-neutral-200 hover:border-[#F97316] bg-[#FAF8F5] text-neutral-600 hover:text-[#F97316] rounded-lg transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* SCROLLABLE VIEW PORT */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {/* TAB: DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Hero introduction section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-display font-black text-neutral-900 tracking-tight leading-none">
                      Akwaba, Platform Administrator
                    </h1>
                    <p className="text-xs text-neutral-500 mt-2 font-sans">
                      Monitor events, coordinate registrations, review organizers, approve submissions, and analyze metrics across all pan-African universities.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 text-[#C2410C] px-4 py-3 rounded-2xl text-xs max-w-md font-sans">
                    <strong className="font-bold flex items-center gap-1.5"><Info className="w-4 h-4 shrink-0" /> Pending Queue Action Required</strong>
                    <p className="mt-0.5 leading-normal text-neutral-600">
                      There are currently <strong className="text-amber-700 font-extrabold">{approvals.length} events awaiting approval</strong>. Please review them in the approvals tab.
                    </p>
                  </div>
                </div>

                {/* SUMMARY OVERVIEW CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  {[
                    { label: "Total Users", value: totalUsersCount, icon: Users, color: "text-[#3B82F6] bg-blue-50" },
                    { label: "Total Events", value: totalEventsCount, icon: Calendar, color: "text-[#8B5CF6] bg-purple-50" },
                    { label: "Registrations", value: totalRegistrationsCount, icon: CalendarPlus, color: "text-[#059669] bg-emerald-50" },
                    { label: "Active Hosts", value: activeOrganizersCount, icon: UserCheck, color: "text-[#EC4899] bg-pink-50" },
                    { label: "Featured Events", value: featuredEvents.length, icon: Star, color: "text-[#E5A93B] bg-amber-50" },
                    { label: "Monthly Growth", value: "+34.8%", icon: TrendingUp, color: "text-[#F97316] bg-orange-50" }
                  ].map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div 
                        key={idx} 
                        className="bg-white border border-neutral-200/80 p-4 rounded-2xl shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between"
                      >
                        <div className="absolute top-0 right-0 h-10 w-10 opacity-5 pointer-events-none african-pattern-subtle" />
                        <div>
                          <div className={`w-8 h-8 rounded-xl ${card.color} flex items-center justify-center shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mt-3">{card.label}</p>
                        </div>
                        <h3 className="text-xl font-display font-black text-neutral-900 tracking-tight mt-1 group-hover:text-[#F97316] transition-colors">
                          {card.value}
                        </h3>
                      </div>
                    );
                  })}
                </div>

                {/* CHARTS GRID & RECENT ACTIVITY */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Monthly Event Creation Chart card */}
                  <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-black text-neutral-900 text-sm">Monthly Event Creation & Registrations</h3>
                        <p className="text-[10px] text-neutral-400 font-sans">Comparison of successful listings generated on platform.</p>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-mono">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#F97316] rounded-xs" /> Events Created</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#059669] rounded-xs" /> Registrations x10</span>
                      </div>
                    </div>

                    {/* Responsive SVG Chart */}
                    <div className="h-64 w-full bg-neutral-50/50 border border-neutral-100 rounded-2xl p-4 relative flex items-end justify-between gap-2 select-none">
                      {monthlyCreationData.map((data, idx) => {
                        const maxVal = 32;
                        const barHeightPercent = (data.count / maxVal) * 100;
                        const isHovered = hoveredBarIndex === idx;
                        return (
                          <div 
                            key={idx} 
                            className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                            onMouseEnter={() => setHoveredBarIndex(idx)}
                            onMouseLeave={() => setHoveredBarIndex(null)}
                          >
                            <div className="w-full relative flex items-end justify-center gap-1 px-1 h-full">
                              {/* Background guideline */}
                              <div className="absolute inset-x-0 bottom-0 h-full border-r border-dashed border-neutral-200/40 pointer-events-none" />
                              
                              {/* Primary orange bar */}
                              <div 
                                className={`w-3 sm:w-5 bg-gradient-to-t from-[#F97316] to-[#E5A93B] rounded-t-sm transition-all duration-300 ${
                                  isHovered ? "brightness-110 shadow-lg shadow-[#F97316]/20" : ""
                                }`} 
                                style={{ height: `${barHeightPercent}%` }} 
                              />
                              {/* Secondary emerald bar */}
                              <div 
                                className={`w-3 sm:w-5 bg-gradient-to-t from-[#059669] to-[#10B981] rounded-t-sm transition-all duration-300 ${
                                  isHovered ? "brightness-110 shadow-lg shadow-[#059669]/20" : ""
                                }`} 
                                style={{ height: `${Math.min(95, barHeightPercent * 0.75 + 10)}%` }} 
                              />

                              {/* Interactive dynamic tooltip popup */}
                              {isHovered && (
                                <div className="absolute -top-10 bg-neutral-900 text-white text-[10px] font-mono px-2 py-1 rounded-md shadow-xl z-25 text-center leading-normal pointer-events-none min-w-[110px]">
                                  <p className="font-bold border-b border-neutral-800 pb-0.5">{data.label} Stats</p>
                                  <p className="text-[#FAF8F5] mt-0.5">Events: <strong className="text-[#F97316]">{data.count}</strong></p>
                                  <p className="text-[#FAF8F5]">Registrations: <strong className="text-[#059669]">{Math.floor(data.count * 10.5)}</strong></p>
                                </div>
                              )}
                            </div>
                            
                            <span className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-[#F97316] transition-colors">{data.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Popular Categories Card */}
                  <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs space-y-4">
                    <div>
                      <h3 className="font-display font-black text-neutral-900 text-sm">Popular Event Categories</h3>
                      <p className="text-[10px] text-neutral-400 font-sans">Percentage distribution of registrations.</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {popularCategoriesChart.map((cat, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                              {cat.name}
                            </span>
                            <span className="font-mono text-neutral-500">{cat.percentage}%</span>
                          </div>
                          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percentage}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#FAF8F5] border border-neutral-200/60 rounded-2xl p-4 text-[11px] font-sans text-neutral-600 mt-4 leading-normal flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>AI Insight:</strong> Academic seminars & tech workshops maintain a combined 68% domination across ALU & UNILAG.</span>
                    </div>
                  </div>
                </div>

                {/* RECENT SYSTEM ACTIVITY FEED */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs">
                  <h3 className="font-display font-black text-neutral-900 text-sm mb-4 flex items-center justify-between">
                    <span>Recent Administrative & User Activity</span>
                    <span className="text-[10px] font-mono bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-full text-neutral-500 font-bold">Realtime</span>
                  </h3>

                  <div className="divide-y divide-neutral-100">
                    {RECENT_ACTIVITIES.map((act) => (
                      <div key={act.id} className="py-3.5 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
                        <div className="flex items-start gap-3 text-xs">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            act.type === "event" 
                              ? "bg-purple-50 text-purple-600" 
                              : act.type === "ticket" 
                                ? "bg-emerald-50 text-emerald-600" 
                                : act.type === "user" 
                                  ? "bg-blue-50 text-blue-600" 
                                  : "bg-orange-50 text-orange-600"
                          }`}>
                            {act.type === "event" ? <Calendar className="w-4 h-4" /> : act.type === "ticket" ? <CheckSquare className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-neutral-700 leading-normal">
                              <strong className="font-bold text-neutral-900">{act.user}</strong> {act.action} <span className="font-semibold text-[#F97316] font-mono">{act.target}</span>
                            </p>
                            <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">{act.time}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase select-all font-bold">
                          {act.id}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: USERS MANAGEMENT */}
            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-display font-black text-neutral-900">Users Management</h1>
                    <p className="text-xs text-neutral-500 mt-1 font-sans">Moderate user profiles, promote host organizers, and regulate platform access status.</p>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white border border-neutral-200/80 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row items-center gap-4">
                  {/* Search input */}
                  <div className="w-full md:flex-1 relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search users by name or email address..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-neutral-200/80 focus:border-[#F97316] rounded-xl text-xs outline-hidden"
                    />
                  </div>

                  {/* Role filter */}
                  <div className="w-full md:w-48 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 shrink-0">Role:</span>
                    <select
                      value={userRoleFilter}
                      onChange={(e) => setUserRoleFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200/80 focus:border-[#F97316] rounded-xl text-xs outline-hidden font-sans font-semibold text-neutral-700 cursor-pointer"
                    >
                      <option value="All">All Roles</option>
                      <option value="Student">Student</option>
                      <option value="Organizer">Organizer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  {/* Status filter */}
                  <div className="w-full md:w-48 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 shrink-0">Status:</span>
                    <select
                      value={userStatusFilter}
                      onChange={(e) => setUserStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200/80 focus:border-[#F97316] rounded-xl text-xs outline-hidden font-sans font-semibold text-neutral-700 cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-neutral-50/60 text-neutral-400 font-mono text-[10px] uppercase font-bold tracking-wider border-b border-neutral-100">
                          <th className="py-4 px-6">Attendee Profile</th>
                          <th className="py-4 px-6">Email Address</th>
                          <th className="py-4 px-6">System Role</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6">Registered On</th>
                          <th className="py-4 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-xs">
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-neutral-400 font-sans">
                              No user records found matching the chosen search criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((u) => (
                            <tr key={u.id} className="hover:bg-neutral-50/30 transition-colors">
                              <td className="py-4 px-6 flex items-center gap-3">
                                <img src={u.avatar} alt={u.fullName} className="w-8 h-8 rounded-full object-cover border border-neutral-200 shrink-0" />
                                <span className="font-bold text-neutral-900">{u.fullName}</span>
                              </td>
                              <td className="py-4 px-6 font-mono text-neutral-500 select-all">{u.email}</td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  u.role === "Admin" 
                                    ? "bg-red-50 text-red-600 border border-red-100" 
                                    : u.role === "Organizer" 
                                      ? "bg-purple-50 text-purple-600 border border-purple-100" 
                                      : "bg-blue-50 text-blue-600 border border-blue-100"
                                }`}>
                                  {u.role}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
                                  u.status === "Active" 
                                    ? "text-emerald-600" 
                                    : u.status === "Suspended" 
                                      ? "text-red-500" 
                                      : "text-amber-500"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    u.status === "Active" 
                                      ? "bg-emerald-500" 
                                      : u.status === "Suspended" 
                                        ? "bg-red-500 animate-pulse" 
                                        : "bg-amber-500"
                                  }`} />
                                  {u.status}
                                </span>
                              </td>
                              <td className="py-4 px-6 font-mono text-neutral-400">{u.joinDate}</td>
                              <td className="py-4 px-6 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => handleOpenUserView(u)}
                                    title="View Profile Details"
                                    className="p-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg transition-all cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleOpenUserEdit(u)}
                                    title="Edit User Profile"
                                    className="p-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-[#F97316] rounded-lg transition-all cursor-pointer"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleToggleSuspendUser(u.id)}
                                    title={u.status === "Suspended" ? "Activate User" : "Suspend User"}
                                    className={`p-1.5 border rounded-lg transition-all cursor-pointer ${
                                      u.status === "Suspended"
                                        ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                                        : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                                    }`}
                                  >
                                    <ShieldAlert className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(u.id)}
                                    title="Delete User"
                                    className="p-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-500 hover:text-red-600 hover:border-red-200 rounded-lg transition-all cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: EVENTS DIRECTORY */}
            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-display font-black text-neutral-900">Events Management</h1>
                    <p className="text-xs text-neutral-500 mt-1 font-sans">View, feature, and edit event listings. Delete listings violating safety criteria.</p>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white border border-neutral-200/80 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row items-center gap-4">
                  {/* Search input */}
                  <div className="w-full md:flex-1 relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search events by title, host organizer, or university campus..."
                      value={eventSearchQuery}
                      onChange={(e) => setEventSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-neutral-200/80 focus:border-[#F97316] rounded-xl text-xs outline-hidden"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="w-full md:w-56 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 shrink-0">Category:</span>
                    <select
                      value={eventCategoryFilter}
                      onChange={(e) => setEventCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200/80 focus:border-[#F97316] rounded-xl text-xs outline-hidden font-sans font-semibold text-neutral-700 cursor-pointer"
                    >
                      <option value="All">All Categories</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Events Modern Table */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-neutral-50/60 text-neutral-400 font-mono text-[10px] uppercase font-bold tracking-wider border-b border-neutral-100">
                          <th className="py-4 px-6">Event Details</th>
                          <th className="py-4 px-6">Host Organizer</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Schedule Date</th>
                          <th className="py-4 px-6 text-center">RSVP Count</th>
                          <th className="py-4 px-6 text-center">Status / Star</th>
                          <th className="py-4 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-xs">
                        {filteredEvents.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-neutral-400 font-sans">
                              No active event listings found. Please try another search or category.
                            </td>
                          </tr>
                        ) : (
                          filteredEvents.map((evt) => {
                            const isFeatured = featuredEvents.includes(evt.id);
                            return (
                              <tr key={evt.id} className="hover:bg-neutral-50/30 transition-colors">
                                <td className="py-4 px-6 flex items-center gap-3">
                                  <img src={evt.image} alt={evt.title} className="w-12 h-12 rounded-lg object-cover border border-neutral-200 shrink-0" />
                                  <div>
                                    <span className="text-[10px] font-bold text-emerald-600 block leading-tight">{evt.university}</span>
                                    <span className="font-bold text-neutral-900 leading-snug mt-0.5 block">{evt.title}</span>
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-2">
                                    <img src={evt.organizerAvatar} alt={evt.organizer} className="w-5 h-5 rounded-full object-cover border border-neutral-200" />
                                    <span className="font-semibold text-neutral-700">{evt.organizer}</span>
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-md text-[10px] font-mono font-bold text-neutral-600">
                                    {evt.category}
                                  </span>
                                </td>
                                <td className="py-4 px-6 font-mono text-neutral-500 leading-normal">{evt.date.split(", ").slice(1).join(", ")}</td>
                                <td className="py-4 px-6 text-center font-mono font-extrabold text-neutral-700">{evt.rsvpCount}</td>
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                      Listed
                                    </span>
                                    <button
                                      onClick={() => handleToggleFeatureEvent(evt.id)}
                                      title={isFeatured ? "Un-feature Event" : "Feature Event on Hero"}
                                      className="p-1 cursor-pointer transition-transform duration-150 active:scale-95"
                                    >
                                      <Star className={`w-4 h-4 ${isFeatured ? "text-amber-500 fill-current" : "text-neutral-300 hover:text-amber-400"}`} />
                                    </button>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      onClick={() => alert(`View detail simulated for event ID: ${evt.id}`)}
                                      className="p-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg transition-all cursor-pointer"
                                      title="View Details"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => alert(`Edit simulated for event ID: ${evt.id}. Complete schema fields are preserved.`)}
                                      className="p-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-[#F97316] rounded-lg transition-all cursor-pointer"
                                      title="Edit Event"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteEvent(evt.id)}
                                      className="p-1.5 bg-neutral-50 hover:bg-red-50 border border-neutral-200 hover:border-red-200 text-neutral-500 hover:text-red-600 rounded-lg transition-all cursor-pointer"
                                      title="Delete Event"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: EVENT APPROVALS QUEUE */}
            {activeTab === "approvals" && (
              <motion.div
                key="approvals"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-display font-black text-neutral-900">Event Approval Queue</h1>
                  <p className="text-xs text-neutral-500 mt-1 font-sans">Review pending student club and department event drafts. Screen layout structures before public listing.</p>
                </div>

                {approvals.length === 0 ? (
                  <div className="bg-white border border-neutral-200/80 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h3 className="font-display font-black text-neutral-900 text-lg">Queue Clean!</h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto leading-normal">
                      Excellent! There are no pending event drafts awaiting review. All submissions have been approved.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {approvals.map((app) => (
                      <div 
                        key={app.id} 
                        className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Banner */}
                          <div className="relative h-44 w-full">
                            <img src={app.image} alt={app.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#F97316] border border-neutral-200 uppercase tracking-widest shadow-sm">
                              {app.category}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-90">{app.university}</span>
                              <h3 className="font-display font-black text-base leading-tight mt-1 truncate">{app.title}</h3>
                            </div>
                          </div>

                          {/* Info area */}
                          <div className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Organizer Host</span>
                                <span className="text-neutral-800 font-bold block mt-0.5">{app.organizer}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Submission Date</span>
                                <span className="text-neutral-800 font-mono block mt-0.5">{app.submissionDate}</span>
                              </div>
                            </div>

                            <div className="border-t border-neutral-100 pt-3">
                              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold mb-1">Proposed Description</span>
                              <p className="text-xs text-neutral-600 leading-relaxed font-sans line-clamp-3">
                                {app.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Drawer Buttons */}
                        <div className="p-5 bg-neutral-50/50 border-t border-neutral-100 grid grid-cols-3 gap-2.5">
                          <button
                            onClick={() => handleRejectEvent(app.id, app.title)}
                            className="py-2 px-1 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer text-center"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleRequestChanges(app.title)}
                            className="py-2 px-1 border border-neutral-200 hover:bg-neutral-100 text-neutral-700 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer text-center"
                          >
                            Request Edits
                          </button>
                          <button
                            onClick={() => handleApproveEvent(app)}
                            className="py-2 px-1 bg-gradient-to-r from-[#059669] to-[#10B981] text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1 shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB: CATEGORIES */}
            {activeTab === "categories" && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-display font-black text-neutral-900">Platform Categories</h1>
                    <p className="text-xs text-neutral-500 mt-1 font-sans">Organize event filtering classifications. Add custom descriptors and branding color codes.</p>
                  </div>
                  <button
                    onClick={handleOpenCategoryCreate}
                    className="py-2.5 px-4 bg-neutral-900 hover:bg-[#F97316] text-white text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Category
                  </button>
                </div>

                {/* Categories Cards Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categories.map((cat) => (
                    <div 
                      key={cat.id} 
                      className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:border-neutral-300 hover:shadow-md transition-all"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none african-pattern-subtle" />
                      <div>
                        <div className="flex items-center justify-between">
                          <span 
                            className="px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-full tracking-wider"
                            style={{ backgroundColor: `${cat.accentColor}12`, color: cat.accentColor, border: `1px solid ${cat.accentColor}25` }}
                          >
                            {cat.name}
                          </span>
                          <span className="text-[10px] font-mono font-black text-neutral-400 bg-neutral-50 px-2 py-0.5 border border-neutral-200/40 rounded-md uppercase">
                            {cat.eventCount} Events
                          </span>
                        </div>

                        <p className="text-xs text-neutral-500 leading-relaxed font-sans mt-4">
                          {cat.description}
                        </p>
                      </div>

                      {/* Action buttons footer */}
                      <div className="border-t border-neutral-100/80 pt-4 mt-6 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase">{cat.id}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenCategoryEdit(cat)}
                            className="p-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg transition-all cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-1.5 bg-neutral-50 hover:bg-red-50 border border-neutral-200 hover:border-red-200 text-neutral-500 hover:text-red-600 rounded-lg transition-all cursor-pointer"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: REPORTS & ANALYTICS */}
            {activeTab === "reports" && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-display font-black text-neutral-900">Reports & Platform Analytics</h1>
                  <p className="text-xs text-neutral-500 mt-1 font-sans">High-level growth charts, event creation frequency, and registration telemetry metrics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chart 1: User Growth */}
                  <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs">
                    <h3 className="font-display font-black text-neutral-900 text-sm mb-4">User Registration Growth Trend</h3>
                    {/* Visual Chart Graphic (SVG Based) */}
                    <div className="h-56 w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex items-end justify-between relative overflow-hidden">
                      {/* Grid lines */}
                      <div className="absolute inset-x-0 bottom-1/4 border-b border-dashed border-neutral-200/60" />
                      <div className="absolute inset-x-0 bottom-2/4 border-b border-dashed border-neutral-200/60" />
                      <div className="absolute inset-x-0 bottom-3/4 border-b border-dashed border-neutral-200/60" />

                      {/* Line graph simulated via responsive columns and floating point bubbles */}
                      {[15, 30, 42, 60, 58, 85, 110].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative cursor-pointer">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] border-2 border-white shadow-md mb-2 transition-transform duration-150 group-hover:scale-150" style={{ transform: `translateY(-${val * 1.2}px)` }} />
                          <div className="w-1 bg-[#F97316]/20 absolute bottom-0 hover:bg-[#F97316]/40 pointer-events-none" style={{ height: `${val * 1.5}px` }} />
                          <span className="text-[9px] font-mono text-neutral-400 group-hover:text-[#F97316] transition-colors mt-1">M{idx+1}</span>

                          {/* Hover tooltip */}
                          <div className="absolute opacity-0 group-hover:opacity-100 bg-neutral-900 text-white font-mono text-[9px] px-2 py-0.5 rounded-md -top-6 transition-all duration-200 pointer-events-none text-center">
                            +{val * 4} Users
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chart 2: Ticket RSVP distribution */}
                  <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs">
                    <h3 className="font-display font-black text-neutral-900 text-sm mb-4">Weekly RSVP Check-in Conversion</h3>
                    <div className="h-56 w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex items-end justify-between relative overflow-hidden">
                      {/* Grid lines */}
                      <div className="absolute inset-x-0 bottom-1/4 border-b border-dashed border-neutral-200/60" />
                      <div className="absolute inset-x-0 bottom-2/4 border-b border-dashed border-neutral-200/60" />
                      <div className="absolute inset-x-0 bottom-3/4 border-b border-dashed border-neutral-200/60" />

                      {/* Line graph simulated via responsive columns and floating point bubbles */}
                      {[25, 38, 55, 45, 78, 92, 125].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative cursor-pointer">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#059669] border-2 border-white shadow-md mb-2 transition-transform duration-150 group-hover:scale-150" style={{ transform: `translateY(-${val * 1.1}px)` }} />
                          <div className="w-1 bg-[#059669]/20 absolute bottom-0 hover:bg-[#059669]/40 pointer-events-none" style={{ height: `${val * 1.4}px` }} />
                          <span className="text-[9px] font-mono text-neutral-400 group-hover:text-[#059669] transition-colors mt-1">W{idx+1}</span>

                          {/* Hover tooltip */}
                          <div className="absolute opacity-0 group-hover:opacity-100 bg-neutral-900 text-white font-mono text-[9px] px-2 py-0.5 rounded-md -top-6 transition-all duration-200 pointer-events-none text-center">
                            {val} scans
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analytical Summary Grid */}
                <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-black">Top Performing Campus</h4>
                    <p className="text-sm font-bold text-neutral-800">African Leadership University (ALU)</p>
                    <span className="text-xs text-neutral-500 font-sans">Representing 12 high-capacity engineering conferences.</span>
                  </div>
                  <div className="space-y-1 border-y md:border-y-0 md:border-x border-neutral-200/70 py-4 md:py-0 md:px-6">
                    <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-black">Average Event Capacity</h4>
                    <p className="text-sm font-bold text-neutral-800">420 Attendees / Venue</p>
                    <span className="text-xs text-neutral-500 font-sans">74.2% general reservation filling rate.</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-black">Total Scans v RSVP</h4>
                    <p className="text-sm font-bold text-emerald-600">89.4% Check-In Rate</p>
                    <span className="text-xs text-neutral-500 font-sans">High trust QR code scanning at entrance gates.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: ANNOUNCEMENTS */}
            {activeTab === "announcements" && (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-display font-black text-neutral-900">System Announcements</h1>
                    <p className="text-xs text-neutral-500 mt-1 font-sans">Broadcast notifications or guideline amendments to student calendars and user dashboards.</p>
                  </div>
                  <button
                    onClick={handleOpenAnnouncementCreate}
                    className="py-2.5 px-4 bg-neutral-900 hover:bg-[#F97316] text-white text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <PlusCircle className="w-4 h-4" />
                    New Broadcast
                  </button>
                </div>

                {/* Announcements Feed list */}
                <div className="space-y-4">
                  {announcements.map((ann) => (
                    <div 
                      key={ann.id} 
                      className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row gap-5 items-start justify-between hover:border-neutral-300 transition-all"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md ${
                            ann.status === "Published" 
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                              : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                          }`}>
                            {ann.status}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400 font-bold">{ann.publishDate} • {ann.id}</span>
                        </div>
                        <h3 className="font-display font-black text-neutral-950 text-base">{ann.title}</h3>
                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">{ann.description}</p>
                      </div>

                      {/* Announcement controls */}
                      <div className="flex items-center gap-2 self-end md:self-center">
                        <button
                          onClick={() => handleToggleAnnouncementStatus(ann.id)}
                          className={`px-3 py-1.5 border rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                            ann.status === "Published"
                              ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                              : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {ann.status === "Published" ? "Revoke Broadcast" : "Publish Broadcast"}
                        </button>
                        <button
                          onClick={() => handleOpenAnnouncementEdit(ann)}
                          className="p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-xl transition-all cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAnnouncement(ann.id)}
                          className="p-2 bg-neutral-50 hover:bg-red-50 border border-neutral-200 hover:border-red-200 text-neutral-500 hover:text-red-600 rounded-xl transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl bg-white border border-neutral-200/80 rounded-[2rem] p-6 sm:p-8 shadow-xs space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-display font-black text-neutral-900">Platform Settings</h1>
                  <p className="text-xs text-neutral-500 mt-1 font-sans">Configure platform metadata parameters and verification presets. Changes are saved in live session states.</p>
                </div>

                <div className="space-y-4">
                  {/* Platform Metadata */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Platform Branding Name</label>
                      <input
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl text-xs outline-hidden font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Platform Branding Logo Text</label>
                      <input
                        type="text"
                        value={platformLogo}
                        onChange={(e) => setPlatformLogo(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl text-xs outline-hidden font-bold"
                      />
                    </div>
                  </div>

                  {/* Mail configs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Outgoing Sender Email</label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl text-xs outline-hidden font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">SMTP Relay Engine</label>
                      <select
                        value={emailProvider}
                        onChange={(e) => setEmailProvider(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl text-xs outline-hidden cursor-pointer text-neutral-700 font-semibold"
                      >
                        <option value="SendGrid SMTP">SendGrid SMTP Integration</option>
                        <option value="Amazon SES SMTP">Amazon SES Relay</option>
                        <option value="Mailgun SMTP">Mailgun High Performance</option>
                      </select>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Global UI Theme</label>
                      <select
                        value={selectedTheme}
                        onChange={(e) => setSelectedTheme(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl text-xs outline-hidden cursor-pointer text-neutral-700 font-semibold"
                      >
                        <option value="Light">Light Slate Theme (Branded)</option>
                        <option value="Dark">Cosmic Dark Theme (High Contrast)</option>
                        <option value="System">System Default Matching</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">System Interface Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl text-xs outline-hidden cursor-pointer text-neutral-700 font-semibold"
                      >
                        <option value="English">English (US/UK)</option>
                        <option value="French">Français</option>
                        <option value="Swahili">Kiswahili</option>
                        <option value="Yoruba">Yorùbá</option>
                      </select>
                    </div>
                  </div>

                  {/* Toggle Checkboxes */}
                  <div className="space-y-3 pt-3 border-t border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold block mb-1">Telemetry Broadcast Triggers</span>
                    <label className="flex items-center gap-3 text-xs text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifyOnNewUser}
                        onChange={(e) => setNotifyOnNewUser(e.target.checked)}
                        className="w-4 h-4 accent-[#F97316] cursor-pointer"
                      />
                      Transmit immediate confirmation email on User Signup
                    </label>
                    <label className="flex items-center gap-3 text-xs text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifyOnNewEvent}
                        onChange={(e) => setNotifyOnNewEvent(e.target.checked)}
                        className="w-4 h-4 accent-[#F97316] cursor-pointer"
                      />
                      Alert administrator on new Event Approval draft uploads
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => alert("Platform configurations saved. Live changes dispatched to session hooks.")}
                      className="py-3 px-6 bg-gradient-to-r from-[#F97316] to-[#E5630F] text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center gap-1.5"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* MODAL: VIEW USER DETAILS */}
      <AnimatePresence>
        {userModalMode === "view" && selectedUser && (
          <div className="fixed inset-0 bg-neutral-900/45 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full border border-neutral-200 overflow-hidden shadow-2xl relative"
            >
              <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />
              <div className="p-6">
                <button
                  onClick={() => setUserModalMode(null)}
                  className="p-1 absolute top-5 right-5 hover:bg-neutral-100 rounded-full cursor-pointer text-neutral-400 hover:text-neutral-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center mt-4">
                  <img src={selectedUser.avatar} alt={selectedUser.fullName} className="w-16 h-16 rounded-full object-cover border-2 border-[#F97316]/20 shadow-md" />
                  <h3 className="font-display font-black text-neutral-900 text-lg mt-3">{selectedUser.fullName}</h3>
                  <span className="text-xs text-neutral-400 font-mono select-all">{selectedUser.email}</span>
                </div>

                <div className="mt-6 border-t border-neutral-100 pt-5 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Attendee ID</span>
                      <span className="text-neutral-800 font-bold font-mono mt-0.5 block select-all">{selectedUser.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Role Hierarchy</span>
                      <span className="text-neutral-800 font-bold font-sans mt-0.5 block">{selectedUser.role}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">System Status</span>
                      <span className={`font-bold mt-0.5 block ${selectedUser.status === "Active" ? "text-emerald-600" : "text-red-500"}`}>{selectedUser.status}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Join Date</span>
                      <span className="text-neutral-800 font-bold font-sans mt-0.5 block">{selectedUser.joinDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setUserModalMode(null)}
                    className="py-2.5 px-5 bg-neutral-900 text-white font-bold text-xs rounded-full cursor-pointer"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: EDIT USER DETAILS */}
      <AnimatePresence>
        {userModalMode === "edit" && selectedUser && (
          <div className="fixed inset-0 bg-neutral-900/45 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full border border-neutral-200 overflow-hidden shadow-2xl relative"
            >
              <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />
              <div className="p-6 space-y-4">
                <button
                  onClick={() => setUserModalMode(null)}
                  className="p-1 absolute top-5 right-5 hover:bg-neutral-100 rounded-full cursor-pointer text-neutral-400 hover:text-neutral-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <h3 className="font-display font-black text-neutral-900 text-base">Edit User Profile</h3>
                  <p className="text-[10px] text-neutral-400 font-sans">Modify security role credentials and status triggers.</p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Full Name</label>
                    <input
                      type="text"
                      value={editUserName}
                      onChange={(e) => setEditUserName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Email Address</label>
                    <input
                      type="email"
                      value={editUserEmail}
                      onChange={(e) => setEditUserEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Role</label>
                      <select
                        value={editUserRole}
                        onChange={(e) => setEditUserRole(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-sans font-bold cursor-pointer"
                      >
                        <option value="Student">Student</option>
                        <option value="Organizer">Organizer</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Status</label>
                      <select
                        value={editUserStatus}
                        onChange={(e) => setEditUserStatus(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-sans font-bold cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 text-xs">
                  <button
                    onClick={() => setUserModalMode(null)}
                    className="py-2.5 px-4 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-full cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUserEdit}
                    className="py-2.5 px-5 bg-gradient-to-r from-[#F97316] to-[#E5630F] text-white font-bold rounded-full cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: CREATE / EDIT CATEGORY */}
      <AnimatePresence>
        {categoryModalMode && (
          <div className="fixed inset-0 bg-neutral-900/45 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full border border-neutral-200 overflow-hidden shadow-2xl relative"
            >
              <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />
              <div className="p-6 space-y-4">
                <button
                  onClick={() => setCategoryModalMode(null)}
                  className="p-1 absolute top-5 right-5 hover:bg-neutral-100 rounded-full cursor-pointer text-neutral-400 hover:text-neutral-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <h3 className="font-display font-black text-neutral-900 text-base">
                    {categoryModalMode === "create" ? "Create New Category" : "Edit Category Descriptor"}
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-sans">Set branding color indices and filtration text labels.</p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Category Title Label</label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="e.g., Symposium, Research Exhibition..."
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Branding Color Code</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                        className="w-10 h-10 border border-neutral-200 rounded-xl cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Proposed Description</label>
                    <textarea
                      rows={3}
                      value={categoryDescription}
                      onChange={(e) => setCategoryDescription(e.target.value)}
                      placeholder="Give a short overview..."
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 text-xs">
                  <button
                    onClick={() => setCategoryModalMode(null)}
                    className="py-2.5 px-4 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-full cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCategory}
                    className="py-2.5 px-5 bg-gradient-to-r from-[#F97316] to-[#E5630F] text-white font-bold rounded-full cursor-pointer"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: CREATE / EDIT ANNOUNCEMENT */}
      <AnimatePresence>
        {announcementModalMode && (
          <div className="fixed inset-0 bg-neutral-900/45 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full border border-neutral-200 overflow-hidden shadow-2xl relative"
            >
              <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />
              <div className="p-6 space-y-4">
                <button
                  onClick={() => setAnnouncementModalMode(null)}
                  className="p-1 absolute top-5 right-5 hover:bg-neutral-100 rounded-full cursor-pointer text-neutral-400 hover:text-neutral-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <h3 className="font-display font-black text-neutral-900 text-base">
                    {announcementModalMode === "create" ? "Create New Broadcast" : "Edit System Broadcast"}
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-sans">Dispatch global banner notifications to all campus student profiles.</p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Broadcast Subject Title</label>
                    <input
                      type="text"
                      value={announcementTitle}
                      onChange={(e) => setAnnouncementTitle(e.target.value)}
                      placeholder="e.g., Campus Center Maintenance..."
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Publication Status</label>
                    <select
                      value={announcementStatus}
                      onChange={(e) => setAnnouncementStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-bold cursor-pointer"
                    >
                      <option value="Published">Published Live (Broadcast immediately)</option>
                      <option value="Draft">Draft Mode (Save for later review)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Broadcast Content Detail</label>
                    <textarea
                      rows={4}
                      value={announcementDescription}
                      onChange={(e) => setAnnouncementDescription(e.target.value)}
                      placeholder="Write message details for attendees and hosts..."
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 focus:border-[#F97316] rounded-xl outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 text-xs">
                  <button
                    onClick={() => setAnnouncementModalMode(null)}
                    className="py-2.5 px-4 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-full cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAnnouncement}
                    className="py-2.5 px-5 bg-gradient-to-r from-[#F97316] to-[#E5630F] text-white font-bold rounded-full cursor-pointer"
                  >
                    Save Broadcast
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
