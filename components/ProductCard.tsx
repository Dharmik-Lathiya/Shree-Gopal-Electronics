'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  _id: string;
  title: string;
  category: string;
  features: string[];
  imageUrl?: string;
  price?: number;
}

export default function ProductCard({ _id, title, category, features, imageUrl, price = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ _id, name: title, price, image: imageUrl || '' });
    toast.success('Added to cart!');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(_id)) {
      removeFromWishlist(_id);
      toast.error('Removed from wishlist');
    } else {
      addToWishlist({ _id, name: title, price, image: imageUrl || '' });
      toast.success('Added to wishlist!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10"
    >
      <Link href={`/products/${_id}`} className="block cursor-pointer">
        <div className="aspect-[4/3] bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60 z-10" />
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-display text-4xl font-bold opacity-20">
              {category}
            </div>
          )}
          
          {/* Action Overlay */}
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleWishlist}
              className={`p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 ${
                isInWishlist(_id) ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-red-500'
              }`}
            >
              <Heart size={18} fill={isInWishlist(_id) ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
        
        <div className="p-6 relative z-20 -mt-12">
          <div className="flex justify-between items-start mb-3">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-900/50">
              {category}
            </div>
            {price > 0 && (
              <span className="text-blue-400 font-bold">₹{price.toLocaleString()}</span>
            )}
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
          
          <div className="flex gap-3">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <div className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all duration-300 border border-white/10">
              <Eye size={18} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

