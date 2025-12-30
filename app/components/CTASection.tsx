'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function CTASection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Floating animation for background elements
    gsap.to(".floating-element", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full floating-element"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-yellow-300/20 rounded-full floating-element"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-300/15 rounded-full floating-element"></div>
      <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-blue-300/20 rounded-full floating-element"></div>

      <div ref={ctaRef} className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Join thousands of satisfied customers who have upgraded their homes with our premium electronics. 
              Experience the difference quality makes.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-lg">Free consultation and product demo</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-lg">Professional installation included</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-lg">Extended warranty and support</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 text-center"
              >
                Visit Our Showroom
              </Link>
              <Link 
                href="/products" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all hover:scale-105 text-center"
              >
                Browse Products
              </Link>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Get Expert Consultation
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <div>
                <select className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                  <option value="">Select Product Interest</option>
                  <option value="tv">Smart TVs</option>
                  <option value="home-theater">Home Theater</option>
                  <option value="music-player">Music Players</option>
                  <option value="flour-mill">Flour Mills</option>
                </select>
              </div>
              <div>
                <textarea
                  placeholder="Your Message (Optional)"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                Get Free Consultation
              </button>
            </form>
            
            <div className="mt-6 text-center text-white/80 text-sm">
              <p>📞 Call us: +91 98765 43210</p>
              <p>📍 Bhesan, Junagadh, Gujarat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
