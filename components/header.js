'use client';

import React, { useState } from 'react';
import { useLanguage } from '../components/LangChanger.js';

export default function Navbar() {
  const { lang, setLang, content } = useLanguage();
  const links = Array.isArray(content?.Nav?.links) ? content.Nav.links : [];
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setOpen(false); // close menu after click on mobile
    }
  };

  return (
    <header>
      <nav className="navbar-container">
        {/* Left side – you could drop a logo/name here later */}
        <div className="navbar-left">
          {/* Hamburger (visible only on mobile via CSS) */}
          <button
            className={`hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Links + language buttons */}
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <button
              className="navButton"
              key={link.id}
              onClick={() => scrollTo(link.id)}
            >
              {link.Name}
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
        </div>
      </nav>
    </header>
  );
}
