import React, { useState, useEffect } from "react";
import Head from "next/head"; // ⬅️ import Head
import Navbar from "../components/header.js";
import Profile from "../components/Profile.js";
import Projects from "../components/Projects.js";
import Skills from "../components/Skills.js";
import Info from "../components/info.js";
import Footer from "../components/Footer.js";
import ParticleBackground from "../components/ParticleBackround.jsx";

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const sectionStyle = {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "20px",
  };

  return (
  <>
    <Head>
      <title>Teemu Tupola – Portfolio</title>
    </Head>

    {/* Background wrapper */}
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        ...(isDesktop && { background: "#1b1b1b" }),
      }}
    >
      {/* Particle background - only on desktop */}
      {isDesktop && <ParticleBackground />}

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <main style={{ paddingTop: 100 }}>
          <section style={sectionStyle} id="Profile">
            <section>
              <Profile />
            </section>

            <section id="projects">
              <Projects />
            </section>

            <section id="skills">
              <Skills />
            </section>

            <section id="Info">
              <Info />
            </section>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  </>
);
}
