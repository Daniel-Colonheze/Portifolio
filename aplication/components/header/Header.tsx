"use client";

import { useState } from "react";
import { Menu, X, Download, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { LanguageSwitcher } from "../language/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLenisControls } from "@/hooks/useLenis";
import { useIsMobile } from "@/hooks/useIsMobile"; // NOVO

export function Header() {
  const { t } = useLanguage();
  const { scrollTo } = useLenisControls();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile(); // NOVO

  const [isOpen, setIsOpen] = useState(false);

  const isNotHome = pathname !== "/";

  const links = [
    { label: t.header.about, href: "#sobre" },
    { label: t.header.stack, href: "#stack" },
    { label: t.header.projects, href: "/projetos" },
    { label: t.header.certificates, href: "#certificacoes" },
    ...(!isMobile ? [{ label: t.header.computer, href: "#computador" }] : []), // NOVO: só entra fora do mobile
    { label: t.header.contact, href: "/contato" },
  ];

  const handleNavigation = (href: string) => {
    setIsOpen(false);

    const isPage = href === "/projetos" || href === "/contato";

    if (isPage) {
      router.push(href);
      return;
    }

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    scrollTo(href, { duration: 1.5 });
  };

  const handleLogo = () => {
    setIsOpen(false);

    if (pathname !== "/") {
      router.push("/");
      return;
    }

    scrollTo("#sobre", { duration: 1.5 });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-20 px-4 pt-5 md:px-8 md:pt-6"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-purple-500/10 bg-black/60 px-5 shadow-[0_0_30px_rgba(168,85,247,0.04)] backdrop-blur-xl md:px-7">

        {/* LOGO + SETA DE VOLTAR */}
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {isNotHome && (
              <motion.button
                type="button"
                onClick={() => router.push("/")}
                initial={{ opacity: 0, x: -8, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -8, width: 0 }}
                transition={{ duration: 0.25 }}
                aria-label={t.header.back}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/[0.06] text-purple-400 transition-colors hover:border-purple-400/40 hover:text-purple-300"
              >
                <ArrowLeft size={16} />
              </motion.button>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleLogo}
            className="group font-mono text-sm font-semibold tracking-wider text-white"
          >
            Daniel Colonheze
            <span className="text-purple-400 transition-colors group-hover:text-purple-300">
              .
            </span>
          </button>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavigation(link.href)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400 transition-colors duration-300 hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-purple-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/resume/Daniel-colonheze-currículo.pdf"
            download
            className="flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/6 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-purple-300 transition-colors hover:border-purple-400/50 hover:bg-purple-500/10"
          >
            <Download size={13} />
            {t.header.downloadCV}
          </a>

          <LanguageSwitcher />
        </div>

        {/* MOBILE */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/15 bg-purple-500/[0.04] text-gray-300 transition-colors hover:border-purple-400/30 hover:text-white"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-purple-500/10 bg-black/95 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col">
              {links.map((link, index) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavigation(link.href)}
                  className="flex items-center justify-between rounded-xl px-4 py-4 text-left font-mono text-xs uppercase tracking-[0.18em] text-gray-400 transition-colors hover:bg-purple-500/[0.06] hover:text-white"
                >
                  <span>{link.label}</span>
                  <span className="text-purple-400/50">0{index + 1}</span>
                </button>
              ))}

              <a
                href="/resume/Daniel-colonheze-currículo.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-between rounded-xl border border-purple-500/15 bg-purple-500/[0.04] px-4 py-4 text-left font-mono text-xs uppercase tracking-[0.18em] text-purple-300 transition-colors hover:bg-purple-500/[0.08]"
              >
                <span>{t.header.downloadCV}</span>
                <Download size={14} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}