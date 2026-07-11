/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { typographyData } from "../data";
import { Sliders, Type, RefreshCw, Layers } from "lucide-react";

export default function TypographySpec() {
  const [customText, setCustomText] = React.useState("");
  const [fontSizeMultiplier, setFontSizeMultiplier] = React.useState(1.0);

  const resetPlayground = () => {
    setCustomText("");
    setFontSizeMultiplier(1.0);
  };

  return (
    <section id="typography" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <Type className="w-8 h-8 text-brand-500" />
          Typography Guidelines
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          Afro Event combines the highly legible, geometric sans-serif <span className="font-semibold text-charcoal-900">Inter</span> for content density with the friendly, expressive, geometric display font <span className="font-semibold text-brand-500 font-display font-bold">Poppins</span> for headings, capturing a progressive and professional cultural feel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Font Family Cards */}
        <div className="lg:col-span-6 bg-white border border-charcoal-200 rounded-2xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono tracking-widest text-brand-600 font-bold uppercase">Primary Heading</span>
              <span className="text-xs font-mono text-charcoal-500 bg-charcoal-50 px-2 py-0.5 rounded border border-charcoal-200">font-display</span>
            </div>
            <h3 className="font-display font-extrabold text-4xl text-charcoal-900 mb-2">Poppins</h3>
            <p className="text-xs font-mono text-charcoal-600 mb-4">
              Available weights: Regular (400), Medium (500), SemiBold (600), Bold (700)
            </p>
            <p className="text-charcoal-700 text-sm leading-relaxed mb-6">
              Used exclusively for titles, section headers, event titles, prices, and main badge numbers. Its rounded geometric shapes communicate energy, welcoming spirit, and cultural warmth.
            </p>
          </div>
          <div className="bg-charcoal-50 p-4 rounded-xl border border-charcoal-200 font-display text-sm tracking-tight text-charcoal-800">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            1234567890 @#%&*()-+
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-charcoal-200 rounded-2xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono tracking-widest text-accent-700 font-bold uppercase">Body & Form Text</span>
              <span className="text-xs font-mono text-charcoal-500 bg-charcoal-50 px-2 py-0.5 rounded border border-charcoal-200">font-sans</span>
            </div>
            <h3 className="font-sans font-bold text-4xl text-charcoal-900 mb-2">Inter</h3>
            <p className="text-xs font-mono text-charcoal-600 mb-4">
              Available weights: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)
            </p>
            <p className="text-charcoal-700 text-sm leading-relaxed mb-6">
              Used for paragraphs, form inputs, navigation links, and support labels. Inter provides incredible density and clarity, rendering small event descriptions highly legible on both mobile screens and desktop sidebars.
            </p>
          </div>
          <div className="bg-charcoal-50 p-4 rounded-xl border border-charcoal-200 font-sans text-sm text-charcoal-800">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            1234567890 @#%&*()-+
          </div>
        </div>
      </div>

      {/* Typography Scale Explorer */}
      <div className="bg-white border border-charcoal-200 rounded-2xl p-6 lg:p-8 mb-8">
        <h3 className="font-display font-bold text-xl text-charcoal-900 mb-1">
          Type Scale Blueprint
        </h3>
        <p className="text-sm text-charcoal-600 mb-6">
          A mathematically proportioned typographic hierarchy, styled responsively across screens.
        </p>

        <div className="flex flex-col gap-6">
          {typographyData.map((item, idx) => (
            <div 
              key={idx} 
              className="border-b border-charcoal-100 last:border-none pb-6 last:pb-0 flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start"
            >
              {/* Token Info */}
              <div className="lg:col-span-3">
                <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">
                  {item.tag}
                </span>
                <h4 className="font-display font-semibold text-charcoal-900 text-sm mt-2">{item.name}</h4>
                <div className="mt-1 flex flex-col gap-0.5 text-[10px] font-mono text-charcoal-600 bg-charcoal-50 p-2 rounded-lg border border-charcoal-100">
                  <span>Font: {item.font}</span>
                  <span>Mobile: {item.sizeMobile}</span>
                  <span>Desktop: {item.sizeDesktop}</span>
                  <span>Weight: {item.weight}</span>
                  <span>Tracking: {item.tracking}</span>
                </div>
              </div>

              {/* Live Preview */}
              <div className="lg:col-span-5 flex items-center min-h-[48px] w-full">
                <p 
                  className={`text-charcoal-900 transition-all duration-150
                    ${item.font === "Poppins" ? "font-display" : "font-sans"}
                    ${item.weight.includes("Bold") ? "font-bold" : item.weight.includes("SemiBold") ? "font-semibold" : item.weight.includes("Medium") ? "font-medium" : "font-normal"}
                  `}
                  style={{ 
                    fontSize: `calc(${item.sizeDesktop.split(" / ")[1]} * ${fontSizeMultiplier})`,
                    letterSpacing: item.tracking.includes("tight") ? "-0.025em" : item.tracking.includes("wide") ? "0.025em" : "0em"
                  }}
                >
                  {customText.trim() !== "" ? customText : item.example}
                </p>
              </div>

              {/* Usage Column */}
              <div className="lg:col-span-4 bg-charcoal-50 border border-charcoal-200/60 p-3.5 rounded-xl text-xs text-charcoal-700 leading-relaxed self-stretch flex items-center">
                <div>
                  <span className="font-semibold text-charcoal-900 block mb-0.5">Application:</span>
                  {item.usage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Live Interactive Sandbox */}
      <div className="bg-charcoal-50 border border-charcoal-200 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-charcoal-900 flex items-center gap-1.5">
              <Sliders className="w-5 h-5 text-brand-500" />
              Interactive Typography Playground
            </h3>
            <p className="text-xs text-charcoal-600 mt-1">
              Customize preview strings and live-scale sizes to verify alignment and line heights.
            </p>
          </div>
          <button
            onClick={resetPlayground}
            className="text-xs font-mono font-semibold text-charcoal-700 hover:text-brand-500 flex items-center gap-1.5 bg-white border border-charcoal-200 py-2 px-3 rounded-lg shadow-2xs self-start"
            id="btn-typography-reset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Scale
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7 flex flex-col gap-2">
            <label htmlFor="input-typography-string" className="font-display font-medium text-xs text-charcoal-900">
              Type Custom Preview Text
            </label>
            <input
              type="text"
              id="input-typography-string"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g., Afro Event Kigali 2026 Summit • Join Us!"
              className="w-full bg-white border border-charcoal-300 rounded-lg py-2.5 px-4 text-sm focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-charcoal-900 shadow-2xs"
            />
          </div>

          <div className="md:col-span-5 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-charcoal-900">
              <span>Font Size Scale Multiplier</span>
              <span className="font-mono text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">{fontSizeMultiplier.toFixed(2)}x</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-charcoal-300 rounded-lg py-2 px-4 shadow-2xs">
              <input
                type="range"
                id="range-typography-scale"
                min="0.5"
                max="2.0"
                step="0.05"
                value={fontSizeMultiplier}
                onChange={(e) => setFontSizeMultiplier(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-charcoal-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
