export interface NavLink {
  Name: string;
  id: string;
}

export interface Nav {
  links: NavLink[];
}

export interface ProfileData {
  name: string;
  title: string;
  description: string;
  quote: string;
}

export interface MediaItem {
  type?: "image" | "video";
  src: string;
  alt?: string;
}

export interface ProjectLink {
  Name: string;
  link: string;
}

export interface TechItem {
  icon: string;
  alt?: string;
}

export interface Project {
  title: string;
  Timeline: string;
  description: string;
  bgLogo?: string;
  media?: MediaItem[];
  image?: string;
  video?: string;
  links?: ProjectLink[];
  Tech?: TechItem[];
  reference?: string;
  Feedback?: string;
}

export interface ProjectsData {
  header: string;
  Spoiler: string;
  projects: Project[];
}

export interface SkillItem {
  name: string;
  icon?: string;
  alt?: string;
  desc?: string;
  level?: string;
  slot?: string;
}

export interface SkillsData {
  header: string;
  subheader?: string;
  categoryHeader: string | string[];
  items: SkillItem[];
}

export interface InfoImage {
  src: string;
  alt?: string;
}

export interface InfoSection {
  Header: string;
  Info: string;
  Pic?: string | InfoImage[];
}

export interface Hobby {
  title: string;
  icon?: string;
  [key: string]: string | undefined;
}

export interface InfoData {
  header: string;
  LifeCareer?: InfoSection;
  Abilities?: InfoSection;
  Goals?: InfoSection;
  Freetime?: InfoSection;
  Hobbytitle?: string;
  Harrastukset?: Hobby[];
}

export interface FooterLink {
  href: string;
  label: string;
  img?: string;
  alt?: string;
}

export interface FooterData {
  Links?: FooterLink[];
  links?: FooterLink[];
  text?: string;
}

export interface SiteContent {
  Nav: Nav;
  Profile: ProfileData;
  Projects: ProjectsData;
  Skills: SkillsData;
  info: InfoData;
  Footer?: FooterData;
  footer?: FooterData;
}

// Carousel slide types
export interface TextSlide {
  type: "text";
  title: string;
  content: string[];
  images?: (string | InfoImage)[];
  image?: string;
  imageAlt?: string;
}

export interface HobbiesSlide {
  type: "hobbies";
  title: string;
  hobbies: { name: string; text: string; image: string | null }[];
}

export type CarouselSlide = TextSlide | HobbiesSlide | MediaItem;
