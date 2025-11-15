// Footer.jsx
import React from "react";
import { useLanguage } from "./LangChanger.js";

const normalizeImgPath = (img) => {
  if (!img) return null;
  const fixed = img.replace(/^\/?media\//i, "/Media/");
  return fixed.startsWith("/") ? fixed : `/${fixed}`;
};

const Footer = () => {
  const { content } = useLanguage();

  const footerData = content?.Footer ?? content?.footer ?? {};
  const links =
    Array.isArray(footerData.links) && footerData.links.length
      ? footerData.links
      : Array.isArray(footerData.Links) && footerData.Links.length
      ? footerData.Links
      : [];

  const footerText =
    footerData.text ??
    `© ${new Date().getFullYear()} Teemu Tupola. All rights reserved.`;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-email">teemu.tupola@gmail.com</p>

        {links.length > 0 && (
          <div className="footer-links">
            {links.map((link, i) => {
              const src = normalizeImgPath(link.img);
              return (
                <a
                  key={i}
                  href={link.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                  aria-label={link.label ?? link.alt ?? `footer-link-${i}`}
                >
                  {src && <img src={src} alt={link.alt ?? link.label ?? ""} />}
                  {link.label && <span>{link.label}</span>}
                </a>
              );
            })}
          </div>
        )}

        <p className="footer-copy">{footerText}</p>
      </div>
    </footer>
  );
};

export default Footer;
