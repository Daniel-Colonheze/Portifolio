"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLenisControls } from "@/hooks/useLenis";

const textVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Hero() {
  const { t } = useLanguage();
  const { scrollTo } = useLenisControls();

  const handleExplore = () => {
    scrollTo("#stack", { duration: 1.5 });
  };

  return (
    <section
      id="sobre"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-28 md:flex-row md:px-16 md:py-0"
    >
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple-700/[0.06] blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.015 }}
        className="relative z-10 mb-10 h-[280px] w-[220px] overflow-hidden rounded-lg border border-purple-900/40 sm:h-[340px] sm:w-[270px] md:absolute md:right-12 md:top-1/2 md:mb-0 md:h-[390px] md:w-[315px] md:-translate-y-1/2 lg:right-24 lg:h-[420px] lg:w-[340px]"
      >
        <Image
          src="/images/profile.jpg"
          alt="Daniel Colonheze"
          fill
          className="object-cover"
          priority
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-500/[0.05]" />
      </motion.div>

      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="relative z-10 max-w-xl text-center md:mr-auto md:max-w-[560px] md:pr-12 md:text-left lg:max-w-[600px] lg:pr-16"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 font-mono text-sm text-purple-400"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mb-2 font-serif text-4xl text-white sm:text-5xl md:text-7xl"
        >
          Daniel Colonheze
          <span className="text-purple-400">.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-6 text-xl italic text-gray-400 sm:text-2xl md:text-3xl"
        >
          {t.hero.role}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mb-8 whitespace-pre-line leading-relaxed text-gray-400"
        >
          {t.hero.description}
        </motion.p>

        <motion.button
          variants={itemVariants}
          type="button"
          onClick={handleExplore}
          whileHover={{ x: 5, color: "#c084fc" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="inline-block border-b border-purple-400/40 font-mono text-sm text-purple-400 transition-colors"
        >
          {t.hero.explore}
        </motion.button>
      </motion.div>
    </section>
  );
}

