import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function useTypewriter(text: string, speed: number = 50, startOnView: boolean = true) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (startOnView && !inView) return;
    
    setDisplayText('');
    setIsComplete(false);
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, inView, startOnView]);

  return { displayText, isComplete, ref };
}
