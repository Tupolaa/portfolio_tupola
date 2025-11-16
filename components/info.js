// Info.js
import React from "react";
import { useLanguage } from "./LangChanger.js";
import MediaCarousel from "./MediaCarousel.js";

const Info = () => {
  const { content } = useLanguage();
  const profileData = content.info || {};

  const hobbiesArray = Array.isArray(profileData.Harrastukset)
    ? profileData.Harrastukset
    : [];

  
  const hobbies = hobbiesArray
  .map((hobby) => {
    if (!hobby) return null;

    const { title, icon, ...rest } = hobby;
    if (!title) return null;

    // Find first non-empty hobby description key
    const [key, value] = Object.entries(rest)[0] || [];

    let text = "";
    if (typeof value === "string") {
      text = value;
    } else if (value && typeof value === "object") {
      text = value.text || "";
    }

    return {
      name: title,        // <-- use the provided title
      text,
      image: icon || null,
    };
  })
  .filter(Boolean);

  // Build slides for the carousel: Hobbies / Life / Info
 
  const slides = [
    {
    type: "text",
    title: profileData.LifeCareer?.Header || "",
    content: [profileData.LifeCareer?.Info].filter(Boolean),
    images: Array.isArray(profileData.LifeCareer?.Pic)
      ? profileData.LifeCareer.Pic
      : profileData.LifeCareer?.Pic
      ? [profileData.LifeCareer.Pic]
      : [],
   
  },
  {
    type: "text",
    title: profileData.Goals?.Header || "",
    content: [profileData.Goals?.Info].filter(Boolean),
    images: Array.isArray(profileData.Goals?.Pic)
      ? profileData.Goals.Pic
      : profileData.Goals?.Pic
      ? [profileData.Goals.Pic]
      : [],
   
  },
    {
    type: "text",
    title: profileData.Abilities?.Header || "",
    content: [
      profileData.Abilities?.Info,
    ].filter(Boolean),
    images: Array.isArray(profileData.Abilities?.Pic)
      ? profileData.Abilities.Pic
      : profileData.Abilities?.Pic
      ? [profileData.Abilities.Pic]
      : [],
   
  },
  {
  type: "text",
  title: profileData.Freetime?.Header || "",
  content: [profileData.Freetime?.Info].filter(Boolean),
  images: Array.isArray(profileData.Freetime?.Pic)
    ? profileData.Freetime.Pic
    : profileData.Freetime?.Pic
    ? [profileData.Freetime.Pic]
    : [],
},
  {
    type: "hobbies",
    title: profileData.Hobbytitle || "",
    hobbies,
  
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
