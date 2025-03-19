
import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  transitionType?: 'fade' | 'slide' | 'scale' | 'blur';
}

export const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  transitionType = 'scale'
}) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('exit');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
      }, 300); // Match with animation duration
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location, displayLocation]);

  const getAnimationClass = () => {
    if (transitionStage === 'enter') {
      switch (transitionType) {
        case 'fade': return 'animate-fade-in';
        case 'slide': return 'animate-slide-in-right';
        case 'scale': return 'animate-scale-in';
        case 'blur': return 'animate-blur-in';
        default: return 'animate-fade-in';
      }
    } else {
      switch (transitionType) {
        case 'fade': return 'animate-fade-out';
        case 'slide': return 'animate-slide-out-left';
        case 'scale': return 'animate-scale-out';
        case 'blur': return 'animate-blur-out';
        default: return 'animate-fade-out';
      }
    }
  };

  return (
    <div className={cn('w-full h-full', getAnimationClass(), className)}>
      {children}
    </div>
  );
};

export default AnimatedTransition;
