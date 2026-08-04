"use client";

import { Projects } from "@/components/projects/Projects";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";

export default function ProjetosPage() {
  return (
    <main className="relative min-h-screen bg-black pt-24">
      <div className="absolute right-6 top-6 z-30 sm:right-10 sm:top-8 md:right-16 md:top-10">
        <LanguageSwitcher />
      </div>

      <Projects />
    </main>
  );
}