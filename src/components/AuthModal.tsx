/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  X, Mail, Lock, User, Briefcase, KeyRound, AlertCircle, ArrowRight, 
  Eye, EyeOff, CheckCircle2, ShieldCheck, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
  onLoginSuccess: (userData: { 
    name: string; 
    email: string; 
    avatar: string;
    phone: string;
    university: string;
    bio: string;
    country: string;
    city: string;
    skills: string[];
  }) => void;
}

type AuthState = "login" | "signup" | "forgot-password" | "email-verification" | "reset-success";

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  onLoginSuccess
}: AuthModalProps) {
  const [authState, setAuthState] = React.useState<AuthState>("login");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    university: "",
    agreeTerms: false
  });
  
  const [verificationCode, setVerificationCode] = React.useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successBanner, setSuccessBanner] = React.useState("");

  React.useEffect(() => {
    if (initialMode === "signup") {
      setAuthState("signup");
    } else {
      setAuthState("login");
    }
    setErrors({});
    setSuccessBanner("");
    setShowPassword(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (authState === "signup" && !formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (authState === "signup" && !formData.university.trim()) {
      newErrors.university = "University name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (authState !== "forgot-password") {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    if (authState === "signup" && !formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms to continue";
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

  // Handle single digit input for verification code
  const handleVerificationChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newCode = [...verificationCode];
    newCode[index] = val.substring(val.length - 1);
    setVerificationCode(newCode);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`verification-code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      setIsSubmitting(false);

      if (authState === "login") {
        // Successful login
        onLoginSuccess({
          name: "Eleni S.",
          email: formData.email || "eleniss3984@gmail.com",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
          phone: "+250 788 123 456",
          university: "African Leadership University (ALU)",
          bio: "Computer Science senior passionate about AI localization, open-source technology, and building developer communities across East Africa.",
          country: "Rwanda",
          city: "Kigali",
          skills: ["React", "TypeScript", "AI Research", "Community Organizing", "Python"]
        });
        onClose();
      } else if (authState === "signup") {
        // Go to Email Verification state
        setSuccessBanner("Registration success! Verify your email.");
        setAuthState("email-verification");
      } else if (authState === "forgot-password") {
        // Go to Reset Success state
        setAuthState("reset-success");
      }
    }, 1200);
  };

  // Handle Code Verification submission
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: formData.name || "Eleni S.",
        email: formData.email || "eleniss3984@gmail.com",
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name || "Eleni")}`,
        phone: "+250 788 123 456",
        university: formData.university || "African Leadership University (ALU)",
        bio: "Senior student passionate about academic hackathons and tech innovation.",
        country: "Rwanda",
        city: "Kigali",
        skills: ["WebDev", "Collaboration", "Python"]
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
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl border border-charcoal-100 z-10"
        id="modal-auth-card"
      >
        {/* Subtle top brand band */}
        <div className="h-2.5 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-charcoal-400 hover:text-charcoal-800 hover:bg-neutral-50 rounded-full transition-colors z-20 cursor-pointer"
          id="btn-auth-close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            
            {/* ==================== LOGIN STATE ==================== */}
            {authState === "login" && (
              <motion.div
                key="login-view"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.15 }}
              >
                <div className="text-center mb-6">
                  <span className="font-display font-black text-2xl text-[#C04E22] tracking-tight">
                    Afro<span className="text-[#F97316]">Event</span>
                  </span>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 mt-2">Welcome Back</h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Sign in to manage your student passes and hosted events.
                  </p>
                </div>

                {/* Social logins */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsSubmitting(true);
                      setTimeout(() => {
                        setIsSubmitting(false);
                        onLoginSuccess({
                          name: "Eleni S.",
                          email: "eleniss3984@gmail.com",
                          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
                          phone: "+250 788 123 456",
                          university: "African Leadership University (ALU)",
                          bio: "Computer Science senior passionate about AI localization, open-source technology, and building developer communities across East Africa.",
                          country: "Rwanda",
                          city: "Kigali",
                          skills: ["React", "TypeScript", "AI Research", "Community Organizing", "Python"]
                        });
                        onClose();
                      }, 1000);
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 border border-charcoal-200 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900 transition-all cursor-pointer bg-white"
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
                      alert("GitHub Authentication (UI simulation) - Connecting securely to OAuth...");
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 border border-charcoal-200 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900 transition-all cursor-pointer bg-white"
                  >
                    <svg className="w-4 h-4 shrink-0 fill-current text-charcoal-900" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </button>
                </div>

                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-charcoal-150" />
                  <span className="px-3 text-[9px] font-mono uppercase text-charcoal-400 font-bold">Or email credentials</span>
                  <div className="flex-1 border-t border-charcoal-150" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-charcoal-450" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@university.edu"
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

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-charcoal-450" />
                        Password
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setAuthState("forgot-password")}
                        className="text-[10px] font-mono text-[#F97316] hover:underline font-bold"
                      >
                        Forgot?
                      </button>
                    </div>
                    
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full bg-white border rounded-xl py-2 pl-3 pr-10 text-sm focus:outline-hidden focus:ring-1 transition-all
                          ${errors.password 
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                            : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-charcoal-400 hover:text-charcoal-700 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.password}
                      </span>
                    )}
                  </div>

                  {/* Remember me row */}
                  <div className="flex items-center justify-between mt-1">
                    <label className="flex items-center gap-2 text-xs text-charcoal-600 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded text-[#F97316] focus:ring-[#F97316] h-4 w-4 border-charcoal-300"
                      />
                      <span>Remember Me</span>
                    </label>
                  </div>

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
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Switch to sign up */}
                <div className="text-center mt-6 pt-5 border-t border-charcoal-100 flex items-center justify-center gap-1.5 text-xs text-charcoal-650">
                  <span>Don't have an account?</span>
                  <button
                    type="button"
                    onClick={() => setAuthState("signup")}
                    className="text-[#F97316] hover:text-[#E5630F] font-bold hover:underline cursor-pointer"
                  >
                    Sign Up Free
                  </button>
                </div>
              </motion.div>
            )}

            {/* ==================== SIGN UP STATE ==================== */}
            {authState === "signup" && (
              <motion.div
                key="signup-view"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.15 }}
              >
                <div className="text-center mb-6">
                  <span className="font-display font-black text-2xl text-[#C04E22] tracking-tight">
                    Afro<span className="text-[#F97316]">Event</span>
                  </span>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 mt-2">Join Afro Event</h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Connect with student developers, academic conferences, and secure verified passes.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-charcoal-450" />
                      Full Name *
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

                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-charcoal-450" />
                      University / Institutional Affiliation *
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      placeholder="e.g. African Leadership University (ALU)"
                      className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                        ${errors.university 
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                          : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
                    />
                    {errors.university && (
                      <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.university}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-charcoal-450" />
                      University Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@university.edu"
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

                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-charcoal-450" />
                      Create Password *
                    </label>
                    
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full bg-white border rounded-xl py-2 pl-3 pr-10 text-sm focus:outline-hidden focus:ring-1 transition-all
                          ${errors.password 
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20" 
                            : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-charcoal-400 hover:text-charcoal-700 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.password}
                      </span>
                    )}
                  </div>

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
                        I agree to the <span className="text-[#F97316] hover:underline font-bold">Terms of Service</span> and <span className="text-[#F97316] hover:underline font-bold">Privacy Policy</span>.
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.agreeTerms}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 mt-2 disabled:opacity-75 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Switch to login */}
                <div className="text-center mt-6 pt-5 border-t border-charcoal-100 flex items-center justify-center gap-1.5 text-xs text-charcoal-650">
                  <span>Already have an account?</span>
                  <button
                    type="button"
                    onClick={() => setAuthState("login")}
                    className="text-[#F97316] hover:text-[#E5630F] font-bold hover:underline cursor-pointer"
                  >
                    Log In
                  </button>
                </div>
              </motion.div>
            )}

            {/* ==================== FORGOT PASSWORD STATE ==================== */}
            {authState === "forgot-password" && (
              <motion.div
                key="forgot-view"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.15 }}
              >
                <div className="text-center mb-6">
                  <span className="font-display font-black text-2xl text-[#C04E22] tracking-tight">
                    Afro<span className="text-[#F97316]">Event</span>
                  </span>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 mt-2">Reset Password</h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Enter your university email to receive a secure password reset link.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-charcoal-450" />
                      University Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@university.edu"
                      className={`w-full bg-white border rounded-xl py-2.5 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 mt-2 disabled:opacity-75 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Switch back to login */}
                <div className="text-center mt-6 pt-5 border-t border-charcoal-100 flex items-center justify-center gap-1.5 text-xs text-charcoal-650">
                  <span>Remember password?</span>
                  <button
                    type="button"
                    onClick={() => setAuthState("login")}
                    className="text-[#F97316] hover:text-[#E5630F] font-bold hover:underline cursor-pointer"
                  >
                    Back to Log In
                  </button>
                </div>
              </motion.div>
            )}

            {/* ==================== EMAIL VERIFICATION STATE (UI ONLY) ==================== */}
            {authState === "email-verification" && (
              <motion.div
                key="verify-view"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <ShieldCheck className="w-7 h-7" />
                </div>

                <h3 className="font-display font-bold text-xl text-charcoal-900">Verify Your Email</h3>
                <p className="text-xs text-charcoal-550 max-w-sm mx-auto mt-2 leading-relaxed">
                  We have simulated sending a secure 6-digit confirmation code to <strong className="font-bold text-charcoal-900">{formData.email || "you@university.edu"}</strong>. Enter the code below.
                </p>

                {/* Verification code inputs */}
                <form onSubmit={handleVerifyCode} className="mt-6 flex flex-col gap-6">
                  <div className="flex justify-center gap-2">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={`code-box-${index}`}
                        id={`verification-code-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleVerificationChange(index, e.target.value)}
                        className="w-11 h-12 text-center bg-neutral-50 border border-charcoal-200 rounded-xl text-lg font-bold text-charcoal-900 focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || verificationCode.some(c => !c)}
                    className="w-full bg-[#F97316] hover:bg-[#E5630F] text-white text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Verify and Sign In
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-charcoal-500 mt-4 font-medium">
                  Didn't receive code? <button onClick={() => alert("Simulation code resent!")} className="text-[#F97316] font-bold hover:underline">Resend Code</button>
                </p>
              </motion.div>
            )}

            {/* ==================== RESET PASSWORD SUCCESS STATE ==================== */}
            {authState === "reset-success" && (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-[#059669]/8 text-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#059669]/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h3 className="font-display font-bold text-xl text-charcoal-900">Reset Dispatch Sent!</h3>
                <p className="text-xs text-charcoal-550 max-w-sm mx-auto mt-2 leading-relaxed">
                  A mock password reset credential request has been generated for <strong className="font-bold text-charcoal-900">{formData.email}</strong>. Check your inbox to configure a new password.
                </p>

                <button
                  type="button"
                  onClick={() => setAuthState("login")}
                  className="w-full bg-black hover:bg-[#F97316] text-white text-xs font-bold py-3 px-4 rounded-full mt-6 flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
                >
                  Return to Sign In
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
