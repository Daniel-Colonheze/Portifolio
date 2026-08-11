"use client";

import MagicCube from "../cube/MagicCube";

export function CubeSection() {
  return (
    <section
      id="cubo"
      className="relative min-h-screen overflow-hidden bg-[#05050a] px-5 py-16 sm:px-6 sm:py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-4 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="relative z-10 flex flex-col items-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#a78bfa]/70 sm:text-xs sm:tracking-[0.4em]">
            Interativo 3D
          </p>

          <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[0.95] tracking-tight text-[#f5f5f7] sm:mt-4 sm:text-5xl md:text-7xl">
            Cubo Mágico
            <br />
            <span className="text-[#a78bfa]">3D.</span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-6 text-[#f5f5f7]/50 sm:mt-7 sm:text-base sm:leading-7 md:text-lg">
            Gosto de criar experiências interativas usando tecnologias como
            Three.js e Blender, transformando ideias em interfaces dinâmicas,
            simples e interessantes de explorar.
          </p>
        </div>

        <div className="relative -mx-2 h-[470px] w-[calc(100%+16px)] sm:mx-0 sm:h-[500px] sm:w-full md:h-[600px] lg:h-[750px]">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/[0.04] blur-[80px] sm:h-[420px] sm:w-[420px] sm:blur-[100px] md:h-[550px] md:w-[550px]" />

          <div className="relative h-full w-full">
            <MagicCube />
          </div>
        </div>
      </div>
    </section>
  );
}
