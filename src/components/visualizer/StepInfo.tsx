
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Step {
  left: number;
  right: number;
  window: string;
  isValid: boolean;
  isMinimal: boolean;
}

interface StepInfoProps {
  currentStepData: Step | undefined;
}

export const StepInfo: React.FC<StepInfoProps> = ({ currentStepData }) => {
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

  if (!currentStepData) return null;

  return (
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
  );
};
