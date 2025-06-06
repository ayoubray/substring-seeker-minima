
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Sparkles, Target } from 'lucide-react';

interface InputConfigurationProps {
  stringN: string;
  stringK: string;
  isVisualizing: boolean;
  onStringNChange: (value: string) => void;
  onStringKChange: (value: string) => void;
  onSolve: () => void;
  onReset: () => void;
}

export const InputConfiguration: React.FC<InputConfigurationProps> = ({
  stringN,
  stringK,
  isVisualizing,
  onStringNChange,
  onStringKChange,
  onSolve,
  onReset
}) => {
  return (
    <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-blue-100 p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          Input Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="space-y-2 sm:space-y-3">
          <label className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></span>
            Main String (N):
          </label>
          <Input
            value={stringN}
            onChange={(e) => onStringNChange(e.target.value)}
            placeholder="Enter the main string to search in..."
            className="text-base sm:text-lg font-mono border-2 border-blue-200 focus:border-blue-400 transition-colors bg-blue-50/50 h-12 sm:h-auto"
          />
          <div className="text-xs text-gray-500 ml-2">
            Length: {stringN.length} characters
          </div>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <label className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
            Pattern String (K):
          </label>
          <Input
            value={stringK}
            onChange={(e) => onStringKChange(e.target.value)}
            placeholder="Enter characters to find..."
            className="text-base sm:text-lg font-mono border-2 border-purple-200 focus:border-purple-400 transition-colors bg-purple-50/50 h-12 sm:h-auto"
          />
          <div className="text-xs text-gray-500 ml-2">
            Unique characters: {new Set(stringK).size}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
          <Button 
            onClick={onSolve} 
            disabled={!stringN || !stringK || isVisualizing}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-6 py-3 h-12 sm:h-auto text-base sm:text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex-1 sm:flex-none"
          >
            {isVisualizing ? (
              <>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Start Analysis
              </>
            )}
          </Button>
          <Button 
            onClick={onReset} 
            variant="outline"
            className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 h-12 sm:h-auto px-6"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
