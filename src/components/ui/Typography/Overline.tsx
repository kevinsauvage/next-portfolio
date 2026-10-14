import { createText } from './typography';

export const Overline = createText(
  'p',
  'inline-flex items-center gap-2.5 font-mono text-xs leading-normal font-medium tracking-[0.22em] uppercase text-primary-400 before:h-3 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-primary-400 before:to-secondary-500 before:content-[""]'
);

export default Overline;
