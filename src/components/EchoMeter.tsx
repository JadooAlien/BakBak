import React from 'react';

interface EchoMeterProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
}

export const EchoMeter: React.FC<EchoMeterProps> = ({ score, size = 'md' }) => {
  const getColor = () => {
    if (score >= 70) return 'from-green-400 to-green-600'; // Viral
    if (score >= 40) return 'from-blue-400 to-blue-600'; // Growing
    return 'from-red-400 to-red-600'; // Dying
  };

  const getGlow = () => {
    if (score >= 70) return 'shadow-green-500/50';
    if (score >= 40) return 'shadow-blue-500/50';
    return 'shadow-red-500/50';
  };

  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const glowIntensity = score >= 50 ? 'shadow-lg' : 'shadow-md';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-500 dark:text-gray-400">EchoMeter</span>
        <span className="font-semibold text-gray-700 dark:text-gray-300">{score}/100</span>
      </div>
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${heights[size]} overflow-hidden`}>
        <div 
          className={`${heights[size]} bg-gradient-to-r ${getColor()} ${getGlow()} ${glowIntensity} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
        {score >= 70 && '🔥 Going Viral!'}
        {score >= 40 && score < 70 && '📈 Growing Echo'}
        {score < 40 && '💭 Whisper'}
      </div>
    </div>
  );
};