import React, { useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger?: boolean;
  continuous?: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ trigger = false, continuous = false }) => {
  const animationRef = useRef<number | null>(null);

  const fireConfetti = useCallback(() => {
    const colors = ['#FF5FA2', '#C084FC', '#FFD166', '#FF8DC3', '#D8A8FF', '#FFE299'];
    
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.4, x: 0.5 },
      colors,
      startVelocity: 45,
      gravity: 0.8,
      scalar: 1.2,
      drift: 0,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.3, x: 0.2 },
        colors,
        startVelocity: 35,
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.3, x: 0.8 },
        colors,
        startVelocity: 35,
      });
    }, 400);
  }, []);

  const fireContinuous = useCallback(() => {
    const colors = ['#FF5FA2', '#C084FC', '#FFD166', '#FF8DC3'];
    let frame = 0;

    const animate = () => {
      frame++;
      if (frame % 6 === 0) {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (trigger) {
      if (continuous) {
        fireContinuous();
      } else {
        fireConfetti();
      }
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger, continuous, fireConfetti, fireContinuous]);

  return null;
};

export default Confetti;
export { confetti as fireConfetti };
