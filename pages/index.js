import React from "react";
import Navbar from "../components/header.js";

export default function Home() {
   const sectionStyle = { 
    maxWidth: 1200, 
    margin: "0 auto", 
    padding: "20px"  /* Add padding */
  };

  return (
    <>
      <Navbar />
      
      <main style={{ paddingTop: 64 }}>
      <section></section>
        <section style={sectionStyle}>
          <h1>Welcome to My Portfolio</h1>
          <p>This is the homepage of my portfolio website.</p>
        </section>
      </main>
    </>
  );
}