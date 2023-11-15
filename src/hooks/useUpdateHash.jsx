import { useRouter } from 'next/navigation';

import useDebouncedEffect from './useDebouncedEffect';

const useUpdateHash = (isIntersecting, hash) => {
  const router = useRouter();

  useDebouncedEffect(
    () => {
      if (!isIntersecting) return;
      router.replace(`/#${hash}`, { scroll: false });
    },
    300,
    [isIntersecting, hash]
  );
};

export default useUpdateHash;
