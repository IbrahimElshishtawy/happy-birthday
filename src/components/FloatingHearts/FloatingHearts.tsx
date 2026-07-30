import React, { useEffect, useRef } from 'react';
import { randomBetween, randomInt } from '@/utils/helpers';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  emoji: string;
}

const FloatingHearts: React.FC<{ count?: number; className?: string }> = ({
  count = 20,
  className = '',
}) => {
  const hearts = useRef<Heart[]>(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: randomBetween(0, 100),
      y: randomBetween(0, 100),
      size: randomBetween(12, 32),
      opacity: randomBetween(0.2, 0.7),
      delay: randomBetween(0, 8),
      duration: randomBetween(6, 14),
      emoji: ['💕', '💖', '💗', '💓', '❤️', '🌸', '✨', '⭐'][randomInt(0, 7)],
    }))
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {hearts.current.map((heart) => (
        <div
          key={heart.id}
          className="absolute select-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `float ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
