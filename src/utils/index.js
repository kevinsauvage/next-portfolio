export const scrollToSection = (sectionLabel) => {
  const sectionId = `#${sectionLabel.split(' ').join('-')}`;
  const sectionElement = document.querySelector(sectionId);
  sectionElement?.scrollIntoView({ behavior: 'smooth' });
};

export const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

export const getSectionLabel = (sectionId) => {
  const sectionLabel = sectionId.split(' ').join('-').toLowerCase();
  return capitalize(sectionLabel);
};
