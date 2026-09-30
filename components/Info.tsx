import React from "react";
import { useLanguage } from "./LangChanger";
import MediaCarousel from "./MediaCarousel";
import type { HobbiesSlide, InfoData, InfoSection, TextSlide } from "../types/content";

// Carousel slide order
const SECTION_KEYS = ["LifeCareer", "Goals", "Abilities", "Freetime"] as const;

const toTextSlide = (section: InfoSection | undefined): TextSlide | null => {
  if (!section?.Info) return null;
  const pics = section.Pic;
  return {
    type: "text",
    title: section.Header || "",
    content: [section.Info],
    images: Array.isArray(pics) ? pics : pics ? [pics] : [],
  };
};

const Info = () => {
  const { content } = useLanguage();
  const profileData: InfoData = content.info || { header: "" };

  // Each hobby is { title, icon, <anyKey>: text }, so the text is the first remaining value
  const hobbies: HobbiesSlide["hobbies"] = (profileData.Harrastukset ?? [])
    .filter((hobby) => hobby?.title)
    .map(({ title, icon, ...rest }) => ({
      name: title,
      text: Object.values(rest)[0] ?? "",
      image: icon || null,
    }));

  const slides: (TextSlide | HobbiesSlide)[] = SECTION_KEYS.map((key) =>
    toTextSlide(profileData[key])
  ).filter((slide): slide is TextSlide => slide !== null);

  if (hobbies.length) {
    slides.push({ type: "hobbies", title: profileData.Hobbytitle || "", hobbies });
  }

  return (
    <section className="glass rounded-3xl border border-cyan-400/20 px-4 py-10 md:px-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-cyan-400 md:text-4xl">
        {profileData.header}
      </h2>

      <MediaCarousel media={slides} />
    </section>
  );
};

export default Info;
