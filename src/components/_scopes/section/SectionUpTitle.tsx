import { cloneElement, JSXElementConstructor, ReactElement } from 'react';

type Properties = {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  id?: string;
};

const SectionUpTitle = ({ text, icon, id }: Properties) => (
  <div
    className="flex items-center gap-2 mb-5 bg-blue-950 w-fit p-2 rounded-md text-blue-400 border border-blue-500"
    id={id}
  >
    {cloneElement(icon, { role: 'presentation', size: 20, strokeWidth: 1.5 })}
    <p>{text}</p>
  </div>
);

export default SectionUpTitle;
