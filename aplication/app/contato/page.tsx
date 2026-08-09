"use client";

import { Contact } from "@/components/contact/Contact";
import { Header } from "@/components/header/Header";

export default function ContatoPage() {
  return (
    <main className="relative min-h-screen bg-black pt-24">
      <Header />
      <Contact />
    </main>
  );
}