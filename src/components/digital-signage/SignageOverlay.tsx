import React from 'react';
import { Button } from "../ui/button.tsx";
import { SignageContent } from './types';

interface SignageOverlayProps {
  content: SignageContent;
  onCTAClick: () => void;
}

export function SignageOverlay({ content, onCTAClick }: SignageOverlayProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div className="space-y-4">
        <h3 className="text-4xl font-bold text-white">
          {content.title}
        </h3>
        
        {content.cta && (
          <Button
            onClick={onCTAClick}
            className="bg-gradient-accent hover:scale-105 transition-transform duration-300 text-lg px-8 py-6 animate-pulse-glow interactive-hover"
          >
            {content.cta.text}
          </Button>
        )}
      </div>
    </div>
  );
}
