
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  animationSpeed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export const StepControls: React.FC<StepControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  animationSpeed,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onSpeedChange
}) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-1 sm:gap-2 hover:bg-gray-100 transition-colors h-10 px-3 text-xs sm:text-sm"
        >
          <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={currentStep === 0}
          className="flex items-center gap-1 sm:gap-2 hover:bg-blue-50 transition-colors h-10 px-3 text-xs sm:text-sm"
        >
          <SkipBack className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={isPlaying ? onPause : onPlay}
          disabled={currentStep >= totalSteps - 1}
          className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 hover:bg-green-50 transition-colors h-10 text-xs sm:text-sm"
        >
          {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          className="flex items-center gap-1 sm:gap-2 hover:bg-blue-50 transition-colors h-10 px-3 text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Next</span>
          <SkipForward className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span className="text-xs sm:text-sm text-gray-600">Speed:</span>
        <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
          {[2000, 1200, 800, 400].map((speed, index) => (
            <Button
              key={speed}
              variant={animationSpeed === speed ? "default" : "outline"}
              size="sm"
              onClick={() => onSpeedChange(speed)}
              className="text-xs h-8 px-2 sm:px-3"
            >
              {index === 0 ? 'Slow' : index === 1 ? 'Normal' : index === 2 ? 'Fast' : 'V.Fast'}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
