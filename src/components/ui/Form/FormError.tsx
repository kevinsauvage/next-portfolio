import { colors } from '@/design-system/tokens';

import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';

type FormErrorProps = {
  id: string;
  message: string;
  className?: string;
};

const FormError = ({ id, message, className }: FormErrorProps) => {
  return (
    <div
      id={id}
      role='alert'
      className={clsx('flex items-center gap-1.5 mt-1 text-sm', colors.status.error, className)}
    >
      <AlertCircle size={14} aria-hidden='true' className='flex-shrink-0' />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
