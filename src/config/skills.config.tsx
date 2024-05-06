import Css3Plain from 'devicons-react/lib/icons/Css3Plain';
import ExpressOriginal from 'devicons-react/lib/icons/ExpressOriginal';
import GithubOriginal from 'devicons-react/lib/icons/GithubOriginal';
import GitOriginal from 'devicons-react/lib/icons/GitOriginal';
import Html5Plain from 'devicons-react/lib/icons/Html5Plain';
import JavascriptPlain from 'devicons-react/lib/icons/JavascriptPlain';
import JestPlain from 'devicons-react/lib/icons/JestPlain';
import MongodbOriginal from 'devicons-react/lib/icons/MongodbOriginal';
import NextjsOriginal from 'devicons-react/lib/icons/NextjsOriginal';
import NodejsOriginal from 'devicons-react/lib/icons/NodejsOriginal';
import ReactOriginal from 'devicons-react/lib/icons/ReactOriginal';
import ReduxOriginal from 'devicons-react/lib/icons/ReduxOriginal';
import SassOriginal from 'devicons-react/lib/icons/SassOriginal';
import SveltePlain from 'devicons-react/lib/icons/SveltePlain';
import TailwindcssPlain from 'devicons-react/lib/icons/TailwindcssOriginal';
import TypescriptPlain from 'devicons-react/lib/icons/TypescriptPlain';

const skills: Array<{ icon: JSX.Element; name: string }> = [
  { icon: <Html5Plain />, name: 'HTML' },
  { icon: <Css3Plain />, name: 'CSS' },
  { icon: <SassOriginal />, name: 'SASS' },
  { icon: <TailwindcssPlain />, name: 'Tailwind' },
  { icon: <JavascriptPlain />, name: 'JavaScript' },
  { icon: <TypescriptPlain />, name: 'TypeScript' },
  { icon: <ReactOriginal />, name: 'React' },
  { icon: <NextjsOriginal />, name: 'NextJs' },
  { icon: <SveltePlain />, name: 'Svelte' },
  { icon: <NodejsOriginal />, name: 'NodeJs' },
  { icon: <ExpressOriginal />, name: 'Express' },
  { icon: <ReduxOriginal />, name: 'Redux' },
  { icon: <MongodbOriginal />, name: 'MongoDB' },
  { icon: <JestPlain />, name: 'Jest' },
  { icon: <GitOriginal />, name: 'Git' },
  { icon: <GithubOriginal />, name: 'Github' },
];

export default skills;
