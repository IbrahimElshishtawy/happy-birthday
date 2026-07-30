import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Memories', href: '#timeline' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Music', href: '#music' },
  { label: 'Letter', href: '#letter' },
  { label: 'Gifts', href: '#gifts' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Cake', href: '#cake' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-card border-b border-white/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavClick('#hero')}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-pink">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-script text-2xl text-gradient-primary font-bold">Rola</span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeLink === link.href
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-pink'
                      : 'text-gray-600 hover:text-primary hover:bg-pink-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <motion.div
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Music className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">♬ Playing</span>
              </motion.div>

              <motion.button
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-pink"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                className="md:hidden w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card"
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-primary" />
                ) : (
                  <Menu className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl shadow-float border-b border-white/50 p-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium text-left transition-all ${
                    activeLink === link.href
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
