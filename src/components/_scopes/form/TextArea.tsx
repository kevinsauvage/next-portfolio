type Properties = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ ...rest }: Properties) => (
  <textarea
    className="bg-blue-950 rounded p-2 min-h-40 resize-y focus:outline-blue-500 text-xl"
    {...rest}
  />
);

export default TextArea;
