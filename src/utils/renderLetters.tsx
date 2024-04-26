const renderLetters = (text: string) =>
  text.split('', 100).map((char, index) => (
    <span
      key={index}
      className="char"
      style={{
        display: 'inline-block',
        opacity: 0,
        willChange: 'transform, opacity',
      }}
    >
      {char}
    </span>
  ));

export default renderLetters;
