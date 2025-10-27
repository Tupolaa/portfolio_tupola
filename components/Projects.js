//projektit joita olen tehnyt
import React from 'react';
import FinData from '../public/Data/Fin.json';

const Projects = () => {
  const { projects } = FinData.fi;

  return (
    <section>
      <h2>Projektit</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.links[0].link} target="_blank" rel="noopener noreferrer">
              Katso projekti
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;