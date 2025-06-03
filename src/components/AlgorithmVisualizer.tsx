
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StringVisualization } from './visualizer/StringVisualization';
import { StepControls } from './visualizer/StepControls';
import { StepInfo } from './visualizer/StepInfo';
import { Legend } from './visualizer/Legend';

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

  return (
    <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          Algorithm Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <StringVisualization
          stringN={stringN}
          stringK={stringK}
          currentStepData={currentStepData}
          result={result}
          currentStep={currentStep}
        />

        <StepInfo currentStepData={currentStepData} />

        <StepControls
          currentStep={currentStep}
          totalSteps={result.steps.length}
          isPlaying={isPlaying}
          animationSpeed={animationSpeed}
          onPlay={handlePlay}
          onPause={handlePause}
          onNext={handleNext}
          onPrev={handlePrev}
          onReset={handleReset}
          onSpeedChange={setAnimationSpeed}
        />

        <Legend />
      </CardContent>
    </Card>
  );
};
