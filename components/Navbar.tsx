"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ShieldAlert, BookOpen, Volume2, VolumeX, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenCaseModal: () => void;
}

export default function Navbar({ onOpenCaseModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ambientAudio, setAmbientAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const navigationItems = [
    { label: "ORIENTATION", href: "#hero" },
    { label: "MAP OF UNEASE", href: "#atlas" },
    { label: "CASE STUDIES", href: "#chambers" },
    { label: "LANGUAGE LAB", href: "#typewriter" },
    { label: "READING PATH", href: "#onboarding" },
  ];

  // Procedural Gaslamp Ambient Audio Synthesizer (Web Audio API)
  useEffect(() => {
    if (!ambientAudio) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Create warm low gaslamp hum
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      return () => {
        try {
          osc.stop();
        } catch {}
      };
    } catch {
      // Audio fallback
    }
  }, [ambientAudio]);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0c]/95 backdrop-blur-md border-b border-[#d4a359]/30 transition-all duration-300">
      {/* Ticker Bar for Existential Quotes */}
      <div className="bg-[#121018] border-b border-[#d4a359]/20 px-4 py-1 text-center hidden sm:block">
        <p className="text-[11px] font-garamond italic text-[#b5a999] tracking-wider flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-[#d4a359] animate-pulse" />
          <span>&ldquo;A book must be the axe for the frozen sea within us.&rdquo; — Franz Kafka</span>
          <span className="text-[#d4a359]/50">•</span>
          <span className="font-mono text-[10px] text-[#d4a359]">PRAGUE 1912 ARCHIVES</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-xl font-bold tracking-widest text-[#f7e6c4] font-cinzel hover:text-[#d4a359] transition-colors"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded border border-[#d4a359]/60 bg-[#16141a] text-[#d4a359] font-serif text-xl shadow-[0_0_12px_rgba(212,163,89,0.3)]">
              K
            </span>
            <div className="flex flex-col">
              <span className="leading-none">KAFKAESQUE</span>
              <span className="text-[9px] tracking-[0.25em] text-[#a09485] font-sans font-normal mt-0.5">
                THE LABYRINTH ARCHIVE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] font-bold tracking-widest text-[#b8ada0] hover:text-[#f7e6c4] transition-colors uppercase py-1 border-b-2 border-transparent hover:border-[#d4a359]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Case File Badge */}
          <div className="flex items-center gap-3">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={() => setAmbientAudio(!ambientAudio)}
              className={`p-2 rounded-full border transition-all ${
                ambientAudio
                  ? "border-[#d4a359] text-[#d4a359] bg-[#1d1828] shadow-[0_0_10px_rgba(212,163,89,0.3)]"
                  : "border-[#4a4237] text-[#857a6c] hover:text-[#f7e6c4]"
              }`}
              title={ambientAudio ? "Mute Gaslamp Hum" : "Enable Ambient Gaslamp Soundscape"}
            >
              {ambientAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#b8ada0] hover:text-[#f7e6c4] transition-colors rounded-full hover:bg-[#1a1820]"
              title="Search Archives"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Case File Badge */}
            <button
              onClick={onOpenCaseModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#d4a359] bg-[#17141f] text-[#d4a359] hover:bg-[#221c2e] hover:border-[#f7e6c4] hover:text-[#f7e6c4] transition-all text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(212,163,89,0.2)]"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>CHOOSE A PATH</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#b8ada0] hover:text-[#f7e6c4] rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="border-t border-[#d4a359]/30 bg-[#121018] px-4 py-3 shadow-2xl">
          <div className="max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder="Search Kafka's works (The Trial, Metamorphosis, Letters to Milena, Before the Law)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-[#d4a359]/50 rounded px-4 py-2.5 text-sm text-[#f7e6c4] placeholder-[#8a7f72] focus:outline-none focus:border-[#d4a359] shadow-inner font-garamond"
              autoFocus
            />
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#16141e] border border-[#d4a359]/50 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto p-2 divide-y divide-[#d4a359]/10">
                <a
                  href="#chambers"
                  onClick={() => setSearchOpen(false)}
                  className="block px-3 py-2 text-sm text-[#e5ded4] hover:bg-[#241f2e] rounded font-garamond"
                >
                  🚪 <strong className="text-[#d4a359]">Metamorphosis Chamber</strong> — Gregor Samsa&apos;s awakening as an insect
                </a>
                <a
                  href="#chambers"
                  onClick={() => setSearchOpen(false)}
                  className="block px-3 py-2 text-sm text-[#e5ded4] hover:bg-[#241f2e] rounded font-garamond"
                >
                  ⚖️ <strong className="text-[#d4a359]">The Trial Courtroom</strong> — Josef K. arrest &amp; Vor dem Gesetz parable
                </a>
                <a
                  href="#typewriter"
                  onClick={() => setSearchOpen(false)}
                  className="block px-3 py-2 text-sm text-[#e5ded4] hover:bg-[#241f2e] rounded font-garamond"
                >
                  ⌨️ <strong className="text-[#d4a359]">Typewriter Studio</strong> — Mechanical composition &amp; flying manuscript leaves
                </a>
                <a
                  href="#archive"
                  onClick={() => setSearchOpen(false)}
                  className="block px-3 py-2 text-sm text-[#e5ded4] hover:bg-[#241f2e] rounded font-garamond"
                >
                  💌 <strong className="text-[#d4a359]">Letters to Milena</strong> — Original 1920 Meran correspondence
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#d4a359]/30 bg-[#0f0d14] px-4 pt-3 pb-6 space-y-3">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-widest text-[#d4c9bc] hover:text-[#f7e6c4] py-2 border-b border-[#d4a359]/10"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCaseModal();
            }}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-[#d4a359] bg-[#1a1622] text-[#f7e6c4] text-xs font-bold tracking-widest uppercase shadow-lg"
          >
            <BookOpen className="w-4 h-4 text-[#d4a359]" />
            Choose a Reading Path
          </button>
        </div>
      )}
    </header>
  );
}
