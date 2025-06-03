
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
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
  const [animationSpeed, setAnimationSpeed] = useState(1200);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < result.steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, animationSpeed);
    } else if (currentStep >= result.steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, result.steps.length, animationSpeed]);

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
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const currentStepData = result.steps[currentStep];
  
  const renderString = () => {
    return stringN.split('').map((char, index) => {
      let className = 'relative px-3 py-2 m-1 border-2 rounded-lg font-mono text-lg font-bold transition-all duration-500 ease-in-out transform hover:scale-105';
      let overlayClassName = '';
      
      if (currentStepData) {
        const isInWindow = index >= currentStepData.left && index <= currentStepData.right;
        const isLeftPointer = index === currentStepData.left;
        const isRightPointer = index === currentStepData.right;
        const isInFinalResult = index >= result.startIndex && index <= result.endIndex;
        
        if (isInWindow) {
          if (currentStepData.isValid && currentStepData.isMinimal) {
            className += ' bg-gradient-to-br from-green-200 via-green-300 to-green-400 border-green-500 text-green-900 shadow-lg shadow-green-200 animate-pulse-gentle';
          } else if (currentStepData.isValid) {
            className += ' bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 border-yellow-500 text-yellow-900 shadow-lg shadow-yellow-200';
          } else {
            className += ' bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 border-blue-500 text-blue-900 shadow-lg shadow-blue-200';
          }
        } else {
          className += ' bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 text-gray-600';
        }
        
        // Add pointer indicators
        if (isLeftPointer) {
          overlayClassName = 'absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold animate-bounce';
        }
        if (isRightPointer) {
          overlayClassName = 'absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-2 py-1 rounded text-xs font-bold animate-bounce';
        }
        
        // Highlight final result with special animation
        if (isInFinalResult && currentStep === result.steps.length - 1) {
          className += ' ring-4 ring-purple-500 ring-opacity-50 animate-pulse shadow-2xl shadow-purple-300';
        }
      } else {
        className += ' bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 text-gray-600';
      }
      
      return (
        <div key={index} className="relative inline-block">
          <span className={className}>
            {char}
          </span>
          {overlayClassName && (
            <span className={overlayClassName}>
              {index === currentStepData?.left ? 'L' : 'R'}
            </span>
          )}
        </div>
      );
    });
  };

  const getRequiredChars = () => {
    const charSet = new Set(stringK);
    return Array.from(charSet).map(char => (
      <Badge 
        key={char} 
        variant="outline" 
        className="font-mono text-lg px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-300 text-purple-800 animate-fade-in-up"
      >
        {char}
      </Badge>
    ));
  };

  const getStepStatusBadge = () => {
    if (!currentStepData) return null;
    
    if (currentStepData.isValid && currentStepData.isMinimal) {
      return (
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse shadow-lg">
          🎉 New Minimum Found!
        </Badge>
      );
    } else if (currentStepData.isValid) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
          ✅ Valid Window
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
          🔍 Searching...
        </Badge>
      );
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          Algorithm Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Required characters:
          </div>
          <div className="flex gap-3 flex-wrap">
            {getRequiredChars()}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              String visualization:
            </div>
            <div className="text-xs text-gray-500">
              Step {currentStep + 1} of {result.steps.length}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-200 min-h-[120px]">
            {renderString()}
          </div>
        </div>

        {currentStepData && (
          <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-200 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-800">
                Current Analysis
              </div>
              {getStepStatusBadge()}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">L</span>
                  </div>
                  <span className="font-medium text-gray-700">Left pointer:</span>
                  <span className="text-lg font-mono bg-white px-2 py-1 rounded border">{currentStepData.left}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  <span className="font-medium text-gray-700">Right pointer:</span>
                  <span className="text-lg font-mono bg-white px-2 py-1 rounded border">{currentStepData.right}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Current window:</span>
                  <div className="mt-1 text-lg font-mono bg-white px-3 py-2 rounded border-2 border-blue-200 text-blue-800">
                    "{currentStepData.window}"
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Window length:</span>
                  <span className="ml-2 text-lg font-mono bg-white px-2 py-1 rounded border">
                    {currentStepData.window.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <SkipBack className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={isPlaying ? handlePause : handlePlay}
              disabled={currentStep >= result.steps.length - 1}
              className="flex items-center gap-2 px-6 hover:bg-green-50 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentStep >= result.steps.length - 1}
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
                  onClick={() => setAnimationSpeed(speed)}
                  className="text-xs"
                >
                  {index === 0 ? 'Slow' : index === 1 ? 'Normal' : index === 2 ? 'Fast' : 'Very Fast'}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            Legend:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-200 to-blue-400 border-2 border-blue-500 rounded"></div>
              <span>Searching Window</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 border-2 border-yellow-500 rounded"></div>
              <span>Valid Window</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-200 to-green-400 border-2 border-green-500 rounded animate-pulse"></div>
              <span>New Minimum</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-purple-400 rounded ring-2 ring-purple-400"></div>
              <span>Final Result</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
