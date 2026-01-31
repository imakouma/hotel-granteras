"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type LanguageCode =
  | "ja"
  | "en"
  | "zh"
  | "ko"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "th"
  | "vi"
  | "id"
  | "pt"
  | "tl"
  | "ms"
  | "zh-TW";

const STORAGE_KEY = "app-language";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
};

const defaultValue: LanguageContextValue = {
  language: "ja",
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextValue>(defaultValue);

function getStoredLanguage(): LanguageCode {
  if (typeof window === "undefined") return "ja";
  const stored = localStorage.getItem(STORAGE_KEY);
  const valid: LanguageCode[] = [
    "ja", "en", "zh", "ko", "fr", "de", "es", "it", "th", "vi", "id", "pt", "tl", "ms", "zh-TW",
  ];
  if (stored && valid.includes(stored as LanguageCode)) return stored as LanguageCode;
  return "ja";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("ja");

  useEffect(() => {
    setLanguageState(getStoredLanguage());
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx ?? defaultValue;
}
