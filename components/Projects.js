// projektit joita olen tehnyt
import React, { useState, useEffect } from "react";
import { useLanguage } from '../components/LangChanger.js';
import MediaCarousel from "./MediaCarousel.js";

const Projects = () => {
  const { content, lang } = useLanguage();
  const projects = Array.isArray(content.Projects?.projects)
    ? content.Projects.projects
    : [];
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);
  useEffect(() => {
  if (selectedProject) {
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");   // ⬅️ add class when modal open
  } else {
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open"); // ⬅️ remove when closed
  }

  return () => {
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open");
  };
}, [selectedProject]);
  return (
    <section className="projects-section">
      <h2>{content.Projects?.header}</h2>
      <p className="project-spoiler">{content.Projects?.Spoiler}</p>

      <div className="projects-container">
        {projects.map((project) => (
          <div
            key={project.title}
            className="project-box"
            onClick={() => setSelectedProject(project)}
          >
            <h3>{project.title}</h3>
            <h4>{project.Timeline}</h4>
            <p>
              {project.description.length > 50
                ? project.description.slice(0, 50) + "…"
                : project.description}
            </p>
             {Array.isArray(project.Tech) && (
              <div className="modal-tech">
                {project.Tech.map((t, i) => (
                  <img
                    key={i}
                    src={t.icon}
                    alt={t.alt || `Tech ${i + 1}`}
                    className="tech-favicon"
                    width="24"
                    height="24"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* === POPUP MODAL === */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} 
          >
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>

            <h2>{selectedProject.title}</h2>
            <h4>{selectedProject.Timeline}</h4>

            {selectedProject.reference && (
              <h4>{lang === 'fi' ? 'Suosittelijat:' : 'References:'}</h4>
            )}
            {selectedProject.reference && (
              <p className="project-reference" style={{ whiteSpace: 'pre-line' }}>
                {selectedProject.reference}
              </p>
            )}


<MediaCarousel
  media={
    selectedProject.media ??
    [
      ...(selectedProject.video ? [{ type: 'video', src: selectedProject.video }] : []),
      ...(selectedProject.image ? [{ type: 'image', src: selectedProject.image, alt: selectedProject.title }] : []),
    ]
  }
/>
            
            <p className="modal-description">
              {selectedProject.description}
            </p>

            {Array.isArray(selectedProject.links) && selectedProject.links.length > 0 && (
              <div className="modal-links">
                {selectedProject.links.map((link) => (
                  <a
                    key={link.link}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.Name}
                  </a>
                ))}
              </div>
            )}

            {Array.isArray(selectedProject.Tech) && (
              <div className="modal-tech">
                {selectedProject.Tech.map((t, i) => (
                  <img
                    key={i}
                    src={t.icon}
                    alt={t.alt || `Tech ${i + 1}`}
                    className="tech-favicon"
                    width="24"
                    height="24"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
