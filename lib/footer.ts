import type { FooterData, FooterLink, SiteContent } from "../types/content";

export const normalizeImgPath = (img: string | undefined) => {
  if (!img) return null;
  const fixed = img.replace(/^\/?media\//i, "/Media/");
  return fixed.startsWith("/") ? fixed : `/${fixed}`;
};

// Footer data is used by both the Profile (social links) and the Footer.
export function getFooter(content: Partial<SiteContent>): { data: FooterData; links: FooterLink[] } {
  const data = content?.Footer ?? content?.footer ?? {};
  const links = data.Links?.length ? data.Links : data.links?.length ? data.links : [];
  return { data, links };
}
