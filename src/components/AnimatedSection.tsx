import { type ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right';
  delay?: number;
}

const AnimatedSection = ({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0
}: AnimatedSectionProps) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  const divRef = ref as React.RefObject<HTMLDivElement>;

  const animationClass = hasIntersected ? `animate-${animation}` : 'opacity-0';
  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';

  return (
    <div
      ref={divRef}
      className={`${animationClass} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;