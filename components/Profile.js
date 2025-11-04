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
  containerHeight="710px"
  containerWidth="510px"
  imageHeight="710px"
  imageWidth="510px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={false}
  altText="Profile Image"
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