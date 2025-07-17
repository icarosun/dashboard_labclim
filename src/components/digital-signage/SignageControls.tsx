import React from 'react';
import { Card } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Play, Pause, SkipForward, SkipBack, Volume2, Settings } from 'lucide-react';

interface SignageControlsProps {
  isPlaying: boolean;
  currentIndex: number;
  totalSlides: number;
  onPlayToggle: () => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

export function SignageControls({
  isPlaying,
  currentIndex,
  totalSlides,
  onPlayToggle,
  onPrevSlide,
  onNextSlide
}: SignageControlsProps) {
  return (
    <Card className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-4 bg-black/80 backdrop-blur-sm border-white/20">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPlayToggle}
          className="text-white hover:bg-white/20"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevSlide}
          className="text-white hover:bg-white/20"
        >
          <SkipBack className="w-5 h-5" />
        </Button>

        <span className="text-white text-sm px-2">
          {currentIndex + 1} / {totalSlides}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNextSlide}
          className="text-white hover:bg-white/20"
        >
          <SkipForward className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <Volume2 className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
