"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main>
        {/* Hero, TechStack, Projects, Contact entram aqui */}
      </main>
    </>
  );
}