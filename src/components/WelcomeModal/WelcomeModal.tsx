import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Sparkles, Heart } from 'lucide-react';
import { startGlobalAudioAt443 } from '@/hooks/useAudio';
import confetti from 'canvas-confetti';

const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleStartMusic = () => {
    // 1. Play audio at 4:43
    startGlobalAudioAt443();

    // 2. Trigger Confetti
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF5FA2', '#C084FC', '#FFD166', '#FF8DC3'],
    });

    // 3. Close modal
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, rgba(45,27,107,0.92) 0%, rgba(26,10,46,0.96) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Floating background stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
              transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
            />
          ))}

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 30 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
            className="relative max-w-md w-full rounded-3xl p-8 sm:p-10 text-center overflow-hidden border border-white/20 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,95,162,0.1) 100%)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.6), 0 0 40px rgba(255,95,162,0.3)',
            }}
          >
            {/* Top pulsing badge */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-0.5 shadow-glow-pink"
              animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-[#1a0a2e] flex items-center justify-center">
                <Music className="w-10 h-10 text-pink-300 animate-pulse" />
              </div>
            </motion.div>

            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold text-amber-200 tracking-wider">
                HAPPY BIRTHDAY ROLA • 08/08/2001
              </span>
            </div>

            {/* Title */}
            <h2 className="font-script text-3xl sm:text-4xl text-white font-bold mb-3 drop-shadow-md">
              مفاجأة عيد ميلاد رولا 💕
            </h2>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
              اضغطي على الزر بالأسفل لتشغيل الموسيقى وبدء رحلة المفاجأة الخاصة بكِ 🎵✨
            </p>

            {/* Main Action Button */}
            <motion.button
              onClick={handleStartMusic}
              className="w-full py-4 rounded-full font-bold text-white shadow-glow-pink text-base sm:text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden group cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF5FA2 0%, #C084FC 100%)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(255,95,162,0.8)' }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Shimmer line */}
              <div className="absolute inset-0 shimmer-effect opacity-30" />
              <Play className="w-6 h-6 fill-white" />
              <span>تشغيل الموسيقى وبدء المفاجأة</span>
            </motion.button>

            {/* Secondary Skip button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              دخول بدون موسيقى
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
