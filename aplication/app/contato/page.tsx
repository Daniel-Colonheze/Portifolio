"use client";

import { Contact } from "@/components/contact/Contact";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";

export default function ContatoPage() {
  return (
    <main className="relative min-h-screen bg-black pt-24">
      <div className="absolute right-6 top-6 z-30 sm:right-10 sm:top-8 md:right-16 md:top-10">
        <LanguageSwitcher />
      </div>

      <Contact />
    </main>
  );
}