
import { MinWindowSubstring } from '@/components/MinWindowSubstring';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
            Minimum Window Substring
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Find the smallest substring that contains all characters from a given pattern. 
            Watch the sliding window algorithm work step by step with beautiful visualizations.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <MinWindowSubstring />
        </div>
        
        <div className="text-center mt-8 sm:mt-12 animate-fade-in-up px-2">
          <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
              How it works
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              The algorithm uses a sliding window technique with two pointers. 
              It expands the right pointer to include characters until all required characters are found, 
              then contracts the left pointer to find the minimum valid window. 
              The process continues until the entire string is processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
