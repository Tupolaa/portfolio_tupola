"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "./LangChanger";

export default function Navbar() {
  const { lang, setLang, content } = useLanguage();
  const links = Array.isArray(content?.Nav?.links) ? content.Nav.links : [];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Ids are the same in both languages, so a string key keeps the effect from re-running on language change
  const idsKey = links.map((l) => l.id).join(",");

  // Highlight the section whose top has passed a line 35% down the viewport
  useEffect(() => {
    const ids = idsKey ? idsKey.split(",") : [];
    if (!ids.length) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      let bestTop = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > bestTop) {
          bestTop = top;
          current = id;
        }
      }
      // The last section may be too short to reach the line, so select it at the bottom of the page
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];
      setActive(current ?? ids[0]);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [idsKey]);

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] h-[70px] border-b border-cyan-400/30 bg-[#0a0a0f]/90 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:justify-center">
        {/* Hamburger - mobile only */}
        <button
          className="relative flex h-6 w-7 flex-col justify-between md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span
            className={`block h-[3px] w-full rounded-full bg-white transition-transform duration-300 ${
              open ? "translate-y-[9px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[3px] w-full rounded-full bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[3px] w-full rounded-full bg-white transition-transform duration-300 ${
              open ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Nav links */}
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[70px] left-0 right-0 flex-col items-center gap-2 border-b border-cyan-400/30 bg-[#0a0a0f]/95 px-4 py-4 backdrop-blur-xl md:static md:flex md:flex-row md:gap-4 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none`}
        >
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                aria-current={isActive ? "location" : undefined}
                className={`group relative w-full max-w-[320px] cursor-pointer overflow-hidden rounded-xl border bg-transparent px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] md:w-auto ${
                  isActive
                    ? "border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    : "border-white/10 text-white"
                }`}
              >
                <span className="relative z-10">{link.Name}</span>
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent transition-transform duration-500 group-hover:translate-y-0 ${
                    isActive ? "translate-y-0" : "-translate-y-full"
                  }`}
                />
              </button>
            );
          })}

          {/* Language buttons */}
          <div className="mt-2 flex gap-0 md:ml-4 md:mt-0">
            <button
              onClick={() => setLang("fi")}
              aria-pressed={lang === "fi"}
              className={`cursor-pointer border border-white/40 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                lang === "fi"
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white/10"
              } rounded-l-lg`}
            >
              FIN
            </button>
            <button
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`cursor-pointer border border-l-0 border-white/40 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                lang === "en"
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white/10"
              } rounded-r-lg`}
            >
              ENG
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
