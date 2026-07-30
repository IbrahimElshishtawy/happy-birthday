import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import confetti from 'canvas-confetti';

const NUM_CANDLES = 7;

const BirthdayCake: React.FC = () => {
  const [blownCandles, setBlownCandles] = useState<number[]>([]);
  const [allBlown, setAllBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const blowCandle = (id: number) => {
    if (blownCandles.includes(id)) return;
    setBlownCandles((prev) => {
      const next = [...prev, id];
      if (next.length === NUM_CANDLES) {
        setTimeout(() => {
          setAllBlown(true);
          fireCelebration();
        }, 500);
      }
      return next;
    });
  };

  const blowAll = () => {
    if (isBlowing) return;
    setIsBlowing(true);
    const unblown = Array.from({ length: NUM_CANDLES }, (_, i) => i).filter(
      (i) => !blownCandles.includes(i)
    );
    unblown.forEach((id, idx) => {
      setTimeout(() => blowCandle(id), idx * 200);
    });
    setTimeout(() => setIsBlowing(false), unblown.length * 200 + 500);
  };

  const fireCelebration = () => {
    const colors = ['#FF5FA2', '#C084FC', '#FFD166', '#FF8DC3'];
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const reset = () => {
    setBlownCandles([]);
    setAllBlown(false);
  };

  return (
    <section id="cake" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blush to-lavender/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 border border-rose-200 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>🎂</span>
            <span className="text-sm font-semibold text-primary">Make a Wish!</span>
          </motion.div>
          <h2 className="section-title gradient-text">Birthday Cake</h2>
          <p className="section-subtitle">
            Click each candle to blow it out, then make a wish! ✨
          </p>
        </motion.div>

        {/* Celebration overlay */}
        <AnimatePresence>
          {allBlown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-8"
            >
              <div className="glass-card inline-block px-10 py-6">
                <motion.span
                  className="text-5xl block mb-3"
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎊
                </motion.span>
                <h3 className="font-display text-2xl font-bold gradient-text mb-2">
                  Happy Birthday Rola!
                </h3>
                <p className="font-script text-xl text-primary mb-4">
                  May all your wishes come true! 💕
                </p>
                <button onClick={reset} className="btn-ghost text-sm">
                  🕯️ Light again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Cake */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.7 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
          style={{ animation: inView ? 'cakeReveal 1s ease-out forwards' : 'none' }}
        >
          <div className="relative inline-block">
            {/* Cake SVG */}
            <svg width="320" height="340" viewBox="0 0 320 340" className="drop-shadow-2xl">
              <defs>
                {/* Gradients */}
                <linearGradient id="tier1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8DC3" />
                  <stop offset="100%" stopColor="#FF5FA2" />
                </linearGradient>
                <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D8A8FF" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
                <linearGradient id="tier3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE299" />
                  <stop offset="100%" stopColor="#FFD166" />
                </linearGradient>
                <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F0E8FF" />
                </linearGradient>
                <filter id="cakeShadow">
                  <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="rgba(255,95,162,0.3)" />
                </filter>
              </defs>

              {/* Plate */}
              <ellipse cx="160" cy="315" rx="150" ry="20" fill="url(#plateGrad)" stroke="rgba(255,95,162,0.3)" strokeWidth="1" filter="url(#cakeShadow)" />
              <ellipse cx="160" cy="310" rx="140" ry="15" fill="white" opacity="0.8" />

              {/* Bottom tier */}
              <rect x="50" y="240" width="220" height="70" rx="4" fill="url(#tier1)" />
              <ellipse cx="160" cy="240" rx="110" ry="14" fill="#FF8DC3" />
              <ellipse cx="160" cy="310" rx="110" ry="14" fill="#E04A8A" opacity="0.5" />

              {/* Bottom tier decorations - dots */}
              {Array.from({ length: 8 }).map((_, i) => (
                <circle key={i} cx={70 + i * 26} cy={275} r="6" fill="white" opacity="0.6" />
              ))}
              <text x="160" y="282" textAnchor="middle" fontSize="16" fill="white" fontFamily="Dancing Script" fontWeight="bold">Happy Birthday!</text>

              {/* Middle tier */}
              <rect x="80" y="165" width="160" height="75" rx="4" fill="url(#tier2)" />
              <ellipse cx="160" cy="165" rx="80" ry="12" fill="#D8A8FF" />
              <ellipse cx="160" cy="240" rx="80" ry="12" fill="#9B59D9" opacity="0.5" />

              {/* Middle tier decorations */}
              {Array.from({ length: 6 }).map((_, i) => (
                <circle key={i} cx={90 + i * 26} cy={200} r="5" fill="white" opacity="0.5" />
              ))}
              <text x="160" y="208" textAnchor="middle" fontSize="13" fill="white" fontFamily="Dancing Script">Rola 💕</text>

              {/* Top tier */}
              <rect x="105" y="105" width="110" height="60" rx="4" fill="url(#tier3)" />
              <ellipse cx="160" cy="105" rx="55" ry="10" fill="#FFE299" />
              <ellipse cx="160" cy="165" rx="55" ry="10" fill="#D4A417" opacity="0.4" />

              {/* Frosting drips */}
              {[120, 140, 160, 180, 195].map((x, i) => (
                <ellipse key={i} cx={x} cy={108} rx={7 - i * 0.3} ry={12 + i} fill="white" opacity="0.7" />
              ))}

              {/* Stars on cake */}
              <text x="130" y="135" textAnchor="middle" fontSize="12">⭐</text>
              <text x="190" y="135" textAnchor="middle" fontSize="12">✨</text>
            </svg>

            {/* Candles - positioned above the cake */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-3 -mt-2">
              {Array.from({ length: NUM_CANDLES }, (_, i) => {
                const isBlown = blownCandles.includes(i);
                return (
                  <motion.button
                    key={i}
                    onClick={() => blowCandle(i)}
                    className="relative flex flex-col items-center cursor-pointer group"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Click to blow!"
                  >
                    {/* Flame */}
                    <AnimatePresence>
                      {!isBlown && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0, y: -20 }}
                          className="candle-flame mb-0.5"
                        >
                          <svg width="14" height="20" viewBox="0 0 14 20">
                            <defs>
                              <radialGradient id={`flame${i}`} cx="50%" cy="70%">
                                <stop offset="0%" stopColor="#FFD166" />
                                <stop offset="40%" stopColor="#FF8C00" />
                                <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
                              </radialGradient>
                            </defs>
                            <ellipse cx="7" cy="13" rx="5" ry="8" fill={`url(#flame${i})`} />
                            <ellipse cx="7" cy="8" rx="3" ry="5" fill="#FFD166" opacity="0.8" />
                            <ellipse cx="7" cy="5" rx="1.5" ry="3" fill="white" opacity="0.6" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Smoke when blown */}
                    <AnimatePresence>
                      {isBlown && (
                        <motion.div
                          initial={{ opacity: 0.8, y: 0 }}
                          animate={{ opacity: 0, y: -30 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1 }}
                          className="absolute -top-6 text-gray-400 text-xs"
                        >
                          💨
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Candle body */}
                    <div
                      className="w-3 rounded-sm transition-all duration-300"
                      style={{
                        height: '36px',
                        background: [
                          '#FF5FA2', '#C084FC', '#FFD166', '#FF8DC3',
                          '#6366F1', '#10B981', '#F59E0B'
                        ][i],
                        opacity: isBlown ? 0.5 : 1,
                      }}
                    />
                    {/* Wick */}
                    <div className="w-0.5 h-2 bg-gray-700 rounded-full" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Blow all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          {!allBlown ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={blowAll}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isBlowing || blownCandles.length === NUM_CANDLES}
              >
                <span className="flex items-center gap-2">
                  <span>💨</span>
                  Blow All Candles
                </span>
              </motion.button>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="h-2 bg-pink-100 rounded-full w-32 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    animate={{ width: `${(blownCandles.length / NUM_CANDLES) * 100}%` }}
                  />
                </div>
                <span>{blownCandles.length}/{NUM_CANDLES} blown</span>
              </div>
            </div>
          ) : (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-script text-3xl text-primary"
            >
              🎂 Your wish is on its way! 🎂
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdayCake;
