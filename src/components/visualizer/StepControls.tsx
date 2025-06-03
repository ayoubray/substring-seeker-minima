
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
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={currentStep === 0}
          className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
        >
          <SkipBack className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={isPlaying ? onPause : onPlay}
          disabled={currentStep >= totalSteps - 1}
          className="flex items-center gap-2 px-6 hover:bg-green-50 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
        >
          Next
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <span className="text-sm text-gray-600">Animation Speed:</span>
        <div className="flex gap-2">
          {[2000, 1200, 800, 400].map((speed, index) => (
            <Button
              key={speed}
              variant={animationSpeed === speed ? "default" : "outline"}
              size="sm"
              onClick={() => onSpeedChange(speed)}
              className="text-xs"
            >
              {index === 0 ? 'Slow' : index === 1 ? 'Normal' : index === 2 ? 'Fast' : 'Very Fast'}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
