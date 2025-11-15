// profile.js
import React from "react";
import { useLanguage } from "../components/LangChanger.js";
import TiltedCard from "../components/TiltedCard.js";

const Profile = () => {
  const { content } = useLanguage();
  const profileData = content.Profile || {};

  return (
    <div className="profile-container">
      {/* DESKTOP / TABLET: TiltedCard */}
      <div className="profile-photo-wrapper desktop-only">
        <TiltedCard
          imageSrc="/Media/OmaKuva.jpg"
          containerHeight="600px"
          containerWidth="410px"
          imageHeight="500px"
          imageWidth="310px"
          rotateAmplitude={7}
          showMobileWarning={false}
          showTooltip={false}
          autoAnimate={true}
          autoSpeed={1}
          autoScale={1.28}
        />
      </div>

      {/* MOBILE: Static image */}
      <div className="profile-photo-wrapper mobile-only">
        <img
          src="/Media/OmaKuva.jpg"
          alt={profileData.name || "Profile picture"}
          className="profile-photo-static"
        />
      </div>

      <div className="profile-info">
        {/* Animated SVG title (same for all, just styled differently on mobile) */}
        <svg viewBox="0 0 1000 300" className="profile-heading-svg">
          <text x="50%" y="50%" textAnchor="middle">
            {profileData.name}
          </text>
          <text className="title-text" x="50%" y="80%" textAnchor="middle">
            {profileData.title}
          </text>
        </svg>

        <p>{profileData.description}</p>
        <p className="quote">{profileData.quote}</p>
      </div>
    </div>
  );
};

export default Profile;
