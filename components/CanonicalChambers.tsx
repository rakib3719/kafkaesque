"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldQuestion, X, Volume2, Sparkles, ArrowRight, Gavel, Sliders, Scroll } from "lucide-react";

interface ChamberModalData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  quote: string;
  fullDescription: string;
  keyThemes: string[];
  interactiveElement: "alienation" | "gavel" | "petition";
}

export default function CanonicalChambers() {
  const [selectedChamber, setSelectedChamber] = useState<ChamberModalData | null>(null);
  const [alienationLevel, setAlienationLevel] = useState(85);
  const [verdictStatus, setVerdictStatus] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const playGavelSound = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      // Heavy gavel strike sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio fallback
    }
  };

  const chambers: ChamberModalData[] = [
    {
      id: "metamorphosis",
      title: "METAMORPHOSIS CHAMBER",
      subtitle: "Isolation, Samsa & Alienation",
      image: "/images/metamorphosis.png",
      quote: "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      fullDescription:
        "Step inside the Metamorphosis Chamber where Gregor Samsa's terrifying physical awakening manifests the profound psychological isolation of modern humanity. Here, alienating labor, familial obligation, and existential body horror collide in dark stone halls.",
      keyThemes: ["Existential Alienation", "Body Horror", "Burden of Obligation"],
      interactiveElement: "alienation",
    },
    {
      id: "trial",
      title: "THE TRIAL COURTROOM",
      subtitle: "Unreachable Law & Eternal Arrest",
      image: "/images/trial-courtroom.png",
      quote: "Before the Law stands a doorkeeper. To this doorkeeper there comes a man from the country who begs for admittance to the Law.",
      fullDescription:
        "The centerpiece of Kafkaesque existentialism: Josef K. is arrested without having done anything wrong. In this vaulted court of shadows, the proceedings remain inscrutable, the judges inaccessible, and the law forever barred to those who seek it.",
      keyThemes: ["Inscrutable Justice", "Guilt without Crime", "The Absolute Law"],
      interactiveElement: "gavel",
    },
    {
      id: "castle",
      title: "THE CASTLE BUREAUCRACY",
      subtitle: "Infinite Maze of Paperwork",
      image: "/images/castle-bureaucracy.png",
      quote: "The Castle, whose contours were already beginning to dissolve, lay still as ever, never had K. seen the least sign of life there.",
      fullDescription:
        "Enter the interminable bureaucracy of Surveying and Petitions. In the shadow of the Castle, endless messengers hurry through snow and file cabinets, processing petitions that are never answered, creating a maze of administrative paralysis.",
      keyThemes: ["Administrative Maze", "Unreachable Authority", "Infinite Delay"],
      interactiveElement: "petition",
    },
  ];

  return (
    <section id="chambers" className="relative py-24 bg-[#0c0b0e] border-b border-[#d4a359]/30">
      {/* Section Divider Badge "2" */}
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="w-10 h-10 rounded-full border-2 border-[#d4a359] bg-[#16131c] flex items-center justify-center text-[#d4a359] font-cinzel font-bold text-base shadow-[0_0_20px_rgba(212,163,89,0.4)]">
          2
        </div>
        <div className="h-8 w-px bg-gradient-to-b from-[#d4a359] to-transparent my-2" />
        <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel tracking-widest text-center text-[#f7e6c4] uppercase glow-gold-text">
          THREE CASE STUDIES
        </h2>
        <p className="text-sm text-[#a89b8c] font-garamond italic mt-2 text-center max-w-xl">
          Three stories, three visual lenses: transformation, accusation, and the maze of authority.
        </p>
      </div>

      {/* 3 Cards Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chambers.map((chamber) => {
            const isTrialCourt = chamber.id === "trial";
            return (
              <motion.div
                key={chamber.id}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedChamber(chamber)}
                className={`group relative cursor-pointer rounded-xl p-5 bg-[#121017] border transition-all duration-500 ${
                  isTrialCourt
                    ? "glow-card-active border-[#e5a93c] bg-[#16131f]"
                    : "border-[#d4a359]/35 hover:border-[#d4a359] hover:shadow-[0_0_30px_rgba(212,163,89,0.3)]"
                }`}
              >
                {/* Highlight Ribbon for Center Active Card matching layout image */}
                {isTrialCourt && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d4a359] text-[#0c0b0e] text-[10px] font-bold tracking-widest uppercase shadow-lg flex items-center gap-1.5 z-20">
                    <Sparkles className="w-3 h-3 text-[#0c0b0e]" />
                    <span>CANONICAL CENTERPIECE</span>
                  </div>
                )}

                {/* Card Artwork Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-[#d4a359]/40 bg-[#09080c]">
                  <img
                    src={chamber.image}
                    alt={chamber.title}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0e] via-transparent to-transparent opacity-85" />
                </div>

                {/* Card Title & Excerpt */}
                <div className="mt-5 text-center space-y-2">
                  <h3 className="text-lg font-extrabold font-cinzel tracking-wider text-[#f7e6c4] group-hover:text-[#d4a359] transition-colors">
                    {chamber.title}
                  </h3>
                  <p className="text-xs text-[#a09485] font-garamond italic line-clamp-2 px-2">
                    &ldquo;{chamber.quote}&rdquo;
                  </p>

                  <div className="pt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#d4a359] group-hover:translate-x-1 transition-transform">
                    <span>OPEN CASE STUDY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Ornate Corner Accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#d4a359]/70" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#d4a359]/70" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#d4a359]/70" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#d4a359]/70" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal Lightbox for Chamber Selection */}
      <AnimatePresence>
        {selectedChamber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="kafka-modal relative w-full max-w-3xl bg-[#14121a] border-2 border-[#d4a359] rounded-xl p-6 sm:p-8 shadow-[0_0_60px_rgba(212,163,89,0.4)] space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedChamber(null);
                  setVerdictStatus(null);
                }}
                className="kafka-modal-close"
                aria-label="Close chamber"
                title="Close"
              >
                <X className="w-6 h-6" />
                <span>Close</span>
              </button>

              <div className="flex items-center gap-3 border-b border-[#d4a359]/30 pb-4">
                <BookOpen className="w-6 h-6 text-[#d4a359]" />
                <div>
                  <h3 className="text-xl font-bold font-cinzel text-[#f7e6c4]">
                    {selectedChamber.title}
                  </h3>
                  <p className="text-xs text-[#a09485] font-garamond italic">
                    {selectedChamber.subtitle}
                  </p>
                </div>
              </div>

              <div className="aspect-video w-full rounded-lg border border-[#d4a359]/40 overflow-hidden relative">
                <img
                  src={selectedChamber.image}
                  alt={selectedChamber.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <blockquote className="p-4 rounded border-l-2 border-[#d4a359] bg-[#0c0a10] text-sm text-[#e0d6c8] font-garamond italic">
                &ldquo;{selectedChamber.quote}&rdquo;
              </blockquote>

              <p className="text-sm text-[#b5a999] font-garamond leading-relaxed">
                {selectedChamber.fullDescription}
              </p>

              {/* Chamber Interactive Sub-Elements */}
              {selectedChamber.interactiveElement === "alienation" && (
                <div className="p-4 rounded bg-[#0b0910] border border-[#d4a359]/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#d4a359]">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-4 h-4" /> SAMSA ALIENATION INDEX:
                    </span>
                    <span>{alienationLevel}% ALIENATED</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={alienationLevel}
                    onChange={(e) => setAlienationLevel(Number(e.target.value))}
                    className="w-full accent-[#d4a359] cursor-pointer"
                  />
                  <p className="text-[11px] text-[#8e8273] font-garamond italic text-center">
                    Adjust slider to measure Gregor Samsa&apos;s physical vs psychological distance from society.
                  </p>
                </div>
              )}

              {selectedChamber.interactiveElement === "gavel" && (
                <div className="p-4 rounded bg-[#0b0910] border border-[#d4a359]/30 text-center space-y-3">
                  <span className="text-xs font-bold text-[#d4a359] uppercase tracking-wider block">
                    HIGH COURTROOM TRIBUNAL VERDICT
                  </span>
                  <button
                    onClick={() => {
                      playGavelSound();
                      setVerdictStatus("ARREST CONFIRMED — GUILTY OF EXISTENCE");
                    }}
                    className="flex items-center justify-center gap-2 mx-auto px-5 py-2.5 rounded border border-[#d4a359] bg-[#221c2f] text-[#f7e6c4] hover:bg-[#322845] font-cinzel text-xs font-bold tracking-widest uppercase transition-all shadow-md"
                  >
                    <Gavel className="w-4 h-4 text-[#d4a359]" />
                    <span>STRIKE COURTROOM GAVEL</span>
                  </button>
                  {verdictStatus && (
                    <p className="text-xs font-mono font-bold text-[#e5a93c] animate-pulse">
                      VERDICT: {verdictStatus}
                    </p>
                  )}
                </div>
              )}

              {selectedChamber.interactiveElement === "petition" && (
                <div className="p-4 rounded bg-[#0b0910] border border-[#d4a359]/30 space-y-2 text-center">
                  <span className="text-xs font-bold text-[#d4a359] uppercase tracking-wider block">
                    BUREAUCRATIC PETITION NO. #7492-CASTLE
                  </span>
                  <p className="text-xs text-[#a09485] font-garamond italic">
                    Status: Pending approval by Castle Official Sortini. Est. response time: Infinite years.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedChamber.keyThemes.map((theme) => (
                  <span
                    key={theme}
                    className="px-3 py-1 rounded bg-[#201a2b] border border-[#d4a359]/40 text-xs text-[#d4a359] font-semibold tracking-wider"
                  >
                    #{theme}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedChamber(null);
                    setVerdictStatus(null);
                  }}
                  className="px-6 py-2 rounded border border-[#d4a359] bg-[#221c2e] text-[#f7e6c4] hover:bg-[#312842] text-xs font-bold uppercase tracking-widest transition-all"
                >
                  CLOSE ARCHIVE DOSSIER
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
