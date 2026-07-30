"use client";

import { ReactNode } from "react";
import { useLenis } from "../../hooks/useLenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}