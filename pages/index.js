import React from "react";
import Navbar from "../components/header.js";
import Profile from "../components/Profile.js";
import Projects from "../components/Projects.js";




export default function Home() {
   const sectionStyle = { 
    maxWidth: 1200, 
    margin: "0 auto", 
    padding: "20px"  /* Add padding */
  };

  return (
    <>
      <Navbar />
      
      <main style={{ paddingTop: 100 }}>
      <section>
          <Profile/>
          <Projects/>
      </section>
      
      </main>
    </>
  );
}