'use client';

import Link from 'next/link';
import React from 'react';
import { useLanguage } from '../components/LangChanger.js';

export default function Navbar() {
  const { lang, setLang, content } = useLanguage();
  const links = Array.isArray(content?.Nav?.links) ? content.Nav.links : [];

  return (
    <header>
      <nav className="container">
        <ul>
          {links.map((item, i) => {
            const name = item?.Name ?? 'Link';
            const href =
              item?.link ??
              (name && item?.[name.toLowerCase()]) ??
              '#';

            return (
              <li key={`${name}-${i}`}>
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>

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
