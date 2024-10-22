type Properties = {
  title: string;
  position: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const SectionTitle = ({ title, position, ...rest }: Properties) => (
  <h2 className="relative font-title flex flex-wrap items-baseline mb-10 text-4xl" {...rest}>
    <span className="font-bold text-blue-600">{position}.</span>
    <span dangerouslySetInnerHTML={{ __html: title }} className="whitespace-nowrap font-semibold" />
    <span className="w-full rounded-md bg-blue-600 h-1" />
  </h2>
);

export default SectionTitle;
