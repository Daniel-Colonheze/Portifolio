"use client";

import { Projects } from "@/components/projects/Projects";
import { Header } from "@/components/header/Header";


export default function ProjetosPage() {
  return (
    <main className="relative min-h-screen bg-black pt-24">
      <Header />
      <Projects />
    </main>
  );
}