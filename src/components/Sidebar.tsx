/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Flame, 
  Palette, 
  Type, 
  Play, 
  CheckSquare, 
  Layers, 
  Menu, 
  X, 
  Sliders, 
  Sparkles,
  Compass,
  FileText,
  Smartphone,
  Eye
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  sections: { id: string; label: string; icon: any }[];
}

export default function Sidebar({ activeSection, setActiveSection, sections }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame": return <Flame className="w-5 h-5" />;
      case "Palette": return <Palette className="w-5 h-5" />;
      case "Type": return <Type className="w-5 h-5" />;
      case "Play": return <Play className="w-5 h-5" />;
      case "CheckSquare": return <CheckSquare className="w-5 h-5" />;
      case "Layers": return <Layers className="w-5 h-5" />;
      case "Sliders": return <Sliders className="w-5 h-5" />;
      case "Sparkles": return <Sparkles className="w-5 h-5" />;
      case "Compass": return <Compass className="w-5 h-5" />;
      case "FileText": return <FileText className="w-5 h-5" />;
      case "Smartphone": return <Smartphone className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 glass-navbar px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold shadow-xs">
            A
          </div>
          <span className="font-display font-bold text-charcoal-900 tracking-tight text-sm">
            Afro Event <span className="text-brand-500">Guide</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-charcoal-700 hover:bg-charcoal-50/80 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
          id="btn-sidebar-mobile-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 glass-sidebar pt-6 px-4 flex flex-col justify-between transition-transform duration-300 z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:top-0 md:h-screen`}
      >
        <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-100px)] py-4">
          {/* Logo Brand */}
          <div className="hidden md:flex items-center gap-3 px-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md">
              <Flame className="w-5 h-5 fill-current animate-pulse" />
            </div>
            <div>
              <h1 className="font-display font-bold text-charcoal-900 leading-none tracking-tight text-base">
                Afro Event
              </h1>
              <span className="text-[10px] font-mono tracking-wider text-charcoal-500 uppercase">
                Design System v1.0
              </span>
            </div>
          </div>

          {/* Quick Concept Summary */}
          <div className="px-2 py-3 bg-brand-50/50 backdrop-blur-xs rounded-xl border border-brand-100/60 text-xs text-brand-900">
            <span className="font-semibold block mb-1">Theme Guideline:</span>
            Warm Sunset Orange, Deep Emerald Green, Charcoal Texts, and Frosted Glass Canvas.
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-wider text-charcoal-500 uppercase px-2 mb-2 block">
              Core Guidelines
            </span>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group duration-200
                  ${activeSection === section.id 
                    ? "bg-brand-500 text-white shadow-md font-semibold backdrop-blur-xs" 
                    : "text-charcoal-700 hover:bg-white/60 hover:text-charcoal-950 hover:shadow-2xs"
                  }`}
                id={`nav-${section.id}`}
              >
                <span className={`transition-colors duration-200 ${activeSection === section.id ? "text-white" : "text-charcoal-600 group-hover:text-brand-500"}`}>
                  {getIcon(section.icon)}
                </span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer info inside sidebar */}
        <div className="border-t border-charcoal-100 py-4 px-2 text-[11px] text-charcoal-600 font-medium">
          <p>© 2026 Afro Event.</p>
          <p className="mt-0.5">Designed with African Hospitality.</p>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-charcoal-900/30 backdrop-blur-xs z-20 md:hidden"
        />
      )}
    </>
  );
}
