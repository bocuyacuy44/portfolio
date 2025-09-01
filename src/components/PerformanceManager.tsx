import { Suspense, useState, useEffect } from 'react';
import { prefersReducedMotion, isLowEndDevice, isMobileDevice } from '../utils/lazyLoad';

interface PerformanceManagerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  enableOnLowEnd?: boolean;
}

const PerformanceManager = ({ 
  children, 
  fallback = null, 
  enableOnLowEnd = false 
}: PerformanceManagerProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPerformance = () => {
      const reducedMotion = prefersReducedMotion();
      const lowEndDevice = isLowEndDevice();
      const mobileDevice = isMobileDevice();

      // Decide whether to render based on performance
      const shouldEnable = enableOnLowEnd || (!reducedMotion && !lowEndDevice && !mobileDevice);
      
      setShouldRender(shouldEnable);
      setIsLoading(false);
    };

    // Delay check to avoid blocking initial render
    const timer = setTimeout(checkPerformance, 100);
    return () => clearTimeout(timer);
  }, [enableOnLowEnd]);

  if (isLoading) {
    return <div className="opacity-0" />;
  }

  if (!shouldRender) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <Suspense fallback={fallback || <div className="opacity-0" />}>
      {children}
    </Suspense>
  );
};

export default PerformanceManager;