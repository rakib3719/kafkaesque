"use client";

import { ArrowDown, CircleDot, DoorOpen, EyeOff, GitBranch, Scaling, Shell } from "lucide-react";
import { useState } from "react";

const ideas = [
  {
    id: "body",
    number: "01",
    name: "THE BODY",
    title: "When the body stops feeling like home",
    work: "The Metamorphosis",
    explanation: "Gregor Samsa wakes changed, but the real horror is social: a family and a workplace can no longer see the person inside the changed body.",
    question: "Who are you when usefulness disappears?",
    icon: Shell,
  },
  {
    id: "law",
    number: "02",
    name: "THE LAW",
    title: "When judgment exists without an explanation",
    work: "The Trial · Before the Law",
    explanation: "Josef K. is arrested without being told why. Kafka turns law into an atmosphere: omnipresent, opaque, and impossible to reach.",
    question: "What does guilt feel like when there is no charge?",
    icon: Scaling,
  },
  {
    id: "system",
    number: "03",
    name: "THE SYSTEM",
    title: "When every route creates another corridor",
    work: "The Castle",
    explanation: "K. pursues an authority that remains distant through messages, clerks, and procedures. The maze is not broken; it is working exactly as designed.",
    question: "How do you fight a system with no visible center?",
    icon: GitBranch,
  },
  {
    id: "isolation",
    number: "04",
    name: "THE ROOM",
    title: "When intimacy turns into distance",
    work: "Letters · The Metamorphosis",
    explanation: "Kafka's rooms, families, and offices are close together, yet people remain radically unreadable to one another.",
    question: "Can someone be loved and still remain unseen?",
    icon: EyeOff,
  },
  {
    id: "threshold",
    number: "05",
    name: "THE THRESHOLD",
    title: "When permission never arrives",
    work: "Before the Law",
    explanation: "A door stands open, but the man outside it waits for authorization. Kafka makes waiting itself into a form of captivity.",
    question: "What door are you waiting to be allowed through?",
    icon: DoorOpen,
  },
];

export default function PhilosophyAtlas() {
  const [selected, setSelected] = useState(1);
  const idea = ideas[selected];
  const IdeaIcon = idea.icon;

  return (
    <section id="atlas" className="relative overflow-hidden border-b border-[#e6dac5]/20 bg-[#ece4d6] px-5 py-20 text-[#171411] sm:px-9 lg:px-14 lg:py-28">
      <div className="absolute inset-0 opacity-[0.34] [background-image:radial-gradient(#6a5d4c_.7px,transparent_.7px)] [background-size:14px_14px]" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold tracking-[0.26em] text-[#a8332c] uppercase">Orientation / not a biography</p>
          <h2 className="mt-4 font-playfair text-5xl leading-[0.88] tracking-[-0.055em] sm:text-7xl">A map of<br />unease.</h2>
          <p className="mt-7 max-w-2xl font-garamond text-xl leading-relaxed text-[#493f35] sm:text-2xl">Kafka does not offer a single philosophy. He repeatedly places ordinary people inside five pressures. Start with one. Follow where it leads.</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(330px,.8fr)] lg:gap-16">
          <div className="relative border-y border-[#393128]/35 py-6 lg:py-8">
            <div className="absolute bottom-10 left-[16px] top-10 hidden w-px bg-[#393128]/35 sm:block" />
            <div className="space-y-0">
              {ideas.map((item, index) => {
                const Icon = item.icon;
                const isActive = selected === index;
                return (
                  <button key={item.id} onClick={() => setSelected(index)} aria-pressed={isActive} className={`relative z-10 grid w-full grid-cols-[34px_1fr_auto] items-center gap-3 border-b border-[#393128]/20 py-4 text-left last:border-b-0 sm:grid-cols-[54px_1fr_auto] sm:py-5 ${isActive ? "text-[#a8332c]" : "text-[#251f19]"}`}>
                    <span className={`grid h-8 w-8 place-items-center rounded-full border text-[10px] font-bold ${isActive ? "border-[#a8332c] bg-[#a8332c] text-[#f6eddf]" : "border-[#393128]/45 bg-[#ece4d6]"}`}>{item.number}</span>
                    <span><span className="block font-playfair text-2xl leading-none sm:text-3xl">{item.name}</span><span className="mt-1 hidden font-garamond text-sm text-[#65594d] sm:block">{item.title}</span></span>
                    <Icon className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
          </div>

          <article className="relative border border-[#393128]/40 bg-[#171411] p-7 text-[#f2e9db] sm:p-10">
            <span className="absolute right-6 top-5 text-[10px] font-bold tracking-[0.2em] text-[#b9a88e]">{idea.number} / 05</span>
            <div className="grid h-12 w-12 place-items-center border border-[#a8332c] text-[#d9574e]"><IdeaIcon className="h-6 w-6" /></div>
            <p className="mt-9 text-[10px] font-bold tracking-[0.22em] text-[#d9574e] uppercase">Through {idea.work}</p>
            <h3 className="mt-3 font-playfair text-4xl leading-[0.95] tracking-[-0.04em]">{idea.title}</h3>
            <p className="mt-7 font-garamond text-lg leading-relaxed text-[#d8cdbd]">{idea.explanation}</p>
            <div className="mt-9 border-t border-[#f1e6d3]/20 pt-5"><p className="font-garamond text-xl italic text-[#f4ebdf]">“{idea.question}”</p></div>
          </article>
        </div>

        <div className="mt-12 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#66594b] uppercase"><CircleDot className="h-4 w-4 text-[#a8332c]" /> Choose a condition to change the reading lens <ArrowDown className="h-4 w-4" /></div>
      </div>
    </section>
  );
}
