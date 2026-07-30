import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gifts, type Gift } from '@/utils/gifts';

interface GiftCardProps {
  gift: Gift;
  index: number;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleOpen = () => {
    if (isOpen) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 600);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Closed Gift Box */
          <motion.div
            key="closed"
            className="relative cursor-pointer group"
            onClick={handleOpen}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Box body */}
            <div
              className={`relative rounded-3xl overflow-hidden shadow-float bg-gradient-to-br ${gift.boxColor} border border-white/60 p-8`}
              style={{ minHeight: '280px' }}
            >
              {/* Ribbon horizontal */}
              <div
                className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-r ${gift.ribbonColor} opacity-90 z-10`}
              />
              {/* Ribbon vertical */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-5 bg-gradient-to-b ${gift.ribbonColor} opacity-90 z-10`}
              />

              {/* Ribbon bow */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                  className={`w-16 h-10 bg-gradient-to-r ${gift.ribbonColor} rounded-full opacity-90 shadow-lg`}
                  animate={isAnimating ? { scale: [1, 1.3, 0] } : {}}
                  style={{ clipPath: 'ellipse(50% 50% at 50% 50%)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-5 h-5 rounded-full bg-white/40`}
                    style={{
                      boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                    }}
                  />
                </div>
              </div>

              {/* Content preview */}
              <div className="relative z-0 h-full flex flex-col items-center justify-end pt-16 pb-4">
                <motion.span
                  className="text-6xl mb-4 drop-shadow-lg"
                  animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {gift.emoji}
                </motion.span>
                <h3 className="font-display text-xl font-bold text-gray-700 text-center mb-2">
                  {gift.title}
                </h3>
                <p className="text-gray-500 text-sm text-center">
                  Click to open! 🎁
                </p>

                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />
              </div>
            </div>

            {/* Shadow */}
            <div
              className={`absolute -bottom-4 left-4 right-4 h-8 blur-xl rounded-full opacity-40 bg-gradient-to-r ${gift.ribbonColor}`}
            />
          </motion.div>
        ) : (
          /* Open Gift */
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`relative rounded-3xl overflow-hidden shadow-float bg-gradient-to-br ${gift.boxColor} border border-white/60 p-8`}
              style={{ minHeight: '280px' }}
            >
              {/* Open lid (flying up) */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: -80, opacity: 0, rotate: -15 }}
                transition={{ duration: 0.6 }}
                className={`absolute -top-2 left-0 right-0 h-16 bg-gradient-to-r ${gift.boxColor} border-b border-white/30 rounded-t-3xl z-20`}
              />

              {/* Confetti burst */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                {['💕', '✨', '🌸', '⭐', '💫'].map((e, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-2xl"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: (i - 2) * 50,
                      y: -60 - i * 20,
                      opacity: 0,
                      rotate: (i - 2) * 90,
                    }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>

              {/* Content */}
              <div className="flex flex-col items-center text-center h-full pt-4">
                <motion.span
                  className="text-5xl mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', bounce: 0.6 }}
                >
                  {gift.emoji}
                </motion.span>

                <motion.h3
                  className="font-display text-xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {gift.title}
                </motion.h3>

                {gift.content.type === 'message' && gift.content.text && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50"
                  >
                    <p className="text-gray-700 text-sm leading-relaxed font-body italic">
                      "{gift.content.text}"
                    </p>
                  </motion.div>
                )}

                <motion.div
                  className="mt-4 flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {['💕', '🌸', '✨'].map((e, i) => (
                    <span key={i} className="text-lg animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                      {e}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const GiftBoxes: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="gifts" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush to-lavender pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>🎁</span>
            <span className="text-sm font-semibold text-amber-600">Surprise Gifts</span>
          </motion.div>
          <h2 className="section-title gradient-text">Gift Boxes</h2>
          <p className="section-subtitle">Each box holds a special surprise for you 🎀</p>
        </motion.div>

        {/* Gift grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift, i) => (
            <GiftCard key={gift.id} gift={gift} index={i} />
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card inline-block px-8 py-4">
            <p className="font-script text-xl text-primary">
              Every gift is wrapped with love 💕
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftBoxes;
