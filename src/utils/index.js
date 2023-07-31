export const scrollToSection = (sectionLabel) => {
  const sectionId = `#${sectionLabel.split(' ').join('-')}`;
  const sectionElement = document.querySelector(sectionId);
  sectionElement?.scrollIntoView({ behavior: 'smooth' });
};

export const debounce = (function_, delay) => {
  let timeoutId;

  return (...arguments_) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      function_.apply(this, arguments_);
    }, delay);
  };
};
