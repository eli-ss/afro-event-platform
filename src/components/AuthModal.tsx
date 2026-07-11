/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Mail, Lock, User, Briefcase, KeyRound, AlertCircle, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
  onLoginSuccess: (userData: { name: string; email: string; avatar: string }) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  onLoginSuccess
}: AuthModalProps) {
  const [mode, setMode] = React.useState<"login" | "signup">(initialMode);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    jobTitle: "",
    agreeTerms: false
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setMode(initialMode);
    setErrors({});
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === "signup" && !formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (mode === "signup" && !formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms of Service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: mode === "signup" ? formData.name : "Elene S.",
        email: formData.email,
        avatar: mode === "signup" 
          ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name)}`
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
      });
      onClose();
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      id="modal-auth-overlay"
    >
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div 
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl border border-charcoal-100 z-10 transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95 duration-200"
        id="modal-auth-card"
      >
        {/* Subtle top brand band */}
        <div className="h-2 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-charcoal-400 hover:text-charcoal-800 hover:bg-charcoal-50 rounded-full transition-colors z-20 cursor-pointer"
          id="btn-auth-close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Logo / Header */}
          <div className="text-center mb-6">
            <span className="font-display font-black text-2xl text-[#C04E22] tracking-tight">
              Afro<span className="text-[#F97316]">Event</span>
            </span>
            <h3 className="font-display font-bold text-xl text-charcoal-900 mt-2">
              {mode === "login" ? "Welcome Back" : "Join Afro Event"}
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">
              {mode === "login" 
                ? "Sign in to manage your tickets and events." 
                : "Create an account to attend and host gatherings."}
            </p>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button 
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  name: "Google Explorer",
                  email: "google@afroevent.com"
                }));
                onLoginSuccess({
                  name: "Google Explorer",
                  email: "google@afroevent.com",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                });
                onClose();
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 border border-charcoal-200 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900 transition-all cursor-pointer bg-white"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.84 14.93 1 12 1 7.37 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.37 8.79 5.04 12 5.04z"/>
                <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.61-.21-2.3H12v4.4h6.41c-.28 1.47-1.11 2.72-2.36 3.56l3.64 2.83c2.13-1.97 3.36-4.87 3.36-8.49z"/>
                <path fill="#FBBC05" d="M5.1 14.7c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3L1.5 7.3C.54 9.22 0 11.35 0 13.6s.54 4.38 1.5 6.3l3.6-2.8-1-2.4z"/>
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.64-2.83c-1.01.68-2.3 1.09-3.96 1.09-3.21 0-5.99-2.33-6.9-5.46l-3.6 2.8C3.4 20.35 7.37 23 12 23z"/>
              </svg>
              Google
            </button>
            <button 
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  name: "Apple Founder",
                  email: "apple@afroevent.com"
                }));
                onLoginSuccess({
                  name: "Apple Founder",
                  email: "apple@afroevent.com",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                });
                onClose();
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 border border-charcoal-200 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900 transition-all cursor-pointer bg-white"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.1.09 2.25-.56 2.94-1.39z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-charcoal-150" />
            <span className="px-3 text-[10px] font-mono uppercase text-charcoal-400 font-bold">Or use email</span>
            <div className="flex-1 border-t border-charcoal-150" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-charcoal-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Elene S."
                  className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                    ${errors.name 
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                      : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
                />
                {errors.name && (
                  <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-charcoal-400" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                  ${errors.email 
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                    : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                </span>
              )}
            </div>

            {mode === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-charcoal-400" />
                  Job Title / Organization (Optional)
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Lead Designer at Afrinnovate"
                  className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-charcoal-400" />
                  Password
                </label>
                {mode === "login" && (
                  <button 
                    type="button" 
                    className="text-[10px] font-mono text-[#F97316] hover:underline"
                    onClick={() => alert("Mock password reset sent!")}
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                  ${errors.password 
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                    : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
              />
              {errors.password && (
                <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.password}
                </span>
              )}
            </div>

            {mode === "signup" && (
              <div className="flex flex-col gap-1.5 mt-1">
                <label className="flex items-start gap-2 text-xs text-charcoal-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-0.5 rounded text-[#F97316] focus:ring-[#F97316] h-4 w-4 border-charcoal-300"
                  />
                  <span>
                    I agree to the <span className="text-[#F97316] hover:underline font-semibold">Terms of Service</span> and <span className="text-[#F97316] hover:underline font-semibold">Privacy Policy</span>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.agreeTerms}
                  </span>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 mt-2 disabled:opacity-75 cursor-pointer"
              id="btn-auth-submit"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle link */}
          <div className="text-center mt-6 pt-5 border-t border-charcoal-100 flex items-center justify-center gap-1.5 text-xs text-charcoal-600">
            <span>
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-[#F97316] hover:text-[#E5630F] font-bold hover:underline cursor-pointer"
              id="btn-auth-mode-toggle"
            >
              {mode === "login" ? "Sign Up Free" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
