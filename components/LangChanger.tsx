"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { SiteContent } from "../types/content";

interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
  content: Partial<SiteContent>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const FILE_BY_LANG: Record<string, string> = {
  en: "/Data/Eng.json",
  fi: "/Data/Fin.json",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("en");
  const [content, setContent] = useState<Partial<SiteContent>>({});

  // Read saved language on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved && FILE_BY_LANG[saved]) setLangState(saved);
    } catch {}
  }, []);

  const setLang = (newLang: string) => {
    setLangState(newLang);
    try { localStorage.setItem("lang", newLang); } catch {}
  };

  useEffect(() => {
    const url = FILE_BY_LANG[lang];
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (!cancelled) setContent(data);
      } catch (e) {
        console.error("Language load failed:", e);
        if (!cancelled) setContent({});
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
