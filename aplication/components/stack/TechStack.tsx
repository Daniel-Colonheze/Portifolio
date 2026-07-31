"use client";

import { stack } from "@/data/stack";

export function TechStack() {
  return (
    <section className="py-12 bg-black/80 border-y border-purple-900/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden">
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            {[...stack, ...stack].map((tech, index) => (
              <span
                key={index}
                className="text-gray-300 text-sm font-mono tracking-wider"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}