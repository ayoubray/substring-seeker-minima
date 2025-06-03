
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw } from 'lucide-react';
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
    const solution = minWindowSubstring([stringN, stringK]);
    setResult(solution);
    
    // Small delay to show the visualization state
    setTimeout(() => {
      setIsVisualizing(false);
    }, 1000);
  };

  const handleReset = () => {
    setResult(null);
    setIsVisualizing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Input Strings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              String N (main string):
            </label>
            <Input
              value={stringN}
              onChange={(e) => setStringN(e.target.value)}
              placeholder="Enter the main string..."
              className="text-lg font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              String K (characters to find):
            </label>
            <Input
              value={stringK}
              onChange={(e) => setStringK(e.target.value)}
              placeholder="Enter characters to find..."
              className="text-lg font-mono"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={handleSolve} 
              disabled={!stringN || !stringK || isVisualizing}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Play className="w-4 h-4" />
              {isVisualizing ? 'Solving...' : 'Solve'}
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6 animate-fade-in-up">
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
                    Minimum Window: "{result.result}"
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  Found at position {result.startIndex} to {result.endIndex}
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
