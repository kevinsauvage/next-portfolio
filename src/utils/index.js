// eslint-disable-next-line import/prefer-default-export
export const scrollToSection = (sectionLabel) => {
  const sectionId = `#${sectionLabel.split(' ').join('-')}`;
  const sectionElement = document.querySelector(sectionId);
  sectionElement?.scrollIntoView({ behavior: 'smooth' });
};
