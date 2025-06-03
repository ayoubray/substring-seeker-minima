
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface MinWindowResult {
  result: string;
  startIndex: number;
  endIndex: number;
  steps: Array<{
    left: number;
    right: number;
    window: string;
    isValid: boolean;
    isMinimal: boolean;
  }>;
}

interface ResultDisplayProps {
  result: MinWindowResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-b border-green-100 p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          Analysis Complete
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-xl border-2 border-green-200">
              <Badge variant="secondary" className="text-lg sm:text-2xl px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg break-all">
                "{result.result}"
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-md mx-auto">
              <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm sm:text-lg font-bold text-blue-700">{result.result.length}</div>
                <div className="text-xs text-blue-600">Length</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-sm sm:text-lg font-bold text-purple-700">{result.startIndex}</div>
                <div className="text-xs text-purple-600">Start Index</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="text-sm sm:text-lg font-bold text-indigo-700">{result.endIndex}</div>
                <div className="text-xs text-indigo-600">End Index</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
