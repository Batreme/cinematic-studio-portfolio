"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, Mail, MapPin, Send, ShieldCheck, Clock } from "lucide-react";
import { cameraSound } from "@/lib/sound";

interface InquiryDrawerProps {
  isOpen: boolean;
  initialPhotoTitle?: string;
  onClose: () => void;
}

export function InquiryDrawer({ isOpen, initialPhotoTitle, onClose }: InquiryDrawerProps) {
  const [inquiryType, setInquiryType] = useState<string>("Print Acquisition");
  const [selectedPhoto, setSelectedPhoto] = useState<string>(initialPhotoTitle || "Study No. 01: Solitude at Noon");
  const [printSize, setPrintSize] = useState<string>("A2 (420 x 594 mm)");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialPhotoTitle) {
      setSelectedPhoto(initialPhotoTitle);
      setInquiryType("Print Acquisition");
    }
  }, [initialPhotoTitle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cameraSound.playShutter();
    setIsSubmitted(true);
    setTimeout(() => {
      // auto reset state after a delay if desired
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-xl h-full bg-surface-elevated border-l border-white/10 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
        
        <div>
          {/* Top Bar with Availability Badge */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest text-emerald-400 font-semibold uppercase">
                Studio Status: Available Q4 / Q1
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Headline */}
          <div className="mt-8 mb-8">
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">
              Commission & Print Acquisition
            </h2>
            <p className="text-sm text-white/60 font-light mt-2 leading-relaxed">
              Inquire regarding bespoke editorial commissions, commercial visual production, or numbered silver gelatin archival prints.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-surface border border-accent/40 text-center flex flex-col items-center gap-4 my-8">
              <CheckCircle className="w-12 h-12 text-accent animate-bounce" />
              <h3 className="text-xl font-medium text-white uppercase tracking-tight">
                Inquiry Logged & Transmitted
              </h3>
              <p className="text-xs text-white/70 max-w-sm font-light leading-relaxed">
                Thank you, {name || "Collector"}. Your dispatch regarding &ldquo;{selectedPhoto}&rdquo; has been routed to the studio director. We respond within 24 operational hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-accent text-white font-mono text-xs font-semibold tracking-wider uppercase hover:bg-accent/90 transition-colors"
              >
                Return to Viewfinder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Inquiry Type Radio / Pill Selector */}
              <div>
                <label className="block text-[11px] font-mono text-white/50 tracking-wider uppercase mb-2">
                  Inquiry Discipline
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Print Acquisition",
                    "Editorial Commission",
                    "Commercial Campaign",
                    "Exhibition Loan",
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setInquiryType(type)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-mono text-left tracking-wide transition-all border ${
                        inquiryType === type
                          ? "bg-accent/20 border-accent text-white font-medium"
                          : "bg-surface border-white/5 text-white/60 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Print Fields */}
              {inquiryType === "Print Acquisition" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface border border-white/5">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono text-white/50 uppercase mb-1">
                      Target Artwork / Study
                    </label>
                    <input
                      type="text"
                      value={selectedPhoto}
                      onChange={(e) => setSelectedPhoto(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-white/50 uppercase mb-1">
                      Archival Print Size
                    </label>
                    <select
                      value={printSize}
                      onChange={(e) => setPrintSize(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent"
                    >
                      <option>A3+ (329 x 483 mm)</option>
                      <option>A2 (420 x 594 mm)</option>
                      <option>Monumental (700 x 1000 mm)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-white/50 uppercase mb-1">
                      Paper Emulsion
                    </label>
                    <div className="text-[11px] font-mono text-white/70 pt-2 truncate">
                      Hahnemühle Baryta 315g
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 tracking-wider uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Elena Rostova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/50 tracking-wider uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="collector@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-mono text-white/50 tracking-wider uppercase mb-1.5">
                  Project Scope / Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline your creative vision, framing preferences, or commission timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:scale-[1.01]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Inquiry to Studio</span>
              </button>

            </form>
          )}

        </div>

        {/* Studio Colophon & Direct Channels */}
        <div className="pt-8 mt-8 border-t border-white/10 space-y-4 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2 text-white/80">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-[11px]">Certified Certificate of Authenticity with Hologram</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] text-white/40">
            <span>STUDIO: TOKYO / BERLIN</span>
            <span>DIRECT: CONTACT@APERTURESTUDIO.ART</span>
          </div>
        </div>

      </div>
    </div>
  );
}
