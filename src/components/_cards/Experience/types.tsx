export type ExperienceType = {
  title: string;
  period: string;
  description: string;
  company: {
    name: string;
    link: string;
  };
  listItem: Array<string>;
};
