import { FIELD_CLASSES } from './fieldStyles';

import clsx from 'clsx';

type Properties = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ className, ...rest }: Properties) => (
  <textarea className={clsx('min-h-40 resize-y', FIELD_CLASSES, className)} {...rest} />
);

export default TextArea;
