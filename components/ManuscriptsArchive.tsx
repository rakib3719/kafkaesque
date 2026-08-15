"use client";

import { useState, useRef } from "react";
import { X, Image as ImageIcon, BookOpen, Search, ZoomIn, Volume2, Sparkles } from "lucide-react";

interface ArchiveItem {
  id: string;
  title: string;
  year: string;
  type: string;
  plaqueText: string;
  image: string;
  transcriptionGerman: string;
  translationEnglish: string;
  context: string;
}

export default function ManuscriptsArchive() {
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const archiveItems: ArchiveItem[] = [
    {
      id: "milena-letter",
      title: "LETTER TO MILENA JESENSKÁ",
      year: "1920",
      type: "Correspondence",
      plaqueText: "LETTERS TO MILENA — MERAN 1920",
      image: "/images/kafkaesque_website_homepage_ui_1786515480086.png",
      transcriptionGerman: "Ich schreibe Dir nicht, weil ich sonst nichts zu tun habe, sondern weil mir in jedem Augenblick das Herz brennt.",
      translationEnglish: "I am writing to you not because I have nothing else to do, but because my heart burns for you in every single moment.",
      context: "Kafka wrote these impassioned letters from Meran to Milena Jesenská, his translator and soul confidante. Their correspondence captures profound romantic longing alongside existential despair.",
    },
    {
      id: "metamorphosis-draft",
      title: "THE METAMORPHOSIS MANUSCRIPT",
      year: "1912",
      type: "Original Holograph",
      plaqueText: "METAMORPHOSIS DRAFT — PRAGUE 1912",
      image: "/images/kafkaesque_deep_philosophical_masterpiece_ui_1786515880373.png",
      transcriptionGerman: "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte...",
      translationEnglish: "As Gregor Samsa awoke one morning from uneasy dreams...",
      context: "Written in a frenzy over three weeks in late 1912. Kafka reported writing through sleepless nights in his family apartment overlooking the Vltava river.",
    },
    {
      id: "sketches",
      title: "ORIGINAL INK SKETCHES & FIGURES",
      year: "1910-1920",
      type: "Rare Sketches",
      plaqueText: "FRANZ KAFKA SKETCHBOOK — RARE EXCERPT",
      image: "/images/kafkaesque_homepage_hero_1786515422697.png",
      transcriptionGerman: "Einsame Gestalten und Schattenrisse aus Tinte.",
      translationEnglish: "Solitary figures and silhouettes rendered in dark ink.",
      context: "Kafka was an avid doodler in the margins of his diaries and legal notes. Max Brod famously saved these minimalist stick figures from being burned.",
    },
    {
      id: "diary-1914",
      title: "DIARY ENTRY — AUGUST 2, 1914",
      year: "1914",
      type: "Personal Diary",
      plaqueText: "DIARY ENTRY 1914 — HISTORICAL RECORD",
      image: "/images/kafkaesque_full_website_homepage_layout_1786515979388.png",
      transcriptionGerman: "Deutschland hat Rußland den Krieg erklärt. — Nachmittags Schwimmschule.",
      translationEnglish: "Germany has declared war on Russia. — Swam in the afternoon.",
      context: "One of the most famous diary entries in modern literature, demonstrating Kafka's characteristic juxtaposition of world-shattering events with quiet personal routine.",
    },
  ];

  const playManuscriptNarrative = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      // Ambient low harmonic chime for narration
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 1500);
    } catch {
      // Audio fallback
    }
  };

  return (
    <section id="archive" className="relative py-24 damask-bg border-b border-[#d4a359]/30">
      {/* Section Number Badge "4" */}
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="w-10 h-10 rounded-full border-2 border-[#d4a359] bg-[#16131c] flex items-center justify-center text-[#d4a359] font-cinzel font-bold text-base shadow-[0_0_20px_rgba(212,163,89,0.4)]">
          4
        </div>
        <div className="h-8 w-px bg-gradient-to-b from-[#d4a359] to-transparent my-2" />
        <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel tracking-widest text-center text-[#f7e6c4] uppercase glow-gold-text">
          PRIMARY TRACES
        </h2>
        <p className="text-sm text-[#a89b8c] font-garamond italic mt-2 text-center max-w-xl">
          Not memorabilia: fragments that show the private voice behind the fictional pressure.
        </p>
      </div>

      {/* Gallery Wall Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {archiveItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* Ornate Antique Gold Frame Container */}
              <div className="relative p-4 rounded-lg bg-[#14111a] border-4 border-[#b88e36] shadow-[0_10px_35px_rgba(0,0,0,0.95)] group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(212,163,89,0.45)] transition-all duration-300 w-full">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#d4a359]/40 bg-[#0a080d]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-[#f7e6c4] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Brass Plaque underneath frame */}
                <div className="mt-3.5 py-1.5 px-3 rounded bg-gradient-to-b from-[#caa248] to-[#87661e] border border-[#f5d77f] text-center shadow-md">
                  <span className="text-[10px] font-bold font-cinzel text-[#1a1202] tracking-widest block truncate">
                    {item.plaqueText}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal View */}
      {activeItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="kafka-modal relative w-full max-w-3xl bg-[#14121c] border-2 border-[#d4a359] rounded-xl p-6 sm:p-8 shadow-[0_0_60px_rgba(212,163,89,0.4)] space-y-6">
            <button
              onClick={() => setActiveItem(null)}
              className="kafka-modal-close"
              aria-label="Close manuscript"
              title="Close"
            >
              <X className="w-6 h-6" />
              <span>Close</span>
            </button>

            <div className="flex items-center justify-between border-b border-[#d4a359]/30 pb-4 pr-12">
              <div>
                <span className="text-xs font-bold text-[#d4a359] tracking-widest uppercase">
                  {activeItem.type} — {activeItem.year}
                </span>
                <h3 className="text-2xl font-extrabold font-cinzel text-[#f7e6c4] mt-1">
                  {activeItem.title}
                </h3>
              </div>

              <button
                onClick={playManuscriptNarrative}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#d4a359] bg-[#221c2e] text-[#d4a359] hover:text-[#f7e6c4] text-xs font-semibold tracking-wider transition-all"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "text-[#f7e6c4] animate-pulse" : ""}`} />
                <span>NARRATE EXCERPT</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-[3/4] w-full rounded-lg border border-[#d4a359]/50 overflow-hidden shadow-lg">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 font-garamond">
                <div>
                  <h4 className="text-xs font-bold text-[#d4a359] uppercase tracking-wider">
                    GERMAN TRANSCRIPTION:
                  </h4>
                  <p className="text-sm text-[#e5ded4] italic mt-1 bg-[#09080d] p-3 rounded border border-[#d4a359]/20">
                    &ldquo;{activeItem.transcriptionGerman}&rdquo;
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#d4a359] uppercase tracking-wider">
                    ENGLISH TRANSLATION:
                  </h4>
                  <p className="text-sm text-[#c4b8a9] mt-1 bg-[#09080d] p-3 rounded border border-[#d4a359]/20">
                    &ldquo;{activeItem.translationEnglish}&rdquo;
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#d4a359] uppercase tracking-wider">
                    HISTORICAL CONTEXT:
                  </h4>
                  <p className="text-xs text-[#a09485] leading-relaxed mt-1">
                    {activeItem.context}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-6 py-2 rounded border border-[#d4a359] bg-[#221c2e] text-[#f7e6c4] hover:bg-[#312842] text-xs font-bold uppercase tracking-widest transition-all"
              >
                CLOSE MANUSCRIPT VIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
