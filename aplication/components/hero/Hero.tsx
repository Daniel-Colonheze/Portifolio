"use client";


export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden bg-black">
      <div className="relative z-10 max-w-xl">
        <p className="text-purple-400 font-mono text-sm mb-4">// OLA, EU SOU</p>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-2">
          Daniel Colonheze<span className="text-purple-400">.</span>
        </h1>
        <p className="text-2xl md:text-3xl italic text-gray-400 mb-6">
          Desenvolvedor Frontend
        </p>
        <p className="text-gray-400 leading-relaxed mb-8">
          Estudante de Engenharia de Software com experiencia pratica em
          desenvolvimento web, focado em frontend e integracao com APIs.
          Trabalho com React, Next.js e Node.js construindo interfaces
          responsivas e sistemas completos, do zero a producao.
        </p>
      </div>

    </section>
  );
}