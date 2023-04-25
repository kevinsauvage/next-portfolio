import {
  css,
  express,
  git,
  githubIcon,
  html,
  javascript,
  jest,
  mongodb,
  next,
  node,
  react,
  redux,
  sass,
  svelte,
} from './svg';

const competences = [
  { description: 'HTML', icon: html },
  { description: 'CSS', icon: css },
  { description: 'SASS', icon: sass },
  { description: 'JavaScript', icon: javascript },
  { description: 'React.js', icon: react },
  { description: 'Next.js', icon: next },
  { description: 'Svelte.js', icon: svelte },
  { description: 'Node.js', icon: node },
  { description: 'Express.js', icon: express },
  { description: 'Jest', icon: jest },
  { description: 'MongoDB', icon: mongodb },
  { description: 'Redux', icon: redux },
  { description: 'Git', icon: git },
  { description: 'Github', icon: githubIcon },
];

export default competences;
