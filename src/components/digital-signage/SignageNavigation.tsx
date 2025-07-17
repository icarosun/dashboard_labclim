import React from 'react';
import { Button } from '../ui/button.tsx';
import { SkipBack, SkipForward } from 'lucide-react';

interface SignageNavigationProps {
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

export function SignageNavigation({ onPrevSlide, onNextSlide }: SignageNavigationProps) {
  return (
    <>
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onPrevSlide();
          }}
          className="interactive-hover text-white hover:bg-white/20"
        >
          <SkipBack className="w-8 h-8" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onNextSlide();
          }}
          className="interactive-hover text-white hover:bg-white/20"
        >
          <SkipForward className="w-8 h-8" />
        </Button>
      </div>
    </>
  );
}
