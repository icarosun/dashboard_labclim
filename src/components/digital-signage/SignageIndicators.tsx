import React from 'react';
import { cn } from '../../lib/utils.ts';

interface SignageIndicatorsProps {
  progress: number;
  currentIndex: number;
  totalSlides: number;
  onSlideSelect: (index: number) => void;
}

export function SignageIndicators({
  progress,
  currentIndex,
  totalSlides,
  onSlideSelect
}: SignageIndicatorsProps) {
  return (
    <>
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-gradient-primary transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideSelect(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-white scale-125 animate-glow" 
                : "bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </>
  );
}
