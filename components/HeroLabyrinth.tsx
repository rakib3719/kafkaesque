"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, DoorClosed, X } from "lucide-react";
import { useState } from "react";

export default function HeroLabyrinth() {
  const [parableOpen, setParableOpen] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const enterAtlas = () => document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" });
  const closeParable = () => { setParableOpen(false); setChoice(null); };

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[#0a0a09] text-[#f4ede1]">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.16] grayscale" style={{ backgroundImage: "url('/images/escher-bg.png')" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,transparent_0%,rgba(8,8,7,.36)_32%,rgba(8,8,7,.94)_82%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(236,222,198,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(236,222,198,.18)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-64px)] max-w-[1500px] flex-col justify-between px-5 py-8 sm:px-9 lg:px-14 lg:py-12">
        <div className="flex items-center justify-between border-y border-[#e5d9c6]/25 py-3 text-[9px] font-bold tracking-[0.25em] text-[#cdbda4] uppercase sm:text-[10px]">
          <span>KAFKAESQUE / A VISUAL FIELD GUIDE</span><span>01 — ORIENTATION</span>
        </div>

        <div className="grid items-center gap-12 py-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold tracking-[0.26em] text-[#b94138] uppercase">Do not enter a biography</p>
            <h1 className="mt-5 font-playfair text-[clamp(4.2rem,10vw,10rem)] leading-[0.73] tracking-[-0.075em]">ENTER THE<br /><span className="pl-[0.13em] text-[#b94138]">IMPOSSIBLE</span><br /><span className="pl-[0.24em]">ROOM.</span></h1>
            <p className="mt-9 max-w-xl border-l-2 border-[#b94138] pl-5 font-garamond text-xl leading-relaxed text-[#e0d4c2] sm:text-2xl">Kafka&apos;s world is not a set of answers. It is a set of pressures: a body, a door, a law, a family, a system—each becoming impossible to escape.</p>
            <div className="mt-10 flex flex-wrap gap-3"><button onClick={enterAtlas} className="inline-flex items-center gap-3 bg-[#f0e6d7] px-5 py-3.5 text-[10px] font-bold tracking-[0.18em] text-[#171512] uppercase"><ArrowDown className="h-4 w-4" /> Explore the map</button><button onClick={() => setParableOpen(true)} className="inline-flex items-center gap-3 border border-[#e5d9c6]/40 px-5 py-3.5 text-[10px] font-bold tracking-[0.18em] text-[#f0e6d7] uppercase"><DoorClosed className="h-4 w-4 text-[#b94138]" /> Test a threshold</button></div>
          </div>

          <div className="relative mx-auto w-full max-w-md border border-[#e5d9c6]/35 bg-[#11100e]/90 p-5 shadow-[16px_18px_0_rgba(0,0,0,.35)] sm:p-7">
            <div className="flex items-center justify-between border-b border-[#e5d9c6]/20 pb-4 text-[9px] font-bold tracking-[0.19em] text-[#cdbda4] uppercase"><span>How Kafka works</span><span>Five recurring forces</span></div>
            <div className="relative my-7 grid grid-cols-2 gap-3 text-[10px] font-bold tracking-[0.16em] uppercase">
              <div className="border border-[#e5d9c6]/25 p-4 text-[#d8c8ae]">01<br /><span className="mt-2 block text-base text-[#f4ede1]">The body</span></div>
              <div className="border border-[#e5d9c6]/25 p-4 text-[#d8c8ae]">02<br /><span className="mt-2 block text-base text-[#f4ede1]">The law</span></div>
              <div className="col-span-2 border border-[#b94138] bg-[#b94138]/10 p-5 text-center text-[#f5ebdf]"><span className="text-[9px] text-[#d66b63]">YOU ARE HERE</span><span className="mt-2 block font-playfair text-3xl normal-case tracking-[-.04em]">The ordinary person</span></div>
              <div className="border border-[#e5d9c6]/25 p-4 text-[#d8c8ae]">03<br /><span className="mt-2 block text-base text-[#f4ede1]">The system</span></div>
              <div className="border border-[#e5d9c6]/25 p-4 text-[#d8c8ae]">04–05<br /><span className="mt-2 block text-base text-[#f4ede1]">The room / door</span></div>
            </div>
            <p className="border-t border-[#e5d9c6]/20 pt-4 font-garamond text-base italic leading-relaxed text-[#cdbda4]">The stories change. The pressure remains.</p>
          </div>
        </div>

        <p className="text-center text-[9px] font-bold tracking-[0.22em] text-[#9b8d78] uppercase">Scroll to choose a reading lens</p>
      </div>

      <AnimatePresence>{parableOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} className="kafka-modal relative w-full max-w-xl p-6 text-left sm:p-8"><button onClick={closeParable} className="kafka-modal-close" aria-label="Close parable"><X className="h-5 w-5" /><span>Close</span></button><div className="border-b border-[#e6dac5]/20 pb-5 pr-20"><p className="text-[10px] font-bold tracking-[0.2em] text-[#b94138] uppercase">A Kafka parable as a diagram</p><h2 className="mt-2 font-playfair text-4xl text-[#f2e9da]">Before the Law</h2></div>{!choice ? <div className="space-y-5 pt-6"><p className="font-garamond text-lg leading-relaxed text-[#ded2c0]">There is a door. A doorkeeper says, “not now.” No lock bars the way. Only the instruction to wait.</p><p className="text-[10px] font-bold tracking-[0.16em] text-[#cdbda4] uppercase">Choose the pressure you recognise</p><div className="grid gap-2">{[{ id: "wait", text: "Wait for permission." }, { id: "bribe", text: "Try to earn entry." }, { id: "ask", text: "Ask why nobody else has come." }].map((item) => <button key={item.id} onClick={() => setChoice(item.id)} className="flex items-center justify-between border border-[#e6dac5]/20 px-4 py-3 text-left font-garamond text-base text-[#eee5d7]"><span>{item.text}</span><ArrowUpRight className="h-4 w-4 text-[#b94138]" /></button>)}</div></div> : <div className="space-y-6 pt-6"><p className="border-l-2 border-[#b94138] pl-4 font-garamond text-lg italic leading-relaxed text-[#e5dac8]">{choice === "wait" && "The door becomes the shape of your life. Kafka makes waiting feel like a prison we help maintain."}{choice === "bribe" && "The doorkeeper takes your gifts so you will not feel that you left anything undone. Procedure absorbs resistance."}{choice === "ask" && "The door was made for you alone. Kafka turns access into an intimate, unbearable question."}</p><div className="flex justify-between"><button onClick={() => setChoice(null)} className="text-[10px] font-bold tracking-[0.16em] text-[#cdbda4] uppercase">Choose again</button><button onClick={closeParable} className="bg-[#b94138] px-4 py-3 text-[10px] font-bold tracking-[0.16em] text-white uppercase">Close file</button></div></div>}</motion.div></motion.div>}</AnimatePresence>
    </section>
  );
}
