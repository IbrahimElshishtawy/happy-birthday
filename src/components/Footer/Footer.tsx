import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-16 px-4 overflow-hidden bg-gradient-to-t from-[#2D1B6B] to-[#6B2D8B]">
      {/* Floating hearts */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 80}%`,
            opacity: 0.2 + Math.random() * 0.4,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.6,
            repeat: Infinity,
          }}
        >
          {['💕', '🌸', '✨', '💖', '💫'][i % 5]}
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center items-center gap-3 mb-8"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-pink"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-white fill-white" />
          </motion.div>
          <span className="font-script text-4xl text-white font-bold drop-shadow-lg">Rola</span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="font-script text-3xl text-pink-200 mb-3">
            Happy Birthday, beautiful soul 💕
          </p>
          <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
            This website was crafted with endless love, just for you.
            Every pixel, every animation, every word — all for Rola. ✨
          </p>
        </motion.div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { label: 'Home', href: '#hero' },
            { label: 'Memories', href: '#timeline' },
            { label: 'Gallery', href: '#gallery' },
            { label: 'Letter', href: '#letter' },
            { label: 'Gifts', href: '#gifts' },
            { label: 'Cake', href: '#cake' },
          ].map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-1.5 rounded-full border border-white/20 text-white/60 text-sm hover:bg-white/10 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Restart button */}
        <motion.button
          onClick={scrollToTop}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-white shadow-glow-pink mb-10"
          style={{ background: 'linear-gradient(135deg, #FF5FA2, #C084FC)' }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,95,162,0.6)' }}
          whileTap={{ scale: 0.95 }}
        >
          🎁 Restart the Surprise
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6 max-w-sm mx-auto">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/40 text-sm">💕</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Credit */}
        <div className="space-y-2">
          <p className="text-white/70 text-sm font-medium">
            صُنع بواسطة <span className="text-pink-300 font-bold">CoVantage SR IR</span> 💕
          </p>
          <p className="text-white/40 text-xs">
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block text-primary"
            >
              ❤️
            </motion.span>{' '}
            for Rola • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
