const IconMenu = (properties) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    {...properties}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export default IconMenu;
