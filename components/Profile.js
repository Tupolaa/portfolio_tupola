import React from 'react';
import  { useLanguage } from '../components/LangChanger.js';
import TiltedCard from '../components/TiltedCard.js';
const Profile = () => {
  // Correctly destructure from root level Profile
   const { content } = useLanguage();
    const profileData = content.Profile || {};

  return (
    <div className='profile-container'>
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

      

      <div className='profile-info'>
         <svg viewBox="0 0 1000 300">
          <text x="50%" y="50%" text-anchor="middle">
            {profileData.name}
            </text>
        <text className="title-text" x="50%" y="80%" text-anchor="middle">
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