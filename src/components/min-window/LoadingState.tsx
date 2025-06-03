
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const LoadingState: React.FC = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl animate-fade-in-up">
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <div className="text-lg font-medium text-gray-700 animate-pulse">
            Processing algorithm...
          </div>
          <div className="text-sm text-gray-500">
            Finding the minimum window substring
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
