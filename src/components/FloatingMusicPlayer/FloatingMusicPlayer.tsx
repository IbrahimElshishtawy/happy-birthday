import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Repeat, Music2, ChevronUp, ChevronDown, List
} from 'lucide-react';
import { useAudio, DEFAULT_TRACKS, type Track } from '@/hooks/useAudio';
import { formatTime } from '@/utils/helpers';

interface FloatingMusicPlayerProps {
  tracks?: Track[];
}

const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({ tracks = DEFAULT_TRACKS }) => {
  const audio = useAudio(tracks);
  const [expanded, setExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const progressPercent = audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="bg-white/90 backdrop-blur-2xl border-t border-white/50 shadow-float">
        {/* Progress bar */}
        <div
          className="h-1 bg-gradient-to-r from-primary to-secondary cursor-pointer"
          style={{ width: `${progressPercent}%`, transition: 'width 0.3s linear' }}
          onClick={(e) => {
            const rect = e.currentTarget.parentElement!.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            audio.seek(x * audio.duration);
          }}
        />
        <div
          className="h-1 bg-pink-100 -mt-1 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            audio.seek(x * (audio.duration || 240));
          }}
        />

        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <motion.div
                className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-pink flex-shrink-0 ${audio.isPlaying ? 'vinyl-playing' : ''}`}
                animate={audio.isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Music2 className="w-5 h-5 text-white" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-800 truncate">{audio.currentTrack.title}</p>
                <p className="text-xs text-gray-500 truncate">{audio.currentTrack.artist}</p>
              </div>
            </div>

            {/* Equalizer bars */}
            <div className="hidden sm:flex items-end gap-[2px] h-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-[3px] bg-gradient-to-t from-primary to-secondary rounded-full eq-bar ${!audio.isPlaying ? 'opacity-30' : ''}`}
                  style={{ height: audio.isPlaying ? undefined : '20%' }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={audio.handlePrev}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-50 text-gray-500 hover:text-primary transition-colors"
                whileTap={{ scale: 0.85 }}
              >
                <SkipBack className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={audio.toggle}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-pink text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {audio.isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </motion.button>

              <motion.button
                onClick={audio.handleNext}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-50 text-gray-500 hover:text-primary transition-colors"
                whileTap={{ scale: 0.85 }}
              >
                <SkipForward className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Right controls */}
            <div className="hidden sm:flex items-center gap-2">
              <motion.button
                onClick={audio.toggleMute}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-50 text-gray-500 hover:text-primary transition-colors"
                whileTap={{ scale: 0.85 }}
              >
                {audio.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>

              <motion.button
                onClick={audio.toggleLoop}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  audio.isLoop ? 'bg-primary text-white' : 'hover:bg-pink-50 text-gray-500 hover:text-primary'
                }`}
                whileTap={{ scale: 0.85 }}
              >
                <Repeat className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  showPlaylist ? 'bg-primary text-white' : 'hover:bg-pink-50 text-gray-500 hover:text-primary'
                }`}
                whileTap={{ scale: 0.85 }}
              >
                <List className="w-4 h-4" />
              </motion.button>

              <span className="text-xs text-gray-400 font-mono">
                {formatTime(audio.currentTime)} / {formatTime(audio.duration || 240)}
              </span>
            </div>
          </div>
        </div>

        {/* Playlist */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-pink-100 bg-white/80 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Playlist</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {tracks.map((track, i) => (
                    <motion.button
                      key={track.id}
                      onClick={() => audio.selectTrack(i)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                        i === audio.currentTrackIndex
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-pink-50 hover:bg-pink-100 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        i === audio.currentTrackIndex ? 'bg-white/20' : 'bg-primary/10'
                      }`}>
                        {i === audio.currentTrackIndex && audio.isPlaying ? (
                          <div className="flex gap-[2px] items-end h-3">
                            {[1,2,3].map(b => (
                              <div key={b} className={`w-[2px] bg-white rounded eq-bar`} />
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs">{i + 1}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{track.title}</p>
                        <p className={`text-xs truncate ${i === audio.currentTrackIndex ? 'text-white/70' : 'text-gray-400'}`}>
                          {track.artist}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FloatingMusicPlayer;
