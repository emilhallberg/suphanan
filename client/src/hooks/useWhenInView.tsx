import { Ref, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  ref: Ref<HTMLDivElement>;
  visible: boolean;
}

const useWhenInView = (offset: number): Props => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, isVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      isVisible(
        ref.current.getBoundingClientRect().top <=
          document.documentElement.clientHeight - offset
      );
    }
  }, [offset]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { ref, visible };
};

export default useWhenInView;
