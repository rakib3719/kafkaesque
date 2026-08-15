"use client";

import { useState } from "react";
import { Shield, FileCheck, CheckCircle2, X, HelpCircle, Award } from "lucide-react";

interface OnboardingPortalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function OnboardingPortalCTA({ modalOpen, setModalOpen }: OnboardingPortalProps) {
  const [citizenAlias, setCitizenAlias] = useState("Josef K.");
  const [caseNumber, setCaseNumber] = useState("K-8492-Z");
  const [existentialChoice, setExistentialChoice] = useState("wait");
  const [registered, setRegistered] = useState(false);

  const handleSealClick = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    setCaseNumber(`K-${randomCode}-${randomChar}`);

    setModalOpen(true);
  };

  const handleClaimCaseFile = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <section id="onboarding" className="relative py-24 bg-[#0a0a0d] border-b border-[#d4a359]/30">
      {/* Section Number Badge "5" */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="w-10 h-10 rounded-full border-2 border-[#d4a359] bg-[#16131c] flex items-center justify-center text-[#d4a359] font-cinzel font-bold text-base shadow-[0_0_20px_rgba(212,163,89,0.4)]">
          5
        </div>
        <div className="h-8 w-px bg-gradient-to-b from-[#d4a359] to-transparent my-2" />
      </div>

      {/* Ornate Framing Container matching Section 5 of image */}
      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="relative rounded-2xl border-2 border-[#d4a359]/50 bg-[#121019] p-8 sm:p-14 text-center space-y-8 shadow-[0_0_60px_rgba(212,163,89,0.2)]">
          {/* Corner Flourishes */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#d4a359]" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#d4a359]" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#d4a359]" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#d4a359]" />

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black font-cinzel tracking-wider text-[#f7e6c4] uppercase glow-gold-text">
              CHOOSE YOUR READING PATH
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#a89c8d] font-garamond italic">
              Start with the character whose pressure feels most familiar. There is no correct route through Kafka.
            </p>
          </div>

          {/* Glowing Golden 3D Wax Seal Button */}
          <div className="pt-4 flex flex-col items-center justify-center">
            <button
              onClick={handleSealClick}
              className="group relative w-36 h-36 sm:w-48 sm:h-48 rounded-full transition-transform transform hover:scale-105 active:scale-95 focus:outline-none"
              title="Click Wax Seal to Claim Case File"
            >
              {/* Outer Radiant Glow */}
              <div className="absolute inset-0 rounded-full bg-[#d4a359]/35 blur-xl group-hover:bg-[#d4a359]/65 transition-all duration-500 animate-pulse" />

              {/* Wax Seal Image */}
              <img
                src="/images/wax-seal.png"
                alt="Golden Wax Seal"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] group-hover:brightness-110 transition-all"
              />
            </button>
            <span className="text-xs font-bold tracking-widest text-[#d4a359] uppercase mt-4">
              OPEN A READING PATH
            </span>
          </div>
        </div>
      </div>

      {/* Case File Generator Registration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="kafka-modal relative w-full max-w-xl bg-[#14121b] border-2 border-[#d4a359] rounded-xl p-6 sm:p-8 shadow-[0_0_70px_rgba(212,163,89,0.45)]">
            <button
              onClick={() => {
                setModalOpen(false);
                setRegistered(false);
              }}
              className="kafka-modal-close"
              aria-label="Close case file"
              title="Close"
            >
              <X className="w-6 h-6" />
              <span>Close</span>
            </button>

            {!registered ? (
              <form onSubmit={handleClaimCaseFile} className="space-y-6">
                <div className="text-center space-y-2 border-b border-[#d4a359]/30 pb-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#201a2b] border border-[#d4a359]/60 text-xs text-[#d4a359] font-mono">
                    <Shield className="w-3.5 h-3.5 text-[#d4a359]" />
                    <span>READING PATH ID: #{caseNumber}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-cinzel text-[#f7e6c4]">
                    BUILD YOUR READING PATH
                  </h3>
                  <p className="text-xs text-[#a09485] font-garamond italic">
                    Pick a character and a starting pressure. The site will frame the rest of the archive through that lens.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#d4a359] uppercase tracking-wider mb-2">
                      START WITH A CHARACTER:
                    </label>
                    <select
                      value={citizenAlias}
                      onChange={(e) => setCitizenAlias(e.target.value)}
                      className="w-full bg-[#0a080e] border border-[#d4a359]/50 rounded px-4 py-2.5 text-sm text-[#f7e6c4] focus:outline-none focus:border-[#d4a359] font-garamond"
                    >
                      <option value="Josef K.">Josef K. (Chief Financial Clerk — The Trial)</option>
                      <option value="Gregor Samsa">Gregor Samsa (Traveling Salesman — Metamorphosis)</option>
                      <option value="Surveyor K.">Surveyor K. (Land Surveyor — The Castle)</option>
                      <option value="Karl Rossmann">Karl Rossmann (The Missing Person)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d4a359] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#d4a359]" />
                      CHOOSE A FIRST LENS:
                    </label>
                    <p className="text-xs text-[#e0d6c8] font-garamond italic mb-2 p-2.5 rounded bg-[#0b0910] border border-[#d4a359]/20">
                      Which question brings you into Kafka&apos;s world?
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setExistentialChoice("wait")}
                        className={`p-2.5 rounded border text-center transition-all ${
                          existentialChoice === "wait"
                            ? "border-[#d4a359] bg-[#241d32] text-[#f7e6c4]"
                            : "border-[#4a4237] bg-[#120f18] text-[#8c8072]"
                        }`}
                      >
                        🚪 The door and permission
                      </button>
                      <button
                        type="button"
                        onClick={() => setExistentialChoice("fog")}
                        className={`p-2.5 rounded border text-center transition-all ${
                          existentialChoice === "fog"
                            ? "border-[#d4a359] bg-[#241d32] text-[#f7e6c4]"
                            : "border-[#4a4237] bg-[#120f18] text-[#8c8072]"
                        }`}
                      >
                        🌫️ The maze and uncertainty
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d4a359] uppercase tracking-wider mb-2">
                      SAVE THIS READING PATH:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="citizen@existential-court.org"
                      className="w-full bg-[#0a080e] border border-[#d4a359]/50 rounded px-4 py-2.5 text-sm text-[#f7e6c4] placeholder-[#7d7265] focus:outline-none focus:border-[#d4a359] font-garamond"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded border border-[#d4a359] bg-[#241d30] text-[#f7e6c4] hover:bg-[#322942] font-cinzel text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,163,89,0.25)] transition-all flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-[#d4a359]" />
                    <span>CREATE READING PATH</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <CheckCircle2 className="w-16 h-16 text-[#d4a359] mx-auto animate-bounce" />
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-cinzel text-[#f7e6c4]">
                    YOUR READING PATH IS READY
                  </h3>
                  <div className="p-4 rounded bg-[#0b0910] border border-[#d4a359] max-w-md mx-auto space-y-2 shadow-inner">
                    <Award className="w-8 h-8 text-[#d4a359] mx-auto" />
                    <p className="text-sm text-[#d4a359] font-mono font-bold">
                      PATH #{caseNumber}
                    </p>
                    <p className="text-xs text-[#f7e6c4] font-garamond font-bold">
                      STARTING CHARACTER: {citizenAlias}
                    </p>
                    <p className="text-[11px] text-[#a09485] font-garamond italic">
                      FIRST LENS: {existentialChoice === "wait" ? "The Door and Permission" : "The Maze and Uncertainty"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setModalOpen(false);
                    setRegistered(false);
                  }}
                  className="px-6 py-2.5 rounded border border-[#d4a359] bg-[#221c2e] text-[#f7e6c4] hover:bg-[#312842] text-xs font-bold uppercase tracking-widest transition-all"
                >
                  RETURN TO THE MAP
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="kafka-ending mt-24 border-t border-[#e6dac5]/20 bg-[#090908] px-5 py-14 sm:px-9 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between border-y border-[#e6dac5]/20 py-3 text-[9px] font-bold tracking-[0.24em] text-[#a99a84] uppercase"><span>End of the map</span><span>File remains open</span></div>
          <div className="grid gap-10 py-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div><p className="text-[10px] font-bold tracking-[0.24em] text-[#c95249] uppercase">The exit is another question</p><p className="mt-5 max-w-4xl font-playfair text-5xl leading-[.9] tracking-[-.055em] text-[#f0e7da] sm:text-7xl">The maze is not behind you.<br /><span className="pl-[.12em] text-[#c95249]">It has learned your name.</span></p></div>
            <p className="max-w-md font-garamond text-lg leading-relaxed text-[#bfb09a]">Kafkaesque is a visual reading guide for returning to Kafka&apos;s worlds with more questions, not fewer.</p>
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-[#e6dac5]/20 pt-5 text-[9px] font-bold tracking-[0.18em] text-[#817461] uppercase sm:flex-row"><span>Franz Kafka · 1883—1924</span><span>Built for slow reading</span><span>© Kafkaesque</span></div>
        </div>
      </footer>
    </section>
  );
}
