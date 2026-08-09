"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLenisControls } from "@/hooks/useLenis";

export function Footer() {
  const { t } = useLanguage();
  const { scrollTo } = useLenisControls();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === "complete") {
      setIsLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const links = [
    {
      label: t.header.about,
      href: "#sobre",
      type: "section",
    },
    {
      label: t.header.stack,
      href: "#stack",
      type: "section",
    },
    {
      label: t.header.projects,
      href: "/projetos",
      type: "page",
    },
    {
      label: t.header.certificates,
      href: "#certificados",
      type: "section",
    },
    {
      label: t.header.contact,
      href: "/contato",
      type: "page",
    },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/Daniel-Colonheze",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/daniel-colonheze/",
      icon: FaLinkedinIn,
    },
  ];

  const handleNavigation = (
    href: string,
    type: string
  ) => {
    if (type === "page") {
      window.location.href = href;
      return;
    }

    if (window.location.pathname === "/") {
      scrollTo(href, {
        duration: 1.5,
      });

      return;
    }

    window.location.href = `/${href}`;
  };

  const handleLogoClick = () => {
    if (window.location.pathname === "/") {
      scrollTo("#sobre", {
        duration: 1.5,
      });

      return;
    }

    window.location.href = "/#sobre";
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden border-t border-purple-500/10 bg-black px-6 py-16 md:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <button
              type="button"
              onClick={handleLogoClick}
              className="font-mono text-lg font-semibold tracking-wider text-white transition-colors duration-300 hover:text-purple-200"
            >
              Daniel de Oliveira Colonheze
              <span className="text-purple-400">.</span>
            </button>

            <p className="mt-4 text-sm leading-7 text-gray-300">
              {t.footer.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/15 bg-purple-500/[0.04] text-gray-300 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-purple-300"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400">
              {t.footer.navigation}
            </p>

            <nav className="grid grid-cols-2 gap-x-12 gap-y-4">
              {links.map((link) => {
                if (link.type === "section") {
                  return (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() =>
                        handleNavigation(
                          link.href,
                          link.type
                        )
                      }
                      className="w-fit text-left font-mono text-xs text-gray-300 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </button>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="w-fit font-mono text-xs text-gray-300 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">
            © {new Date().getFullYear()} Daniel Colonheze.{" "}
            {t.footer.rights}
          </p>

          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">
            {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
