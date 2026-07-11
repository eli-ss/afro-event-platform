/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CheckSquare, AlertCircle, CheckCircle, HelpCircle, Sliders } from "lucide-react";

export default function InputsSpec() {
  const [formData, setFormData] = React.useState({
    title: "",
    category: "technology",
    date: "",
    price: "",
    timezone: "wat",
    email: "",
    acceptTerms: false,
    description: ""
  });

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (formData.title.length < 5) {
      newErrors.title = "Event title must be at least 5 characters long.";
    }
    if (!formData.date) {
      newErrors.date = "Please select an event date.";
    }
    if (!formData.email) {
      newErrors.email = "Host email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please specify a valid email address.";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSuccess(false);
    } else {
      setErrors({});
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    }
  };

  return (
    <section id="inputs" className="scroll-mt-20">
      <div className="border-b border-charcoal-100 pb-6 mb-8">
        <h2 className="text-3xl font-display font-bold text-charcoal-900 flex items-center gap-2">
          <CheckSquare className="w-8 h-8 text-brand-500" />
          Forms & Input Fields
        </h2>
        <p className="text-charcoal-600 mt-2 text-base leading-relaxed">
          Input fields prioritize clarity and focus. The style guide mandates comfortable font sizes (at least 14px to prevent mobile zoom), tactile borders, subtle shadow overlays, and high-contrast error states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Interactive Preview Panel */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 lg:p-8">
          <div className="flex justify-between items-center border-b border-charcoal-100/60 pb-4 mb-6">
            <div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                Interactive Form Sandbox
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Simulate text entries, focus effects, validation, and error bounds.
              </p>
            </div>
            <span className="text-[10px] font-mono tracking-wider bg-brand-50/50 backdrop-blur-xs text-brand-700 px-2.5 py-1 rounded border border-brand-100/60 font-bold uppercase">
              SANDBOX
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Event Title */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="title" className="font-display font-semibold text-xs text-charcoal-900 flex items-center justify-between">
                <span>Event Title <span className="text-brand-500">*</span></span>
                <span className="text-[10px] font-mono text-charcoal-500 font-normal">Poppins / font-semibold</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. AfroTech Kigali Summit 2026"
                className={`w-full bg-white/60 border rounded-lg py-2.5 px-4 text-sm font-sans text-charcoal-900 placeholder-charcoal-400 focus:outline-hidden focus:ring-1 shadow-sm transition-all duration-150 backdrop-blur-3xs
                  ${errors.title 
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                    : "border-charcoal-300 focus:border-brand-500 focus:ring-brand-500"
                  }`}
              />
              {errors.title ? (
                <span className="text-xs text-red-600 flex items-center gap-1 font-sans mt-0.5" id="error-title">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.title}
                </span>
              ) : (
                <span className="text-xs text-charcoal-600 font-sans">Provide an engaging, short event name.</span>
              )}
            </div>

            {/* Email Address & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Host Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-display font-semibold text-xs text-charcoal-900">
                  Organizer Email <span className="text-brand-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@afrinnovate.com"
                  className={`w-full bg-white/60 border rounded-lg py-2.5 px-4 text-sm font-sans text-charcoal-900 placeholder-charcoal-400 focus:outline-hidden focus:ring-1 shadow-sm transition-all duration-150 backdrop-blur-3xs
                    ${errors.email 
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                      : "border-charcoal-300 focus:border-brand-500 focus:ring-brand-500"
                    }`}
                />
                {errors.email && (
                  <span className="text-xs text-red-600 flex items-center gap-1 font-sans mt-0.5" id="error-email">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Event Category Selector */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="font-display font-semibold text-xs text-charcoal-900">
                  Event Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-white/60 border border-charcoal-300/80 rounded-lg py-2.5 px-4 pr-10 text-sm font-sans text-charcoal-900 focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-sm appearance-none cursor-pointer backdrop-blur-3xs"
                  >
                    <option value="technology">Technology & Innovations</option>
                    <option value="business">Business & Enterprise</option>
                    <option value="culture">Culture & Festivals</option>
                    <option value="education">Education & Workshops</option>
                    <option value="community">Community Gatherings</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-charcoal-500">
                    <Sliders className="w-4 h-4 rotate-95" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Timezone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Event Date */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="date" className="font-display font-semibold text-xs text-charcoal-900">
                  Event Date <span className="text-brand-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full bg-white/60 border rounded-lg py-2.5 px-4 text-sm font-sans text-charcoal-900 focus:outline-hidden focus:ring-1 shadow-sm appearance-none cursor-pointer backdrop-blur-3xs
                    ${errors.date 
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                      : "border-charcoal-300 focus:border-brand-500 focus:ring-brand-500"
                    }`}
                />
                {errors.date && (
                  <span className="text-xs text-red-600 flex items-center gap-1 font-sans mt-0.5" id="error-date">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.date}
                  </span>
                )}
              </div>

              {/* Timezone Radios */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-900">
                  Timezone Standard
                </label>
                <div className="flex items-center gap-4 py-2.5 bg-white/40 backdrop-blur-3xs px-4 rounded-lg border border-charcoal-200/60">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal-800">
                    <input
                      type="radio"
                      name="timezone"
                      value="wat"
                      checked={formData.timezone === "wat"}
                      onChange={handleInputChange}
                      className="w-4.5 h-4.5 text-brand-500 border-charcoal-300 focus:ring-brand-500"
                    />
                    WAT (West)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal-800">
                    <input
                      type="radio"
                      name="timezone"
                      value="eat"
                      checked={formData.timezone === "eat"}
                      onChange={handleInputChange}
                      className="w-4.5 h-4.5 text-brand-500 border-charcoal-300 focus:ring-brand-500"
                    />
                    EAT (East)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal-800">
                    <input
                      type="radio"
                      name="timezone"
                      value="sast"
                      checked={formData.timezone === "sast"}
                      onChange={handleInputChange}
                      className="w-4.5 h-4.5 text-brand-500 border-charcoal-300 focus:ring-brand-500"
                    />
                    SAST (South)
                  </label>
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="font-display font-semibold text-xs text-charcoal-900">
                Event Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Briefly describe what attendees will experience..."
                className="w-full bg-white/60 backdrop-blur-3xs border border-charcoal-300/80 rounded-lg py-2.5 px-4 text-sm font-sans text-charcoal-900 placeholder-charcoal-400 focus:outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-sm"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-700">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleCheckboxChange}
                  className="w-4.5 h-4.5 text-brand-500 border-charcoal-300 rounded-md focus:ring-brand-500 mt-0.5 cursor-pointer"
                />
                <span>
                  I agree to host this event with the spirit of <span className="text-brand-600 font-semibold underline decoration-brand-300">Ubuntu</span>—honoring collective growth, safety, and cultural authenticity.
                </span>
              </label>
              {errors.acceptTerms && (
                <span className="text-xs text-red-600 flex items-center gap-1 font-sans mt-1" id="error-terms">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.acceptTerms}
                </span>
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-display font-bold text-sm py-3 px-6 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
              id="btn-inputs-submit"
            >
              Validate Sandbox Form
            </button>

            {/* Success Banner */}
            {isSuccess && (
              <div className="bg-accent-50 border border-accent-200 text-accent-900 p-4 rounded-xl flex items-start gap-3 animate-fade-in" id="success-banner">
                <CheckCircle className="w-5 h-5 text-accent-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-sm block text-accent-950">Form Validated Successfully!</span>
                  <span className="text-xs text-accent-800">Your inputs fit the Afro Event data standards. Code classes resolve correctly.</span>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Form Design Blueprint Guidelines */}
        <div className="lg:col-span-5 flex flex-col gap-6 self-stretch justify-between">
          <div className="glass-card rounded-3xl p-6 lg:p-8 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono tracking-widest text-brand-600 font-bold uppercase block mb-1">State Specs</span>
              <h3 className="font-display font-bold text-lg text-charcoal-900 mb-4">Input Micro-Interactions</h3>
              <p className="text-charcoal-600 text-xs leading-relaxed mb-6">
                Forms must respond dynamically to user states. Here is the visual state reference mapping for Afro Event:
              </p>

              <div className="flex flex-col gap-4">
                {/* Default State */}
                <div className="flex justify-between items-center bg-white/30 backdrop-blur-3xs p-3 rounded-xl border border-charcoal-200/60">
                  <div>
                    <span className="text-xs font-semibold text-charcoal-900 block">Default / Inactive</span>
                    <span className="text-[10px] font-mono text-charcoal-600">Border: Charcoal-300, Bg: White</span>
                  </div>
                  <span className="text-[10px] font-mono text-charcoal-500 uppercase font-bold bg-white/60 px-2 py-0.5 rounded border border-charcoal-100">Standard</span>
                </div>

                {/* Focus State */}
                <div className="flex justify-between items-center bg-brand-50/40 p-3 rounded-xl border border-brand-400">
                  <div>
                    <span className="text-xs font-semibold text-brand-800 block">Focused State</span>
                    <span className="text-[10px] font-mono text-brand-700">Border: Brand-500, Ring: 1px Brand-500</span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-600 uppercase font-bold bg-white/60 px-2 py-0.5 rounded border border-brand-200">Focus Ring</span>
                </div>

                {/* Error State */}
                <div className="flex justify-between items-center bg-red-50/40 p-3 rounded-xl border-red-400">
                  <div>
                    <span className="text-xs font-semibold text-red-800 block">Error / Invalid</span>
                    <span className="text-[10px] font-mono text-red-700">Border: Red-400, Help text: Red-600</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-600 uppercase font-bold bg-white/60 px-2 py-0.5 rounded border border-red-200">Invalid</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-charcoal-100/60 flex items-start gap-2.5 bg-white/30 backdrop-blur-3xs p-4 rounded-xl">
              <HelpCircle className="w-5 h-5 text-charcoal-600 shrink-0 mt-0.5" />
              <p className="text-charcoal-700 text-xs leading-relaxed">
                <strong>Important Guideline:</strong> Never use a custom font family inside inputs—always fallback to <code>font-sans (Inter)</code> for clean digit representation and uniform letter-spacing during typing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
