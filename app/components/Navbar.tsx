'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-gray-800">Shree Gopal Electronics</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Products</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About Us</Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
