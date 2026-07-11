/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Copy, Check, Play, RefreshCw, Sparkles } from "lucide-react";

export default function ButtonsSpec() {
  const [activeSize, setActiveSize] = React.useState<"sm" | "md" | "lg">("md");
  const [activeState, setActiveState] = React.useState<"default" | "hover" | "active" | "focus" | "disabled" | "loading">("default");
  const [copiedCodeId, setCopiedCodeId] = React.useState<string | null>(null);

  const sizes = {
    sm: { label: "Small", class: "text-xs px-3 py-1.5 rounded-md gap-1.5" },
    md: { label: "Medium (Default)", class: "text-sm px-4 py-2 rounded-lg gap-2" },
    lg: { label: "Large", class: "text-base px-6 py-3 rounded-xl gap-2.5" }
  };

  const buttons = [
    {
      id: "btn-primary",
      name: "Primary Brand Button",
      description: "Default action. Used for registrations, ticket purchases, and main form submittals.",
      baseClass: "bg-brand-500 hover:bg-brand-600 text-white font-semibold font-display shadow-xs transition-all duration-150 inline-flex items-center justify-center cursor-pointer",
      activeSimClass: "bg-brand-700 shadow-inner",
      focusSimClass: "ring-2 ring-brand-300 ring-offset-2 bg-brand-600",
      hoverSimClass: "bg-brand-600 shadow-sm translate-y-[-1px]"
    },
    {
      id: "btn-secondary",
      name: "Charcoal Secondary Button",
      description: "Alternative primary action. Grounds the interface and represents corporate structure.",
      baseClass: "bg-charcoal-900 hover:bg-charcoal-950 text-white font-semibold font-display shadow-xs transition-all duration-150 inline-flex items-center justify-center cursor-pointer",
      activeSimClass: "bg-black shadow-inner",
      focusSimClass: "ring-2 ring-charcoal-300 ring-offset-2 bg-charcoal-950",
      hoverSimClass: "bg-charcoal-950 shadow-sm translate-y-[-1px]"
    },
    {
      id: "btn-accent",
      name: "Emerald Accent Button",
      description: "Used to call out green actions like 'Claim Free RSVP' or 'Unlock Reward'.",
      baseClass: "bg-accent-500 hover:bg-accent-600 text-white font-semibold font-display shadow-xs transition-all duration-150 inline-flex items-center justify-center cursor-pointer",
      activeSimClass: "bg-accent-700 shadow-inner",
      focusSimClass: "ring-2 ring-accent-200 ring-offset-2 bg-accent-600",
      hoverSimClass: "bg-accent-600 shadow-sm translate-y-[-1px]"
    },
    {
      id: "btn-outline",
      name: "Outline Secondary Button",
      description: "Secondary actions. Used for 'Host Profile', 'Cancel RSVP', or secondary options.",
      baseClass: "bg-white hover:bg-charcoal-50 text-charcoal-900 border border-charcoal-300 font-semibold font-display transition-all duration-150 inline-flex items-center justify-center cursor-pointer",
      activeSimClass: "bg-charcoal-100 shadow-inner",
      focusSimClass: "ring-2 ring-charcoal-200 ring-offset-2 bg-charcoal-50",
      hoverSimClass: "bg-charcoal-50 border-charcoal-400 translate-y-[-1px]"
    },
    {
      id: "btn-muted",
      name: "Muted Pill Button",
      description: "Category filters and navigation. Lightweight visual impact.",
      baseClass: "bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-800 hover:text-charcoal-950 font-medium rounded-full transition-all duration-150 inline-flex items-center justify-center cursor-pointer",
      activeSimClass: "bg-charcoal-300",
      focusSimClass: "ring-1 ring-charcoal-400 bg-charcoal-200",
      hoverSimClass: "bg-charcoal-200"
    }
  ];

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const getButtonStyle = (btn: typeof buttons[0]) => {
    let classes = `${btn.baseClass} ${sizes[activeSize].class}`;

    if (btn.id === "btn-muted") {
      // Keep rounded-full as it overrides sizes
      classes = classes.replace(/rounded-\w+/, "rounded-full");
    }

    if (activeState === "hover") {
      classes += ` ${btn.hoverSimClass}`;
    } else if (activeState === "active") {
      classes += ` ${btn.activeSimClass}`;
    } else if (activeState === "focus") {
      classes += ` ${btn.focusSimClass}`;
    } else if (activeState === "disabled") {
      classes += " opacity-50 cursor-not-allowed pointer-events-none";
    }

    return classes;
  };

  return (
    <section id="buttons" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <Play className="w-8 h-8 text-brand-500 fill-current" />
          Buttons Specification
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          Buttons trigger core events. Our button styles support tactile, interactive elevations, clear loading loops, and color variant roles built on direct responsive guidelines.
        </p>
      </div>

      {/* Interactive State & Size Controllers */}
      <div className="bg-charcoal-50 border border-charcoal-200 rounded-2xl p-6 lg:p-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* State Selection */}
        <div className="flex flex-col gap-3">
          <span className="font-display font-semibold text-xs text-charcoal-900">
            Simulate State
          </span>
          <div className="flex flex-wrap gap-2">
            {(["default", "hover", "active", "focus", "disabled", "loading"] as const).map((state) => (
              <button
                key={state}
                onClick={() => setActiveState(state)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-mono capitalize transition-all cursor-pointer
                  ${activeState === state 
                    ? "bg-brand-500 border-brand-500 text-white font-bold" 
                    : "bg-white border-charcoal-300 text-charcoal-700 hover:border-charcoal-400"}`}
                id={`btn-state-toggle-${state}`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="flex flex-col gap-3">
          <span className="font-display font-semibold text-xs text-charcoal-900">
            Button Scale Size
          </span>
          <div className="flex gap-2">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setActiveSize(sz)}
                className={`text-xs px-3.5 py-1.5 rounded-lg border font-mono capitalize transition-all cursor-pointer
                  ${activeSize === sz 
                    ? "bg-charcoal-900 border-charcoal-900 text-white font-bold" 
                    : "bg-white border-charcoal-300 text-charcoal-700 hover:border-charcoal-400"}`}
                id={`btn-size-toggle-${sz}`}
              >
                {sizes[sz].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Button Swatches and Code Snippets */}
      <div className="flex flex-col gap-8">
        {buttons.map((btn) => {
          const styleClasses = getButtonStyle(btn);
          const jsxCode = `<button className="${styleClasses}">\n  ${activeState === "loading" ? "Loading..." : btn.name}\n</button>`;

          return (
            <div 
              key={btn.id} 
              className="bg-white border border-charcoal-200 rounded-2xl p-6 lg:p-8 flex flex-col xl:flex-row items-stretch justify-between gap-6"
            >
              {/* Button Visual Area */}
              <div className="xl:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-charcoal-900 mb-1">
                    {btn.name}
                  </h3>
                  <p className="text-xs text-charcoal-600 mb-6 max-w-lg">
                    {btn.description}
                  </p>
                </div>

                <div className="bg-charcoal-50 rounded-xl p-8 border border-charcoal-100 flex items-center justify-center min-h-[120px]">
                  <button 
                    className={styleClasses}
                    disabled={activeState === "disabled"}
                    id={`preview-${btn.id}`}
                  >
                    {activeState === "loading" ? (
                      <span className="flex items-center gap-1.5">
                        <RefreshCw className="w-4 h-4 animate-spin text-current" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-current" />
                        {btn.name}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Button HTML Markup Area */}
              <div className="xl:w-1/2 bg-charcoal-900 text-charcoal-200 p-5 rounded-xl flex flex-col justify-between font-mono text-xs overflow-x-auto relative">
                <div>
                  <div className="flex items-center justify-between border-b border-charcoal-800 pb-3 mb-4">
                    <span className="text-[10px] text-brand-300 font-bold uppercase tracking-wider">Generated React / HTML Code</span>
                    <button
                      onClick={() => handleCopyCode(btn.id, jsxCode)}
                      className="text-xs text-charcoal-300 hover:text-white flex items-center gap-1.5 bg-charcoal-800 hover:bg-charcoal-700 px-2.5 py-1.5 rounded-lg border border-charcoal-700 cursor-pointer"
                      id={`btn-copy-code-${btn.id}`}
                    >
                      {copiedCodeId === btn.id ? (
                        <>
                          <Check className="w-3 h-3 text-accent-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy Tailwind
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-charcoal-100 leading-relaxed whitespace-pre-wrap select-all">
                    {jsxCode}
                  </pre>
                </div>
                <div className="text-[10px] text-charcoal-400 border-t border-charcoal-800 mt-4 pt-3">
                  {activeState === "loading" && "💡 Includes CSS spin loop on loader states."}
                  {activeState === "disabled" && "💡 Includes disabled point-events locks."}
                  {activeState === "default" && "💡 Responsive sizing classes are fully integrated."}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
