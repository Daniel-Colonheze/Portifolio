"use client";

import Image from "next/image";

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

        <a
          href="#computador"
          className="text-sm font-mono text-purple-400 border-b border-purple-400/40 hover:border-purple-400 transition-colors"
        >
          ↓ role para explorar
        </a>
      </div>

      <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 w-[340px] h-[420px] rounded-lg overflow-hidden border border-purple-900/40">
        <Image
          src="/images/profile.jpg"
          alt="Daniel Colonheze"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}