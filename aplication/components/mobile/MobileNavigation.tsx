"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Folder, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";

export function MobileNavigation() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Não renderiza no desktop
  if (!isMobile) return null;

  const goToPage = (path: string) => {
    window.location.href = path;
  };

  return (
    <section
      id="mobile-navigation"
      className="relative overflow-hidden bg-gradient-to-b from-black via-[#09050f] to-black px-6 py-24"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/[0.06] blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto max-w-md text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-purple-400/70">
          {t.mobileNavigation.label}
        </span>

        <h2 className="mt-4 font-mono text-2xl font-semibold tracking-wider text-white">
          {t.mobileNavigation.title}
          <span className="text-purple-400">.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-400">
          {t.mobileNavigation.description}
        </p>

        {/* Indicador */}
        <div className="mx-auto mt-8 flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/15 bg-purple-500/[0.04]">
          <ArrowDown
            size={16}
            strokeWidth={1.5}
            className="text-purple-400"
          />
        </div>

        {/* Botões */}
        <div className="mt-8 grid gap-3">
          {/* Projetos */}
          <motion.button
            type="button"
            onClick={() => goToPage("/projetos")}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -3 }}
            className="group flex w-full items-center justify-between rounded-xl border border-purple-500/15 bg-purple-500/[0.04] px-5 py-4 text-left transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/[0.08]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/15 bg-purple-500/[0.05]">
                <Folder
                  size={18}
                  strokeWidth={1.6}
                  className="text-purple-400"
                />
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-400/60">
                  01
                </p>

                <p className="mt-1 font-mono text-sm text-gray-300 transition-colors group-hover:text-white">
                  {t.mobileNavigation.projects}
                </p>
              </div>
            </div>

            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-400"
            />
          </motion.button>

          {/* Contato */}
          <motion.button
            type="button"
            onClick={() => goToPage("/contato")}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -3 }}
            className="group flex w-full items-center justify-between rounded-xl border border-purple-500/15 bg-purple-500/[0.04] px-5 py-4 text-left transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/[0.08]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/15 bg-purple-500/[0.05]">
                <Mail
                  size={18}
                  strokeWidth={1.6}
                  className="text-purple-400"
                />
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-400/60">
                  02
                </p>

                <p className="mt-1 font-mono text-sm text-gray-300 transition-colors group-hover:text-white">
                  {t.mobileNavigation.contact}
                </p>
              </div>
            </div>

            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-400"
            />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

