"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { Hero } from "@/components/hero/Hero";
import { TechStack } from "@/components/stack/TechStack";
import { ComputerSection } from "@/components/computer/ComputerSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main>
        <Hero />
        <TechStack />
        <ComputerSection />
      </main>
    </>
  );
}