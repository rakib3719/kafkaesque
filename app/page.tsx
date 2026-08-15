"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroLabyrinth from "@/components/HeroLabyrinth";
import PhilosophyAtlas from "@/components/PhilosophyAtlas";
import CanonicalChambers from "@/components/CanonicalChambers";
import TypewriterStudio from "@/components/TypewriterStudio";
import ManuscriptsArchive from "@/components/ManuscriptsArchive";
import OnboardingPortalCTA from "@/components/OnboardingPortalCTA";

export default function Home() {
  const [readingPathOpen, setReadingPathOpen] = useState(false);

  return (
    <main className="kafka-film min-h-screen bg-[#0a0a0c] text-[#e5ded4] font-serif selection:bg-[#bc463d] selection:text-[#fff7eb]">
      <Navbar onOpenCaseModal={() => setReadingPathOpen(true)} />
      <HeroLabyrinth />
      <PhilosophyAtlas />
      <CanonicalChambers />
      <TypewriterStudio />
      <ManuscriptsArchive />
      <OnboardingPortalCTA modalOpen={readingPathOpen} setModalOpen={setReadingPathOpen} />
    </main>
  );
}
