import { FIELD_CLASSES } from './fieldStyles';

import clsx from 'clsx';

type InputProperties = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProperties> = ({ className, ...rest }) => (
  <input className={clsx(FIELD_CLASSES, className)} {...rest} />
);

export default Input;
