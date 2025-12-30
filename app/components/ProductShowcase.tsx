'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      title: 'Smart TVs',
      description: 'Ultra HD 4K Smart TVs with AI-powered features, HDR support, and seamless streaming capabilities for the ultimate viewing experience.',
      features: ['4K Ultra HD', 'Smart OS', 'HDR10+', 'Voice Control'],
      icon: '📺',
      href: '/products/tv',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Home Theater Systems',
      description: 'Immersive surround sound systems with Dolby Atmos, wireless connectivity, and premium audio engineering.',
      features: ['Dolby Atmos', '7.1 Surround', 'Wireless', 'Premium Audio'],
      icon: '🎵',
      href: '/products/home-theater',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Music Players',
      description: 'High-fidelity music players with lossless audio support, premium DACs, and audiophile-grade components.',
      features: ['Hi-Res Audio', 'Premium DAC', 'Long Battery', 'Bluetooth 5.0'],
      icon: '🎧',
      href: '/products/music-player',
      gradient: 'from-pink-500 to-red-600'
    },
    {
      title: 'Flour Mills',
      description: 'Commercial-grade flour mills with precision grinding, energy efficiency, and durable construction for home and business use.',
      features: ['Precision Grinding', 'Energy Efficient', 'Durable Build', 'Easy Maintenance'],
      icon: '⚙️',
      href: '/products/flour-mill',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.product-card');
    if (!cards) return;

    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0, rotationY: 45 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Premium Product Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of premium electronics and appliances, 
            each designed to enhance your lifestyle with cutting-edge technology and superior quality.
          </p>
        </div>
        
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <Link key={index} href={product.href}>
              <div className="product-card group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="text-6xl mr-6">{product.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                        {product.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                    Explore Collection
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
