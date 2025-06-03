
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Step {
  left: number;
  right: number;
  window: string;
  isValid: boolean;
  isMinimal: boolean;
}

interface StringVisualizationProps {
  stringN: string;
  stringK: string;
  currentStepData: Step | undefined;
  result: {
    startIndex: number;
    endIndex: number;
    steps: Step[];
  };
  currentStep: number;
}

export const StringVisualization: React.FC<StringVisualizationProps> = ({
  stringN,
  stringK,
  currentStepData,
  result,
  currentStep
}) => {
  const getRequiredChars = () => {
    const charSet = new Set(stringK);
    return Array.from(charSet).map(char => (
      <Badge 
        key={char} 
        variant="outline" 
        className="font-mono text-sm sm:text-lg px-2 py-1 sm:px-3 bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-300 text-purple-800 animate-fade-in-up"
      >
        {char}
      </Badge>
    ));
  };

  const renderString = () => {
    return stringN.split('').map((char, index) => {
      let className = 'relative px-2 py-1.5 sm:px-3 sm:py-2 m-0.5 sm:m-1 border-2 rounded-lg font-mono text-sm sm:text-lg font-bold transition-all duration-500 ease-in-out transform hover:scale-105';
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
          overlayClassName = 'absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold animate-bounce';
        }
        if (isRightPointer) {
          overlayClassName = 'absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold animate-bounce';
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

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-3 sm:space-y-4">
        <div className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
          Required characters:
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {getRequiredChars()}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full"></span>
            String visualization:
          </div>
          <div className="text-xs text-gray-500">
            Step {currentStep + 1} of {result.steps.length}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-200 min-h-[100px] sm:min-h-[120px] overflow-x-auto">
          <div className="flex flex-wrap justify-center items-center">
            {renderString()}
          </div>
        </div>
      </div>
    </div>
  );
};
