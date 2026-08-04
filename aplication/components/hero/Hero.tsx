"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "../language/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const textVariants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 md:px-16">
      <div className="absolute right-6 top-6 z-30 sm:right-10 sm:top-8 md:right-16 md:top-10">
        <LanguageSwitcher />
      </div>

      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple-700/[0.06] blur-[140px]" />

      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.35,
        }}
        className="relative z-10 max-w-xl"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 font-mono text-sm text-purple-400"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mb-2 font-serif text-5xl text-white md:text-7xl"
        >
          Daniel Colonheze
          <span className="text-purple-400">.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-6 text-2xl italic text-gray-400 md:text-3xl"
        >
          {t.hero.role}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mb-8 leading-relaxed text-gray-400"
        >
          {t.hero.description}
        </motion.p>

        <motion.a
          variants={itemVariants}
          href="#computador"
          whileHover={{
            x: 5,
            color: "#c084fc",
          }}
          transition={{
            duration: 0.2,
          }}
          className="inline-block border-b border-purple-400/40 font-mono text-sm text-purple-400 transition-colors"
        >
          {t.hero.explore}
        </motion.a>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          x: 80,
          scale: 0.94,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.35,
        }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          scale: 1.015,
        }}
        className="absolute right-8 top-1/2 hidden h-[420px] w-[340px] -translate-y-1/2 overflow-hidden rounded-lg border border-purple-900/40 md:right-16 md:block"
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
    </section>
  );
}