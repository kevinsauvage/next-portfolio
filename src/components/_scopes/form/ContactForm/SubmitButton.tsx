import { useFormStatus } from 'react-dom';
import { RiMailSendFill } from 'react-icons/ri';

import Button from '@/components/Button/Button';

interface Properties {
  style?: string;
}

const SubmitButton = ({ style }: Properties) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={style}
      svg={<RiMailSendFill />}
      label="Send Message"
      type="submit"
      title="Click to send the Message"
      disabled={pending}
      loading={pending}
    />
  );
};

export default SubmitButton;
