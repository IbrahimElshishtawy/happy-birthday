import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Timeline from '@/components/Timeline/Timeline';
import Gallery from '@/components/Gallery/Gallery';
import PhotoSlider from '@/components/PhotoSlider/PhotoSlider';
import Message from '@/components/Message/Message';
import GiftBoxes from '@/components/GiftBoxes/GiftBoxes';
import Reasons from '@/components/Reasons/Reasons';
import WishJar from '@/components/WishJar/WishJar';
import Quiz from '@/components/Quiz/Quiz';
import Countdown from '@/components/Countdown/Countdown';
import TravelMap from '@/components/TravelMap/TravelMap';
import BirthdayCake from '@/components/BirthdayCake/BirthdayCake';
import FinalLetter from '@/components/FinalLetter/FinalLetter';
import Footer from '@/components/Footer/Footer';
import FloatingMusicPlayer from '@/components/FloatingMusicPlayer/FloatingMusicPlayer';
import WelcomeModal from '@/components/WelcomeModal/WelcomeModal';

const App: React.FC = () => {
  // Custom cursor glow
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'cursor-glow';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,95,162,0.6), transparent);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, opacity 0.2s;
      mix-blend-mode: normal;
    `;

    const cursorTrail = document.createElement('div');
    cursorTrail.id = 'cursor-trail';
    cursorTrail.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid rgba(255,95,162,0.3);
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: all 0.15s ease;
    `;

    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorTrail.style.left = `${e.clientX}px`;
      cursorTrail.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
    };

    const handleMouseUp = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (document.body.contains(cursor)) document.body.removeChild(cursor);
      if (document.body.contains(cursorTrail)) document.body.removeChild(cursorTrail);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen"
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="pb-20"> {/* pb-20 for floating music player */}
          {/* 1. Hero */}
          <Hero />

          {/* 2. Timeline */}
          <Timeline />

          {/* 3. Gallery */}
          <Gallery />

          {/* 4. Music Player */}
          <PhotoSlider />

          {/* 5. Love Letter */}
          <Message />

          {/* 6. Gift Boxes */}
          <GiftBoxes />

          {/* 7. Reasons */}
          <Reasons />

          {/* 8. Wish Jar */}
          <WishJar />

          {/* 9. Quiz */}
          <Quiz />

          {/* 10. Countdown */}
          <Countdown />

          {/* 11. Travel Map */}
          <TravelMap />

          {/* 12. Birthday Cake */}
          <BirthdayCake />

          {/* 13. Final Message */}
          <FinalLetter />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Music Player (always visible) */}
        <FloatingMusicPlayer />
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
