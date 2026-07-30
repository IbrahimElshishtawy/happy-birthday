import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { mapPins, type MapPin } from '@/utils/mapData';

const TravelMap: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="map" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-lavender/30 to-blush/50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100 border border-teal-200 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>🌍</span>
            <span className="text-sm font-semibold text-teal-600">Our World</span>
          </motion.div>
          <h2 className="section-title gradient-text">Our Travel Map</h2>
          <p className="section-subtitle">
            Places we've been & places we dream of going together 💫
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow-pink" />
            <span className="text-sm text-gray-600 font-medium">Visited Together</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-accent to-amber-400 shadow-glow-gold animate-pulse" />
            <span className="text-sm text-gray-600 font-medium">Dream Destinations ✨</span>
          </div>
        </div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative glass-card p-4 overflow-hidden"
          style={{ aspectRatio: '2/1', minHeight: '300px' }}
        >
          {/* World map SVG background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              style={{ filter: 'saturate(0.3) brightness(1.2)' }}
            >
              {/* Simple world map paths - continents */}
              <rect width="1000" height="500" fill="url(#oceanGrad)" />
              <defs>
                <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0F2FE" />
                  <stop offset="100%" stopColor="#BAE6FD" />
                </linearGradient>
              </defs>
              {/* North America */}
              <path d="M100,80 L200,80 L220,120 L210,180 L170,200 L140,180 L120,160 L100,140 Z" 
                fill="#FDE8EF" stroke="rgba(255,95,162,0.4)" strokeWidth="1" />
              {/* South America */}
              <path d="M180,220 L230,220 L250,280 L230,340 L200,360 L170,340 L160,280 Z" 
                fill="#FDE8EF" stroke="rgba(255,95,162,0.4)" strokeWidth="1" />
              {/* Europe */}
              <path d="M440,60 L520,60 L530,100 L510,130 L460,140 L430,120 L430,80 Z" 
                fill="#FDE8EF" stroke="rgba(255,95,162,0.4)" strokeWidth="1" />
              {/* Africa */}
              <path d="M450,150 L540,150 L560,250 L530,320 L490,340 L450,320 L430,250 Z" 
                fill="#FDE8EF" stroke="rgba(255,95,162,0.4)" strokeWidth="1" />
              {/* Asia */}
              <path d="M540,60 L800,60 L820,200 L760,240 L680,230 L600,200 L540,160 Z" 
                fill="#FDE8EF" stroke="rgba(255,95,162,0.4)" strokeWidth="1" />
              {/* Australia */}
              <path d="M720,300 L820,300 L840,380 L800,410 L730,400 L700,360 Z" 
                fill="#FDE8EF" stroke="rgba(255,95,162,0.4)" strokeWidth="1" />
              {/* Latitude/longitude grid */}
              {[100,200,300,400].map(y => (
                <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,95,162,0.1)" strokeWidth="0.5" />
              ))}
              {[200,400,600,800].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="rgba(255,95,162,0.1)" strokeWidth="0.5" />
              ))}
            </svg>
          </div>

          {/* Pins overlay */}
          {mapPins.map((pin) => (
            <motion.button
              key={pin.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: pin.id * 0.15, type: 'spring', bounce: 0.5 }}
              onClick={() => setSelectedPin(selectedPin?.id === pin.id ? null : pin)}
              whileHover={{ scale: 1.3, zIndex: 20 }}
            >
              {/* Pin */}
              <div className="relative">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                    pin.dream
                      ? 'bg-gradient-to-br from-accent to-amber-400'
                      : 'bg-gradient-to-br from-primary to-secondary'
                  }`}
                  animate={pin.dream ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm">{pin.emoji}</span>
                </motion.div>
                {/* Pin ripple */}
                <motion.div
                  className={`absolute inset-0 rounded-full ${
                    pin.dream ? 'bg-accent/40' : 'bg-primary/30'
                  }`}
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: pin.id * 0.3 }}
                />
                {/* Label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm text-gray-700">
                    {pin.name}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Selected pin info */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 glass-card p-6 flex items-center gap-4"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0 ${
                  selectedPin.dream
                    ? 'bg-gradient-to-br from-accent to-amber-400'
                    : 'bg-gradient-to-br from-primary to-secondary'
                }`}
              >
                {selectedPin.emoji}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-display text-xl font-bold text-gray-800">{selectedPin.name}</h3>
                  <span className="text-sm text-gray-500">{selectedPin.country}</span>
                  {selectedPin.dream && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/20 text-amber-600 text-xs font-semibold">
                      Dream ✨
                    </span>
                  )}
                </div>
                <p className="text-gray-600 italic">"{selectedPin.memory}"</p>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="ml-auto text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { label: 'Places Visited', value: mapPins.filter(p => p.visited).length, emoji: '📍', color: 'text-primary' },
            { label: 'Dream Places', value: mapPins.filter(p => p.dream).length, emoji: '✨', color: 'text-amber-500' },
            { label: 'More to Explore', value: '∞', emoji: '🌍', color: 'text-secondary' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelMap;
