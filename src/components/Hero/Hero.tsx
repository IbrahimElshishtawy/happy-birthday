import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown, Sparkles, Gift } from 'lucide-react';
import FloatingHearts from '@/components/FloatingHearts/FloatingHearts';
import Confetti from '@/components/Confetti/Confetti';
import { randomBetween, randomInt } from '@/utils/helpers';

const BALLOONS = [
  { color: '#FF5FA2', size: 120, x: '8%', y: '15%', delay: 0, duration: 7 },
  { color: '#C084FC', size: 90, x: '15%', y: '35%', delay: 1, duration: 9 },
  { color: '#FFD166', size: 100, x: '5%', y: '55%', delay: 2, duration: 8 },
  { color: '#FF8DC3', size: 80, x: '20%', y: '70%', delay: 0.5, duration: 10 },
  { color: '#C084FC', size: 130, x: '80%', y: '10%', delay: 1.5, duration: 8 },
  { color: '#FF5FA2', size: 95, x: '88%', y: '30%', delay: 0.3, duration: 7 },
  { color: '#FFD166', size: 110, x: '75%', y: '55%', delay: 2.5, duration: 9 },
  { color: '#FF8DC3', size: 85, x: '90%', y: '70%', delay: 1.2, duration: 11 },
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: randomBetween(5, 95),
  size: randomBetween(4, 12),
  delay: randomBetween(0, 8),
  duration: randomBetween(8, 15),
  emoji: ['✨', '⭐', '💫', '🌟', '✦', '·'][randomInt(0, 5)],
}));

const Balloon: React.FC<typeof BALLOONS[0]> = ({ color, size, x, y, delay, duration }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    style={{ left: x, top: y }}
    animate={{ y: [0, -30, 0], rotate: [-5, 5, -5] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130">
      <defs>
        <radialGradient id={`bg-${color.replace('#', '')}`} cx="35%" cy="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </radialGradient>
        <filter id={`shadow-${color.replace('#', '')}`}>
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor={color} floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse
        cx="50" cy="50" rx="45" ry="50"
        fill={`url(#bg-${color.replace('#', '')})`}
        filter={`url(#shadow-${color.replace('#', '')})`}
      />
      <ellipse cx="35" cy="30" rx="8" ry="12" fill="white" opacity="0.3" />
      <line x1="50" y1="100" x2="50" y2="128" stroke={color} strokeWidth="2" strokeDasharray="4,3" />
      <circle cx="50" cy="128" r="3" fill={color} />
    </svg>
  </motion.div>
);

const Hero: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.9]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title-char',
        { opacity: 0, y: 80, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.06,
          duration: 1.2,
          ease: 'back.out(1.7)',
          delay: 0.3,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleStart = () => {
    setStarted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const scrollDown = () => {
    const el = document.getElementById('timeline');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B6B] via-[#6B2D8B] to-[#FF5FA2] opacity-90" />
        
        {/* City lights layer */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 bg-gradient-to-t from-amber-300/60 to-transparent"
              style={{
                left: `${i * 5 + randomBetween(0, 4)}%`,
                width: `${randomBetween(20, 60)}px`,
                height: `${randomBetween(60, 150)}px`,
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: randomBetween(2, 5), repeat: Infinity, delay: randomBetween(0, 3) }}
            />
          ))}
        </div>

        {/* Bokeh circles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`bokeh-${i}`}
            className="absolute rounded-full bokeh-circle"
            style={{
              left: `${randomBetween(0, 100)}%`,
              top: `${randomBetween(0, 100)}%`,
              width: `${randomBetween(20, 80)}px`,
              height: `${randomBetween(20, 80)}px`,
              background: [
                'rgba(255,95,162,0.3)',
                'rgba(192,132,252,0.3)',
                'rgba(255,209,102,0.3)',
                'rgba(255,141,195,0.2)',
              ][randomInt(0, 3)],
              filter: 'blur(8px)',
              animationDelay: `${randomBetween(0, 8)}s`,
              animationDuration: `${randomBetween(6, 12)}s`,
            }}
          />
        ))}

        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white star"
            style={{
              left: `${randomBetween(0, 100)}%`,
              top: `${randomBetween(0, 60)}%`,
              width: `${randomBetween(1, 4)}px`,
              height: `${randomBetween(1, 4)}px`,
              animationDelay: `${randomBetween(0, 4)}s`,
              animationDuration: `${randomBetween(2, 5)}s`,
            }}
          />
        ))}

        {/* Floating lights strings */}
        <div className="absolute top-20 left-0 right-0 flex justify-around opacity-60">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: ['#FF5FA2', '#FFD166', '#C084FC', '#FF8DC3'][i % 4] }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: randomBetween(1.5, 3), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Balloons */}
      {BALLOONS.map((b, i) => (
        <Balloon key={i} {...b} />
      ))}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute particle text-white"
            style={{
              left: `${p.x}%`,
              bottom: '-20px',
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* Floating Hearts overlay */}
      <FloatingHearts count={15} className="z-10" />

      {/* Main Content */}
      <motion.div
        className="relative z-20 text-center px-4"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        {/* Happy Birthday text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4"
        >
          <span className="font-script text-2xl md:text-3xl text-amber-300 drop-shadow-lg tracking-wider">
            ✨ Happy Birthday ✨
          </span>
        </motion.div>

        {/* ROLA Name */}
        <div
          ref={titleRef}
          className="mb-6 perspective-1000"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h1 className="font-display text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-black leading-none overflow-hidden">
            {'Rola'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-title-char inline-block"
                style={{
                  background: 'linear-gradient(135deg, #FFD166 0%, #FF8DC3 40%, #FF5FA2 60%, #C084FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 30px rgba(255,209,102,0.5))',
                  display: 'inline-block',
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          <motion.div
            className="flex justify-center items-center gap-3 -mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.span
              className="text-3xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.span>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <motion.span
              className="text-3xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              💕
            </motion.span>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          ref={subtitleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-10"
        >
          <p className="font-script text-xl sm:text-2xl md:text-3xl text-white/90 drop-shadow-lg mb-2">
            كل سنة وانتي أجمل ما في حياتي
          </p>
          <p className="font-body text-sm sm:text-base text-white/70 max-w-md mx-auto">
            A magical birthday journey crafted with love, just for you 💝
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'back.out(1.7)' }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <motion.button
            onClick={handleStart}
            className="group relative px-10 py-5 rounded-full overflow-hidden font-semibold text-white text-lg shadow-glow-pink cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #FF5FA2, #C084FC)',
              boxShadow: '0 0 40px rgba(255,95,162,0.5)',
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Gift className="w-5 h-5" />
              {started ? '🎊 Celebrating!' : '🎁 Start the Surprise'}
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%', skewX: -20 }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            onClick={scrollDown}
            className="px-8 py-4 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Explore
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-14 flex justify-center gap-8 sm:gap-12"
        >
          {[
            { value: '365', label: 'Days of Joy' },
            { value: '∞', label: 'Memories' },
            { value: '100%', label: 'Love' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                {stat.value}
              </div>
              <div className="text-white/60 text-xs sm:text-sm font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
        onClick={scrollDown}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>

      {/* Glass overlay at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF0F7] to-transparent z-10" />

      <Confetti trigger={showConfetti} />
    </section>
  );
};

export default Hero;
