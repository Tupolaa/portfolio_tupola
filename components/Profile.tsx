import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "./LangChanger";
import type { FooterLink } from "../types/content";

const normalizeImgPath = (img: string | undefined) => {
  if (!img) return null;
  const fixed = img.replace(/^\/?media\//i, "/Media/");
  return fixed.startsWith("/") ? fixed : `/${fixed}`;
};

const Profile = () => {
  const { content } = useLanguage();
  const profileData = content.Profile || { name: "", title: "", description: "", quote: "" };

  const footerData = content?.Footer ?? content?.footer ?? {};
  const links: FooterLink[] =
    (Array.isArray(footerData.Links) && footerData.Links.length
      ? footerData.Links
      : Array.isArray(footerData.links) && footerData.links.length
        ? footerData.links
        : []) as FooterLink[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-8"
    >
      {/* Mobile: SVG title above photo */}
      <div className="lg:hidden w-full">
        <svg viewBox="0 0 1000 300" className="profile-heading-svg w-full" role="heading" aria-level={1} aria-label={`${profileData.name} — ${profileData.title}`}>
          <text x="50%" y="50%" textAnchor="middle">
            {profileData.name}
          </text>
          <text className="title-text" x="50%" y="80%" textAnchor="middle">
            {profileData.title}
          </text>
        </svg>
      </div>

      {/* Profile photo - clean professional style */}
      <div className="flex-shrink-0">
        <div className="relative group">
          {/* Glow ring behind photo */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-purple-500/50 via-cyan/40 to-blue/50 opacity-80 blur-lg group-hover:opacity-80 transition-opacity duration-500" />
          <img
            src="/Media/OmaKuva.jpg"
            alt={profileData.name || "Profile picture"}
            className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-96 lg:h-[480px] rounded-full object-cover border-2 border-white/15 shadow-1xl shadow-black/40"
          />
        </div>
      </div>

      {/* Info section */}
      <div className="flex-1 flex flex-col items-center lg:items-start gap-6">
        {/* Desktop SVG title */}
        <svg viewBox="0 0 1000 300" className="profile-heading-svg hidden lg:block w-full max-w-2xl" role="heading" aria-level={1} aria-label={`${profileData.name} — ${profileData.title}`}>
          <text x="50%" y="50%" textAnchor="middle">
            {profileData.name}
          </text>
          <text className="title-text" x="50%" y="80%" textAnchor="middle">
            {profileData.title}
          </text>
        </svg>

        {/* Bio */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
          <p className="text-base leading-relaxed text-gray-200">{profileData.description}</p>
        </div>

        {/* Quote */}
        {profileData.quote && (
          <p className="text-lg italic text-cyan-light/80 text-center lg:text-left px-4">
            {profileData.quote}
          </p>
        )}

        {/* Social links */}
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          {links.map((link, i) => {
            const src = normalizeImgPath(link.img);
            return (
              <a
                key={i}
                href={link.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan/30 hover:bg-white/[0.08] transition-all group"
              >
                {src && (
                  <img
                    src={src}
                    alt={link.alt ?? link.label ?? ""}
                    className="w-5 h-5 object-contain"
                  />
                )}
                {link.label && (
                  <span className="text-sm font-medium text-gray-300 group-hover:text-cyan transition-colors">
                    {link.label}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
