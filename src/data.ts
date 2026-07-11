/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ColorGroup, TypographyItem, SpacingItem, BorderRadiusItem, ShadowItem, BadgeItem, EventTagItem, MockEvent } from "./types";

export const colorPaletteData: ColorGroup[] = [
  {
    title: "Primary Brand Palette (Warm Orange)",
    description: "The soul of Afro Event. Warm Orange represents energy, fire, sunset, and hospitality in African culture. Used for core branding, main actions, and call-to-actions.",
    swatches: [
      { name: "Brand 50", hex: "#fdf5f0", variable: "bg-brand-50", description: "Soft background tint for highlights and cards.", textClass: "text-brand-900", contrastWhite: "1.1:1", contrastCharcoal: "19:1" },
      { name: "Brand 100", hex: "#fde8da", variable: "bg-brand-100", description: "Muted orange for tags, hover states, or subtle borders.", textClass: "text-brand-900", contrastWhite: "1.3:1", contrastCharcoal: "16:1" },
      { name: "Brand-300", hex: "#f7b283", variable: "bg-brand-300", description: "Vibrant accent line, focus rings, or hover states.", textClass: "text-brand-950", contrastWhite: "2.1:1", contrastCharcoal: "9.8:1" },
      { name: "Brand 500 (Primary)", hex: "#F27D26", variable: "bg-brand-500", description: "Main primary brand. Buttons, active navigation, indicators.", textClass: "text-white", contrastWhite: "4.5:1 (AA)", contrastCharcoal: "4.5:1 (AA)" },
      { name: "Brand 700", hex: "#b65e1d", variable: "bg-brand-700", description: "Deep rust-orange. High contrast states, links, dark accents.", textClass: "text-white", contrastWhite: "7.1:1 (AAA)", contrastCharcoal: "2.8:1" },
      { name: "Brand 900", hex: "#743c13", variable: "bg-brand-900", description: "Elegant very deep brown-orange. Headings, rich accents.", textClass: "text-white", contrastWhite: "12.3:1 (AAA)", contrastCharcoal: "1.6:1" }
    ]
  },
  {
    title: "Accent Palette (Emerald Green)",
    description: "Emerald Green symbolizes the rich soil, natural landscapes, wealth, and vitality of Africa. Used as an elegant contrast accent for registrations, tickets, success states, and categories.",
    swatches: [
      { name: "Emerald 50", hex: "#f0fdf4", variable: "bg-accent-50", description: "Background tint for successful messages or category highlights.", textClass: "text-accent-900", contrastWhite: "1.1:1", contrastCharcoal: "19:1" },
      { name: "Emerald 100", hex: "#dcfce7", variable: "bg-accent-100", description: "Soft green container for tickets and badges.", textClass: "text-accent-900", contrastWhite: "1.2:1", contrastCharcoal: "17:1" },
      { name: "Emerald 500 (Accent)", hex: "#059669", variable: "bg-accent-500", description: "Main accent color. Tag indicators, success markers, highlights.", textClass: "text-white", contrastWhite: "4.5:1 (AA)", contrastCharcoal: "4.5:1 (AA)" },
      { name: "Emerald 700", hex: "#047857", variable: "bg-accent-700", description: "Dark emerald. Trustworthy badges, text links, secure locks.", textClass: "text-white", contrastWhite: "7.4:1 (AAA)", contrastCharcoal: "2.7:1" }
    ]
  },
  {
    title: "Neutral Palette (Charcoal & White)",
    description: "Keeps the application grounded, premium, and clean. Charcoal provides high-contrast legibility, preventing the colorful brand from feeling cluttered or overwhelming.",
    swatches: [
      { name: "White (Primary Bg)", hex: "#ffffff", variable: "bg-white", description: "Pure, pristine background. Generous negative space.", textClass: "text-charcoal-900", contrastWhite: "1:1", contrastCharcoal: "21:1 (AAA)" },
      { name: "Charcoal 50 (Off-White)", hex: "#f9fafb", variable: "bg-charcoal-50", description: "Page background, alternative sections, card gutters.", textClass: "text-charcoal-900", contrastWhite: "1.05:1", contrastCharcoal: "19.5:1" },
      { name: "Charcoal 100", hex: "#f3f4f6", variable: "bg-charcoal-100", description: "Subtle lines, inactive borders, secondary button background.", textClass: "text-charcoal-800", contrastWhite: "1.1:1", contrastCharcoal: "18.5:1" },
      { name: "Charcoal 300", hex: "#d1d5db", variable: "bg-charcoal-300", description: "Divider lines, disabled borders, slider tracks.", textClass: "text-charcoal-700", contrastWhite: "1.5:1", contrastCharcoal: "14:1" },
      { name: "Charcoal 600", hex: "#4b5563", variable: "bg-charcoal-600", description: "Muted copy text, caption labels, icons.", textClass: "text-white", contrastWhite: "4.5:1 (AA)", contrastCharcoal: "4.5:1 (AA)" },
      { name: "Charcoal 900 (Main Text)", hex: "#111827", variable: "bg-charcoal-900", description: "Body text, primary titles, high-contrast borders.", textClass: "text-white", contrastWhite: "18.5:1 (AAA)", contrastCharcoal: "1.1:1" }
    ]
  }
];

export const typographyData: TypographyItem[] = [
  {
    tag: "H1",
    name: "Display Title Large",
    font: "Poppins",
    sizeMobile: "32px / 2.0rem",
    sizeDesktop: "48px / 3.0rem",
    weight: "Bold (700)",
    tracking: "tight (-0.025em)",
    usage: "Hero headers, primary welcome titles, landing page value propositions.",
    example: "Experience African Culture in Motion"
  },
  {
    tag: "H2",
    name: "Section Header",
    font: "Poppins",
    sizeMobile: "24px / 1.5rem",
    sizeDesktop: "32px / 2.0rem",
    weight: "SemiBold (600)",
    tracking: "tight (-0.02em)",
    usage: "Primary sections, container group titles, event explorer categories.",
    example: "Featured Gatherings Near You"
  },
  {
    tag: "H3",
    name: "Card Title / Sub-header",
    font: "Poppins",
    sizeMobile: "20px / 1.25rem",
    sizeDesktop: "24px / 1.5rem",
    weight: "SemiBold (600)",
    tracking: "normal (0em)",
    usage: "Event card titles, sidebar widget headers, overlay overlays.",
    example: "AfroTech Innovation Summit 2026"
  },
  {
    tag: "H4",
    name: "Small Sub-header",
    font: "Poppins",
    sizeMobile: "16px / 1.0rem",
    sizeDesktop: "18px / 1.125rem",
    weight: "Medium (500)",
    tracking: "wide (0.01em)",
    usage: "Form section titles, small card attributes, organizer headings.",
    example: "Registration & RSVP Settings"
  },
  {
    tag: "Body Large",
    name: "Introductory Body Text",
    font: "Inter",
    sizeMobile: "16px / 1.0rem",
    sizeDesktop: "18px / 1.125rem",
    weight: "Regular (400)",
    tracking: "normal (0em)",
    usage: "Paragraph summaries below large headers, prominent descriptions.",
    example: "Connect with thousands of creators, engineers, and entrepreneurs across Africa's fastest growing tech ecosystems."
  },
  {
    tag: "Body Regular",
    name: "Primary Copy Text",
    font: "Inter",
    sizeMobile: "14px / 0.875rem",
    sizeDesktop: "14px / 0.875rem",
    weight: "Regular (400)",
    tracking: "normal (0em)",
    usage: "Event descriptions, lists, default form labels, dialog bodies.",
    example: "The workshop covers fundamental components of the creative economy, business models, funding, and cross-border digital trade policies."
  },
  {
    tag: "Caption / Meta",
    name: "Supporting Metadata",
    font: "Inter",
    sizeMobile: "12px / 0.75rem",
    sizeDesktop: "12px / 0.75rem",
    weight: "Medium (500)",
    tracking: "wide (0.025em)",
    usage: "Dates, location notes, host labels, timestamp metrics, price tags.",
    example: "SAT, JUL 18 • 9:00 AM WAT • KIGALI HEIGHTS"
  }
];

export const spacingData: SpacingItem[] = [
  { token: "space-xs", size: "4px / 0.25rem", pixels: 4, usage: "Text line spacing, small badges padding, icon-text gap." },
  { token: "space-sm", size: "8px / 0.5rem", pixels: 8, usage: "Tag paddings, internal card-element spacings, small button heights." },
  { token: "space-md", size: "16px / 1.0rem", pixels: 16, usage: "Standard form fields gaps, internal card padding, button padding." },
  { token: "space-lg", size: "24px / 1.5rem", pixels: 24, usage: "Card-to-card spacing, container header gutters, sidebar gaps." },
  { token: "space-xl", size: "48px / 3.0rem", pixels: 48, usage: "Section-to-section spacing, page-level outer margins, hero offsets." }
];

export const borderRadiusData: BorderRadiusItem[] = [
  { token: "rounded-sm", value: "4px", usage: "Checkboxes, small tags, mini indicators." },
  { token: "rounded-md", value: "8px", usage: "Input fields, buttons, small panels." },
  { token: "rounded-lg", value: "16px", usage: "Main event cards, dialog boxes, content containers." },
  { token: "rounded-full", value: "9999px", usage: "Pills, badges, user avatars, floating buttons." }
];

export const shadowData: ShadowItem[] = [
  { token: "shadow-sm", value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", usage: "Input text fields, small flat buttons." },
  { token: "shadow-md (Default)", value: "0 4px 6px -1px rgba(26, 30, 33, 0.08)", usage: "Stationary cards, navigation headers, sidebar widgets." },
  { token: "shadow-lg (Elevated)", value: "0 12px 20px -3px rgba(26, 30, 33, 0.12)", usage: "Hovered cards, dropdown selectors, modal overlays." }
];

export const badgeData: BadgeItem[] = [
  { label: "Active", bgClass: "bg-accent-50", textClass: "text-accent-800", borderClass: "border-accent-200", usage: "Published events, active tickets, successful actions." },
  { label: "Draft", bgClass: "bg-charcoal-100", textClass: "text-charcoal-600", borderClass: "border-charcoal-300", usage: "In-progress event creations, offline setups." },
  { label: "Featured", bgClass: "bg-brand-50", textClass: "text-brand-800", borderClass: "border-brand-200", usage: "Premium spots, highly popular community gatherings." },
  { label: "Sold Out", bgClass: "bg-red-50", textClass: "text-red-700", borderClass: "border-red-200", usage: "Closed registration events, full capacity limits." }
];

export const tagData: EventTagItem[] = [
  { label: "Technology", bgClass: "bg-blue-50 hover:bg-blue-100 border-blue-100 text-blue-700", iconName: "Laptop" },
  { label: "Business", bgClass: "bg-indigo-50 hover:bg-indigo-100 border-indigo-100 text-indigo-700", iconName: "Briefcase" },
  { label: "Culture", bgClass: "bg-brand-50 hover:bg-brand-100 border-brand-200 text-brand-700", iconName: "Music" },
  { label: "Education", bgClass: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800", iconName: "GraduationCap" },
  { label: "Community", bgClass: "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800", iconName: "Users" }
];

export const mockEventsData: MockEvent[] = [
  {
    id: "evt-1",
    title: "AfroTech Summit 2026",
    date: "THU, OCT 15, 2026",
    time: "09:00 WAT",
    location: "Kigali Convention Centre, Rwanda",
    hostName: "Afrinnovate Labs",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    category: "Technology",
    price: "$150.00",
    isFree: false,
    rsvpCount: 1420,
    description: "The premier pan-African gathering for tech visionaries, venture capital investors, developers, and disruptors shaping the continent's digital economy.",
    colorTheme: "#F27D26",
    patternType: "vibrant"
  },
  {
    id: "evt-2",
    title: "Lagos Creative Economy Summit",
    date: "SAT, NOV 21, 2026",
    time: "10:00 WAT",
    location: "The Federal Palace, Victoria Island, Lagos",
    hostName: "Lagos Arts Collective",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    category: "Business",
    price: "Free",
    isFree: true,
    rsvpCount: 840,
    description: "Unlocking cross-border digital trade and investment opportunities for film makers, fashion designers, visual artists, and music executives.",
    colorTheme: "#059669",
    patternType: "subtle"
  },
  {
    id: "evt-3",
    title: "Nairobi Arts & Heritage Exhibition",
    date: "FRI, DEC 04, 2026",
    time: "14:00 EAT",
    location: "Nairobi National Museum grounds, Kenya",
    hostName: "Kulture Africa Org",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=600&q=80",
    category: "Culture",
    price: "$25.00",
    isFree: false,
    rsvpCount: 310,
    description: "An immersive showcase of contemporary East African sculptures, live ancestral folklore performances, and native gastronomic discovery.",
    colorTheme: "#F27D26",
    patternType: "vibrant"
  },
  {
    id: "evt-4",
    title: "Pan-African Dev Camp",
    date: "MON, JAN 12, 2027",
    time: "08:30 GMT",
    location: "Impact Hub Accra, Ghana",
    hostName: "West African Geeks",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    category: "Education",
    price: "Free",
    isFree: true,
    rsvpCount: 450,
    description: "A intensive 5-day hands-on boot camp covering web3 systems, cloud scaling architecture, and localization engineering for offline-first nodes.",
    colorTheme: "#059669",
    patternType: "none"
  },
  {
    id: "evt-5",
    title: "Soweto Community Garden Festival",
    date: "SAT, FEB 20, 2027",
    time: "09:00 SAST",
    location: "Orlando West Green Haven, Johannesburg",
    hostName: "Ubuntu Green Club",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80",
    category: "Community",
    price: "$5.00",
    isFree: false,
    rsvpCount: 190,
    description: "Celebrating neighborhood agricultural resilience with organic seed swaps, compost-making demonstrations, and open-fire communal lunch.",
    colorTheme: "#F27D26",
    patternType: "subtle"
  }
];
