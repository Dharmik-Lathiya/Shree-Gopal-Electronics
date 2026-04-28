'use client';

import { motion } from 'framer-motion';
import Button from './ui/Button';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/20 to-[#0a0a0a]"
      />
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Star size={16} fill="currentColor" />
            <span>Premium Electronics Store in Gujarat</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6"
          >
            Experience Technology <br />
            <span className="text-gradient">Redefined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            Discover a curated collection of premium electronics, from high-fidelity 
            audio to smart home solutions. Expert service, guaranteed quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button href="/products" size="lg" icon={<ArrowRight size={20} />}>
              Explore Collection
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Visit Our Store
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Hero Image/Decoration - Abstract visual representation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 hidden lg:block pointer-events-none"
      >
         {/* You can place a real image here later if needed */}
         <div className="w-full h-full bg-gradient-to-tr from-blue-500/10 to-transparent rounded-l-3xl border-l border-t border-b border-white/10 backdrop-blur-md" />
      </motion.div>
    </div>
  );
}
