
import React from 'react';

export const Legend: React.FC = () => {
  return (
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
  );
};
