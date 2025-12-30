'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(buttonRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Floating animation for hero background
    gsap.to(heroRef.current, {
      backgroundPosition: "200% 0%",
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
        backgroundSize: '400% 400%'
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Shree Gopal Electronics
          <span className="block text-3xl md:text-5xl mt-4 text-yellow-300">
            Premium Electronics Hub
          </span>
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Transform your home with cutting-edge TVs, immersive home theaters, 
          premium music systems, and efficient flour mills. Experience excellence 
          in every product.
        </p>
        <div ref={buttonRef} className="space-x-6">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
            Explore Collection
          </button>
          <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-800 transition-all">
            Watch Demo
          </button>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-yellow-300/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-pink-300/15 rounded-full animate-ping"></div>
    </section>
  );
}
