import "@/styles/globals.css";
import '../styles/Header.css'
import "../styles/Profile.css"
import "../styles/Projects.css"
import "../styles/TiltedCard.css"
import "../styles/Skills.css"
import "../styles/info.css"
import { LanguageProvider } from "../components/LangChanger.js";


export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}