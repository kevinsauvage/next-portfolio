type Properties = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ ...rest }: Properties) => (
  <textarea
    className='bg-zinc-900 bg-opacity-50 border border-zinc-800 autofill:text-zinc-300 placeholder-zinc-600 text-zinc-300 text-base focus:outline-zinc-50 rounded p-2 active:border w-full min-h-40 resize-y'
    {...rest}
  />
);

export default TextArea;
