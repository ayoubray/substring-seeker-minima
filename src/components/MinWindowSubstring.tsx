
import React, { useState } from 'react';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';
import { InputConfiguration } from './min-window/InputConfiguration';
import { LoadingState } from './min-window/LoadingState';
import { ResultDisplay } from './min-window/ResultDisplay';
import { useMinWindowAlgorithm } from './min-window/useMinWindowAlgorithm';

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

  const { minWindowSubstring } = useMinWindowAlgorithm();

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
      <InputConfiguration
        stringN={stringN}
        stringK={stringK}
        isVisualizing={isVisualizing}
        onStringNChange={setStringN}
        onStringKChange={setStringK}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      {isVisualizing && <LoadingState />}

      {result && !isVisualizing && (
        <div className="space-y-8 animate-fade-in-up">
          <ResultDisplay result={result} />
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
