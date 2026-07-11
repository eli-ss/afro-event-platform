/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  university: string;
  city: string;
  country: string;
  organizer: string;
  organizerAvatar: string;
  organizerRole: string;
  image: string;
  category: "Academic Seminar" | "Workshop" | "Career Fair" | "Startup Pitch" | "Hackathon" | "Cultural Event" | "Competition";
  price: string;
  isFree: boolean;
  rsvpCount: number;
  description: string;
  capacity: number;
  tags: string[];
}

export const INITIAL_EVENTS: Event[] = [
  {
    id: "evt-afro-tech-uni",
    title: "AI Localization & African Language Models",
    date: "THU, OCT 15, 2026",
    time: "10:00 AM CAT",
    location: "African Leadership University Campus, Kigali",
    university: "African Leadership University (ALU)",
    city: "Kigali",
    country: "Rwanda",
    organizer: "ALU Research Department",
    organizerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    organizerRole: "Pan-African Higher Education Network",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    category: "Academic Seminar",
    price: "Free",
    isFree: true,
    rsvpCount: 245,
    description: "Join leading pan-African academics, software engineers, and digital innovators for a comprehensive seminar discussing AI localization, decentralized offline infrastructure, and open-source models crafted by African researchers for African development.",
    capacity: 500,
    tags: ["Artificial Intelligence", "Tech For Good", "Academic Forum", "ALU"]
  },
  {
    id: "evt-ug-offline",
    title: "Mobile Web & Offline-First Architectures",
    date: "SAT, NOV 21, 2026",
    time: "02:00 PM GMT",
    location: "University of Ghana Engineering Hall, Accra",
    university: "University of Ghana",
    city: "Accra",
    country: "Ghana",
    organizer: "UG Developer Student Club",
    organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    organizerRole: "UG Engineering Lead",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    category: "Workshop",
    price: "Free",
    isFree: true,
    rsvpCount: 180,
    description: "A hands-on coding session exploring how to build reliable, high-performance web applications that function flawlessly on unstable networks. Learn service workers, client-side indexing, and vector data syncing for remote regions.",
    capacity: 250,
    tags: ["WebDev", "Offline First", "Service Workers", "Coding"]
  },
  {
    id: "evt-unilag-careers",
    title: "Pan-African Student Careers & Internships 2026",
    date: "FRI, DEC 11, 2026",
    time: "09:00 AM WAT",
    location: "University of Lagos Multipurpose Hall, Lagos",
    university: "University of Lagos",
    city: "Lagos",
    country: "Nigeria",
    organizer: "UNILAG Placement Office",
    organizerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    organizerRole: "University of Lagos Career Centre",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    category: "Career Fair",
    price: "Free",
    isFree: true,
    rsvpCount: 1520,
    description: "The largest university career pavilion connecting graduating students and active alumni with top technology companies, investment banks, and pan-African corporations offering remote and local entry-level roles.",
    capacity: 2000,
    tags: ["Careers", "Recruitment", "Internships", "Lagos Jobs"]
  },
  {
    id: "evt-ashesi-pitch",
    title: "Ashesi Venture Accelerator Demo Day",
    date: "MON, JAN 18, 2027",
    time: "03:00 PM GMT",
    location: "Ashesi University Archer Hall, Berekuso",
    university: "Ashesi University",
    city: "Accra",
    country: "Ghana",
    organizer: "Ashesi D-Lab",
    organizerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
    organizerRole: "Ashesi Design & Innovation Lab",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80",
    category: "Startup Pitch",
    price: "Free",
    isFree: true,
    rsvpCount: 420,
    description: "Witness Ashesi University's student and alumni startup founders pitch their scalable business models to regional angel investors and venture capitalists. Showcasing tech in agriculture, healthcare, and educational equity.",
    capacity: 500,
    tags: ["Entrepreneurship", "Venture Capital", "Ashesi Startups"]
  },
  {
    id: "evt-kenyatta-hack",
    title: "Kenyatta Uni GreenTech Hackathon",
    date: "SUN, MAR 07, 2027",
    time: "08:00 AM EAT",
    location: "Kenyatta University Tech Hub, Nairobi",
    university: "Kenyatta University",
    city: "Nairobi",
    country: "Kenya",
    organizer: "Kenyatta Tech Society",
    organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    organizerRole: "Kenyatta University Tech Hub",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    category: "Hackathon",
    price: "Free",
    isFree: true,
    rsvpCount: 650,
    description: "A 48-hour competitive sprint for Nairobi university students to construct hardware or software prototypes targeting water preservation, clean solar management, and sustainable micro-grid tech.",
    capacity: 800,
    tags: ["Hackathon", "Sustainability", "GreenTech", "Nairobi Devs"]
  },
  {
    id: "evt-uct-gala",
    title: "UCT African Cultural Heritage Gala",
    date: "SAT, APR 24, 2027",
    time: "06:00 PM SAST",
    location: "University of Cape Town Jameson Hall, Cape Town",
    university: "University of Cape Town",
    city: "Cape Town",
    country: "South Africa",
    organizer: "UCT Student Representative Council",
    organizerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    organizerRole: "UCT SRC Cultural Board",
    image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80",
    category: "Cultural Event",
    price: "$5.00",
    isFree: false,
    rsvpCount: 1150,
    description: "An elegant night of traditional African live music, indigenous culinary tasting, poetry slams, and visual art installations curated entirely by student unions across Southern Africa.",
    capacity: 1500,
    tags: ["Heritage", "Music", "Art", "Gala", "UCT"]
  },
  {
    id: "evt-wits-debate",
    title: "Wits University AI Ethics Debate Cup",
    date: "WED, MAY 12, 2027",
    time: "01:00 PM SAST",
    location: "University of the Witwatersrand Great Hall, Johannesburg",
    university: "University of the Witwatersrand",
    city: "Johannesburg",
    country: "South Africa",
    organizer: "Wits Debate Union",
    organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    organizerRole: "Wits Academic Debate Association",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    category: "Competition",
    price: "Free",
    isFree: true,
    rsvpCount: 380,
    description: "Students from top South African universities compete in a dynamic debate cup focusing on the regulatory challenges, algorithmic bias, and sovereign integrity of artificial intelligence deployment in Africa.",
    capacity: 500,
    tags: ["Competition", "Ethics", "Debate", "Academic Panel"]
  }
];

export const FEATURED_ORGANIZERS = [
  {
    name: "African Leadership University",
    logo: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=100&q=80",
    location: "Mauritius & Kigali",
    eventsCount: 34,
    verified: true
  },
  {
    name: "Ashesi D-Lab",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80",
    location: "Berekuso, Ghana",
    eventsCount: 19,
    verified: true
  },
  {
    name: "UNILAG Placement Board",
    logo: "https://images.unsplash.com/photo-1513829096999-4978602297f7?auto=format&fit=crop&w=100&q=80",
    location: "Lagos, Nigeria",
    eventsCount: 45,
    verified: true
  },
  {
    name: "Kenyatta Uni Tech",
    logo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=100&q=80",
    location: "Nairobi, Kenya",
    eventsCount: 28,
    verified: true
  },
  {
    name: "UCT Student Council",
    logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=100&q=80",
    location: "Cape Town, South Africa",
    eventsCount: 12,
    verified: true
  }
];
