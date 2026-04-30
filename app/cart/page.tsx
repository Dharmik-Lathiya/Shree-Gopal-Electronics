'use client';

import { useCart } from '@/lib/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="glass-card p-20 rounded-3xl border border-white/10 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500">
              <ShoppingBag size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
              <p className="text-gray-400">Looks like you haven't added anything to your cart yet.</p>
            </div>
            <Link 
              href="/products"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div 
                  key={item._id}
                  className="glass-card p-6 rounded-2xl border border-white/5 flex gap-6 items-center"
                >
                  <div className="w-24 h-24 bg-[#1a1a1a] rounded-xl overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700 font-bold">
                        IMG
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-blue-400 font-semibold mb-4">₹{item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass-card p-8 rounded-3xl border border-white/10 sticky top-32">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                  Checkout
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
