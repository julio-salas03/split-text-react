'use client';
import { SplitText, type WordWrapperProps } from 'split-text-react';
import gsap from 'gsap';
import { useEffect, useRef, memo } from 'react';

const WordWrapper = ({ children, countIndex }: WordWrapperProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      transformOrigin: 'left',
      duration: 0,
      delay: 0.05 * countIndex,
    });
  }, []);

  return (
    <span
      ref={ref}
      style={{
        transform: 'scaleX(0)',
        display: 'inline-block',
        whiteSpace: 'pre',
      }}
    >
      {children}
    </span>
  );
};

export default function TypeIn() {
  const MemoizedWordWrapper = memo(WordWrapper);
  return (
    <SplitText WordWrapper={MemoizedWordWrapper}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium
      nisl nec elit venenatis gravida. Cras mattis sapien sem, vel imperdiet
      risus feugiat sit amet.
    </SplitText>
  );
}
