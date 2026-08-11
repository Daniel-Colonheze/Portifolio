"use client";

import MagicCube from "../cube/MagicCube";
import { ArrowUpRight } from "lucide-react";

export function CubeSection() {
  return (
    <section
      id="cubo"
      className="relative min-h-screen overflow-hidden bg-[#05050a] px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative z-10 flex flex-col items-start">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#a78bfa]/70">
            Interativo 3D
          </p>

          <h2 className="mt-4 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight text-[#f5f5f7] md:text-7xl">
            Cubo Mágico
            <br />
            <span className="text-[#a78bfa]">3D.</span>
          </h2>

          <p className="mt-7 max-w-md text-base leading-7 text-[#f5f5f7]/50 md:text-lg">
            Explore o cubo em três dimensões, gire suas faces e tente
            encontrar a solução diretamente na tela.
          </p>

          <button
            type="button"
            className="group mt-9 flex items-center gap-3 rounded-full bg-[#f5f5f7] px-6 py-3.5 text-sm font-medium text-[#05050a] transition-transform duration-300 hover:scale-[1.03]"
          >
            Comprar cubo

            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <div className="relative h-[500px] w-full md:h-[650px] lg:h-[750px]">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/[0.04] blur-[100px] md:h-[550px] md:w-[550px]" />

          <div className="relative h-full w-full">
            <MagicCube />
          </div>
        </div>
      </div>
    </section>
  );
}