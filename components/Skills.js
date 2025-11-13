// Omat taidot ja osaamiset
import { useState } from "react";
import { useLanguage } from "./LangChanger.js";

const categories = [
  "All",
  "Management",
  "Programming",
  "Soft Skills",
  "Database",
  "Cloud",
  "Languages",
];

const normalize = (s) => (s || "").toString().trim().toLowerCase();

const splitSlots = (slot) => {
  if (!slot) return [];
  if (Array.isArray(slot)) return slot.map((x) => normalize(x));
  return slot
    .toString()
    .split(/[;,|]/)
    .map((x) => normalize(x))
    .filter(Boolean);
};

const Skills = () => {
  const { content } = useLanguage();

  const skills = Array.isArray(content?.Skills?.items)
    ? content.Skills.items
    : [];

  const [selected, setSelected] = useState("All");

  const filteredSkills =
    selected === "All"
      ? skills
      : skills.filter((s) =>
          splitSlots(s.slot).includes(normalize(selected))
        );

  return (
    <section className="skills-section">
      <h2>{content?.Skills?.header ?? "Skills"}</h2>

      <div className="skills-filter">
        <div className="skills-filter-buttons">
          {categories.map((c) => {
            const isActive = selected === c;
            return (
              <button
                key={c}
                type="button"
                className={`filter-btn ${isActive ? "active" : ""}`}
                onClick={() => setSelected(c)}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="skills-container">
        {filteredSkills.map((s, i) => (
          <div className="skill-item" key={s.name ?? i}>
            {s.icon && (
              <img
                src={s.icon}
                alt={s.alt ?? s.name}
                className="skill-icons"
                width={48}
                height={48}
              />
            )}
            <div className="skill-meta">
              <div className="skill-name">{s.name}</div>
              {s.level && <div className="skill-level">{s.level}</div>}
              {s.desc && <div className="skill-desc">{s.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
