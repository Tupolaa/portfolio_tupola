import React from "react";
import { useLanguage } from "./LangChanger";
import type { FooterLink } from "../types/content";

const normalizeImgPath = (img: string | undefined) => {
  if (!img) return null;
  const fixed = img.replace(/^\/?media\//i, "/Media/");
  return fixed.startsWith("/") ? fixed : `/${fixed}`;
};

const Footer = () => {
  const { content } = useLanguage();

  const footerData = content?.Footer ?? content?.footer ?? {};
  const links: FooterLink[] =
    (Array.isArray(footerData.Links) && footerData.Links.length
      ? footerData.Links
      : Array.isArray(footerData.links) && footerData.links.length
        ? footerData.links
        : []) as FooterLink[];

  const footerText =
    footerData.text ??
    `\u00A9 ${new Date().getFullYear()} Teemu Tupola. All rights reserved.`;

  return (
    <footer className="mt-8 border-t border-cyan-400/15 bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-5 px-6 py-10">
        <p className="text-sm font-medium text-slate-300">
          teemu.tupola@gmail.com
        </p>

        {links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link, i) => {
              const src = normalizeImgPath(link.img);
              return (
                <a
                  key={i}
                  href={link.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-3 text-center no-underline transition-all duration-200 hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                  aria-label={link.label ?? link.alt ?? `footer-link-${i}`}
                >
                  {src && (
                    <img
                      src={src}
                      alt={link.alt ?? link.label ?? ""}
                      className="h-8 w-8 object-contain"
                    />
                  )}
                  {link.label && (
                    <span className="text-xs text-white">{link.label}</span>
                  )}
                </a>
              );
            })}
          </div>
        )}

        <p className="text-xs text-slate-500">{footerText}</p>
      </div>
    </footer>
  );
};

export default Footer;
