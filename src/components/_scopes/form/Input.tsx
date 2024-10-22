type InputProperties = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProperties> = ({ ...rest }) => (
  <input
    className="bg-zinc-900 autofill:text-zinc-50 focus:outline-blue-500 rounded p-2 min-h-12 active:border  text-xl w-full"
    {...rest}
  />
);

export default Input;
