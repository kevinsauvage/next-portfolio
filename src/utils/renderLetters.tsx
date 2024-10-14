const renderLetters = (text: string, className?: string) =>
  text.split('', 100).map((char, index) => (
    <span
      key={index + text}
      className={`char min-w-2 inline-block opacity-0 will-change-auto ${className}`}
    >
      {char}
    </span>
  ));

export default renderLetters;
