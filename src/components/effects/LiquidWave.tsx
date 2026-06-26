import React from 'react';

interface LiquidWaveProps {
  className?: string;
  color?: 'gold' | 'green' | 'both';
  height?: number;
  hideOnMobile?: boolean;
}

export function LiquidWave({
  className = '',
  color = 'both',
  height = 120,
  hideOnMobile = true,
}: LiquidWaveProps) {
  const baseClasses = hideOnMobile ? 'hidden sm:block' : '';
  
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`${baseClasses} liquid-wave ${className}`}
      style={{ height: `${height}px`, width: '100%' }}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          {color === 'gold' && (
            <>
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D4A574" stopOpacity="0.1" />
            </>
          )}
          {color === 'green' && (
            <>
              <stop offset="0%" stopColor="#1B4332" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1B4332" stopOpacity="0.05" />
            </>
          )}
          {color === 'both' && (
            <>
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#1B4332" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#D4A574" stopOpacity="0.05" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Primary wave */}
      <path
        d="M 0,60 Q 150,40 300,60 T 600,60 T 900,60 T 1200,60 L 1200,120 L 0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.7"
      />

      {/* Secondary wave (offset) */}
      <path
        d="M 0,70 Q 150,50 300,70 T 600,70 T 900,70 T 1200,70 L 1200,120 L 0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.5"
      />

      {/* Tertiary wave (more offset) */}
      <path
        d="M 0,80 Q 150,60 300,80 T 600,80 T 900,80 T 1200,80 L 1200,120 L 0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.3"
      />
    </svg>
  );
}
