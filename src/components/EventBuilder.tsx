/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Calendar, MapPin, Users, Ticket, Heart, Code, Copy, Check, Sliders } from "lucide-react";

export default function EventBuilder() {
  const [formData, setFormData] = React.useState({
    title: "Soweto Jazz & Soul Gathering",
    date: "SAT, MAR 14, 2027",
    time: "17:00 SAST",
    location: "Soweto Amphitheatre, Johannesburg",
    hostName: "Ubuntu Rhythms",
    price: "$45.00",
    isFree: false,
    category: "Culture" as "Technology" | "Business" | "Education" | "Culture" | "Community",
    imagePreset: "culture",
    patternStyle: "vibrant" as "vibrant" | "subtle" | "none"
  });

  const [copiedCode, setCopiedCode] = React.useState(false);

  const imagesPresets = {
    tech: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    business: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    culture: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=600&q=80",
    education: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    community: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80"
  };

  const getPresetImage = () => {
    return imagesPresets[formData.imagePreset as keyof typeof imagesPresets] || imagesPresets.culture;
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectPreset = (key: string, cat: any) => {
    setFormData(prev => ({ ...prev, imagePreset: key, category: cat }));
  };

  const generatedHtml = `<!-- Afro Event Styled Component -->
<div class="bg-white border border-charcoal-200 rounded-2xl overflow-hidden flex flex-col shadow-xs hover:shadow-lg transition-all duration-300 relative max-w-sm">
  ${formData.patternStyle === "vibrant" ? '<!-- Sunset Accent Border -->\n  <div class="h-2.5 w-full bg-brand-500" style="background-image: radial-gradient(circle at 100% 150%, #F27D26 24%, #F59750 24%, #ffe8cc 36%, transparent 40%)"></div>' : ""}
  ${formData.patternStyle === "subtle" ? '<!-- Subtle Slate Border -->\n  <div class="h-2 w-full bg-charcoal-300"></div>' : ""}
  
  <!-- Image Banner -->
  <div class="relative aspect-video overflow-hidden bg-charcoal-100">
    <img src="${getPresetImage()}" alt="${formData.title}" class="w-full h-full object-cover" />
    <div class="absolute bottom-3 left-3 flex gap-2">
      <span class="text-[10px] font-display font-bold py-1 px-2.5 rounded-full bg-charcoal-900 text-white">${formData.isFree ? "Free" : formData.price}</span>
      <span class="text-[10px] font-mono tracking-wider font-semibold py-1 px-2.5 rounded-full bg-white text-charcoal-900 shadow-xs">${formData.category}</span>
    </div>
  </div>

  <!-- Content Card Body -->
  <div class="p-5 flex-1 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider text-brand-600 uppercase mb-2">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <span>${formData.date} • ${formData.time}</span>
      </div>
      <h3 class="font-display font-semibold text-charcoal-900 text-base leading-snug tracking-tight mb-2">${formData.title}</h3>
    </div>

    <!-- Metas and host -->
    <div class="border-t border-charcoal-100 pt-4 flex items-center justify-between mt-4">
      <div class="flex items-center gap-2">
        <span class="text-[9px] font-mono text-charcoal-600">HOST: ${formData.hostName.toUpperCase()}</span>
      </div>
      <span class="text-[10px] text-charcoal-600 font-medium">${formData.location.split(",")[0]}</span>
    </div>
  </div>
</div>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="event-builder" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <Sliders className="w-8 h-8 text-brand-500" />
          Interactive Event Sandbox
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          The ultimate testing sandbox for Afro Event. Configure your own event parameters below, pick from our high-quality African culture and technology preset photographs, select traditional geometric accent frames, and see your customized card and code render in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left column: Controls */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-charcoal-900 mb-5">
              Event Configuration Board
            </h3>

            <div className="flex flex-col gap-4">
              {/* Event Title */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-900">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFieldChange}
                  className="w-full bg-white/60 border border-charcoal-300/80 rounded-lg py-2 px-3 text-xs focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 backdrop-blur-3xs transition-all"
                />
              </div>

              {/* Host and Price Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-semibold text-xs text-charcoal-900">Organizer Name</label>
                  <input
                    type="text"
                    name="hostName"
                    value={formData.hostName}
                    onChange={handleFieldChange}
                    className="w-full bg-white/60 border border-charcoal-300/80 rounded-lg py-2 px-3 text-xs focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 backdrop-blur-3xs transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-semibold text-xs text-charcoal-900">Ticket Cost</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleFieldChange}
                    placeholder="e.g. $45.00"
                    className="w-full bg-white/60 border border-charcoal-300/80 rounded-lg py-2 px-3 text-xs focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 backdrop-blur-3xs transition-all"
                  />
                </div>
              </div>

              {/* Date & Location */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-900">Event Date & Timezone</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleFieldChange}
                    className="w-full bg-white/60 border border-charcoal-300/80 rounded-lg py-2 px-3 text-xs focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 backdrop-blur-3xs transition-all"
                  />
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleFieldChange}
                    className="w-full bg-white/60 border border-charcoal-300/80 rounded-lg py-2 px-3 text-xs focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 backdrop-blur-3xs transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-900">Location Venue</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFieldChange}
                  className="w-full bg-white/60 border border-charcoal-300/80 rounded-lg py-2 px-3 text-xs focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 backdrop-blur-3xs transition-all"
                />
              </div>

              {/* Pattern Frame selection */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-900">Traditional Frame Border Accent</label>
                <div className="flex gap-2">
                  {[
                    { id: "vibrant", label: "Sunset Pattern" },
                    { id: "subtle", label: "Slate Pattern" },
                    { id: "none", label: "No Pattern Frame" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFormData(prev => ({ ...prev, patternStyle: item.id as any }))}
                      className={`text-xs px-3 py-1.5 rounded-lg border flex-1 cursor-pointer font-medium backdrop-blur-xs transition-all
                        ${formData.patternStyle === item.id 
                          ? "bg-brand-500 border-brand-500 text-white shadow-xs" 
                          : "bg-white/60 border-charcoal-200 text-charcoal-700 hover:bg-white hover:border-charcoal-300"}`}
                      id={`btn-builder-pattern-${item.id}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset Visuals */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-900">Preset Theme Visuals & Category</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { key: "tech", label: "Technology", cat: "Technology" },
                    { key: "business", label: "Enterprise", cat: "Business" },
                    { key: "culture", label: "Cultural", cat: "Culture" },
                    { key: "education", label: "Education", cat: "Education" },
                    { key: "community", label: "Resilience", cat: "Community" }
                  ].map((p) => (
                    <button
                      key={p.key}
                      onClick={() => handleSelectPreset(p.key, p.cat as any)}
                      className={`text-[10px] py-2 rounded-lg border font-semibold flex flex-col items-center justify-center cursor-pointer transition-colors backdrop-blur-xs
                        ${formData.imagePreset === p.key 
                          ? "bg-charcoal-900 text-white border-charcoal-900 shadow-xs" 
                          : "bg-white/60 hover:bg-white text-charcoal-700 border-charcoal-200"}`}
                      id={`btn-builder-preset-${p.key}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Card Preview + Copy Code */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 lg:p-8 flex flex-col justify-between items-center gap-6">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-charcoal-600 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-500 fill-current" />
              Live Styled Render
            </span>

            {/* Copy Button */}
            <button
              onClick={handleCopyCode}
              className="text-xs font-mono font-semibold text-charcoal-800 hover:text-brand-500 flex items-center gap-1.5 bg-white/75 backdrop-blur-xs border border-charcoal-200 py-1.5 px-3 rounded-lg shadow-2xs cursor-pointer hover:bg-white"
              id="btn-builder-copy"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-accent-500" /> : <Code className="w-3.5 h-3.5" />}
              {copiedCode ? "Copied!" : "Copy Styled HTML"}
            </button>
          </div>

          {/* Real styled render of custom builder card */}
          <div className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-brand-300/40 max-w-[340px] w-full transition-all duration-300">
            {/* Optional Frame Pattern */}
            {formData.patternStyle === "vibrant" && (
              <div className="h-2.5 w-full african-pattern-bg shrink-0" />
            )}
            {formData.patternStyle === "subtle" && (
              <div className="h-2 w-full african-pattern-subtle opacity-75 bg-charcoal-300 shrink-0" />
            )}

            {/* Banner Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-charcoal-100 shrink-0">
              <img
                src={getPresetImage()}
                alt={formData.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Floating badges */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="text-[10px] font-display font-bold py-1 px-2.5 rounded-full bg-charcoal-900 text-white shadow-sm">
                  {formData.price}
                </span>
                <span className="text-[10px] font-mono tracking-wider font-semibold py-1 px-2.5 rounded-full bg-white/95 text-charcoal-900 shadow-sm">
                  {formData.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-brand-600 uppercase mb-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                  <span>{formData.date} • {formData.time}</span>
                </div>
                <h4 className="font-display font-semibold text-charcoal-900 text-sm leading-snug tracking-tight line-clamp-2">
                  {formData.title}
                </h4>
              </div>

              {/* Host and loc */}
              <div className="border-t border-charcoal-100 pt-3 flex items-center justify-between mt-4">
                <span className="text-[10px] font-semibold text-charcoal-700 uppercase">
                  HOST: {formData.hostName}
                </span>
                <span className="text-[10px] text-charcoal-600 font-medium flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-charcoal-400" />
                  {formData.location.split(",")[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-charcoal-500 leading-normal max-w-sm">
            💡 <strong>Prototyping Advantage:</strong> The HTML copy features self-contained radial inline patterns, giving developers quick, drop-in widgets.
          </div>
        </div>
      </div>
    </section>
  );
}
