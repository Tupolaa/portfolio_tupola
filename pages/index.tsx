import Head from "next/head";
import Navbar from "../components/Header";
import Profile from "../components/Profile";
import Work from "../components/Work";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Info from "../components/Info";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Teemu Tupola",
  url: "https://tupola.dev",
  jobTitle: "Junior Software Developer",
  worksFor: { "@type": "Organization", name: "AIneo Agency", url: "https://aineoagency.com/" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "HAMK" },
  address: { "@type": "PostalAddress", addressLocality: "Hämeenlinna", addressCountry: "FI" },
  image: "https://tupola.dev/Media/Muotokuva4.JPG",
  sameAs: ["https://github.com/Tupolaa", "https://www.linkedin.com/in/teemutupola/"],
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Teemu Tupola - Portfolio</title>
        <link rel="icon" href="/Media/muotokuvaFacicon.png" />
        <meta name="description" content="Teemu Tupola - Backend/Web Developer Portfolio. Projects, tech stack, and contact information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Teemu Tupola" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="canonical" href="https://Tupola.dev" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Teemu Tupola - Portfolio" />
        <meta property="og:description" content="Backend/Web Developer Portfolio. Projects, tech stack, and contact information." />
        <meta property="og:url" content="https://Tupola.dev" />
        <meta property="og:image" content="https://Tupola.dev/Media/muotokuvaFacicon.png" />

        {/* Twitter/X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Teemu Tupola - Portfolio" />
        <meta name="twitter:description" content="Backend/Web Developer Portfolio. Projects, tech stack, and contact information." />
        <meta name="twitter:image" content="https://Tupola.dev/Media/muotokuvaFacicon.png" />

        {/* Structured data (schema.org Person) for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </Head>

      <AnimatedBackground />

      <div className="relative z-[1]">
        <Navbar />

        <main className="pt-24 md:pt-28">
          <div className="mx-auto max-w-[1400px] px-4 md:px-6">
            <section id="Profile">
              <Profile />
            </section>

            <section id="work" className="mt-24">
              <Work />
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
