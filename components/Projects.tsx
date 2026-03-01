import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LangChanger";
import MediaCarousel from "./MediaCarousel";
import type { Project } from "../types/content";

const Projects = () => {
  const { content, lang } = useLanguage();
  const projects: Project[] = Array.isArray(content.Projects?.projects)
    ? content.Projects.projects
    : [];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      const onEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
      };
      const onTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener("keydown", onEsc);
      document.addEventListener("keydown", onTab);
      // Focus the modal on open
      requestAnimationFrame(() => modalRef.current?.focus());
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onEsc);
        document.removeEventListener("keydown", onTab);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedProject, closeModal]);

  return (
    <>
      <section className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8 lg:p-12">
        <h2 className="mb-2 text-center text-3xl font-bold text-foreground">
          {content.Projects?.header}
        </h2>
        <p className="mb-8 text-center text-sm text-gray-400">
          {content.Projects?.Spoiler}
        </p>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-sm transition-all duration-300 hover:border-cyan/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-cyan/5"
            >
              {/* BG logo - top right */}
              {project.bgLogo && (
                <img
                  src={project.bgLogo}
                  alt=""
                  className="absolute top-3 right-3 h-14 w-14 object-contain opacity-70 drop-shadow-[0_0_6px_rgba(0,255,221,0.3)] transition-all duration-300 group-hover:opacity-90 group-hover:drop-shadow-[0_0_10px_rgba(0,255,221,0.5)]"
                />
              )}

              <h3 className="mb-1 line-clamp-2 pr-12 text-base font-semibold text-foreground transition-colors group-hover:text-cyan">
                {project.title}
              </h3>
              <p className="mb-2 text-xs text-cyan-light/70">
                {project.Timeline}
              </p>
              <p className="mb-3 line-clamp-2 text-sm text-gray-400">
                {project.description.length > 80
                  ? project.description.slice(0, 80) + "..."
                  : project.description}
              </p>

              {Array.isArray(project.Tech) && (
                <div className="flex flex-wrap gap-1.5">
                  {project.Tech.map((t, i) => (
                    <img
                      key={i}
                      src={t.icon}
                      alt={t.alt || `Tech ${i + 1}`}
                      className="h-5 w-5 object-contain opacity-60 transition-opacity group-hover:opacity-100"
                      title={t.alt}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Modal — rendered via portal into document.body */}
      {selectedProject && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827]/95 p-6 backdrop-blur-xl md:p-8 outline-none"
            style={{ animation: "pop-in 0.2s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label={lang === "fi" ? "Sulje projektin tiedot" : "Close project details"}
              className="absolute top-4 right-4 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              &#10005;
            </button>

            <h2 id="project-modal-title" className="mb-1 pr-10 text-2xl font-bold text-foreground">
              {selectedProject.title}
            </h2>
            <p className="mb-4 text-sm text-cyan-light">
              {selectedProject.Timeline}
            </p>

            {selectedProject.reference && (
              <>
                <h4 className="mb-1 text-sm font-semibold text-gray-400">
                  {lang === "fi" ? "Suosittelijat:" : "References:"}
                </h4>
                <p className="mb-4 whitespace-pre-line text-sm text-gray-300">
                  {selectedProject.reference}
                </p>
              </>
            )}

            <MediaCarousel
              media={
                selectedProject.media ??
                [
                  ...(selectedProject.video
                    ? [{ type: "video" as const, src: selectedProject.video }]
                    : []),
                  ...(selectedProject.image
                    ? [{ type: "image" as const, src: selectedProject.image, alt: selectedProject.title }]
                    : []),
                ]
              }
            />

            <p className="my-4 text-base leading-relaxed text-gray-200">
              {selectedProject.description}
            </p>

            {Array.isArray(selectedProject.links) && selectedProject.links.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedProject.links.map((link) => (
                  <a
                    key={link.link}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-cyan-light transition-all hover:border-cyan/30 hover:bg-white/10"
                  >
                    {link.Name}
                  </a>
                ))}
              </div>
            )}

            {Array.isArray(selectedProject.Tech) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedProject.Tech.map((t, i) => (
                  <img
                    key={i}
                    src={t.icon}
                    alt={t.alt || `Tech ${i + 1}`}
                    className="h-7 w-7 object-contain"
                    title={t.alt}
                  />
                ))}
              </div>
            )}

            {selectedProject.Feedback && (
              <>
                <h4 className="mb-1 text-sm font-semibold text-gray-400">
                  {lang === "fi" ? "Asiakkaan palaute:" : "Feedback from customer:"}
                </h4>
                <p className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-sm leading-relaxed italic text-gray-300">
                  {selectedProject.Feedback}
                </p>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Projects;
