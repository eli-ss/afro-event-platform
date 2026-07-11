/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { colorPaletteData } from "../data";
import { Copy, Check, Info, Sparkles } from "lucide-react";

export default function ColorPalette() {
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <section id="color-palette" className="scroll-mt-20">
      {/* Toast Notification for Clipboard Copy */}
      {copiedColor && (
        <div className="fixed bottom-6 right-6 bg-charcoal-900 text-white font-sans text-xs font-semibold py-3 px-5 rounded-xl shadow-lg border border-charcoal-700 flex items-center gap-3 z-50 animate-bounce">
          <Check className="w-4 h-4 text-accent-400" />
          <span>Hex code <span className="font-mono text-brand-300">{copiedColor}</span> copied to clipboard!</span>
        </div>
      )}

      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-brand-500 text-white text-xs font-bold flex items-center justify-center shadow-xs">C</span>
          Color Palette Specs
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          The Afro Event palette utilizes strict contrast ratios to combine high accessibility with rich branding. All primary interactions utilize warm oranges, while status indicators and event markers utilize emerald green and charcoal.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {colorPaletteData.map((group, gIdx) => (
          <div key={gIdx} className="bg-white border border-charcoal-200 rounded-2xl p-6 lg:p-8">
            <div className="mb-6">
              <h3 className="font-display font-bold text-xl text-charcoal-900 mb-1">
                {group.title}
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed max-w-3xl">
                {group.description}
              </p>
            </div>

            {/* Swatch Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.swatches.map((swatch, sIdx) => (
                <div 
                  key={sIdx} 
                  className="bg-charcoal-50 border border-charcoal-200 rounded-xl overflow-hidden flex flex-col justify-between shadow-2xs group hover:shadow-md transition-all duration-200"
                >
                  {/* Swatch Color Block */}
                  <div className={`h-28 ${swatch.variable} relative flex items-end justify-between p-4`}>
                    {/* Floating Copy Button */}
                    <button
                      onClick={() => handleCopy(swatch.hex)}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs hover:bg-white text-charcoal-800 hover:text-brand-500 p-2 rounded-lg border border-charcoal-200/50 opacity-0 group-hover:opacity-100 transition-opacity shadow-2xs cursor-pointer"
                      title="Copy HEX Code"
                      id={`btn-copy-${swatch.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <span className={`text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded-sm bg-white/40 backdrop-blur-3xs ${swatch.textClass}`}>
                        {swatch.variable}
                      </span>
                    </div>
                  </div>

                  {/* Swatch Meta Details */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-display font-bold text-charcoal-900 text-sm">
                          {swatch.name}
                        </span>
                        <button
                          onClick={() => handleCopy(swatch.hex)}
                          className="font-mono text-xs text-charcoal-600 hover:text-brand-500 font-semibold flex items-center gap-1 bg-white border border-charcoal-200 px-2 py-0.5 rounded-md"
                          id={`btn-hex-copy-${swatch.name.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          {swatch.hex}
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs text-charcoal-600 leading-relaxed min-h-[32px] mb-4">
                        {swatch.description}
                      </p>
                    </div>

                    {/* WCAG Accessibility Checklist */}
                    <div className="border-t border-charcoal-100 pt-3 flex flex-col gap-1.5 bg-white p-2.5 rounded-lg">
                      <div className="flex items-center justify-between text-[10px] font-mono text-charcoal-600">
                        <span className="flex items-center gap-1">
                          <Info className="w-3 h-3 text-charcoal-500" />
                          Contrast vs. White:
                        </span>
                        <span className={`font-semibold ${swatch.contrastWhite.includes("AAA") ? "text-accent-700 bg-accent-50" : swatch.contrastWhite.includes("AA") ? "text-brand-700 bg-brand-50" : "text-charcoal-700"} px-1.5 py-0.5 rounded-sm`}>
                          {swatch.contrastWhite}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-charcoal-600">
                        <span className="flex items-center gap-1">
                          <Info className="w-3 h-3 text-charcoal-500" />
                          Contrast vs. Charcoal:
                        </span>
                        <span className={`font-semibold ${swatch.contrastCharcoal.includes("AAA") ? "text-accent-700 bg-accent-50" : swatch.contrastCharcoal.includes("AA") ? "text-brand-700 bg-brand-50" : "text-charcoal-700"} px-1.5 py-0.5 rounded-sm`}>
                          {swatch.contrastCharcoal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Dynamic Combination Sandbox */}
        <div className="bg-charcoal-900 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
          {/* Subtle African Pattern */}
          <div className="absolute inset-0 african-pattern-subtle opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-brand-300 font-semibold uppercase block mb-2">
                Brand Accessibility Note
              </span>
              <h3 className="font-display font-bold text-2xl text-white mb-3">
                Rigorous Contrast Compliance
              </h3>
              <p className="text-charcoal-200 text-sm leading-relaxed mb-4">
                Our main brand <span className="text-brand-300 font-bold">Warm Orange (#F27D26)</span> and accent <span className="text-accent-400 font-bold">Emerald Green (#059669)</span> satisfy a strict <span className="underline decoration-brand-300">4.5:1</span> contrast ratio against white when sizing is at least 18px (or bold 14px), and satisfy AAA targets against charcoal text headers. 
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-xs font-mono bg-charcoal-800 text-brand-300 border border-charcoal-700 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  White background is primary
                </span>
                <span className="text-xs font-mono bg-charcoal-800 text-accent-400 border border-charcoal-700 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  No text color lower than Charcoal 600
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 bg-charcoal-800/80 backdrop-blur-md p-6 rounded-xl border border-charcoal-700">
              <h4 className="font-display font-semibold text-white text-sm mb-1">
                Visual Contrast Preview
              </h4>
              <div className="bg-white text-charcoal-900 rounded-lg p-3.5 border border-charcoal-200 text-xs">
                <span className="font-display font-bold text-sm text-brand-500 block mb-1">Poppins bold on White</span>
                <p className="text-charcoal-700">Inter Body text on White is extremely crisp and highly legible.</p>
              </div>
              <div className="bg-brand-50 text-brand-900 rounded-lg p-3.5 border border-brand-200 text-xs">
                <span className="font-display font-bold text-sm text-brand-800 block mb-1">Warm Orange Theme Highlight</span>
                <p className="text-brand-900">Tints offer delightful warmth without blinding readability.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
