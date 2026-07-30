import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTypewriter } from '@/hooks/useTypewriter';

const FINAL_MESSAGE = `To the most beautiful soul I know,

You deserve a love that feels like the first day of spring — warm, fresh, and full of promise.
You deserve laughter so genuine it makes your eyes crinkle at the corners.
You deserve a life so rich with joy that every sunrise feels like a gift.

Rola, watching you exist in this world is one of the greatest privileges of my life.

On this birthday and every birthday to come, I want you to know:
You are loved. You are valued. You are extraordinary.

No matter what — I am always in your corner.

Happy Birthday, my dearest Rola.`;

const FinalLetter: React.FC = () => {
  const { displayText, isComplete, ref: typeRef } = useTypewriter(FINAL_MESSAGE, 20);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="final" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B6B] via-[#6B2D8B] to-[#FF5FA2]" />
        {/* Stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
        {/* Floating emojis */}
        {['💕', '✨', '🌸', '💖', '⭐', '🌟', '💫', '🦋'].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl pointer-events-none"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            className="flex justify-center gap-3 mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {['💕', '❤️', '💕'].map((e, i) => (
              <motion.span
                key={i}
                className="text-4xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            A Final Message
          </h2>
          <p className="font-script text-2xl text-pink-200">
            From the heart 💌
          </p>
        </motion.div>

        {/* Final letter card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            className="relative rounded-3xl p-8 sm:p-12 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
            }}
          >
            {/* Shimmer border */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent, rgba(255,95,162,0.2), transparent)',
              }}
            />

            {/* Content */}
            <div ref={typeRef} className="relative z-10">
              <p
                className="text-white/90 leading-[2.2] text-base sm:text-lg whitespace-pre-line typewriter-cursor"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.15rem' }}
              >
                {displayText}
              </p>
            </div>

            {/* Signature area */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-10 text-center"
              >
                <div className="flex justify-center gap-2 mb-4">
                  {['💝', '💕', '❤️', '💫', '✨'].map((e, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl sm:text-3xl"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.2, type: 'spring', bounce: 0.7 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  className="inline-block"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="font-script text-4xl sm:text-5xl text-white font-bold drop-shadow-lg">
                   H.B.D Yaaa RORO 🎂
                  </p>
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mt-2" />
                </motion.div>

                <motion.p
                  className="font-script text-xl text-pink-200 mt-4"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ❤️ Forever and Always ❤️
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Back to top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ Relive the Magic
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalLetter;
