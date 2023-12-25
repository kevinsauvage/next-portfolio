export type ProjectType = {
  title: string;
  description: string;
  images: { thumbnail: string };
  technologies: Array<{ name: string }>;
  websiteLink: string;
  githubLink: Array<string>;
};
