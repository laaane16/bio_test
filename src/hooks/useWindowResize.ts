import { useEffect, useState } from 'react';

import { debounce } from '../utils/debounce';

export const useWindowResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    const debouncedResize = debounce(handleResize, 200);

    window.addEventListener('resize', debouncedResize);

    return () => {
      removeEventListener('resize', debouncedResize);
    };
  }, []);

  return width;
};
