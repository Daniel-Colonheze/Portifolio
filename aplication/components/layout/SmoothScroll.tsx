"use client";

import { ReactNode } from "react";
import { LenisProvider } from "@/hooks/useLenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}