'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

// map language -> public file path
const FILE_BY_LANG = {
  en: '/Data/Eng.json',
  fi: '/Data/Fin.json',
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');   // 'en' or 'fi'
  const [content, setContent] = useState({});

  useEffect(() => {
    const url = FILE_BY_LANG[lang];
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (!cancelled) setContent(data);
      } catch (e) {
        console.error('Language load failed:', e);
        if (!cancelled) setContent({});
      }
    })();

    return () => { cancelled = true; };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
