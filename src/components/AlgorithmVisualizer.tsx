
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Step {
  left: number;
  right: number;
  window: string;
  isValid: boolean;
  isMinimal: boolean;
}

interface AlgorithmVisualizerProps {
  stringN: string;
  stringK: string;
  result: {
    result: string;
    startIndex: number;
    endIndex: number;
    steps: Step[];
  };
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  stringN,
  stringK,
  result
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < result.steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 800);
    } else if (currentStep >= result.steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, result.steps.length]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleNext = () => {
    if (currentStep < result.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = result.steps[currentStep];
  
  const renderString = () => {
    return stringN.split('').map((char, index) => {
      let className = 'px-2 py-1 m-0.5 border rounded font-mono text-lg transition-all duration-300';
      
      if (currentStepData) {
        if (index >= currentStepData.left && index <= currentStepData.right) {
          if (currentStepData.isValid && currentStepData.isMinimal) {
            className += ' bg-green-200 border-green-400 text-green-800';
          } else if (currentStepData.isValid) {
            className += ' bg-yellow-200 border-yellow-400 text-yellow-800';
          } else {
            className += ' bg-blue-200 border-blue-400 text-blue-800';
          }
        } else {
          className += ' bg-gray-100 border-gray-300 text-gray-600';
        }
      } else {
        className += ' bg-gray-100 border-gray-300 text-gray-600';
      }
      
      // Highlight final result
      if (index >= result.startIndex && index <= result.endIndex) {
        className += ' ring-2 ring-purple-400';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const getRequiredChars = () => {
    const charSet = new Set(stringK);
    return Array.from(charSet).map(char => (
      <Badge key={char} variant="outline" className="font-mono">
        {char}
      </Badge>
    ));
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Algorithm Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">
            Required characters:
          </div>
          <div className="flex gap-2 flex-wrap">
            {getRequiredChars()}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">
            String visualization:
          </div>
          <div className="flex flex-wrap items-center justify-center p-4 bg-gray-50 rounded-lg">
            {renderString()}
          </div>
        </div>

        {currentStepData && (
          <div className="space-y-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700">
              Current Step: {currentStep + 1} / {result.steps.length}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Left pointer:</span> {currentStepData.left}
              </div>
              <div>
                <span className="font-medium">Right pointer:</span> {currentStepData.right}
              </div>
              <div>
                <span className="font-medium">Current window:</span> "{currentStepData.window}"
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <Badge 
                  className={`ml-2 ${
                    currentStepData.isValid 
                      ? currentStepData.isMinimal 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {currentStepData.isValid 
                    ? currentStepData.isMinimal 
                      ? 'New Minimum!' 
                      : 'Valid Window'
                    : 'Incomplete'}
                </Badge>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={currentStep >= result.steps.length - 1}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentStep >= result.steps.length - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Legend:</div>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
              <span>Current Window</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
              <span>Valid Window</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
              <span>New Minimum</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border border-purple-400 rounded ring-2 ring-purple-400"></div>
              <span>Final Result</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
