import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ClientPortalInterface = {
  children: React.ReactNode;
  show?: boolean;
  selector: string;
};

const ClientPortal = ({ children, selector, show }: ClientPortalInterface) => {
  const reference = useRef<Element | null>(null);

  useEffect(() => {
    reference.current = document.querySelector(`#${selector}`);
  }, [selector]);

  return show && reference.current ? createPortal(children, reference.current) : <></>;
};

export default ClientPortal;
