'use client';

import Link from 'next/link';
import React from 'react';
import { useLanguage } from '../components/LangChanger.js';

export default function Navbar() {
  const { lang, setLang, content } = useLanguage();
  const links = Array.isArray(content?.Nav?.links) ? content.Nav.links : [];
  
  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
       // close menu after clicking (for mobile)
    }
  };
  return (
    <header>
      <nav className="navbar-container">
        {links.map((links) => (
          <button  className="navButton" key={links.id} onClick={() => scrollTo(links.id)}>
            {links.Name}
          </button>
        ))}
        <div className="lang-buttons">
          <button
            onClick={() => setLang('fi')}
            className={lang === 'fi' ? 'active' : ''}
          >
            FIN
          </button>
          <button
            onClick={() => setLang('en')}
            className={lang === 'en' ? 'active' : ''}
          >
            ENG
          </button>
        </div>
      </nav>
    </header>
  );
}
