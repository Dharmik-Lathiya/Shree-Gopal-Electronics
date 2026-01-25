'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductCardProps {
  _id: string;
  title: string;
  category: string;
  features: string[];
  imageUrl?: string;
}

export default function ProductCard({ _id, title, category, features, imageUrl }: ProductCardProps) {
  return (
    <Link href={`/products/${_id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer"
      >
        <div className="aspect-[4/3] bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60 z-10" />
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-display text-4xl font-bold opacity-20">
              {category}
            </div>
          )}
        </div>
        
        <div className="p-6 relative z-20 -mt-12">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold mb-3 shadow-lg shadow-blue-900/50">
            {category}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
          
          <div className="space-y-2 mb-6">
            {features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {feature}
              </div>
            ))}
          </div>
          
          <div className="w-full py-3 bg-white/5 hover:bg-blue-600 rounded-xl text-white font-medium transition-all duration-300 border border-white/10 hover:border-transparent text-center">
            View Details
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
