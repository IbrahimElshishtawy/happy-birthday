import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getRandomWish } from '@/utils/wishes';

const WishJar: React.FC = () => {
  const [wishes, setWishes] = useState<{ id: number; text: string }[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const pickWish = () => {
    if (isShaking) return;
    setIsShaking(true);

    // Add floating hearts
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
    }));
    setFloatingHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !newHearts.find((n) => n.id === h.id)));
    }, 2000);

    setTimeout(() => {
      const newWish = { id: Date.now(), text: getRandomWish() };
      setWishes((prev) => [newWish, ...prev.slice(0, 4)]);
      setIsShaking(false);
    }, 600);
  };

  return (
    <section id="wishes" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-lavender/40 to-blush/60 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>🫙</span>
            <span className="text-sm font-semibold text-secondary">Wish Jar</span>
          </motion.div>
          <h2 className="section-title gradient-text">Wish Jar</h2>
          <p className="section-subtitle">
            Tap the jar to receive a special wish for you 💫
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Jar */}
          <div className="relative flex-shrink-0">
            {/* Floating hearts inside jar area */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {floatingHearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute bottom-8 left-1/2 text-2xl"
                  style={{ x: heart.x }}
                  animate={{ y: -200, opacity: [1, 1, 0], scale: [0.5, 1.2, 0.8] }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                >
                  {['💕', '✨', '💖', '🌸', '⭐'][Math.floor(Math.random() * 5)]}
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={pickWish}
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isShaking ? {
                rotate: [-5, 5, -5, 5, -3, 3, 0],
                x: [-5, 5, -5, 5, -3, 3, 0],
              } : {}}
              transition={isShaking ? { duration: 0.5 } : {}}
            >
              {/* Jar SVG */}
              <svg width="200" height="280" viewBox="0 0 200 280" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="jarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="50%" stopColor="rgba(245,240,255,0.7)" />
                    <stop offset="100%" stopColor="rgba(255,224,239,0.8)" />
                  </linearGradient>
                  <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8DC3" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                  <filter id="jarBlur">
                    <feGaussianBlur stdDeviation="1" />
                  </filter>
                </defs>

                {/* Jar lid */}
                <rect x="55" y="20" width="90" height="28" rx="8" fill="url(#lidGrad)" />
                <rect x="62" y="24" width="76" height="16" rx="5" fill="rgba(255,255,255,0.3)" />

                {/* Jar body */}
                <path
                  d="M40,50 Q30,55 28,70 L22,230 Q20,250 100,255 Q180,250 178,230 L172,70 Q170,55 160,50 Z"
                  fill="url(#jarGrad)"
                  stroke="rgba(255,95,162,0.3)"
                  strokeWidth="1.5"
                />

                {/* Glass reflection */}
                <path
                  d="M48,60 Q44,65 42,80 L38,200 Q42,80 48,60 Z"
                  fill="white"
                  opacity="0.5"
                />
                <path
                  d="M60,58 Q56,70 55,100 L55,58 Z"
                  fill="white"
                  opacity="0.3"
                />

                {/* Floating hearts inside */}
                {[
                  { cx: 70, cy: 160, emoji: '💕', r: 12 },
                  { cx: 100, cy: 140, emoji: '✨', r: 14 },
                  { cx: 130, cy: 165, emoji: '💖', r: 10 },
                  { cx: 85, cy: 195, emoji: '🌸', r: 11 },
                  { cx: 118, cy: 190, emoji: '⭐', r: 13 },
                  { cx: 100, cy: 215, emoji: '💫', r: 12 },
                ].map((item, i) => (
                  <motion.text
                    key={i}
                    x={item.cx}
                    y={item.cy}
                    textAnchor="middle"
                    fontSize={item.r * 2}
                    animate={{ y: [item.cy, item.cy - 8, item.cy] }}
                    transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {item.emoji}
                  </motion.text>
                ))}

                {/* Jar rim glow */}
                <ellipse cx="100" cy="50" rx="60" ry="8" fill="rgba(255,95,162,0.15)" />
              </svg>

              {/* Tap hint */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm text-secondary font-medium">
                  ✨ Tap to receive a wish
                </span>
              </motion.div>
            </motion.button>
          </div>

          {/* Wishes display */}
          <div className="flex-1 w-full min-h-[300px]">
            <AnimatePresence>
              {wishes.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.span
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🫙
                  </motion.span>
                  <p className="font-display text-2xl font-bold text-gray-400 mb-2">
                    Your wishes await...
                  </p>
                  <p className="text-gray-400 text-sm">
                    Tap the magical jar to reveal your first wish 💫
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {wishes.map((wish, i) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, x: 40, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -40, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`glass-card p-5 border-l-4 ${
                        i === 0
                          ? 'border-l-primary shadow-glow-pink'
                          : 'border-l-secondary/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <motion.span
                          className="text-2xl flex-shrink-0"
                          animate={i === 0 ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 1, repeat: i === 0 ? 3 : 0 }}
                        >
                          {i === 0 ? '✨' : '💕'}
                        </motion.span>
                        <p className={`font-body leading-relaxed ${
                          i === 0 ? 'text-gray-800 font-medium' : 'text-gray-500 text-sm'
                        }`}>
                          {wish.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  <motion.button
                    onClick={pickWish}
                    className="btn-primary w-full mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isShaking}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>✨</span>
                      <span>Get Another Wish</span>
                    </span>
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishJar;
