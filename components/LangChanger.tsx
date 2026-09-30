"use client";
import React, { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";
import type { SiteContent } from "../types/content";
import eng from "../public/Data/Eng.json";
import fin from "../public/Data/Fin.json";

interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
  content: Partial<SiteContent>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Content is bundled at build time so the server-rendered HTML already contains
// the text (visible to search engines and link previews, no empty first paint).
const CONTENT_BY_LANG: Record<string, SiteContent> = {
  en: eng as SiteContent,
  fi: fin as SiteContent,
};

// Selected language lives outside React so it can be restored from localStorage
// without a setState-in-effect; the server always renders English.
let currentLang: string | null = null;
const listeners = new Set<() => void>();

const getLang = () => {
  if (currentLang === null) {
    try {
      const saved = localStorage.getItem("lang");
      currentLang = saved && CONTENT_BY_LANG[saved] ? saved : "en";
    } catch {
      currentLang = "en";
    }
  }
  return currentLang;
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const setLang = (newLang: string) => {
  currentLang = newLang;
  try { localStorage.setItem("lang", newLang); } catch {}
  listeners.forEach((cb) => cb());
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLang, () => "en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const content = CONTENT_BY_LANG[lang] ?? CONTENT_BY_LANG.en;

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
