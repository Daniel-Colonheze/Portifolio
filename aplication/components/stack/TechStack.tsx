"use client";

import { stack } from "@/data/stack";

export function TechStack() {
  const doubled = [...stack, ...stack]; // duplica pra loop infinito sem "costura" visível

  return (
    <section className="relative py-16 bg-black border-y border-purple-900/30 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="text-2xl md:text-4xl font-serif text-gray-600 mx-8 flex items-center"
          >
            {tech.name}
            <span className="text-purple-400 ml-8">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}