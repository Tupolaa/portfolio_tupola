import { useMemo } from "react";
import { useLanguage } from "./LangChanger";
import type { SkillItem } from "../types/content";

const normalize = (s: string | undefined) => (s || "").toString().trim().toLowerCase();

const Skills = () => {
  const { content } = useLanguage();
  const skills: SkillItem[] = Array.isArray(content?.Skills?.items)
    ? content.Skills.items
    : [];

  const rawCats = content?.Skills?.categoryHeader;
  const categories: string[] =
    typeof rawCats === "string"
      ? rawCats.split(",").map((c: string) => c.trim()).filter(Boolean)
      : Array.isArray(rawCats)
        ? rawCats
        : ["All"];

  // Remove "All" from category list since we show all grouped
  const displayCategories = categories.filter((c) => normalize(c) !== "all");

  const grouped = useMemo(() => {
    const map = new Map<string, SkillItem[]>();
    skills.forEach((skill) => {
      const slot = normalize(skill.slot);
      if (!slot) return;
      const matchedCat = displayCategories.find((c) => normalize(c) === slot);
      const key = matchedCat || skill.slot || "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(skill);
    });
    return map;
  }, [skills, displayCategories]);

  return (
    <section className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8 lg:p-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
        {content?.Skills?.header ?? "Tech Stack"}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from(grouped.entries()).map(([category, items]) => (
          <div
            key={category}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan">
              {category}
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {items.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex cursor-default flex-col items-center gap-1.5 rounded-xl p-3 transition-colors hover:bg-white/[0.06]"
                  title={skill.desc}
                >
                  {skill.icon && (
                    <img
                      src={skill.icon}
                      alt={skill.alt ?? skill.name}
                      className="h-10 w-10 object-contain transition-transform group-hover:scale-110"
                    />
                  )}
                  <span className="text-center text-[11px] leading-tight text-gray-400 transition-colors group-hover:text-gray-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
