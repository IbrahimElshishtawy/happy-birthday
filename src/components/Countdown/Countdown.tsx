import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Set your special date here
const TARGET_DATE = new Date('2022-01-01T00:00:00');

interface TimeUnit {
  value: number;
  label: string;
  emoji: string;
  color: string;
}

const Countdown: React.FC = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = Math.abs(now.getTime() - TARGET_DATE.getTime());
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const units: TimeUnit[] = [
    { value: time.days, label: 'Days', emoji: '📅', color: 'from-pink-400 to-rose-500' },
    { value: time.hours, label: 'Hours', emoji: '⏰', color: 'from-purple-400 to-violet-500' },
    { value: time.minutes, label: 'Minutes', emoji: '⏱️', color: 'from-amber-400 to-orange-500' },
    { value: time.seconds, label: 'Seconds', emoji: '💫', color: 'from-teal-400 to-cyan-500' },
  ];

  return (
    <section id="countdown" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-lavender/40" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>⏳</span>
            <span className="text-sm font-semibold text-primary">Time Together</span>
          </motion.div>
          <h2 className="section-title gradient-text">Our Time Together</h2>
          <p className="section-subtitle">
            Every second spent with you is a treasure 💕
          </p>
        </motion.div>

        {/* Countdown grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {units.map((unit, i) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-card p-6 sm:p-8 text-center group hover:shadow-card-hover transition-all duration-500 relative overflow-hidden">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                {/* Emoji */}
                <motion.span
                  className="text-3xl block mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                >
                  {unit.emoji}
                </motion.span>

                {/* Number */}
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`font-display text-5xl sm:text-6xl font-black mb-2 bg-gradient-to-br ${unit.color} bg-clip-text text-transparent`}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.div>

                {/* Label */}
                <p className="text-gray-500 font-semibold text-sm uppercase tracking-widest">
                  {unit.label}
                </p>

                {/* Decorative ring */}
                <div
                  className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${unit.color} opacity-5`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="glass-card p-8 sm:p-12 text-center"
        >
          <motion.div
            className="flex justify-center gap-3 mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {['💕', '🌸', '✨', '🌸', '💕'].map((e, i) => (
              <motion.span
                key={i}
                className="text-2xl sm:text-3xl"
                animate={{ rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            {time.days.toLocaleString()} Days of Joy
          </h3>
          <p className="font-script text-xl sm:text-2xl text-primary mb-4">
            كل يوم بيعدي بيزيدني يقين إنك أجمل حاجة حصلتلي ✨
          </p>
          <p className="text-gray-500 text-base leading-relaxed max-w-lg mx-auto">
            Every single one of those days has been made more beautiful by having you in my life.
            Here's to a lifetime more 💝
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
