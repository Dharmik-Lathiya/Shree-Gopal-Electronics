'use client';

import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({ ...item, quantity: 1 });
    removeFromWishlist(item._id);
    toast.success('Moved to cart!');
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Your Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="glass-card p-20 rounded-3xl border border-white/10 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500">
              <Heart size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
              <p className="text-gray-400">Save items you love here for later.</p>
            </div>
            <Link 
              href="/products"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div 
                key={item._id}
                className="glass-card rounded-3xl border border-white/5 overflow-hidden group"
              >
                <div className="aspect-[4/3] bg-[#1a1a1a] relative">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 font-bold text-4xl opacity-20">
                      IMG
                    </div>
                  )}
                  <button 
                    onClick={() => removeFromWishlist(item._id)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-blue-400 font-bold mb-6">₹{item.price.toLocaleString()}</p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <Link 
                      href={`/products/${item._id}`}
                      className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
