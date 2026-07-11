/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, Flame, Plus, ChevronDown, User, Globe, Shield, HelpCircle, Mail, ArrowRight } from "lucide-react";
import AfroEventLogo from "./AfroEventLogo";

export default function NavFooterSpec() {
  const [activeTab, setActiveTab] = React.useState("explore");
  const [searchVal, setSearchVal] = React.useState("");

  return (
    <section id="nav-footer" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <Globe className="w-8 h-8 text-brand-500" />
          Navigation & Footers
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          Consistent layouts frame the product's identity. Navigation handles quick explorations, branding, and event creations. Footers provide structural links, newsletters, and localized trust attributes.
        </p>
      </div>

      {/* Navigation Mockup Container */}
      <div className="bg-charcoal-50 border border-charcoal-200 rounded-2xl p-6 lg:p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              Interactive Header Mockup
            </h3>
            <p className="text-xs text-charcoal-600 mt-0.5">
              Optimized for high-density navigation, logo focus, and global quick-search blocks.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-wider bg-charcoal-900 text-white px-2.5 py-1 rounded-full uppercase">
            DESKTOP FRAME
          </span>
        </div>

        {/* Real Render of Navigation Bar */}
        <header className="bg-white border border-charcoal-200 rounded-xl px-6 py-3.5 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Brand Logo Group */}
          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center">
              <AfroEventLogo scale={0.75} />
            </div>

            {/* Tab links */}
            <nav className="hidden md:flex items-center gap-1 bg-charcoal-50 p-1 rounded-lg border border-charcoal-200">
              <button 
                onClick={() => setActiveTab("explore")}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors cursor-pointer
                  ${activeTab === "explore" ? "bg-white text-charcoal-900 shadow-2xs" : "text-charcoal-600 hover:text-charcoal-900"}`}
                id="btn-nav-explore"
              >
                Explore
              </button>
              <button 
                onClick={() => setActiveTab("calendar")}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors cursor-pointer
                  ${activeTab === "calendar" ? "bg-white text-charcoal-900 shadow-2xs" : "text-charcoal-600 hover:text-charcoal-900"}`}
                id="btn-nav-calendar"
              >
                Calendar
              </button>
            </nav>
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-charcoal-600">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search summits, cultural expos, workshops..."
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-lg py-2 pl-10 pr-4 text-xs font-sans text-charcoal-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Quick actions and avatar */}
          <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
            <button className="text-xs font-semibold text-charcoal-700 hover:text-brand-500 flex items-center gap-1 bg-white hover:bg-charcoal-50 py-2 px-3 rounded-lg border border-charcoal-200 transition-colors cursor-pointer">
              Host an Event
              <Plus className="w-3.5 h-3.5" />
            </button>

            <button className="bg-brand-500 hover:bg-brand-600 text-white font-display font-semibold text-xs px-4 py-2 rounded-lg shadow-xs flex items-center gap-1 cursor-pointer">
              Sign In
            </button>

            <div className="h-8 w-px bg-charcoal-200" />

            <div className="flex items-center gap-1.5 cursor-pointer group">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                alt="User Profile"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-charcoal-200"
              />
              <ChevronDown className="w-4 h-4 text-charcoal-500 group-hover:text-charcoal-900 transition-colors" />
            </div>
          </div>
        </header>
      </div>

      {/* Footer Mockup Container */}
      <div className="bg-charcoal-50 border border-charcoal-200 rounded-2xl p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              Corporate Footer Structure
            </h3>
            <p className="text-xs text-charcoal-600 mt-0.5">
              Supports descriptive host lists, localized category anchors, and clean newsletter registration.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-wider bg-charcoal-900 text-white px-2.5 py-1 rounded-full uppercase">
            COMPACT PREVIEW
          </span>
        </div>

        {/* Real Render of Footer */}
        <footer className="bg-white border border-charcoal-200 rounded-xl p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10 pb-8 border-b border-charcoal-100">
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center">
                <AfroEventLogo scale={0.75} />
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed max-w-sm">
                Afro Event empowers community builders, businesses, and content creators to establish professional events, workshops, and gatherings across Africa's rapid cultural ecosystems.
              </p>
              <div className="flex gap-3 text-xs text-charcoal-500 font-mono">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-accent-500" />
                  Secure Registrations
                </span>
              </div>
            </div>

            {/* Column 2: Quick links */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-charcoal-900 text-xs uppercase tracking-wider mb-4">
                Explore Categories
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-medium">
                <li><a href="#" className="text-charcoal-600 hover:text-brand-500 transition-colors">Technology Hubs</a></li>
                <li><a href="#" className="text-charcoal-600 hover:text-brand-500 transition-colors">Business Summits</a></li>
                <li><a href="#" className="text-charcoal-600 hover:text-brand-500 transition-colors">Cultural Festivals</a></li>
                <li><a href="#" className="text-charcoal-600 hover:text-brand-500 transition-colors">Educational Bootcamps</a></li>
              </ul>
            </div>

            {/* Column 3: Corporate Info */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-charcoal-900 text-xs uppercase tracking-wider mb-4">
                Platform Rules
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-medium">
                <li><a href="#" className="text-charcoal-600 hover:text-brand-500 transition-colors">Ubuntu Code of Conduct</a></li>
                <li><a href="#" className="text-charcoal-600 hover:text-brand-500 transition-colors">Hosting Pricing</a></li>
                <li><a href="#" className="text-charcoal-600 hover:text-brand-500 transition-colors">Knowledge Base</a></li>
                <li><a href="#" className="text-charcoal-600 hover:text-brand-500 transition-colors">API & Webhooks</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div>
                <h4 className="font-display font-semibold text-charcoal-900 text-xs uppercase tracking-wider mb-2">
                  Stay in the loop
                </h4>
                <p className="text-xs text-charcoal-600">
                  Receive curated listings of highly popular community events across Africa.
                </p>
              </div>

              {/* Input field inside footer */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-lg py-2.5 pl-9 pr-3 text-xs text-charcoal-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <button className="bg-brand-500 hover:bg-brand-600 text-white p-2.5 rounded-lg transition-colors cursor-pointer" aria-label="Subscribe to newsletter">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Copyright Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-charcoal-600 font-medium">
            <span>© 2026 Afro Event platform. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-500">Privacy Policy</a>
              <a href="#" className="hover:text-brand-500">Terms of Service</a>
              <a href="#" className="hover:text-brand-500">Cookie Preferences</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
