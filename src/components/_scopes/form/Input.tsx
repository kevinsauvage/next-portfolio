type InputProperties = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProperties> = ({ ...rest }) => (
  <input
    className="bg-blue-950 autofill:text-slate-50 rounded p-2 min-h-12 active:border focus:outline-blue-500 text-xl w-full"
    {...rest}
  />
);

export default Input;
