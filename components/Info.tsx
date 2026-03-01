import React from "react";
import { useLanguage } from "./LangChanger";
import MediaCarousel from "./MediaCarousel";

const Info = () => {
  const { content } = useLanguage();
  const profileData = content.info || ({} as any);

  const hobbiesArray = Array.isArray(profileData.Harrastukset)
    ? profileData.Harrastukset
    : [];

  const hobbies = hobbiesArray
    .map((hobby: any) => {
      if (!hobby) return null;
      const { title, icon, ...rest } = hobby;
      if (!title) return null;

      const [, value] = Object.entries(rest)[0] || [];

      let text = "";
      if (typeof value === "string") {
        text = value;
      } else if (value && typeof value === "object") {
        text = (value as any).text || "";
      }

      return {
        name: title,
        text,
        image: icon || null,
      };
    })
    .filter(Boolean);

  const slides = [
    {
      type: "text" as const,
      title: profileData.LifeCareer?.Header || "",
      content: [profileData.LifeCareer?.Info].filter(Boolean),
      images: Array.isArray(profileData.LifeCareer?.Pic)
        ? profileData.LifeCareer.Pic
        : profileData.LifeCareer?.Pic
          ? [profileData.LifeCareer.Pic]
          : [],
    },
    {
      type: "text" as const,
      title: profileData.Goals?.Header || "",
      content: [profileData.Goals?.Info].filter(Boolean),
      images: Array.isArray(profileData.Goals?.Pic)
        ? profileData.Goals.Pic
        : profileData.Goals?.Pic
          ? [profileData.Goals.Pic]
          : [],
    },
    {
      type: "text" as const,
      title: profileData.Abilities?.Header || "",
      content: [profileData.Abilities?.Info].filter(Boolean),
      images: Array.isArray(profileData.Abilities?.Pic)
        ? profileData.Abilities.Pic
        : profileData.Abilities?.Pic
          ? [profileData.Abilities.Pic]
          : [],
    },
    {
      type: "text" as const,
      title: profileData.Freetime?.Header || "",
      content: [profileData.Freetime?.Info].filter(Boolean),
      images: Array.isArray(profileData.Freetime?.Pic)
        ? profileData.Freetime.Pic
        : profileData.Freetime?.Pic
          ? [profileData.Freetime.Pic]
          : [],
    },
    {
      type: "hobbies" as const,
      title: profileData.Hobbytitle || "",
      hobbies,
    },
  ].filter((slide) => {
    if (slide.type === "hobbies") return (slide as any).hobbies && (slide as any).hobbies.length;
    return (slide as any).content && (slide as any).content.length > 0;
  });

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
