/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { spacingData, borderRadiusData, shadowData, badgeData, tagData } from "../data";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Ticket, 
  Heart, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Search, 
  Sliders, 
  Laptop, 
  Briefcase, 
  Music, 
  GraduationCap, 
  Layers 
} from "lucide-react";

export default function SystemSpecs() {
  const iconCollection = [
    { name: "Calendar", icon: <Calendar className="w-5 h-5 text-brand-500" />, usage: "Event schedules, dates, and reminders." },
    { name: "MapPin", icon: <MapPin className="w-5 h-5 text-brand-500" />, usage: "Venue directions and city indicators." },
    { name: "Users", icon: <Users className="w-5 h-5 text-brand-500" />, usage: "RSVP registries and group capacities." },
    { name: "Ticket", icon: <Ticket className="w-5 h-5 text-brand-500" />, usage: "Pricing scales, passes, and coupons." },
    { name: "Heart", icon: <Heart className="w-5 h-5 text-brand-500" />, usage: "Bookmarks, saved spots, and favorites." },
    { name: "Sparkles", icon: <Sparkles className="w-5 h-5 text-brand-500" />, usage: "Premium highlights and feature listings." },
    { name: "Flame", icon: <Flame className="w-5 h-5 text-brand-500" />, usage: "Active counts, brand branding, sunset energy." },
    { name: "ShieldCheck", icon: <ShieldCheck className="w-5 h-5 text-brand-500" />, usage: "Authorized hosts and verified receipts." },
    { name: "Search", icon: <Search className="w-5 h-5 text-brand-500" />, usage: "Global discover bar exploration." },
    { name: "Sliders", icon: <Sliders className="w-5 h-5 text-brand-500" />, usage: "Custom filter configurations." }
  ];

  const getTagIcon = (name: string) => {
    switch (name) {
      case "Laptop": return <Laptop className="w-3.5 h-3.5 shrink-0" />;
      case "Briefcase": return <Briefcase className="w-3.5 h-3.5 shrink-0" />;
      case "Music": return <Music className="w-3.5 h-3.5 shrink-0" />;
      case "GraduationCap": return <GraduationCap className="w-3.5 h-3.5 shrink-0" />;
      default: return <Users className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  return (
    <section id="system-specs" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <Layers className="w-8 h-8 text-brand-500" />
          Spacing, Shadows & Tokens
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          The foundation of visual rhythm. Harmonizing spacings, corner angles, depth elevations, and badge indicators ensures design alignment across varying screen densities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
        {/* Column 1: Spacing System */}
        <div className="lg:col-span-7 bg-white border border-charcoal-200 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-charcoal-900 mb-1">
              Spacing Blueprint Scale
            </h3>
            <p className="text-xs text-charcoal-600 mb-6">
              A responsive, standard spacing scale utilized for padding, margins, gaps, and gutter offsets.
            </p>

            <div className="flex flex-col gap-4">
              {spacingData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 border-b border-charcoal-100 pb-3 last:border-none last:pb-0">
                  <div className="w-32 shrink-0">
                    <span className="text-xs font-mono font-bold text-charcoal-900 block">{item.token}</span>
                    <span className="text-[10px] font-mono text-charcoal-600">{item.size}</span>
                  </div>
                  {/* Spacing Bar Preview */}
                  <div className="flex-1 bg-charcoal-50 p-1.5 rounded-md flex items-center">
                    <div 
                      className="bg-brand-500 h-3.5 rounded-sm"
                      style={{ width: `${item.pixels * 2}px`, minWidth: "4px" }}
                    />
                  </div>
                  <div className="w-48 text-[11px] text-charcoal-600 leading-tight">
                    {item.usage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Border Radius & Shadows */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Border Radius */}
          <div className="bg-white border border-charcoal-200 rounded-2xl p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-charcoal-900 mb-4">Border Radius Spec</h3>
              <div className="flex flex-col gap-3">
                {borderRadiusData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-200">
                    {/* Visual Corner block */}
                    <div 
                      className="w-12 h-12 bg-white border-2 border-brand-500"
                      style={{ 
                        borderRadius: item.value === "9999px" ? "50%" : item.value,
                        borderTopLeftRadius: "0",
                        borderBottomRightRadius: "0" 
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-bold text-charcoal-900">{item.token} ({item.value})</span>
                      <span className="text-[10px] text-charcoal-600 mt-0.5 leading-tight">{item.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shadows */}
          <div className="bg-white border border-charcoal-200 rounded-2xl p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-charcoal-900 mb-4">Depth & Elevation</h3>
              <div className="flex flex-col gap-3">
                {shadowData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-charcoal-50 p-2.5 rounded-xl border border-charcoal-200">
                    {/* Elevation block */}
                    <div 
                      className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-charcoal-200"
                      style={{ boxShadow: item.value.split(" (")[0] }}
                    >
                      <span className="text-[10px] font-mono text-charcoal-500 uppercase font-bold">CARD</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-bold text-charcoal-900">{item.token}</span>
                      <span className="text-[10px] text-charcoal-600 mt-0.5 leading-tight">{item.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges, Tags & Icons Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Badges and Tags */}
        <div className="lg:col-span-6 bg-white border border-charcoal-200 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-charcoal-900 mb-1">
              Badges & Category Tags
            </h3>
            <p className="text-xs text-charcoal-600 mb-6">
              Used to mark event publishing status and represent event thematic clusters.
            </p>

            {/* Badges */}
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-wider text-charcoal-600 uppercase font-bold block mb-3">
                01. Publish Status Badges
              </span>
              <div className="grid grid-cols-2 gap-3 bg-charcoal-50 p-4 rounded-xl border border-charcoal-200">
                {badgeData.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 bg-white p-2.5 rounded-lg border border-charcoal-100">
                    <div>
                      <span className={`text-[10px] font-display font-bold px-2 py-0.5 rounded-full border ${item.bgClass} ${item.textClass} ${item.borderClass}`}>
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-charcoal-600 leading-tight mt-1">{item.usage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <span className="text-[10px] font-mono tracking-wider text-charcoal-600 uppercase font-bold block mb-3">
                02. Event Category Tags
              </span>
              <div className="flex flex-wrap gap-2 bg-charcoal-50 p-4 rounded-xl border border-charcoal-200">
                {tagData.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-full border shadow-2xs transition-all cursor-pointer ${item.bgClass}`}
                  >
                    {getTagIcon(item.iconName)}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Curated Icons Library */}
        <div className="lg:col-span-6 bg-white border border-charcoal-200 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-charcoal-900 mb-1">
              Curated Brand Icons
            </h3>
            <p className="text-xs text-charcoal-600 mb-6">
              Imported from <code>lucide-react</code>. Used uniformly to clarify metadata pointers.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {iconCollection.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-charcoal-50 border border-charcoal-200 hover:border-brand-300 rounded-xl p-3.5 flex flex-col items-center justify-center text-center group transition-colors shadow-2xs"
                  title={item.usage}
                >
                  <div className="p-2.5 bg-white rounded-lg border border-charcoal-200 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-charcoal-900 mt-2 block">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-charcoal-100 flex items-start gap-2 text-xs text-charcoal-600">
            <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Unified Styling Constraint:</strong> Icons inside buttons and cards must utilize <code>text-current</code> to automatically adapt color states when hovered, disabled, or active.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
