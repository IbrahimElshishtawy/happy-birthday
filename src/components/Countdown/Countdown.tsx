import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Rola's Date of Birth: 08/08/2001
const ROLA_BIRTHDAY = new Date('2001-08-08T00:00:00');

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
      const diff = Math.abs(now.getTime() - ROLA_BIRTHDAY.getTime());
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
    { value: time.days, label: 'Days of Magic', emoji: '🎂', color: 'from-pink-400 to-rose-500' },
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
            <span>✨</span>
            <span className="text-sm font-semibold text-primary">Born on 08 / 08 / 2001</span>
          </motion.div>
          <h2 className="section-title gradient-text">Rola's Lifetime of Joy</h2>
          <p className="section-subtitle">
            Celebrating {time.days.toLocaleString()} glorious days of Rola in the world 💕
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
                  className={`font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-2 bg-gradient-to-br ${unit.color} bg-clip-text text-transparent`}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.div>

                {/* Label */}
                <p className="text-gray-500 font-semibold text-xs sm:text-sm uppercase tracking-widest">
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

        {/* Message & Travel Promise Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="glass-card p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 font-bold text-7xl select-none">
            ✈️
          </div>

          <motion.div
            className="flex justify-center gap-3 mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {['🏝️', '🏔️', '✈️', '🌺', '🏖️'].map((e, i) => (
              <motion.span
                key={i}
                className="text-2xl sm:text-3xl"
                animate={{ rotate: [0, i % 2 === 0 ? 12 : -12, 0] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Our Next Big Adventure Awaits! 🌍
          </h3>
          <p className="font-script text-2xl sm:text-3xl text-primary mb-4 leading-relaxed">
            أول ما أخلص الجيش.. هناخد شنطنا ونسافر نلف العالم سوا 🫡✈️
          </p>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            من شواطئ المالديف الكريستالية 🏝️ لجبال سويسرا المغطاة بالتلوج 🏔️، لشوارع أمريكا وهاواي والأماكن الساحلية اللي بتحبيها 🌺.. أوعدك هنعيش أحيى مغامرات في حياتنا سوا 💕
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
