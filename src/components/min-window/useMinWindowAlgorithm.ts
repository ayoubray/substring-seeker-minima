
import { useCallback } from 'react';

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

export const useMinWindowAlgorithm = () => {
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

  return { minWindowSubstring };
};
