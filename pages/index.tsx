import Head from "next/head";
import Navbar from "../components/Header";
import Profile from "../components/Profile";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Info from "../components/Info";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Home() {
  return (
    <>
      <Head>
        <title>Teemu Tupola - Portfolio</title>
        <meta name="description" content="Teemu Tupola - Backend/Web Developer Portfolio. Projects, tech stack, and contact information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Teemu Tupola" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="canonical" href="https://teemutupola.com" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Teemu Tupola - Portfolio" />
        <meta property="og:description" content="Backend/Web Developer Portfolio. Projects, tech stack, and contact information." />
        <meta property="og:url" content="https://teemutupola.com" />
        <meta property="og:image" content="https://teemutupola.com/Media/OmaKuva.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Teemu Tupola - Portfolio" />
        <meta name="twitter:description" content="Backend/Web Developer Portfolio. Projects, tech stack, and contact information." />
        <meta name="twitter:image" content="https://teemutupola.com/Media/OmaKuva.jpg" />
      </Head>

      <AnimatedBackground />

      <div className="relative z-[1]">
        <Navbar />

        <main className="pt-24 md:pt-28">
          <div className="mx-auto max-w-[1400px] px-4 md:px-6">
            <section id="Profile">
              <Profile />
            </section>

            <section id="projects" className="mt-24">
              <Projects />
            </section>

            <section id="skills" className="mt-24">
              <Skills />
            </section>

            <section id="Info" className="mt-24 mb-24">
              <Info />
            </section>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
