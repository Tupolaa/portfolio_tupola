import React from "react";
import Head from "next/head"; // ⬅️ import Head
import Navbar from "../components/header.js";
import Profile from "../components/Profile.js";
import Projects from "../components/Projects.js";
import Skills from "../components/Skills.js";
import Info from "../components/info.js";
import Footer from "../components/Footer.js";

export default function Home() {
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
    </>
  );
}
