"use client";

import { motion } from "framer-motion";

export function Contact() {
  const whatsappMessage = encodeURIComponent(
    "Olá Daniel! Vi seu portfólio e gostaria de conversar sobre um projeto."
  );

  return (
    <section
      id="contato"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24 md:px-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/[0.06] blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-4xl text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-purple-400/70">
          03 / Contato
        </p>

        <h2 className="mt-5 font-serif text-5xl text-white md:text-7xl">
          Vamos conversar
          <span className="text-purple-400">.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-400 md:text-base">
          Tem um projeto em mente, uma oportunidade ou simplesmente quer
          trocar uma ideia? Estou disponível para conversar.
        </p>

        <motion.a
          href={`https://wa.me/5518997574430?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-purple-400/30 bg-purple-500/10 px-7 py-4 font-mono text-sm text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.08)] transition-colors hover:border-purple-400/60 hover:bg-purple-500/15"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-400/15 text-base">
            ↗
          </span>

          Enviar uma mensagem
        </motion.a>

        <div className="mx-auto mt-16 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <div className="mx-auto mt-10 grid w-full max-w-2xl gap-4 md:grid-cols-3">
          <a
            href="mailto:danielcolonhze@gmail.com"
            className="group rounded-xl border border-purple-500/10 bg-purple-500/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-purple-500/[0.05]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/60">
              E-mail
            </p>

            <p className="mt-3 break-all text-sm text-gray-400 transition-colors group-hover:text-purple-300">
              danielcolonhze@gmail.com
            </p>
          </a>

          <a
            href="https://github.com/Daniel-Colonheze"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-purple-500/10 bg-purple-500/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-purple-500/[0.05]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/60">
              GitHub
            </p>

            <p className="mt-3 text-sm text-gray-400 transition-colors group-hover:text-purple-300">
              @Daniel-Colonheze
            </p>
          </a>

          <a
            href="https://www.linkedin.com/in/daniel-colonheze/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-purple-500/10 bg-purple-500/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-purple-500/[0.05]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/60">
              LinkedIn
            </p>

            <p className="mt-3 text-sm text-gray-400 transition-colors group-hover:text-purple-300">
              /in/daniel-colonheze
            </p>
          </a>
        </div>

        <p className="mt-16 font-mono text-[17px] uppercase tracking-[0.3em] text-white">
          Disponível para novas oportunidades
        </p>
      </motion.div>
    </section>
  );
}

