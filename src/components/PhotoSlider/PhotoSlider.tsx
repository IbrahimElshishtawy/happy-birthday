import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Music } from 'lucide-react';
import { useAudio, DEFAULT_TRACKS } from '@/hooks/useAudio';
import { formatTime } from '@/utils/helpers';

const PhotoSlider: React.FC = () => {
  const audio = useAudio(DEFAULT_TRACKS);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const progressPercent = audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;

  return (
    <section id="music" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2D1B6B] to-[#4a1558]" />
        {/* Animated equalizer background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-around gap-1 px-4 opacity-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 bg-primary rounded-t eq-bar ${audio.isPlaying ? '' : 'opacity-20'}`}
              style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        {/* Stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>🎵</span>
            <span className="text-sm font-semibold text-white">Music For You</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
            Your Favorite Songs
          </h2>
          <p className="font-script text-xl text-pink-300">
            Every song reminds me of you 🎶
          </p>
        </motion.div>

        {/* Main Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl overflow-hidden mb-8"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          }}
        >
          <div className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              {/* Vinyl record */}
              <div className="relative flex-shrink-0">
                <motion.div
                  className="relative w-40 h-40 sm:w-48 sm:h-48"
                  animate={audio.isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Vinyl disk */}
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <radialGradient id="vinylGrad" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#2D1B6B" />
                        <stop offset="30%" stopColor="#1a0a2e" />
                        <stop offset="50%" stopColor="#2D1B6B" />
                        <stop offset="70%" stopColor="#1a0a2e" />
                        <stop offset="90%" stopColor="#2D1B6B" />
                        <stop offset="100%" stopColor="#1a0a2e" />
                      </radialGradient>
                      <radialGradient id="labelGrad" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#FF8DC3" />
                        <stop offset="100%" stopColor="#FF5FA2" />
                      </radialGradient>
                    </defs>
                    {/* Outer ring */}
                    <circle cx="100" cy="100" r="98" fill="#1a0a2e" />
                    {/* Grooves */}
                    {[85, 75, 65, 55, 45, 35].map((r) => (
                      <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
                    ))}
                    {/* Vinyl gradient */}
                    <circle cx="100" cy="100" r="98" fill="url(#vinylGrad)" opacity="0.6" />
                    {/* Center label */}
                    <circle cx="100" cy="100" r="30" fill="url(#labelGrad)" />
                    <circle cx="100" cy="100" r="5" fill="rgba(255,255,255,0.5)" />
                    {/* Reflection */}
                    <ellipse cx="75" cy="60" rx="15" ry="8" fill="rgba(255,255,255,0.05)" transform="rotate(-30 75 60)" />
                  </svg>
                </motion.div>

                {/* Needle arm */}
                <motion.div
                  className="absolute top-2 right-0 w-16 h-1.5 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full origin-right shadow-lg"
                  style={{ transformOrigin: 'right center' }}
                  animate={audio.isPlaying ? { rotate: -12 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Track info & controls */}
              <div className="flex-1 w-full">
                {/* Track info */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={audio.currentTrack.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={audio.isPlaying ? { opacity: [1, 0.3, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-white/50 text-xs uppercase tracking-widest">Now Playing</span>
                    </div>
                    <h3 className="text-white font-bold text-2xl sm:text-3xl font-display mb-1">
                      {audio.currentTrack.title}
                    </h3>
                    <p className="text-white/60 text-base">{audio.currentTrack.artist}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Equalizer bars */}
                <div className="flex items-end gap-[3px] h-8 mb-6">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 bg-gradient-to-t from-primary to-secondary rounded-full eq-bar ${
                        audio.isPlaying ? '' : 'opacity-20'
                      }`}
                      style={{ minHeight: '4px' }}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div
                    className="relative h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width;
                      audio.seek(x * (audio.duration || 240));
                    }}
                  >
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: `${demoProgress}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg"
                      style={{ left: `${demoProgress}%`, transform: 'translate(-50%, -50%)' }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-white/40 text-xs font-mono">1:45</span>
                    <span className="text-white/40 text-xs font-mono">4:23</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={audio.toggleLoop}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      audio.isLoop ? 'bg-primary text-white' : 'text-white/50 hover:text-white'
                    }`}
                    whileTap={{ scale: 0.85 }}
                  >
                    <Repeat className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    onClick={audio.handlePrev}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    whileTap={{ scale: 0.85 }}
                  >
                    <SkipBack className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    onClick={audio.toggle}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-pink text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {audio.isPlaying ? (
                      <Pause className="w-6 h-6 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 fill-white ml-1" />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={audio.handleNext}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    whileTap={{ scale: 0.85 }}
                  >
                    <SkipForward className="w-5 h-5" />
                  </motion.button>

                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-white/50" />
                    <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                      <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="p-4">
            <h4 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3 px-2">Playlist</h4>
            {PLAYLIST.map((track, i) => (
              <motion.button
                key={track.id}
                onClick={() => audio.selectTrack(i)}
                className={`w-full flex items-center gap-4 p-3 rounded-2xl text-left transition-all ${
                  i === audio.currentTrackIndex
                    ? 'bg-white/15'
                    : 'hover:bg-white/10'
                }`}
                whileHover={{ x: 4 }}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  i === audio.currentTrackIndex
                    ? 'bg-gradient-to-br from-primary to-secondary'
                    : 'bg-white/10'
                }`}>
                  {i === audio.currentTrackIndex && audio.isPlaying ? (
                    <div className="flex gap-[2px] items-end h-4">
                      {[1,2,3].map(b => <div key={b} className="w-[2px] bg-white rounded eq-bar" />)}
                    </div>
                  ) : (
                    <span className="text-white/60 text-sm">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${i === audio.currentTrackIndex ? 'text-white' : 'text-white/70'}`}>
                    {track.title}
                  </p>
                  <p className="text-white/40 text-xs truncate">{track.artist}</p>
                </div>
                <span className="text-white/30 text-xs font-mono">3:45</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoSlider;
