import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { reasons } from '@/utils/reasons';
import { useTiltEffect } from '@/hooks/useTiltEffect';

const ReasonCard: React.FC<{ reason: typeof reasons[0]; index: number }> = ({ reason, index }) => {
  const tiltRef = useTiltEffect(10);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={tiltRef}
        className="glass-card p-6 h-full group cursor-default hover:shadow-card-hover transition-all duration-500 relative overflow-hidden"
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${reason.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Glow effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center text-2xl shadow-lg mb-4`}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {reason.icon}
          </motion.div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
            {reason.title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600 transition-colors">
            {reason.description}
          </p>

          {/* Bottom heart */}
          <motion.div
            className="mt-4 flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className={`h-0.5 flex-1 bg-gradient-to-r ${reason.color} opacity-30 rounded-full`} />
            <span className="text-sm">💕</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Reasons: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="reasons" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-lavender/30" />
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              background: ['rgba(255,95,162,0.05)', 'rgba(192,132,252,0.05)', 'rgba(255,209,102,0.05)'][i % 3],
              top: `${i * 20}%`,
              left: `${[10, 70, 30, 80, 20][i]}%`,
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
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
            <span>✨</span>
            <span className="text-sm font-semibold text-primary">Why You're Amazing</span>
          </motion.div>
          <h2 className="section-title gradient-text">Reasons Rola Is Special</h2>
          <p className="section-subtitle">
            Just a few of the thousands of reasons we love you 💕
          </p>

          {/* Floating emojis */}
          <div className="flex justify-center gap-4 mt-4">
            {['💖', '🌸', '✨', '💫', '🦋'].map((e, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.id} reason={reason} index={i} />
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-block rounded-3xl px-10 py-6 shadow-float"
            style={{
              background: 'linear-gradient(135deg, rgba(255,95,162,0.1), rgba(192,132,252,0.1))',
              border: '1px solid rgba(255,95,162,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <p className="font-script text-3xl text-primary mb-2">
              …and a million more reasons 💕
            </p>
            <p className="text-gray-500 text-sm">
              Every single day, you give us more reasons to love you, Rola ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reasons;
