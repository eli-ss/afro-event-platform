/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Laptop, Tablet, Smartphone, Calendar, MapPin, Grid, Layers, Sparkles } from "lucide-react";

export default function ResponsiveSpec() {
  const [viewportSize, setViewportSize] = React.useState<"mobile" | "tablet" | "desktop">("desktop");

  const responsiveRules = {
    mobile: {
      width: "max-w-[360px]",
      label: "Mobile Viewport (360px)",
      gridClass: "grid-cols-1",
      containerPadding: "p-4",
      desc: "Cards stack vertically in a single high-contrast flow. Margins scale down to 16px to optimize visual space, and button tap targets increase to a comfortable 44px minimum touch size."
    },
    tablet: {
      width: "max-w-[720px]",
      label: "Tablet Viewport (720px)",
      gridClass: "grid-cols-2",
      containerPadding: "p-5",
      desc: "Grid adapts to a double-column layout. Sidebar navigation collapses into top-toggle drawers or horizontal scrolling pill selectors. Typography scales smoothly via CSS calculations."
    },
    desktop: {
      width: "max-w-full",
      label: "Desktop Viewport (100% full-width)",
      gridClass: "grid-cols-3",
      containerPadding: "p-6 lg:p-8",
      desc: "Grid expands to 3 or 4 columns within a centered max-width of 1280px to prevent visual stretching. Sidebar panels anchor statically next to main container listings."
    }
  };

  // Sample items for simulated viewport
  const simulatedEvents = [
    { title: "Kigali Dev Summit", date: "THU, OCT 15", loc: "Kigali", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80", tag: "Tech" },
    { title: "Nairobi Art Expo", date: "FRI, DEC 04", loc: "Nairobi", image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=400&q=80", tag: "Culture" },
    { title: "Lagos Craft Summit", date: "SAT, NOV 21", loc: "Lagos", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80", tag: "Creative" }
  ];

  return (
    <section id="responsive-specs" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <Smartphone className="w-8 h-8 text-brand-500" />
          Responsive Layout Specs
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          Afro Event implements a fluid, device-agnostic layout. Try the viewport simulator below to inspect how typography sizes, content paddings, and column grids scale systematically across screen profiles.
        </p>
      </div>

      {/* Simulator Control Board */}
      <div className="bg-charcoal-50 border border-charcoal-200 rounded-2xl p-6 lg:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-bold text-lg text-charcoal-900">
            Interactive Viewport Simulator
          </h3>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Toggle simulated breakpoints to see responsive column alignment rules.
          </p>
        </div>

        {/* Device Switcher Buttons */}
        <div className="flex gap-2 bg-white border border-charcoal-200 p-1 rounded-xl shadow-2xs">
          {[
            { id: "mobile", icon: <Smartphone className="w-4 h-4" />, label: "Mobile" },
            { id: "tablet", icon: <Tablet className="w-4 h-4" />, label: "Tablet" },
            { id: "desktop", icon: <Laptop className="w-4 h-4" />, label: "Desktop" }
          ].map((device) => (
            <button
              key={device.id}
              onClick={() => setViewportSize(device.id as any)}
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer
                ${viewportSize === device.id 
                  ? "bg-brand-500 text-white shadow-2xs font-bold" 
                  : "text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-50"}`}
              id={`btn-device-toggle-${device.id}`}
            >
              {device.icon}
              {device.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout Rules Visualized */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Visual Simulated Device Viewport */}
        <div className="lg:col-span-8 bg-charcoal-150 border border-charcoal-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
          <div className="text-xs font-mono text-charcoal-600 mb-3 bg-white px-2.5 py-1 rounded border border-charcoal-200 font-semibold shadow-2xs">
            {responsiveRules[viewportSize].label}
          </div>

          {/* Simulated Screen */}
          <div 
            className={`w-full bg-white border border-charcoal-300 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${responsiveRules[viewportSize].width}`}
          >
            {/* Mock Header */}
            <div className="bg-charcoal-900 text-white px-4 py-3 flex items-center justify-between text-xs font-semibold">
              <span className="font-display font-extrabold tracking-tight">Afro<span className="text-brand-400 font-bold">Event</span></span>
              <div className="flex gap-3 text-[10px] text-charcoal-300">
                <span>Discover</span>
                <span>FAQ</span>
              </div>
            </div>

            {/* Simulated Event Grid */}
            <div className={`${responsiveRules[viewportSize].containerPadding} bg-charcoal-50`}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-bold text-charcoal-900 text-xs">Featured Gatherings</span>
                <span className="text-[9px] font-mono text-brand-600 bg-brand-50 border border-brand-100 px-1.5 py-0.5 rounded font-semibold">3 items loaded</span>
              </div>

              <div className={`grid ${responsiveRules[viewportSize].gridClass} gap-4`}>
                {simulatedEvents.map((item, idx) => (
                  <div key={idx} className="bg-white border border-charcoal-200 rounded-xl p-3 shadow-2xs flex flex-col justify-between">
                    <div className="flex gap-3 items-start">
                      <div className="w-16 h-12 bg-charcoal-100 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={item.image} 
                          alt="" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[8px] font-mono text-brand-600 font-bold uppercase">{item.date}</span>
                        <h4 className="font-display font-semibold text-charcoal-900 text-xs truncate mt-0.5">{item.title}</h4>
                      </div>
                    </div>

                    <div className="border-t border-charcoal-100 pt-2.5 mt-2.5 flex items-center justify-between text-[9px] text-charcoal-600">
                      <span className="flex items-center gap-0.5 truncate max-w-[80px]">
                        <MapPin className="w-3 h-3 text-charcoal-400 shrink-0" />
                        {item.loc}
                      </span>
                      <span className="bg-charcoal-100 text-charcoal-800 px-1.5 py-0.5 rounded font-semibold text-[8px]">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Descriptions and rule notes */}
        <div className="lg:col-span-4 bg-white border border-charcoal-200 rounded-2xl p-6 lg:p-8 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-600 font-bold uppercase block mb-1">Grid System Rules</span>
            <h3 className="font-display font-bold text-lg text-charcoal-900 mb-4">Responsive Blueprint</h3>
            <p className="text-charcoal-700 text-sm leading-relaxed mb-6">
              {responsiveRules[viewportSize].desc}
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-brand-50 rounded text-brand-600 font-bold text-[10px] font-mono mt-0.5 shrink-0">XS</div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-charcoal-900">Mobile (below 640px)</h4>
                  <p className="text-charcoal-600 text-[11px] mt-0.5 leading-snug">Grid defaults to single column. Paddings set to 16px. Sub-headers scale down.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-brand-50 rounded text-brand-600 font-bold text-[10px] font-mono mt-0.5 shrink-0">MD</div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-charcoal-900">Tablet (640px to 1024px)</h4>
                  <p className="text-charcoal-600 text-[11px] mt-0.5 leading-snug">Grid scales to 2 columns. Navigation links fold. Margin spaces are 24px.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-brand-50 rounded text-brand-600 font-bold text-[10px] font-mono mt-0.5 shrink-0">LG</div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-charcoal-900">Desktop (above 1024px)</h4>
                  <p className="text-charcoal-600 text-[11px] mt-0.5 leading-snug">Grid expands to 3 or 4 columns. Absolute containers center at 1280px maximum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
