type Properties = {
  title: string;
  position: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const SectionTitle = ({ title, position, ...rest }: Properties) => (
  <h2 className="relative flex items-baseline gap-3 mb-10 text-4xl" {...rest}>
    <span className="font-bold font-serif bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      {position}.
    </span>
    <span dangerouslySetInnerHTML={{ __html: title }} className="whitespace-nowrap font-semibold" />
    <span className="w-full rounded-md bg-blue-600 h-1" />
  </h2>
);

export default SectionTitle;
