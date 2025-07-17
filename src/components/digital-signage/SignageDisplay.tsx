import React, { useEffect, useState } from 'react';
import { SignageDisplayProps } from './types.ts';
import { SignageIndicators } from "./SignageIndicators.tsx";
import { SignageContent } from "./SignageContent.tsx";
import { SignageOverlay } from "./SignageOverlay.tsx";
import { SignageNavigation } from "./SignageNavigation.tsx";
import { SignageControls } from "./SignageControls.tsx";
import { cn } from "../../lib/utils.ts";

export function SignageDisplay ({
  content, 
  autoPlay = true,
  showControls = false,
  className
}: SignageDisplayProps) {
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

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (1 / totalSteps) * 100;
        if (newProgress >= 100) {
          nextSlide();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, userInteracted, currentContent]);

    const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
      setProgress(0);
      setUserInteracted(false);
      setIsTransitioning(false);
    }, 150);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);
      setProgress(0);
      setUserInteracted(false);
      setIsTransitioning(false);
    }, 150);
  };


  const handleInteraction = () => {
    setUserInteracted(true);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
      setUserInteracted(false);
    }, 10000); // Resume after 10 seconds
  };

  const handleCTAClick = () => {
    handleInteraction();
    // Handle CTA action
    console.log('CTA clicked:', currentContent.cta?.action);
  };

  const handleSlideSelect = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    handleInteraction();
  };

  return(
    <div className={cn("relative w-full h-screen bg-background overflow-hidden signage-display", className)}>
      <SignageIndicators
        progress={progress}
        currentIndex={currentIndex}
        totalSlides={content.length}
        onSlideSelect={handleSlideSelect}
      />

      {/* Main Content */}
      <div 
        className={cn(
          "relative w-full h-full cursor-pointer touch-feedback transition-all duration-300",
          isTransitioning && "opacity-50 scale-95"
        )}
        onClick={handleInteraction}
      >
        <div className={cn(
          "w-full h-full transition-all duration-300 transform",
          isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}>
          <SignageContent content={currentContent} />
        </div>

        {/* Content Overlay */}
        {currentContent && (
          <SignageOverlay
            content={currentContent}
            onCTAClick={handleCTAClick}
          />
        )}

        <SignageNavigation
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
        />
      </div>

      {/* Control Panel */}
      {showControls && (
        <SignageControls
          isPlaying={isPlaying}
          currentIndex={currentIndex}
          totalSlides={content.length}
          onPlayToggle={() => setIsPlaying(!isPlaying)}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
        />
      )}

      {/* Interaction Hint */}
      {!userInteracted && (
        <div className="absolute top-8 right-8 text-white/60 text-sm animate-float">
          Toque para interagir
        </div>
      )}
    </div>
  );
}
