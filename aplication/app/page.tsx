"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { Hero } from "@/components/hero/Hero";
import { TechStack } from "@/components/stack/TechStack";
import { ComputerSection } from "@/components/computer/ComputerSection";
import { MobileNavigation } from "@/components/mobile/MobileNavigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("loadingShown");
    console.log("[Home] loadingShown no storage:", alreadyShown); // TEMPORÁRIO pra debug
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
        <ComputerSection />
        <MobileNavigation />
      </main>
    </>
  );
}