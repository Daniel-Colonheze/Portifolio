"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { Hero } from "@/components/hero/Hero";
import { TechStack } from "@/components/stack/TechStack";
import { Projects } from "@/components/projects/Projects";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <Contact />
      </main>
    </>
  );
}