/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Calendar, MapPin, Tag, DollarSign, Clock, Users, FileText, Check, AlertCircle } from "lucide-react";
import { Event } from "./mockEvents";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
  userName: string;
}

const CATEGORIES = [
  "Academic Seminar",
  "Workshop",
  "Career Fair",
  "Startup Pitch",
  "Hackathon",
  "Cultural Event",
  "Competition"
];

const SAMPLE_PRESETS = [
  { key: "p1", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80", label: "Conference / Tech" },
  { key: "p2", url: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=600&q=80", label: "Music Festival" },
  { key: "p3", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", label: "Education Seminar" },
  { key: "p4", url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80", label: "Business Summit" }
];

export default function CreateEventModal({
  isOpen,
  onClose,
  onAddEvent,
  userName
}: CreateEventModalProps) {
  const [formData, setFormData] = React.useState({
    title: "",
    organizer: userName || "Anonymous Host",
    category: "Academic Seminar" as Event["category"],
    university: "",
    price: "",
    isFree: true,
    date: "",
    time: "",
    venue: "",
    city: "",
    country: "",
    description: "",
    capacity: 200,
    tagsText: "",
    selectedPreset: "p1"
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Sync organizer name if logged in user changes
  React.useEffect(() => {
    if (userName) {
      setFormData(prev => ({ ...prev, organizer: userName }));
    }
  }, [userName]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.university.trim()) newErrors.university = "University or campus name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue location is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.description.trim()) newErrors.description = "Please describe your event";
    if (!formData.isFree && (!formData.price || isNaN(Number(formData.price.replace("$", "")))) ) {
      newErrors.price = "Enter a valid numeric price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData(prev => ({ ...prev, isFree: checked, price: checked ? "Free" : "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const selectedImage = SAMPLE_PRESETS.find(p => p.key === formData.selectedPreset)?.url || SAMPLE_PRESETS[0].url;
      const parsedPrice = formData.isFree ? "Free" : `$${parseFloat(formData.price.replace("$", "")).toFixed(2)}`;
      
      const newEvent: Event = {
        id: `evt-custom-${Date.now()}`,
        title: formData.title,
        date: new Date(formData.date).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric"
        }).toUpperCase(),
        time: formData.time,
        location: `${formData.venue}, ${formData.city}`,
        university: formData.university || "African Leadership University (ALU)",
        city: formData.city,
        country: formData.country,
        organizer: formData.organizer,
        organizerAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.organizer)}`,
        organizerRole: "Afro Event Community Member",
        image: selectedImage,
        category: formData.category,
        price: parsedPrice,
        isFree: formData.isFree,
        rsvpCount: 0,
        description: formData.description,
        capacity: Number(formData.capacity) || 200,
        tags: formData.tagsText 
          ? formData.tagsText.split(",").map(t => t.trim()).filter(t => t.length > 0)
          : ["Community Gather", formData.category]
      };

      onAddEvent(newEvent);
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      id="modal-create-event-overlay"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl border border-charcoal-100 z-10 transition-all duration-300 my-8 transform scale-100 animate-in fade-in zoom-in-95 duration-200"
        id="modal-create-event-card"
      >
        <div className="h-2 w-full bg-gradient-to-r from-[#F97316] via-[#E5A93B] to-[#059669]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-charcoal-400 hover:text-charcoal-800 hover:bg-charcoal-50 rounded-full transition-colors z-20 cursor-pointer"
          id="btn-create-close"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[85vh]">
          {/* Header */}
          <div className="p-6 border-b border-charcoal-100/60 bg-neutral-50/50 shrink-0">
            <h3 className="font-display font-bold text-xl text-charcoal-900 flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-[#F97316]" />
              Host a New Gathering
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Create a gorgeous event page and start collecting registrations in seconds.
            </p>
          </div>

          {/* Form Content Scrollable */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
            {/* Title & Host info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-700">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFieldChange}
                  placeholder="e.g. Lagos Creative Network Meetup"
                  className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                    ${errors.title 
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                      : "border-charcoal-200 focus:border-[#F97316] focus:ring-[#F97316]"}`}
                />
                {errors.title && (
                  <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.title}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-700">Organizer Name</label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleFieldChange}
                  placeholder="e.g. iceaddis Team"
                  className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
                />
              </div>
            </div>

            {/* Category & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-charcoal-400" />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFieldChange}
                  className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] cursor-pointer"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-charcoal-400" />
                  Capacity Limit
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleFieldChange}
                  min={5}
                  className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-charcoal-400" />
                    Entry Cost
                  </label>
                  <label className="flex items-center gap-1 text-[11px] text-charcoal-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isFree}
                      onChange={handleCheckboxChange}
                      className="rounded text-[#F97316] focus:ring-[#F97316] h-3.5 w-3.5 border-charcoal-300"
                    />
                    <span>It's Free</span>
                  </label>
                </div>
                {!formData.isFree ? (
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-charcoal-400 font-mono text-sm font-semibold">$</span>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleFieldChange}
                      placeholder="25.00"
                      className={`w-full bg-white border rounded-xl py-2 pl-7 pr-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                        ${errors.price ? "border-red-400 focus:border-red-500" : "border-charcoal-200 focus:border-[#F97316]"}`}
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    disabled
                    value="Free Entry"
                    className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl py-2 px-3 text-sm text-charcoal-500 font-medium"
                  />
                )}
                {errors.price && (
                  <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.price}
                  </span>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
                  Event Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFieldChange}
                  className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                    ${errors.date ? "border-red-400 focus:border-red-500" : "border-charcoal-200 focus:border-[#F97316]"}`}
                />
                {errors.date && (
                  <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.date}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-charcoal-400" />
                  Start Time *
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleFieldChange}
                  placeholder="e.g. 02:00 PM GMT or 10:30 WAT"
                  className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                    ${errors.time ? "border-red-400 focus:border-red-500" : "border-charcoal-200 focus:border-[#F97316]"}`}
                />
                {errors.time && (
                  <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.time}
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-3 p-4 bg-neutral-50/50 rounded-2xl border border-charcoal-150">
              <span className="text-xs font-display font-semibold text-charcoal-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                Location details
              </span>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">University / Campus *</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleFieldChange}
                  placeholder="e.g. African Leadership University (ALU)"
                  className={`w-full bg-white border rounded-xl py-2 px-3 text-xs focus:outline-hidden
                    ${errors.university ? "border-red-400" : "border-charcoal-200"}`}
                />
                {errors.university && (
                  <span className="text-[10px] text-red-500 font-semibold">{errors.university}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Physical Venue / Address *</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleFieldChange}
                  placeholder="e.g. Kigali Convention Centre, Hall C"
                  className={`w-full bg-white border rounded-xl py-2 px-3 text-xs focus:outline-hidden
                    ${errors.venue ? "border-red-400" : "border-charcoal-200"}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFieldChange}
                    placeholder="e.g. Lagos"
                    className={`w-full bg-white border rounded-xl py-2 px-3 text-xs focus:outline-hidden
                      ${errors.city ? "border-red-400" : "border-charcoal-200"}`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleFieldChange}
                    placeholder="e.g. Nigeria"
                    className={`w-full bg-white border rounded-xl py-2 px-3 text-xs focus:outline-hidden
                      ${errors.country ? "border-red-400" : "border-charcoal-200"}`}
                  />
                </div>
              </div>
            </div>

            {/* Banners */}
            <div className="flex flex-col gap-2">
              <label className="font-display font-semibold text-xs text-charcoal-700">Choose Header Cover Image</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SAMPLE_PRESETS.map(preset => (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, selectedPreset: preset.key }))}
                    className={`group relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer text-left
                      ${formData.selectedPreset === preset.key ? "border-[#F97316] ring-2 ring-[#F97316]/20 scale-[1.02]" : "border-charcoal-200 opacity-70 hover:opacity-100"}`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-charcoal-900/70 p-1.5 backdrop-blur-3xs text-center">
                      <span className="text-[9px] font-semibold text-white truncate block">{preset.label}</span>
                    </div>
                    {formData.selectedPreset === preset.key && (
                      <div className="absolute top-1 right-1 bg-[#F97316] text-white p-0.5 rounded-full shadow-xs">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-semibold text-xs text-charcoal-700 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-charcoal-400" />
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFieldChange}
                rows={4}
                placeholder="Write an elegant description about what attendees will experience, learning outcomes, speakers, schedules..."
                className={`w-full bg-white border rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:ring-1 transition-all
                  ${errors.description ? "border-red-400 focus:border-red-500" : "border-charcoal-200 focus:border-[#F97316]"}`}
              />
              {errors.description && (
                <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.description}
                </span>
              )}
            </div>

            {/* Tag search keyword helpers */}
            <div className="flex flex-col gap-1.5">
              <label className="font-display font-semibold text-xs text-charcoal-700">Tags / Keywords</label>
              <input
                type="text"
                name="tagsText"
                value={formData.tagsText}
                onChange={handleFieldChange}
                placeholder="e.g. Innovation, AgriTech, Founders, Panels (comma separated)"
                className="w-full bg-white border border-charcoal-200 rounded-xl py-2 px-3 text-sm focus:outline-hidden focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="p-6 border-t border-charcoal-100 bg-neutral-50/50 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-charcoal-700 hover:bg-charcoal-150 rounded-full border border-charcoal-250 transition-colors bg-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-xs font-bold bg-[#F97316] hover:bg-[#E5630F] text-white rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-75 cursor-pointer"
              id="btn-create-submit"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Publish Event
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
