import React from "react";
import Navbar from "../components/header.js";
import Profile from "../components/Profile.js";
import Projects from "../components/Projects.js";




export default function Home() {
   const sectionStyle = { 
    maxWidth: 1400, 
    margin: "0 auto", 
    padding: "20px"  
  };

  return (
    <>
      <Navbar />
      
      <main style={{ paddingTop: 100 }}>
      <section style={sectionStyle}>
          <Profile/>
          <Projects/>
      </section>
      
      </main>
    </>
  );
}