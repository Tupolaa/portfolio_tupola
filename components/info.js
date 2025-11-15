// Info.jsx
import React from "react";
import { useLanguage } from "./LangChanger.js";
import MediaCarousel from "./MediaCarousel.js";

const Info = () => {
  const { content } = useLanguage();
  const profileData = content.info || {};

  // Harrastukset: array of objects like { "Koodaus": "desc..." }
  const hobbiesArray = Array.isArray(profileData.Harrastukset)
    ? profileData.Harrastukset
    : [];

  // Normalize hobbies into { name, text, image } objects
  const hobbies = hobbiesArray
  .map((hobby) => {
    if (!hobby) return null;

    // Separate icon from the rest
    const { icon, ...rest } = hobby;

    const entries = Object.entries(rest);
    if (!entries.length) return null;

    const [name, value] = entries[0];

    // value can be a plain string or an object
    if (typeof value === "string") {
      return {
        name,
        text: value,
        image: icon || null, // ← use top-level icon
      };
    }

    if (value && typeof value === "object") {
      return {
        name,
        text: value.text || "",
        image: icon || value.image || null, // prefer icon, fallback to nested image
      };
    }

    return null;
  })
  .filter(Boolean);

  // Build slides for the carousel: Hobbies / Life / Info
  const slides = [
  {
    type: "hobbies",
    title: profileData.info?.Hobbytitle || "Hobbies",
    hobbies,
  },
  {
    type: "text",
    title: profileData.Infobox2?.Header || "Life & Career",
    content: [
      profileData.Infobox2?.Info,
      profileData.Infobox3?.Info,
    ].filter(Boolean),
    image: profileData.Infobox2?.Pic || null,
    image: profileData.Infobox3?.Pic || null,
  },
  {
    type: "text",
    title: "Tavoitteet",
    content: [profileData.Infobox4?.Info].filter(Boolean),
    image: profileData.Infobox4?.Pic || null,
  },
].filter((slide) => {
  if (slide.type === "hobbies") return slide.hobbies && slide.hobbies.length;
  return slide.content && slide.content.length > 0;
});

  return (
    <section id="profile" className="info-section">
      <h2>{profileData.header}</h2>

      {/* 3 sivua: Harrastukset / Elämä & ura / Tavoitteet */}
      <MediaCarousel media={slides} />

      
    </section>
  );
};

export default Info;
