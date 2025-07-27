import React from 'react';

interface EchoMeterProps {
  score: number; // Starting from 1000, increases endlessly
  size?: 'sm' | 'md' | 'lg';
}

export const EchoMeter: React.FC<EchoMeterProps> = ({ score, size = 'md' }) => {
  const getLevel = () => {
    if (score >= 2000) return 'high'; // Viral
    if (score >= 1500) return 'medium'; // Growing
    return 'low'; // Starting
  };

  const getLabel = () => {
    if (score >= 2000) return 'Viral';
    if (score >= 1500) return 'Rising';
    return 'Echo';
  };

  const heights = {
    sm: '2px',
    md: '4px',
    lg: '6px'
  };

  const level = getLevel();
  
  // Calculate width percentage based on score (never reaches 100%)
  const getWidth = () => {
    const baseWidth = Math.min(85, (score - 1000) / 20 + 15);
    return Math.max(15, baseWidth);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="caption">EchoMeter</span>
        <div className="flex items-center space-x-2">
          <span className="small-text">{getLabel()}</span>
          <span className="caption">{score.toLocaleString()}</span>
        </div>
      </div>
      <div className="echo-bar" style={{ height: heights[size] }}>
        <div 
          className={`echo-fill echo-${level}`}
          style={{ width: `${getWidth()}%` }}
        />
      </div>
    </div>
  );
};