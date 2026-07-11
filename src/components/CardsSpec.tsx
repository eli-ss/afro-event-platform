/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { mockEventsData } from "../data";
import { Calendar, MapPin, Users, Ticket, Heart, Sparkles, Flame, Check } from "lucide-react";

export default function CardsSpec() {
  const [cardThemeFilter, setCardThemeFilter] = React.useState<"all" | "Technology" | "Business" | "Culture" | "Education" | "Community">("all");
  const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(null);
  const [activeLayout, setActiveLayout] = React.useState<"vibrant" | "subtle" | "minimal">("vibrant");
  const [savedEvents, setSavedEvents] = React.useState<{ [key: string]: boolean }>({});

  const toggleSaveEvent = (id: string) => {
    setSavedEvents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredEvents = cardThemeFilter === "all" 
    ? mockEventsData 
    : mockEventsData.filter(e => e.category === cardThemeFilter);

  return (
    <section id="cards" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-brand-500" />
          Container & Event Cards
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          Cards group events cohesively. The Afro Event card is built on high typographic legibility, soft shadow elevations, and optional traditional African geometric borders to frame the card beautifully.
        </p>
      </div>

      {/* Grid Configuration Controls */}
      <div className="glass-panel rounded-3xl p-6 lg:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Category Filters */}
        <div className="flex flex-col gap-2.5">
          <span className="font-display font-semibold text-xs text-charcoal-900">
            Filter Event Category
          </span>
          <div className="flex flex-wrap gap-1.5">
            {["all", "Technology", "Business", "Culture", "Education", "Community"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCardThemeFilter(cat as any)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer font-medium backdrop-blur-xs
                  ${cardThemeFilter === cat 
                    ? "bg-brand-500 border-brand-500 text-white font-bold shadow-xs" 
                    : "bg-white/60 border-charcoal-300/80 text-charcoal-700 hover:bg-white hover:border-charcoal-400 hover:text-charcoal-900"}`}
                id={`btn-card-filter-${cat.toLowerCase()}`}
              >
                {cat === "all" ? "All Gatherings" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Traditional Pattern Frame Controls */}
        <div className="flex flex-col gap-2.5">
          <span className="font-display font-semibold text-xs text-charcoal-900">
            Card Frame Style
          </span>
          <div className="flex gap-2">
            {[
              { id: "vibrant", label: "Sunset Pattern" },
              { id: "subtle", label: "Slate Pattern" },
              { id: "minimal", label: "Clean Minimalist" }
            ].map((layout) => (
              <button
                key={layout.id}
                onClick={() => setActiveLayout(layout.id as any)}
                className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer backdrop-blur-xs
                  ${activeLayout === layout.id 
                    ? "bg-charcoal-900 border-charcoal-900 text-white font-bold shadow-xs" 
                    : "bg-white/60 border-charcoal-300/80 text-charcoal-700 hover:bg-white hover:border-charcoal-400"}`}
                id={`btn-card-layout-${layout.id}`}
              >
                {layout.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid rendering mock events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {filteredEvents.map((evt) => {
          const isHovered = hoveredCardId === evt.id;
          const isSaved = !!savedEvents[evt.id];

          return (
            <div
              key={evt.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-brand-300/40 transition-all duration-300 relative group cursor-pointer"
              onMouseEnter={() => setHoveredCardId(evt.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              style={{ transform: isHovered ? "translateY(-4px)" : "translateY(0)" }}
              id={`event-card-${evt.id}`}
            >
              {/* Optional Top Pattern Accent */}
              {activeLayout === "vibrant" && (
                <div className="h-2.5 w-full african-pattern-bg shrink-0" />
              )}
              {activeLayout === "subtle" && (
                <div className="h-2 w-full african-pattern-subtle opacity-70 bg-charcoal-300 shrink-0" />
              )}

              {/* Event Image Banner Area */}
              <div className="relative aspect-video w-full overflow-hidden bg-charcoal-100 shrink-0">
                <img
                  src={evt.image}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Favorite Heart Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveEvent(evt.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm border transition-all duration-150 cursor-pointer
                    ${isSaved 
                      ? "bg-red-500 border-red-500 text-white" 
                      : "bg-white/80 hover:bg-white border-charcoal-200/50 text-charcoal-700 hover:text-red-500"}`}
                  title="Save Event"
                  id={`btn-favorite-${evt.id}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                </button>

                {/* Floating Pricing Badge */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className={`text-[10px] font-display font-bold py-1 px-2.5 rounded-full shadow-xs
                    ${evt.isFree 
                      ? "bg-accent-500 text-white" 
                      : "bg-charcoal-900 text-white"}`}>
                    {evt.price}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider font-semibold py-1 px-2.5 rounded-full bg-white/90 backdrop-blur-xs text-charcoal-900 shadow-xs">
                    {evt.category}
                  </span>
                </div>
              </div>

              {/* Event Text Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Small Date Indicator with Lucide Icon */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider text-brand-600 uppercase mb-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-charcoal-900 text-base leading-snug tracking-tight mb-2 group-hover:text-brand-500 transition-colors">
                    {evt.title}
                  </h3>

                  {/* Description Snippet */}
                  <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
                    {evt.description}
                  </p>
                </div>

                {/* Metas and host avatar */}
                <div className="border-t border-charcoal-100 pt-4 flex items-center justify-between mt-auto">
                  {/* Host Section */}
                  <div className="flex items-center gap-2">
                    <img
                      src={evt.hostAvatar}
                      alt={evt.hostName}
                      referrerPolicy="no-referrer"
                      className="w-6.5 h-6.5 rounded-full object-cover border border-charcoal-200 bg-charcoal-100"
                    />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-charcoal-600 leading-none">HOSTED BY</span>
                      <span className="text-xs font-semibold text-charcoal-900 leading-tight truncate max-w-[100px]">
                        {evt.hostName}
                      </span>
                    </div>
                  </div>

                  {/* Location Pin and RSVPs */}
                  <div className="flex flex-col items-end gap-1 text-[10px] text-charcoal-600 font-medium">
                    <span className="flex items-center gap-1 truncate max-w-[120px]">
                      <MapPin className="w-3.5 h-3.5 text-charcoal-500 shrink-0" />
                      {evt.location.split(",")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-charcoal-500 shrink-0" />
                      {evt.rsvpCount} Attending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structured Cards Blueprint guidelines */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <span className="text-xs font-mono tracking-widest text-brand-600 font-bold uppercase block mb-1">
            Structural Blueprint
          </span>
          <h3 className="font-display font-bold text-xl text-charcoal-900 mb-4">
            Original African Card Identity
          </h3>
          <p className="text-charcoal-700 text-sm leading-relaxed mb-4">
            Instead of copying Luma's borderless, high-gradient grid, Afro Event implements a <strong>structured container card with pristine white canvases</strong>.
          </p>
          <ul className="flex flex-col gap-3 text-xs text-charcoal-600 pl-1 list-none">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" />
              <span><strong>Sunset Pattern Accents:</strong> Opt-in colorful geometric patterns top-frame the borders, creating rhythmic visual energy while keeping elements aligned.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" />
              <span><strong>Dedicated Metadata Rails:</strong> Explicit separate slots for hosts, location pins, date modules, and RSVP metrics prevent data crowding.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" />
              <span><strong>Compact Fluid Sizing:</strong> Aspect ratios default to 16:9 for images with absolute tags displaying price and category instantly.</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5 bg-white/40 backdrop-blur-xs rounded-2xl border border-charcoal-200/60 p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-semibold text-charcoal-900 text-sm mb-2">Shadow & Border Spec</h4>
            <p className="text-charcoal-600 text-xs leading-relaxed mb-4">
              Resting cards map to <code>border-charcoal-200</code> with a flat <code>shadow-xs</code>. On cursor hovering, the card elevates utilizing <code>shadow-lg</code> and transitions on a 300ms cubic-bezier curve.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-white border border-charcoal-200 rounded-lg p-3 text-center flex-1 shadow-xs text-[10px] font-mono text-charcoal-700">
              Stationary State<br />
              <span className="font-semibold text-charcoal-900">shadow-xs</span>
            </div>
            <div className="bg-white border border-charcoal-200 rounded-lg p-3 text-center flex-1 shadow-lg text-[10px] font-mono text-charcoal-700 transform -translate-y-1">
              Elevated State<br />
              <span className="font-semibold text-brand-600">shadow-lg</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
