import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blurLevel?: 'light' | 'medium' | 'heavy';
  animateOnView?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className = '',
  blurLevel = 'heavy',
  animateOnView = true,
  delay = 0,
}: GlassCardProps) {
  const blurClasses = {
    light: 'glass-blur-8',
    medium: 'glass-blur-12',
    heavy: 'glass-blur-16',
  };

  const animationStyle = animateOnView
    ? {
        animation: `slideInLeft 0.6s ease-out ${delay}ms forwards`,
        opacity: 0,
      }
    : {};

  return (
    <div
      className={`${blurClasses[blurLevel]} rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
}
