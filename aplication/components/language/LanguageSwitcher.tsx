"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-purple-400/20 bg-black/70 p-1 shadow-[0_0_25px_rgba(168,85,247,0.08)] backdrop-blur-md">
      <button
        type="button"
        onClick={() => setLanguage("pt")}
        className={`min-w-[42px] rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all duration-300 ${
          language === "pt"
            ? "bg-purple-500/20 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        PT
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`min-w-[42px] rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all duration-300 ${
          language === "en"
            ? "bg-purple-500/20 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        EN
      </button>
    </div>
  );
}
