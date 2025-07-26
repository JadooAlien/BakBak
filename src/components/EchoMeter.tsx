import React from 'react';

interface EchoMeterProps {
  score: number; // Starting from 1000, increases endlessly
  size?: 'sm' | 'md' | 'lg';
}

export const EchoMeter: React.FC<EchoMeterProps> = ({ score, size = 'md' }) => {
  const getColor = () => {
    if (score >= 2000) return 'from-green-400 to-green-500'; // Viral
    if (score >= 1500) return 'from-blue-400 to-blue-500'; // Growing
    return 'from-gray-400 to-gray-500'; // Starting
  };

  const getGlow = () => {
    if (score >= 2000) return 'shadow-green-500/30';
    if (score >= 1500) return 'shadow-blue-500/30';
    return 'shadow-gray-500/20';
  };

  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const glowIntensity = score >= 1500 ? 'shadow-md' : 'shadow-sm';
  
  // Calculate width percentage based on score (never reaches 100%)
  const getWidth = () => {
    const baseWidth = Math.min(85, (score - 1000) / 20 + 10);
    return Math.max(10, baseWidth);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-500 dark:text-gray-400 font-medium">EchoMeter</span>
        <span className="font-semibold text-gray-700 dark:text-gray-300">{score.toLocaleString()}</span>
      </div>
      <div className={`w-full bg-gray-200 dark:bg-gray-800 rounded-full ${heights[size]} overflow-hidden`}>
        <div 
          className={`${heights[size]} bg-gradient-to-r ${getColor()} ${getGlow()} ${glowIntensity} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${getWidth()}%` }}
        />
      </div>
      <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
        {score >= 2000 && '🔥 Viral'}
        {score >= 1500 && score < 2000 && '📈 Rising'}
        {score < 1500 && '💭 Echo'}
      </div>
    </div>
  );
};