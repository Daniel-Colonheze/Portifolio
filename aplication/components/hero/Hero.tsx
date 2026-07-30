"use client";

import { InteractiveCube } from "../hero/InteractuveCuve";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden bg-black">
      <div className="relative z-10 max-w-xl">
        <p className="text-purple-400 font-mono text-sm mb-4">// OLÁ, EU SOU</p>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-2">
          Daniel Colonheze<span className="text-purple-400">.</span>
        </h1>
        <p className="text-2xl md:text-3xl italic text-gray-400 mb-6">
          Desenvolvedor Frontend
        </p>
        <p className="text-gray-400 leading-relaxed mb-8">
          Estudante de Engenharia de Software com experiência prática em
          desenvolvimento web, focado em frontend e integração com APIs.
          Trabalho com React, Next.js e Node.js construindo interfaces
          responsivas e sistemas completos, do zero à produção.
        </p>
        <div className="flex gap-4">
          <a
            href="#projetos"
            className="bg-purple-400 text-black px-6 py-3 rounded-md font-medium"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="border border-purple-400 text-purple-400 px-6 py-3 rounded-md font-medium"
          >
            Entrar em Contato
          </a>
        </div>
      </div>

      <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full">
        <InteractiveCube />
      </div>
    </section>
  );
}