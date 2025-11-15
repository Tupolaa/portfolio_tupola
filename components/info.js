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
const toImageArray = (pic) => {
  if (!pic) return [];
  return Array.isArray(pic) ? pic.filter(Boolean) : [pic];
};
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
    title: profileData.Hobbytitle || "Hobbies",
    hobbies,
    //Friba, Lenkkeily, koodaus, Pelaaminen kuvat
  },
  {
    type: "text",
    title: profileData.Abilities?.Header || "Life & Career",
    content: [
      profileData.Abilities?.Info,
    ].filter(Boolean),
    //image: profileData.Abilities?.Pic || null,
    // ei kuvaa ollenkaan????
  },
  {
    type: "text",
    title: profileData.Goals?.Header || "Goals",
    content: [profileData.Goals?.Info].filter(Boolean),
    image: profileData.Goals?.Pic || null,
    //"rise up" kuva nuoli ylös että suunta ylös
  },
  {
    type: "text",
    title: profileData.Freetime?.Header || "Free Time",
    content: [profileData.Freetime?.Info].filter(Boolean),
    image: profileData.Freetime?.Pic || null,
    //metsuri kuva
  },

].filter((slide) => {
  if (slide.type === "hobbies") return slide.hobbies && slide.hobbies.length;
  return slide.content && slide.content.length > 0;
});

  return (
    <section id="profile" className="info-section">
      <h2>{profileData.header}</h2>

      
      <MediaCarousel media={slides} />

      
    </section>
  );
};

export default Info;
