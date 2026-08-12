"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { Hero } from "@/components/hero/Hero";
import { TechStack } from "@/components/stack/TechStack";
import { Certifications } from "@/components/certifications/Certifications";
import { Projects } from "@/components/projects/Projects";
import { Contact } from "@/components/contact/Contact";
import { CubeSection } from "@/components/cube/CubeSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("loadingShown");

    if (alreadyShown) {
      setIsLoading(false);
    }

    setChecked(true);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("loadingShown", "true");
    setIsLoading(false);
  };

  if (!checked) return null;

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleComplete} />}

      <main>
        <Hero />
        <TechStack />
        <CubeSection />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}