
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Sparkles, Target } from 'lucide-react';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';

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

export const MinWindowSubstring = () => {
  const [stringN, setStringN] = useState('aaabaaddae');
  const [stringK, setStringK] = useState('aed');
  const [result, setResult] = useState<MinWindowResult | null>(null);
  const [isVisualizing, setIsVisualizing] = useState(false);

  const minWindowSubstring = useCallback((strArr: string[]): MinWindowResult => {
    const [N, K] = strArr;
    const steps: Array<{
      left: number;
      right: number;
      window: string;
      isValid: boolean;
      isMinimal: boolean;
    }> = [];
    
    // Create frequency map for K
    const kFreq: { [key: string]: number } = {};
    for (const char of K) {
      kFreq[char] = (kFreq[char] || 0) + 1;
    }
    
    const requiredChars = Object.keys(kFreq).length;
    let formedChars = 0;
    const windowCounts: { [key: string]: number } = {};
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let minEnd = 0;
    
    for (let right = 0; right < N.length; right++) {
      const char = N[right];
      windowCounts[char] = (windowCounts[char] || 0) + 1;
      
      if (kFreq[char] && windowCounts[char] === kFreq[char]) {
        formedChars++;
      }
      
      // Try to shrink the window
      while (left <= right && formedChars === requiredChars) {
        const windowStr = N.substring(left, right + 1);
        const isValid = formedChars === requiredChars;
        const isMinimal = windowStr.length < minLen;
        
        steps.push({
          left,
          right,
          window: windowStr,
          isValid,
          isMinimal
        });
        
        if (windowStr.length < minLen) {
          minLen = windowStr.length;
          minStart = left;
          minEnd = right;
        }
        
        const leftChar = N[left];
        windowCounts[leftChar]--;
        if (kFreq[leftChar] && windowCounts[leftChar] < kFreq[leftChar]) {
          formedChars--;
        }
        left++;
      }
      
      // Add step for expanding window
      if (formedChars < requiredChars) {
        steps.push({
          left,
          right,
          window: N.substring(left, right + 1),
          isValid: false,
          isMinimal: false
        });
      }
    }
    
    return {
      result: N.substring(minStart, minEnd + 1),
      startIndex: minStart,
      endIndex: minEnd,
      steps
    };
  }, []);

  const handleSolve = async () => {
    setIsVisualizing(true);
    
    // Add a slight delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const solution = minWindowSubstring([stringN, stringK]);
    setResult(solution);
    
    // Smooth transition to show results
    setTimeout(() => {
      setIsVisualizing(false);
    }, 800);
  };

  const handleReset = () => {
    setResult(null);
    setIsVisualizing(false);
  };

  return (
    <div className="space-y-8">
      <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-blue-100">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            Input Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Main String (N):
            </label>
            <Input
              value={stringN}
              onChange={(e) => setStringN(e.target.value)}
              placeholder="Enter the main string to search in..."
              className="text-lg font-mono border-2 border-blue-200 focus:border-blue-400 transition-colors bg-blue-50/50"
            />
            <div className="text-xs text-gray-500 ml-2">
              Length: {stringN.length} characters
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Pattern String (K):
            </label>
            <Input
              value={stringK}
              onChange={(e) => setStringK(e.target.value)}
              placeholder="Enter characters to find..."
              className="text-lg font-mono border-2 border-purple-200 focus:border-purple-400 transition-colors bg-purple-50/50"
            />
            <div className="text-xs text-gray-500 ml-2">
              Unique characters: {new Set(stringK).size}
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handleSolve} 
              disabled={!stringN || !stringK || isVisualizing}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-6 py-3 text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              {isVisualizing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Analysis
                </>
              )}
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="flex items-center gap-2 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {isVisualizing && (
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
      )}

      {result && !isVisualizing && (
        <div className="space-y-8 animate-fade-in-up">
          <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-b border-green-100">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                Analysis Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="inline-block p-4 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-xl border-2 border-green-200">
                    <Badge variant="secondary" className="text-2xl px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                      "{result.result}"
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-lg font-bold text-blue-700">{result.result.length}</div>
                      <div className="text-xs text-blue-600">Length</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-lg font-bold text-purple-700">{result.startIndex}</div>
                      <div className="text-xs text-purple-600">Start Index</div>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="text-lg font-bold text-indigo-700">{result.endIndex}</div>
                      <div className="text-xs text-indigo-600">End Index</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AlgorithmVisualizer
            stringN={stringN}
            stringK={stringK}
            result={result}
          />
        </div>
      )}
    </div>
  );
};
