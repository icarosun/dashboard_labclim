import React, { useState } from 'react';
import { SignageDisplayProps } from './types.ts';

const SignageDisplay = ({
  content, 
  autoPlay = true,
  showControls = false,
  className
}: SignageDisplayProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const currentContent = content[currentIndex];

  useEffect(() => {
    if (!isPlaying || userInteracted) return;

    const duration = currentContent?.duration || 5000;
    const interval = 100;
    const totalSteps = duration / interval;

    return () => {
      return
    }
  }, [dependencies?])
  


  return(
  );
}
