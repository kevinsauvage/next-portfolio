type InputProperties = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProperties> = ({ ...rest }) => (
  <input
    className='bg-zinc-900 bg-opacity-50 border border-zinc-700 autofill:text-zinc-100 placeholder-zinc-400 text-zinc-100 text-base focus:outline-zinc-50 rounded p-2 min-h-12 active:border w-full'
    {...rest}
  />
);

export default Input;
