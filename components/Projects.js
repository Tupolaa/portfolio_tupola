// projektit joita olen tehnyt
import React, { useState } from "react";
import FinData from "../public/Data/Fin.json";
import MediaCarousel from "./MediaCarousel.js";

const Projects = () => {
  const { projects = [] } = FinData.Projects || {};
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);

  return (
    <section className="projects-section">
      <h2>Projektit</h2>

      <div className="projects-container">
        {projects.map((project) => (
          <div
            key={project.title}
            className="project-box"
            onClick={() => setSelectedProject(project)}
          >
            <h3>{project.title}</h3>
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
                    className="skill-icon"
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
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>

            <h2>{selectedProject.title}</h2>

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
                    className="skill-icon"
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
