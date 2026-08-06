"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { Header } from "@/components/header/Header";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({
  children,
}: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen
          onComplete={() => setIsLoading(false)}
        />
      )}

      {!isLoading && <Header />}

      {children}
    </>
  );
}
