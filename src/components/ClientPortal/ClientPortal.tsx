import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ClientPortalInterface = {
  children: React.ReactNode;
  selector: string;
};

const ClientPortal = ({ children, selector }: ClientPortalInterface) => {
  const reference = useRef<Element | null>(null);

  useEffect(() => {
    reference.current = document.querySelector(selector);
  }, [selector]);

  return reference.current ? createPortal(<div>{children}</div>, reference.current) : <></>;
};
export default ClientPortal;
