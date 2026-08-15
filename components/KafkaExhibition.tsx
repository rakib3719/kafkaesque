"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const conditions = [
  { id: "body", no: "01", title: "THE BODY", work: "The Metamorphosis", line: "The body becomes evidence.", text: "Gregor Samsa changes overnight. What follows is not an explanation, but a social verdict: a person loses their place when they can no longer be useful.", question: "Who are you when usefulness disappears?" },
  { id: "law", no: "02", title: "THE LAW", work: "The Trial · Before the Law", line: "Judgment arrives before the charge.", text: "Josef K. is arrested without being told why. Authority becomes an atmosphere—near enough to control you, too distant to answer you.", question: "What does guilt feel like without a crime?" },
  { id: "system", no: "03", title: "THE SYSTEM", work: "The Castle", line: "Every answer opens another corridor.", text: "K. follows messages, clerks, and instructions toward an authority he can never reach. The maze is not broken; it is doing its job.", question: "How do you oppose a centre you cannot find?" },
  { id: "threshold", no: "04", title: "THE THRESHOLD", work: "Before the Law", line: "The door is open. Entry is postponed.", text: "A man waits for permission at a doorway made only for him. In Kafka, delay does not merely stop a life; it becomes the life.", question: "What are you waiting to be allowed to do?" },
];

const studies = [
  { no: "I", title: "The Metamorphosis", tag: "Transformation", copy: "A family room becomes a laboratory for shame, obligation, and the terror of becoming unreadable to the people closest to you.", condition: "BODY" },
  { no: "II", title: "The Trial", tag: "Accusation", copy: "A court without a visible centre turns ordinary life into permanent self-surveillance. The question is never simply answered.", condition: "LAW" },
  { no: "III", title: "The Castle", tag: "Deferral", copy: "A village is organised around a power that communicates endlessly and arrives never. The route itself becomes the authority.", condition: "SYSTEM" },
];

export default function KafkaExhibition() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const condition = conditions[active];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".kx-intro", { opacity: 0, y: 40, duration: 1.1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".kx-reveal").forEach((element) => {
        gsap.from(element, { opacity: 0, y: 34, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 82%" } });
      });
      gsap.to(".kx-orbit", { rotate: 360, duration: 46, repeat: -1, ease: "none" });
    }, rootRef);
    return () => context.revert();
  }, []);

  const goTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main ref={rootRef} className="kafka-exhibition min-h-screen overflow-hidden bg-[#0b0b09] text-[#eee6d8]">
      <header className="kx-nav fixed inset-x-0 top-0 z-50 px-5 pt-4 sm:px-9 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between border border-[#e9dfcf]/20 bg-[#0b0b09]/80 px-4 py-3 backdrop-blur-md">
          <button onClick={() => goTo("#orientation")} className="font-playfair text-xl tracking-[-.04em] text-[#f2eadc]">KAFKAESQUE<span className="text-[#bc463d]">.</span></button>
          <nav className="hidden items-center gap-7 text-[9px] font-bold tracking-[.18em] text-[#c9baa2] uppercase lg:flex"><button onClick={() => goTo("#atlas")}>Atlas</button><button onClick={() => goTo("#studies")}>Case studies</button><button onClick={() => goTo("#compass")}>Reading compass</button></nav>
          <button onClick={() => setMenuOpen((open) => !open)} className="grid h-8 w-8 place-items-center border border-[#e9dfcf]/25 text-[#e9dfcf] lg:hidden" aria-label="Toggle menu">{menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
        </div>
        {menuOpen && <nav className="mx-auto flex max-w-[1500px] flex-col border-x border-b border-[#e9dfcf]/20 bg-[#0b0b09] px-4 py-4 text-[10px] font-bold tracking-[.18em] text-[#c9baa2] uppercase lg:hidden"><button className="py-3 text-left" onClick={() => goTo("#atlas")}>Atlas</button><button className="py-3 text-left" onClick={() => goTo("#studies")}>Case studies</button><button className="py-3 text-left" onClick={() => goTo("#compass")}>Reading compass</button></nav>}
      </header>

      <section id="orientation" className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-12 pt-28 sm:px-9 lg:px-14 lg:pb-16">
        <div className="absolute inset-0 opacity-[.19]" style={{ backgroundImage: "url('/images/escher-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0b09_4%,rgba(11,11,9,.72)_48%,#0b0b09_100%)]" />
        <div className="kx-orbit absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[860px] max-w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e9dfcf]/15"><span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bc463d] shadow-[0_0_20px_#bc463d]" /></div>
        <div className="kx-intro relative mx-auto w-full max-w-[1500px]">
          <p className="text-[10px] font-bold tracking-[.28em] text-[#d15d53] uppercase">A visual guide to Kafka&apos;s pressure systems</p>
          <h1 className="mt-6 max-w-6xl font-playfair text-[clamp(4.3rem,11vw,11rem)] leading-[.72] tracking-[-.078em]">THIS IS NOT<br />A BIOGRAPHY<span className="text-[#bc463d]">.</span></h1>
          <div className="mt-10 grid max-w-3xl grid-cols-[auto_1fr] gap-x-5"><span className="font-playfair text-5xl text-[#bc463d]">/</span><p className="font-garamond text-xl leading-relaxed text-[#d8cbbb] sm:text-2xl">It is an atlas for the moments when life becomes strange: when your body, your work, the law, or a simple door stops making sense.</p></div>
          <button onClick={() => goTo("#atlas")} className="mt-10 inline-flex items-center gap-3 border-b border-[#e9dfcf]/50 pb-2 text-[10px] font-bold tracking-[.2em] text-[#f1e9dc] uppercase">Enter the atlas <ArrowDown className="h-4 w-4" /></button>
        </div>
      </section>

      <section id="atlas" className="relative bg-[#e9e0d2] px-5 py-24 text-[#181512] sm:px-9 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1500px]"><div className="kx-reveal max-w-3xl"><p className="text-[10px] font-bold tracking-[.26em] text-[#ab382f] uppercase">01 / THE ATLAS</p><h2 className="mt-5 font-playfair text-5xl leading-[.84] tracking-[-.06em] sm:text-7xl">Four ways the ordinary world becomes impossible.</h2></div>
          <div className="kx-reveal mt-14 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch"><div className="border-y border-[#332c24]/30">{conditions.map((item, index) => <button key={item.id} onClick={() => setActive(index)} aria-pressed={index === active} className={`grid w-full grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-[#332c24]/20 py-5 text-left last:border-0 ${index === active ? "text-[#ab382f]" : "text-[#211c17]"}`}><span className={`grid h-8 w-8 place-items-center rounded-full border text-[9px] font-bold ${index === active ? "border-[#ab382f] bg-[#ab382f] text-[#fff7eb]" : "border-[#332c24]/40"}`}>{item.no}</span><span><span className="block font-playfair text-3xl leading-none">{item.title}</span><span className="mt-1 block font-garamond text-base text-[#66584a]">{item.line}</span></span><ArrowUpRight className="h-4 w-4" /></button>)}</div>
            <article className="relative overflow-hidden bg-[#171411] p-8 text-[#f1e9dc] sm:p-11"><div className="absolute right-0 top-0 h-40 w-40 rounded-full border border-[#bc463d]/50" /><p className="text-[10px] font-bold tracking-[.22em] text-[#d15d53] uppercase">Through {condition.work}</p><h3 className="mt-6 max-w-lg font-playfair text-5xl leading-[.85] tracking-[-.055em]">{condition.line}</h3><p className="mt-8 max-w-xl font-garamond text-xl leading-relaxed text-[#d9cdbc]">{condition.text}</p><p className="mt-10 border-t border-[#f1e9dc]/20 pt-5 font-garamond text-2xl italic">“{condition.question}”</p></article>
          </div></div>
      </section>

      <section id="studies" className="bg-[#100f0d] px-5 py-24 sm:px-9 lg:px-14 lg:py-32"><div className="mx-auto max-w-[1500px]"><div className="kx-reveal grid gap-7 border-b border-[#e9dfcf]/20 pb-10 lg:grid-cols-[1fr_.55fr]"><div><p className="text-[10px] font-bold tracking-[.26em] text-[#d15d53] uppercase">02 / CASE STUDIES</p><h2 className="mt-5 font-playfair text-5xl leading-[.84] tracking-[-.06em] sm:text-7xl">Three stories.<br />Three pressure tests.</h2></div><p className="self-end font-garamond text-xl leading-relaxed text-[#cfc1ad]">The works are not exhibits to collect. Each one lets an ordinary setting reveal a different human pressure.</p></div>
        <div className="mt-0">{studies.map((study) => <article key={study.title} className="kx-reveal grid gap-5 border-b border-[#e9dfcf]/20 py-10 lg:grid-cols-[.22fr_.7fr_1.15fr] lg:items-start"><span className="font-playfair text-5xl text-[#c34d43]">{study.no}</span><div><p className="text-[10px] font-bold tracking-[.2em] text-[#a99a84] uppercase">{study.tag}</p><h3 className="mt-3 font-playfair text-4xl tracking-[-.04em]">{study.title}</h3></div><div><p className="font-garamond text-xl leading-relaxed text-[#d8cbbb]">{study.copy}</p><p className="mt-5 text-[10px] font-bold tracking-[.18em] text-[#d15d53] uppercase">READ THROUGH: {study.condition}</p></div></article>)}</div>
      </div></section>

      <section id="compass" className="relative bg-[#bc463d] px-5 py-24 text-[#fff6e9] sm:px-9 lg:px-14 lg:py-32"><div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_.72fr] lg:items-end"><div className="kx-reveal"><p className="text-[10px] font-bold tracking-[.26em] text-[#36130f] uppercase">03 / READING COMPASS</p><h2 className="mt-5 font-playfair text-5xl leading-[.84] tracking-[-.06em] sm:text-7xl">Start where the pressure feels familiar.</h2></div><div className="kx-reveal space-y-4 font-garamond text-xl leading-relaxed text-[#ffe5d1]"><p><b className="font-playfair text-[#fff8ee]">If the body feels strange:</b> begin with <i>The Metamorphosis</i>.</p><p><b className="font-playfair text-[#fff8ee]">If the system feels impossible:</b> begin with <i>The Trial</i>.</p><p><b className="font-playfair text-[#fff8ee]">If you are tired of waiting:</b> begin with <i>Before the Law</i>, then <i>The Castle</i>.</p></div></div></section>

      <footer className="bg-[#0b0b09] px-5 py-20 sm:px-9 lg:px-14"><div className="mx-auto max-w-[1500px] border-y border-[#e9dfcf]/20 py-8"><p className="text-[10px] font-bold tracking-[.24em] text-[#bc463d] uppercase">End of the orientation</p><p className="mt-5 max-w-5xl font-playfair text-5xl leading-[.85] tracking-[-.06em] sm:text-7xl">The door may be open.<br /><span className="pl-[.12em] text-[#bc463d]">Understanding is another matter.</span></p><div className="mt-12 flex justify-between text-[9px] font-bold tracking-[.18em] text-[#9f907a] uppercase"><span>Franz Kafka · 1883—1924</span><span>Built for slow reading</span></div></div></footer>
    </main>
  );
}
