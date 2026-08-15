"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, Feather, FileText, Search, RotateCcw, PenTool } from "lucide-react";

interface FloatingPaper {
  id: number;
  text: string;
  rotation: number;
  xOffset: number;
}

export default function TypewriterStudio() {
  const [typedText, setTypedText] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [flyingPapers, setFlyingPapers] = useState<FloatingPaper[]>([]);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sampleQuotes = [
    "I am a memory come to life. I am a cage, in search of a bird.",
    "A book must be the axe for the frozen sea within us.",
    "I am writing to you Milena, not because I have anything to say, but because my heart burns for you.",
    "Start with what is right rather than what is acceptable.",
    "Paths are made by walking.",
    "Guilt is never to be doubted.",
    "Germany has declared war on Russia. — Swam in the afternoon.",
  ];

  // Draw real-time typewriter ink drop splatters on canvas when typing
  const addInkSplatter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 1.5 + Math.random() * 3.5;

    ctx.fillStyle = "rgba(20, 16, 12, 0.45)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Satellite tiny dots
    for (let i = 0; i < 3; i++) {
      const offsetX = (Math.random() - 0.5) * 12;
      const offsetY = (Math.random() - 0.5) * 12;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Web Audio API Synthesizer for Mechanical Typewriter Keystrokes
  const playTypewriterSound = () => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const bufferSize = ctx.sampleRate * 0.035;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1300 + Math.random() * 700;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.45, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.035);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  };

  const playCarriageReturnSound = () => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Audio fallback
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    playTypewriterSound();
    addInkSplatter();

    if (e.key === "Enter") {
      playCarriageReturnSound();
    }

    if (typedText.length % 6 === 0) {
      spawnPaperLeaf();
    }
  };

  const spawnPaperLeaf = () => {
    const newPaper: FloatingPaper = {
      id: Date.now() + Math.random(),
      text: typedText.slice(-35) || "Franz Kafka Manuscript...",
      rotation: Math.floor(Math.random() * 50) - 25,
      xOffset: Math.floor(Math.random() * 140) - 70,
    };

    setFlyingPapers((prev) => [...prev.slice(-9), newPaper]);
  };

  const loadPresetQuote = () => {
    const quote = sampleQuotes[activeQuoteIndex];
    setTypedText(quote);
    playCarriageReturnSound();
    addInkSplatter();
    spawnPaperLeaf();
    setActiveQuoteIndex((prev) => (prev + 1) % sampleQuotes.length);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <section id="typewriter" className="relative py-24 bg-[#09080c] border-b border-[#d4a359]/30 overflow-hidden">
      {/* Section Number Badge "3" */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="w-10 h-10 rounded-full border-2 border-[#d4a359] bg-[#16131c] flex items-center justify-center text-[#d4a359] font-cinzel font-bold text-base shadow-[0_0_20px_rgba(212,163,89,0.4)]">
          3
        </div>
        <div className="h-8 w-px bg-gradient-to-b from-[#d4a359] to-transparent my-2" />
        <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel tracking-widest text-center text-[#f7e6c4] uppercase glow-gold-text">
          THE LANGUAGE LAB
        </h2>
        <p className="text-sm text-[#a89b8c] font-garamond italic mt-2 text-center max-w-xl">
          Kafka&apos;s sentences turn ordinary spaces into pressure chambers. Try the rhythm, interruption, and repetition of his language.
        </p>
      </div>

      {/* Main Studio Container */}
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Floating Paper Leaves Layer matching Section 3 fan arc */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-52 pointer-events-none z-20 overflow-hidden flex justify-center">
          {flyingPapers.map((paper) => (
            <div
              key={paper.id}
              className="absolute animate-paper-float p-3 bg-[#e8e1d3] text-[#1c1813] font-garamond text-xs border border-[#b8ab96] shadow-2xl rounded w-48 opacity-95"
              style={{
                transform: `rotate(${paper.rotation}deg) translateX(${paper.xOffset}px)`,
              }}
            >
              <div className="border-b border-[#c2b49e] pb-1 mb-1 text-[9px] font-bold text-[#827461] uppercase tracking-wider flex items-center justify-between">
                <span>ORIGINAL MANUSCRIPT LEAF</span>
                <PenTool className="w-3 h-3 text-[#827461]" />
              </div>
              <p className="italic line-clamp-3">&ldquo;{paper.text}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* Desk View Card */}
        <div className="relative rounded-xl border-2 border-[#d4a359]/40 bg-[#121018] shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Desk Header Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#181522] border-b border-[#d4a359]/30 gap-4">
            <div className="flex items-center gap-3">
              <Feather className="w-5 h-5 text-[#d4a359]" />
              <span className="text-sm font-bold font-cinzel text-[#f7e6c4] tracking-wider">
                1920s MECHANICAL UNDERWOOD DESK
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadPresetQuote}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#d4a359] bg-[#221c2e] text-[#f7e6c4] hover:bg-[#322845] text-xs font-semibold tracking-wider transition-all shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>LOAD KAFKA QUOTE</span>
              </button>

              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-2 rounded border transition-colors ${
                  audioEnabled
                    ? "border-[#d4a359] text-[#d4a359] bg-[#201a2b]"
                    : "border-[#5e5549] text-[#807466] bg-[#141219]"
                }`}
                title={audioEnabled ? "Mute Keystroke Audio" : "Enable Keystroke Audio"}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Desk Area split into Artwork Desk + Live Typewriter Sheet */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-center bg-[#0d0c12]">
            {/* Visual Desk Image Artwork */}
            <div className="md:col-span-5 relative aspect-square rounded-lg border border-[#d4a359]/30 overflow-hidden shadow-2xl">
              <img
                src="/images/typewriter-desk.png"
                alt="Vintage Typewriter Desk"
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute bottom-2 left-2 right-2 p-2 bg-black/80 backdrop-blur-sm rounded text-center border border-[#d4a359]/30">
                <span className="text-[11px] text-[#d4a359] font-cinzel tracking-wider">
                  MODEL NO. 10 — PRAGUE ARCHIVES
                </span>
              </div>
            </div>

            {/* Live Typing Sheet Workspace */}
            <div className="md:col-span-7 space-y-4">
              <div className="relative rounded-lg p-6 bg-[#eae3d5] text-[#1a1714] font-garamond shadow-inner border-2 border-[#b5a794] min-h-[300px] flex flex-col justify-between overflow-hidden">
                {/* Real-time Ink Drop Canvas Layer */}
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={300}
                  className="absolute inset-0 pointer-events-none z-10 opacity-70"
                />

                {/* Paper Header */}
                <div className="relative z-20 flex items-center justify-between border-b border-[#c2b4a1] pb-2 mb-2">
                  <span className="text-[10px] tracking-widest text-[#7a6f60] font-mono uppercase font-bold">
                    EXISTENTIAL MANUSCRIPT PAGE #K-1915
                  </span>
                  <button
                    onClick={() => {
                      setTypedText("");
                      clearCanvas();
                    }}
                    className="text-[10px] text-[#8c7e6b] hover:text-[#211d17] underline font-sans"
                  >
                    CLEAR SHEET
                  </button>
                </div>

                {/* Interactive Textarea */}
                <textarea
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your existential petition or literary thoughts here..."
                  className="relative z-20 w-full h-48 bg-transparent text-base sm:text-lg leading-relaxed focus:outline-none resize-none placeholder-[#877b6b] font-garamond font-medium"
                />

                {/* Paper Footer */}
                <div className="relative z-20 flex items-center justify-between border-t border-[#c2b4a1] pt-3 text-xs text-[#736758]">
                  <span>CHARACTERS: {typedText.length}</span>
                  <span className="italic">Type to emit mechanical sounds, ink splatters &amp; flying leaves</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
