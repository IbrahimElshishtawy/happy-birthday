import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Maximize2, Image as ImageIcon, Film, Play, X, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Dynamically import user photos & videos from src/assets
const userImageModules = import.meta.glob<{ default: string }>(
  '/src/assets/images/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG}',
  { eager: true }
);
const realPhotos = Object.values(userImageModules).map((m) => m.default);

const userVideoModules = import.meta.glob<{ default: string }>(
  '/src/assets/videos/*.{mp4,webm,mov,MP4,WEBM,MOV}',
  { eager: true }
);
const realVideos = Object.values(userVideoModules).map((m) => m.default);

// Placeholder color pairs
const PHOTO_COLORS = [
  ['#FF5FA2', '#C084FC'], ['#C084FC', '#6366F1'], ['#FFD166', '#FF5FA2'],
  ['#FF8DC3', '#FFD166'], ['#6366F1', '#C084FC'], ['#FF5FA2', '#FF8DC3'],
];

const PHOTO_LABELS = [
  'Beautiful Smile 💕', 'Golden Memory ✨', 'Sweet Moment 🌸',
  'Radiant Glow 💖', 'Joyful Day 🦋', 'Lovely Time 🌟',
  'Precious Memory 💫', 'Magical Moment 🌹', 'Sweet Dream 💝',
  'Shining Bright 🌺', 'Gentle Grace 🌷', 'Pure Joy 💗',
];

const generatePlaceholderSvg = (color1: string, color2: string, label: string, index: number): string => {
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
    <text x="200" y="320" text-anchor="middle" font-size="18" font-family="Georgia,serif" fill="white" font-weight="bold">${label}</text>
    <text x="200" y="350" text-anchor="middle" font-size="14" font-family="Arial" fill="rgba(255,255,255,0.8)">Rola 💕</text>
  </svg>`;
  const encoded = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
};

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  src: string;
  thumb?: string;
  label: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('grid');
  const [filter, setFilter] = useState<'all' | 'photos' | 'videos'>('all');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Build items combining user photos & videos
  const mediaItems: MediaItem[] = useMemo(() => {
    const items: MediaItem[] = [];

    // Add user photos
    realPhotos.forEach((src, idx) => {
      items.push({
        id: `photo-${idx}`,
        type: 'photo',
        src,
        label: PHOTO_LABELS[idx % PHOTO_LABELS.length],
        aspect: idx % 3 === 0 ? 'portrait' : idx % 3 === 1 ? 'landscape' : 'square',
      });
    });

    // Add user videos
    realVideos.forEach((src, idx) => {
      items.push({
        id: `video-${idx}`,
        type: 'video',
        src,
        label: `Memory Video ${idx + 1} 🎬`,
        aspect: 'landscape',
      });
    });

    // If no real photos uploaded yet, generate fallback placeholders
    if (items.length === 0) {
      Array.from({ length: 12 }, (_, i) => {
        const colors = PHOTO_COLORS[i % PHOTO_COLORS.length];
        const label = PHOTO_LABELS[i % PHOTO_LABELS.length];
        const placeholder = generatePlaceholderSvg(colors[0], colors[1], label, i);
        items.push({
          id: `placeholder-${i}`,
          type: 'photo',
          src: placeholder,
          label,
          aspect: i % 3 === 0 ? 'portrait' : i % 3 === 1 ? 'landscape' : 'square',
        });
      });
    }

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (filter === 'photos') return mediaItems.filter((i) => i.type === 'photo');
    if (filter === 'videos') return mediaItems.filter((i) => i.type === 'video');
    return mediaItems;
  }, [mediaItems, filter]);

  const photoCount = mediaItems.filter((i) => i.type === 'photo').length;
  const videoCount = mediaItems.filter((i) => i.type === 'video').length;

  return (
    <section id="gallery" className="py-24 px-4 relative overflow-hidden">
      {/* Background blur circles */}
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
            <span className="text-sm font-semibold text-secondary">Our Media Gallery</span>
          </motion.div>
          <h2 className="section-title gradient-text">Memory Gallery</h2>
          <p className="section-subtitle">Every picture & video tells our story 💕</p>

          {/* Controls bar: Filter tabs & View mode toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {/* Filter Tabs */}
            <div className="flex bg-white/40 p-1.5 rounded-full border border-white/50 backdrop-blur-md">
              {[
                { key: 'all', label: `All (${mediaItems.length})`, icon: Sparkles },
                { key: 'photos', label: `Photos (${photoCount})`, icon: ImageIcon },
                { key: 'videos', label: `Videos (${videoCount})`, icon: Film },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                    filter === key
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-pink'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Layout Toggle */}
            <div className="flex bg-white/40 p-1.5 rounded-full border border-white/50 backdrop-blur-md">
              {[
                { mode: 'grid' as const, icon: '▦', label: 'Masonry' },
                { mode: 'slider' as const, icon: '▷', label: 'Slider' },
              ].map((v) => (
                <button
                  key={v.mode}
                  onClick={() => setViewMode(v.mode)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                    viewMode === v.mode
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {v.icon} {v.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gallery Content */}
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
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="break-inside-avoid mb-4 group cursor-pointer"
                >
                  {item.type === 'photo' ? (
                    <PhotoView src={item.src}>
                      <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                        <img
                          src={item.src}
                          alt={item.label}
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          style={{
                            aspectRatio:
                              item.aspect === 'portrait'
                                ? '3/4'
                                : item.aspect === 'landscape'
                                ? '4/3'
                                : '1/1',
                          }}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-white text-sm font-semibold">{item.label}</p>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Maximize2 className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </PhotoView>
                  ) : (
                    /* Video Card */
                    <div
                      onClick={() => setActiveVideo(item.src)}
                      className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 bg-black group"
                    >
                      <video
                        src={item.src}
                        className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all">
                        <motion.div
                          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-pink text-white"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="w-6 h-6 fill-white ml-1" />
                        </motion.div>
                      </div>
                      {/* Label & Video Badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-white text-xs font-semibold bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                          {item.label}
                        </span>
                        <span className="bg-primary/80 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                          Video
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            /* Coverflow Slider View */
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
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              className="py-12"
            >
              {filteredItems.map((item) => (
                <SwiperSlide key={item.id} style={{ width: '320px' }}>
                  {item.type === 'photo' ? (
                    <PhotoView src={item.src}>
                      <div className="relative rounded-3xl overflow-hidden shadow-float cursor-pointer group">
                        <img
                          src={item.src}
                          alt={item.label}
                          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                          <p className="absolute bottom-4 left-4 text-white font-semibold">{item.label}</p>
                        </div>
                      </div>
                    </PhotoView>
                  ) : (
                    <div
                      onClick={() => setActiveVideo(item.src)}
                      className="relative rounded-3xl overflow-hidden shadow-float cursor-pointer group bg-black h-96"
                    >
                      <video
                        src={item.src}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 pointer-events-none"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-glow-pink">
                          <Play className="w-7 h-7 fill-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <p className="text-white font-semibold">{item.label}</p>
                        <span className="bg-primary text-white text-xs px-2.5 py-1 rounded-full font-bold">
                          Video
                        </span>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </PhotoProvider>

        {/* Video Player Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] rounded-3xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center gap-6"
        >
          <div className="glass-card px-6 py-4 text-center">
            <div className="text-3xl font-bold gradient-text">{photoCount}</div>
            <div className="text-xs text-gray-500 font-medium">Photos</div>
          </div>
          <div className="glass-card px-6 py-4 text-center">
            <div className="text-3xl font-bold gradient-text">{videoCount}</div>
            <div className="text-xs text-gray-500 font-medium font-mono">Videos</div>
          </div>
          <div className="glass-card px-6 py-4 text-center">
            <div className="text-3xl font-bold gradient-text">∞</div>
            <div className="text-xs text-gray-500 font-medium">Memories</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
