import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LanguageProvider } from "../components/LangChanger";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Analytics />
      <SpeedInsights />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
