import "@/styles/globals.css";
import '../styles/Header.css'
import "../styles/Profile.css"
import "../styles/Projects.css"
import "../styles/TiltedCard.css"
import "../styles/Skills.css"
import "../styles/info.css"
import "../styles/Footer.css"
import { LanguageProvider } from "../components/LangChanger.js";
import { Analytics } from '@vercel/analytics/next';


export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
     <Analytics />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}