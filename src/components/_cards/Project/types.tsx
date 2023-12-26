export type ProjectType = {
  title: string;
  description: string;
  images: {
    thumbnail: {
      src: string;
      alt: string;
    };
  };
  technologies: Array<{ name: string }>;
  websiteLink: string;
  githubLink: Array<string>;
};
