/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Star, Compass, Sparkles } from "lucide-react";
import AfroEventLogo from "./AfroEventLogo";

export default function LogoConcept() {
  return (
    <section id="logo-concept" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <Flame className="w-8 h-8 text-brand-500 fill-current animate-pulse" />
          Logo Concept & Identity
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          The Afro Event logo marries contemporary minimalism with ancient African symbolism. It establishes an identity that is simultaneously modern, premium, and deeply rooted in the spirit of African hospitality.
        </p>
      </div>

      {/* Dynamic Logo Interactive Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
        {/* Core Lockups Visual Container */}
        <div className="lg:col-span-7 bg-charcoal-50 rounded-2xl p-8 border border-charcoal-200 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg text-charcoal-900 mb-1">
              Active Brand Lockups
            </h3>
            <p className="text-xs text-charcoal-600 mb-6">
              Three core arrangements optimized for distinct scaling heights, digital headers, and application environments.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Primary Horizontal Lockup */}
            <div className="bg-white rounded-xl p-5 border border-charcoal-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-brand-700 font-semibold uppercase block mb-3">
                  01. Primary Brand Lockup (Default)
                </span>
                <div className="flex items-center min-h-[56px]">
                  <AfroEventLogo variant="default" scale={0.9} />
                </div>
              </div>
              <span className="text-xs font-mono text-charcoal-600 bg-charcoal-50 px-2.5 py-1 rounded-md border border-charcoal-200 self-start md:self-center">
                header_logo.svg
              </span>
            </div>

            {/* Alternating Horizontal Lockup with Accent */}
            <div className="bg-charcoal-900 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-accent-400 font-semibold uppercase block mb-3">
                  02. High Contrast Lockup (Dark)
                </span>
                <div className="flex items-center min-h-[56px]">
                  <AfroEventLogo variant="dark" scale={0.9} />
                </div>
              </div>
              <span className="text-xs font-mono text-charcoal-300 bg-charcoal-800 px-2.5 py-1 rounded-md border border-charcoal-700 self-start md:self-center">
                dark_footer_logo.svg
              </span>
            </div>

            {/* Symbol lockup */}
            <div className="bg-white rounded-xl p-5 border border-charcoal-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-charcoal-500 font-semibold uppercase block mb-3">
                  03. Monochrome / High Contrast Brand Lockup
                </span>
                <div className="flex items-center min-h-[56px] text-charcoal-900">
                  <AfroEventLogo variant="monochrome" scale={0.9} />
                </div>
              </div>
              <span className="text-xs font-mono text-charcoal-600 bg-charcoal-50 px-2.5 py-1 rounded-md border border-charcoal-200 self-start md:self-center">
                monochrome_logo.svg
              </span>
            </div>
          </div>
        </div>

        {/* Brand Symbolism & Description Column */}
        <div className="lg:col-span-5 bg-white border border-charcoal-200 rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-600 font-bold uppercase block mb-2">
              Philosophical Blueprint
            </span>
            <h3 className="font-display font-bold text-2xl text-charcoal-900 mb-4">
              Symbolism & Form
            </h3>
            <p className="text-charcoal-700 text-sm leading-relaxed mb-6">
              The geometry of the icon fuses traditional woven motifs with dynamic digital elements, rendering a trustworthy corporate stamp representing collective progress.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-brand-50 border border-brand-100 text-brand-600 mt-0.5">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-charcoal-900 text-sm">The Hearth Flame (Warmth)</h4>
                  <p className="text-charcoal-600 text-xs mt-1 leading-relaxed">
                    Represents community gatherings around fire (a central custom in African storytelling), warm hospitalities, and progressive energy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-accent-50 border border-accent-100 text-accent-600 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-charcoal-900 text-sm">Woven Continuous Knot</h4>
                  <p className="text-charcoal-600 text-xs mt-1 leading-relaxed">
                    Inspired by Kente patterns and traditional weaving techniques, symbolising mutual support, reliability, and human connections.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-charcoal-50 border border-charcoal-200 text-charcoal-700 mt-0.5">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-charcoal-900 text-sm">Modern Geometry</h4>
                  <p className="text-charcoal-600 text-xs mt-1 leading-relaxed">
                    Structured with precise mathematical ratios, optimized for high scalability in digital interfaces, calendars, mobile apps, and badges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-charcoal-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-charcoal-600">HEADING TYPOGRAPHY</span>
              <span className="font-display font-bold text-charcoal-900 text-xs">Poppins SemiBold</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-charcoal-600">BODY TYPOGRAPHY</span>
              <span className="font-sans font-medium text-charcoal-900 text-xs">Inter Regular</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
