import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { timelineData } from '@/utils/timelineData';
import { useTiltEffect } from '@/hooks/useTiltEffect';

const TimelineCard: React.FC<{ item: typeof timelineData[0]; index: number; isLeft: boolean }> = ({
  item,
  index,
  isLeft,
}) => {
  const tiltRef = useTiltEffect(8);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-6 md:gap-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-12`}
    >
      {/* Card */}
      <div ref={tiltRef} className="flex-1 max-w-sm md:max-w-md">
        <div className="glass-card p-6 cursor-default group hover:shadow-card-hover transition-all duration-500">
          {/* Color stripe */}
          <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${item.color} mb-4`} />

          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-3xl mb-2 block">{item.emoji}</span>
              <h3 className="font-display text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </div>
          </div>

          {/* Date */}
          <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-3">
            {item.date}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>

          {/* Image if available */}
          {item.image && (
            <div className="relative rounded-2xl overflow-hidden my-4 shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-black/5 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto max-h-[480px] object-cover sm:object-contain rounded-2xl group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
            </div>
          )}

          {/* Bottom decoration */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`h-0.5 flex-1 bg-gradient-to-r ${item.color} opacity-30 rounded-full`} />
            <span className="text-pink-300 text-sm">💕</span>
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-glow-pink text-2xl`}
          whileHover={{ scale: 1.2, rotate: 10 }}
          animate={{ boxShadow: ['0 0 20px rgba(255,95,162,0.3)', '0 0 40px rgba(255,95,162,0.6)', '0 0 20px rgba(255,95,162,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {item.emoji}
        </motion.div>
      </div>

      {/* Empty side */}
      <div className="flex-1 max-w-sm md:max-w-md" />
    </motion.div>
  );
};

const Timeline: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="timeline" className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>💜</span>
            <span className="text-sm font-semibold text-primary">Our Beautiful Story</span>
          </motion.div>
          <h2 className="section-title gradient-text">Memories Timeline</h2>
          <p className="section-subtitle">Every moment with you is a treasure 💕</p>
        </motion.div>

        {/* Vertical timeline line */}
        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Timeline items */}
          {timelineData.map((item, i) => (
            <TimelineCard key={item.id} item={item} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
