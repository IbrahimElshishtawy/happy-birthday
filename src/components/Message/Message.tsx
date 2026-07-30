import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTypewriter } from '@/hooks/useTypewriter';

const LETTER_TEXT = `My dearest Rola,

Words feel small when I try to describe what you mean to me. But today, on your birthday, I want to try.

You are the kind of person who makes every ordinary moment feel extraordinary. Your laugh is the best sound in any room. Your smile is the kind that stays with you long after you've said goodbye.

This past year has shown me just how rare and precious you are. You've faced challenges with grace, celebrated joy with pure abandon, and loved with an open, generous heart.

I want you to know that you are seen — completely, deeply seen. Your dreams matter. Your feelings are valid. Your presence in this world makes it infinitely better.

On this day, I celebrate not just the day you were born, but every single day you've chosen to be who you are — authentically, beautifully, unapologetically YOU.

Thank you for existing. Thank you for being in my life. Thank you for being Rola.

With all the love in the universe,`;

const SIGNATURE = "Forever yours 💕";

const Message: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { displayText, ref: typeRef } = useTypewriter(
    isOpen ? LETTER_TEXT : '',
    18,
    false
  );

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 800);
  };

  return (
    <section id="letter" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-lavender/30 to-blush/50" />
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 border border-rose-200 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>💌</span>
            <span className="text-sm font-semibold text-primary">A Message From The Heart</span>
          </motion.div>
          <h2 className="section-title gradient-text">Love Letter</h2>
          <p className="section-subtitle">Words written with pure love 💕</p>
        </motion.div>

        {/* Envelope & Letter */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-2xl"
          >
            {!isOpen ? (
              /* Envelope */
              <motion.div
                className="relative cursor-pointer group"
                onClick={handleOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="relative rounded-3xl overflow-hidden shadow-float"
                  style={{
                    background: 'linear-gradient(135deg, #FFE4EF, #F5E6FF)',
                    border: '2px solid rgba(255,95,162,0.3)',
                  }}
                >
                  {/* Envelope flap */}
                  <div className="relative h-48 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, #FF8DC3, #C084FC)',
                        clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                      }}
                    />
                    <motion.div
                      className="relative z-10 flex flex-col items-center gap-3"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.span
                        className="text-6xl filter drop-shadow-lg"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💌
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Envelope body */}
                  <div className="px-10 py-8 text-center">
                    <p className="font-script text-3xl text-primary font-bold mb-3">For Rola</p>
                    <p className="text-gray-500 text-sm mb-6">A letter written from the deepest corner of my heart</p>
                    <motion.div
                      className="inline-flex items-center gap-2 btn-primary text-sm"
                      animate={{ boxShadow: ['0 0 20px rgba(255,95,162,0.3)', '0 0 40px rgba(255,95,162,0.6)', '0 0 20px rgba(255,95,162,0.3)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span>Open the Letter</span>
                      <span>💌</span>
                    </motion.div>
                  </div>

                  {/* Decorative stamps */}
                  <div className="absolute top-4 right-4 w-12 h-14 rounded border-2 border-primary/40 flex items-center justify-center bg-white/50">
                    <span className="text-lg">💕</span>
                  </div>

                  {/* Heart seal */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-pink group-hover:scale-125 transition-transform">
                    <span className="text-white text-sm">❤</span>
                  </div>
                </div>

                {/* Shadow */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-primary/20 blur-xl rounded-full" />
              </motion.div>
            ) : (
              /* Open Letter */
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Paper texture card */}
                  <div
                    className="relative rounded-3xl shadow-float overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #FFFBF8, #FFF5F9)',
                      border: '1px solid rgba(255,95,162,0.2)',
                    }}
                  >
                    {/* Paper lines decoration */}
                    <div className="absolute inset-0 opacity-10">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="w-full h-px bg-primary" style={{ marginTop: `${i * 28 + 60}px` }} />
                      ))}
                    </div>

                    {/* Left pink border (like notebook) */}
                    <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-primary/20" />

                    {/* Header decoration */}
                    <div className="relative px-8 pt-8 pb-4 text-center border-b border-primary/10">
                      <motion.span
                        className="text-4xl block mb-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💌
                      </motion.span>
                      <p className="font-script text-2xl text-primary">To my dearest Rola</p>
                      <div className="flex justify-center gap-2 mt-2">
                        {['💕', '🌸', '✨'].map((e, i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                          >
                            {e}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Letter content */}
                    <div ref={typeRef} className="px-8 sm:px-16 py-8">
                      <p
                        className="font-body text-gray-700 leading-[2.2] text-base whitespace-pre-line typewriter-cursor"
                        style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
                      >
                        {displayText}
                      </p>
                    </div>

                    {/* Signature */}
                    {displayText.length >= LETTER_TEXT.length - 10 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-8 sm:px-16 pb-10 text-right"
                      >
                        <div className="inline-block">
                          <p className="font-script text-2xl text-primary mb-1">{SIGNATURE}</p>
                          <div className="h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          {['💝', '💕', '❤️', '🌹'].map((e, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.2, type: 'spring' }}
                              className="text-xl"
                            >
                              {e}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Re-read button */}
                  <div className="text-center mt-6">
                    <motion.button
                      onClick={() => { setIsOpen(false); setShowLetter(false); }}
                      className="btn-ghost text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      ← Read Again
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Message;
