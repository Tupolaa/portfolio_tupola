import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
     {/* --- Meta Tags --- */}
                <meta charSet="UTF-8" />
                <meta
                    name="description"
                    content="This my personal portfolio website showcasing my skills, projects, and experience as a software developer."
                />
                <meta name="author" content="Teemu Tupola" />
                <meta
                    name="keywords"
                    content="Portfolio, IT, Backend, Javascript, Java, Python, Student, Software Developer, Finland, Finnish"
                />
                {/* --- Favicon --- */}
                <link rel="icon" type="image/png" sizes="32x32" href="../Media/OmaKuva.jpg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
