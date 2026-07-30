import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Maximize2, Image as ImageIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Generate placeholder photos using gradient colors
const PHOTO_COLORS = [
  ['#FF5FA2', '#C084FC'], ['#C084FC', '#6366F1'], ['#FFD166', '#FF5FA2'],
  ['#FF8DC3', '#FFD166'], ['#6366F1', '#C084FC'], ['#FF5FA2', '#FF8DC3'],
  ['#C084FC', '#FF5FA2'], ['#FFD166', '#6366F1'], ['#FF8DC3', '#C084FC'],
  ['#6366F1', '#FF5FA2'], ['#FF5FA2', '#FFD166'], ['#C084FC', '#FF8DC3'],
];

const PHOTO_EMOJIS = ['🌸', '💕', '✨', '🌺', '💖', '🦋', '🌟', '💫', '🌹', '💝', '🌷', '💗'];
const PHOTO_LABELS = [
  'Beautiful Smile', 'Golden Memories', 'Purple Dreams', 'Sweet Moments',
  'Radiant Glow', 'Joyful Days', 'Lovely Times', 'Happy Days',
  'Precious Memories', 'Magical Moments', 'Sweet Dreams', 'Shining Bright',
  'Beautiful Soul', 'Kind Heart', 'Gentle Grace', 'Pure Joy',
  'Warm Hugs', 'Bright Eyes', 'Soft Light', 'Tender Moments',
  'Glowing Beauty', 'Sparkling Joy', 'Dreamy Days', 'Sweet Laughter',
];

// Generate SVG placeholder images
const generatePlaceholderSvg = (color1: string, color2: string, _emoji: string, label: string, index: number): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
    <defs>
      <linearGradient id="g${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1"/>
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="url(#g${index})"/>
    <circle cx="200" cy="180" r="80" fill="rgba(255,255,255,0.15)"/>
    <circle cx="320" cy="80" r="50" fill="rgba(255,255,255,0.1)"/>
    <circle cx="80" cy="380" r="60" fill="rgba(255,255,255,0.1)"/>
    <text x="200" y="320" text-anchor="middle" font-size="18" font-family="Georgia,serif" fill="white" font-weight="bold" opacity="0.9">${label}</text>
    <text x="200" y="350" text-anchor="middle" font-size="14" font-family="Arial" fill="rgba(255,255,255,0.7)">Rola</text>
  </svg>`;
  // Safe UTF-8 base64 encoding
  const encoded = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
};

interface Photo {
  id: number;
  src: string;
  thumb: string;
  label: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('grid');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const photos: Photo[] = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      const colors = PHOTO_COLORS[i % PHOTO_COLORS.length];
      const emoji = PHOTO_EMOJIS[i % PHOTO_EMOJIS.length];
      const label = PHOTO_LABELS[i % PHOTO_LABELS.length];
      const aspects: Photo['aspect'][] = ['portrait', 'landscape', 'square'];
      return {
        id: i + 1,
        src: generatePlaceholderSvg(colors[0], colors[1], emoji, label, i),
        thumb: generatePlaceholderSvg(colors[0], colors[1], emoji, label, i),
        label,
        aspect: aspects[i % 3],
      };
    }),
  []);

  return (
    <section id="gallery" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>📸</span>
            <span className="text-sm font-semibold text-secondary">Our Gallery</span>
          </motion.div>
          <h2 className="section-title gradient-text">Memory Gallery</h2>
          <p className="section-subtitle">Every picture tells our story 💕</p>

          {/* View toggle */}
          <div className="flex justify-center gap-3 mt-6">
            {[
              { mode: 'grid' as const, icon: '▦', label: 'Masonry' },
              { mode: 'slider' as const, icon: '▷', label: 'Slider' },
            ].map((v) => (
              <motion.button
                key={v.mode}
                onClick={() => setViewMode(v.mode)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  viewMode === v.mode
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-pink'
                    : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {v.icon} {v.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <PhotoProvider
          speed={() => 400}
          easing={(type) =>
            type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }
          toolbarRender={({ onScale, scale }) => (
            <div className="flex gap-3 items-center">
              <button onClick={() => onScale(scale + 0.5)} className="text-white text-2xl">+</button>
              <button onClick={() => onScale(scale - 0.5)} className="text-white text-2xl">−</button>
            </div>
          )}
        >
          {viewMode === 'grid' ? (
            /* Masonry Grid */
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="break-inside-avoid mb-4 group cursor-pointer"
                >
                  <PhotoView src={photo.src}>
                    <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                      <img
                        src={photo.thumb}
                        alt={photo.label}
                        className="w-full object-cover"
                        loading="lazy"
                        style={{
                          aspectRatio: photo.aspect === 'portrait' ? '3/4' : photo.aspect === 'landscape' ? '4/3' : '1/1',
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white text-sm font-semibold">{photo.label}</p>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Maximize2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </PhotoView>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Slider View */
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="py-12"
            >
              {photos.map((photo) => (
                <SwiperSlide key={photo.id} style={{ width: '300px' }}>
                  <PhotoView src={photo.src}>
                    <div className="relative rounded-3xl overflow-hidden shadow-float cursor-pointer group">
                      <img
                        src={photo.src}
                        alt={photo.label}
                        className="w-full h-80 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                        <p className="absolute bottom-4 left-4 text-white font-semibold">{photo.label}</p>
                      </div>
                    </div>
                  </PhotoView>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </PhotoProvider>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center gap-8"
        >
          <div className="glass-card px-6 py-4 text-center">
            <div className="text-3xl font-bold gradient-text">{photos.length}+</div>
            <div className="text-sm text-gray-500">Photos</div>
          </div>
          <div className="glass-card px-6 py-4 text-center">
            <div className="text-3xl font-bold gradient-text">∞</div>
            <div className="text-sm text-gray-500">Memories</div>
          </div>
          <div className="glass-card px-6 py-4 text-center">
            <ImageIcon className="w-8 h-8 text-primary mx-auto mb-1" />
            <div className="text-sm text-gray-500">Click to expand</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
