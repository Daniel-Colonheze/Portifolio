// components/layout/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="fixed top-6 left-6 z-40 font-mono text-sm text-purple-400 hover:text-white transition-colors"
    >
      ← voltar
    </button>
  );
}