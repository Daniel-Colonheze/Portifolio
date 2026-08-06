"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  translations,
  type Language,
} from "./translations";

type Translation = (typeof translations)[Language];

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext =
  createContext<LanguageContextType | undefined>(
    undefined
  );

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("pt");

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "portfolio-language"
      ) as Language | null;

    if (
      savedLanguage === "pt" ||
      savedLanguage === "en"
    ) {
      setLanguageState(savedLanguage);
    }

    setMounted(true);
  }, []);

  const setLanguage = (
    newLanguage: Language
  ) => {
    setLanguageState(newLanguage);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "portfolio-language",
        newLanguage
      );
    }
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider
      value={contextValue}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage deve ser usado dentro de LanguageProvider"
    );
  }

  return context;
}