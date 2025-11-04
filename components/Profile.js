import React from 'react';
import  { useLanguage } from '../components/LangChanger.js';

const Profile = () => {
  // Correctly destructure from root level Profile
   const { content } = useLanguage();
    const profileData = content.Profile || {};

  return (
    <div className='profile-container'>
      <img 
        className='profile-photo' 
        src='/Media/OmaKuva.jpg' 
        alt="Profile Image"
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