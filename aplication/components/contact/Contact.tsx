"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLenisControls } from "@/hooks/useLenis";

export function Contact() {
  const { t } = useLanguage();
  const { start } = useLenisControls();

  const whatsappMessage = encodeURIComponent(
    "Olá Daniel! Vi seu portfólio e gostaria de conversar."
  );

  return (
    <section
      id="contato"
      onMouseEnter={start}
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
        {/* Label */}
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-purple-400/70">
          {t.contact.label}
        </p>

        {/* Título */}
        <h2 className="mt-5 font-serif text-5xl text-white md:text-7xl">
          {t.contact.title}
          <span className="text-purple-400">.</span>
        </h2>

        {/* Descrição */}
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-400 md:text-base">
          {t.contact.description}
        </p>

        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/5518997574430?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="group mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-purple-400/30 bg-purple-500/10 px-7 py-4 font-mono text-sm text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.08)] transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-500/15 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-400/15">
            <FaWhatsapp size={18} className="text-purple-300" />
          </span>

          <span>{t.contact.whatsapp}</span>

          <ArrowUpRight
            size={16}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </motion.a>

        {/* Linha divisória */}
        <div className="mx-auto mt-16 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Cards */}
        <div className="mx-auto mt-10 grid w-full max-w-2xl gap-4 md:grid-cols-3">
          {/* E-mail */}
          <motion.a
            href="mailto:danielcolonhze@gmail.com"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl border border-purple-500/10 bg-purple-500/[0.02] p-5 transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-500/[0.05] hover:shadow-[0_10px_40px_rgba(168,85,247,0.08)]"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/10 bg-purple-500/[0.04] transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/10">
              <Mail
                size={19}
                strokeWidth={1.6}
                className="text-purple-400/70 transition-colors group-hover:text-purple-300"
              />
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/60">
              E-mail
            </p>

            <p className="mt-3 break-all text-sm text-gray-400 transition-colors group-hover:text-purple-300">
              danielcolonhze@gmail.com
            </p>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/Daniel-Colonheze"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl border border-purple-500/10 bg-purple-500/[0.02] p-5 transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-500/[0.05] hover:shadow-[0_10px_40px_rgba(168,85,247,0.08)]"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/10 bg-purple-500/[0.04] transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/10">
              <FaGithub
                size={20}
                className="text-purple-400/70 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-300"
              />
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/60">
              GitHub
            </p>

            <p className="mt-3 text-sm text-gray-400 transition-colors group-hover:text-purple-300">
              @Daniel-Colonheze
            </p>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/daniel-colonheze/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl border border-purple-500/10 bg-purple-500/[0.02] p-5 transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-500/[0.05] hover:shadow-[0_10px_40px_rgba(168,85,247,0.08)]"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/10 bg-purple-500/[0.04] transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/10">
              <FaLinkedin
                size={20}
                className="text-purple-400/70 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-300"
              />
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/60">
              LinkedIn
            </p>

            <p className="mt-3 text-sm text-gray-400 transition-colors group-hover:text-purple-300">
              /in/daniel-colonheze
            </p>
          </motion.a>
        </div>

        {/* Disponibilidade */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 font-mono text-[11px] uppercase tracking-[0.3em] text-white/70"
        >
          {t.contact.availability}
        </motion.p>
      </motion.div>
    </section>
  );
}