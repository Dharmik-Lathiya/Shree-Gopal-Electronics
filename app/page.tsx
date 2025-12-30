'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, ChevronRight, Zap, Shield, Clock, Award } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const productsRef = useRef(null);
  
  const contactRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    [heroRef, aboutRef, servicesRef, productsRef, contactRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const products = [
    { name: 'LED TVs', image: '📺', desc: 'Smart & Ultra HD' },
    { name: 'Refrigerators', image: '❄️', desc: 'Energy Efficient' },
    { name: 'Washing Machines', image: '🌀', desc: 'Front & Top Load' },
    { name: 'Air Conditioners', image: '❄️', desc: 'Inverter Technology' },
    { name: 'Microwave Ovens', image: '🔥', desc: 'Convection & Grill' },
    { name: 'Water Purifiers', image: '💧', desc: 'RO & UV Technology' },
  ];

  const services = [
    { icon: <Zap className="w-8 h-8" />, title: 'Installation', desc: 'Professional setup for all appliances' },
    { icon: <Shield className="w-8 h-8" />, title: 'Warranty', desc: 'Extended warranty on all products' },
    { icon: <Clock className="w-8 h-8" />, title: '24/7 Support', desc: 'Round the clock customer service' },
    { icon: <Award className="w-8 h-8" />, title: 'Quality Assured', desc: 'Only authorized products' },
  ];
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-xl shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Jay Gopal Electronics
                </h1>
                <p className="text-xs text-gray-600">Your Trusted Electronics Partner</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'services', 'products', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === section
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {['home', 'about', 'services', 'products', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                ⚡ Trusted Since 1995
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Home
                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Deserves the Best
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Premium electronics and appliances for modern living. Experience quality, reliability, and innovation at Jay Gopal Electronics.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('products')}
                  className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Explore Products</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {['📺', '❄️', '🌀', '💧'].map((emoji, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-8 flex items-center justify-center text-6xl hover:scale-110 transition-transform duration-300 shadow-lg"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">About Jay Gopal Electronics</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Serving the community with excellence for over 25 years
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Legacy</h4>
              <p className="text-gray-600">
                Established in 1995, we've been the trusted name in electronics and appliances, serving thousands of satisfied customers.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Promise</h4>
              <p className="text-gray-600">
                We guarantee authentic products, competitive prices, and exceptional after-sales service for complete peace of mind.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h4>
              <p className="text-gray-600">
                To be the leading electronics retailer by delivering innovative solutions and unmatched customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-xl text-gray-600">Complete solutions for all your electronic needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-br from-orange-600 to-amber-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" ref={productsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Product Range</h3>
            <p className="text-xl text-gray-600">Premium electronics from leading brands</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{product.image}</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-gray-600 mb-4">{product.desc}</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  <span>Learn More</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-gradient-to-br from-orange-600 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Get In Touch</h3>
            <p className="text-xl text-orange-100">Visit us or reach out for any inquiries</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-start space-x-4 hover:bg-white/20 transition-all">
                <div className="bg-white rounded-xl p-3">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Visit Our Store</h4>
                  <p className="text-orange-100">123 Electronics Market, Main Road, City - 380001</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-start space-x-4 hover:bg-white/20 transition-all">
                <div className="bg-white rounded-xl p-3">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Call Us</h4>
                  <p className="text-orange-100">+91 98765 43210</p>
                  <p className="text-orange-100">+91 98765 43211</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-start space-x-4 hover:bg-white/20 transition-all">
                <div className="bg-white rounded-xl p-3">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Email Us</h4>
                  <p className="text-orange-100 ">info@jaygopalelectronics.com</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h4>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 text-slate-950 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 text-slate-950 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 text-slate-950 focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 text-slate-950 focus:outline-none transition-colors"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h5 className="text-xl font-bold">Jay Gopal Electronics</h5>
              </div>
              <p className="text-gray-400 text-sm">Your trusted partner for quality electronics since 1995.</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-orange-500 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-orange-500 transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-orange-500 transition-colors">Products</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-orange-500 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Business Hours</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Mon - Sat: 10:00 AM - 9:00 PM</li>
                <li>Sunday: 11:00 AM - 7:00 PM</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <button className="bg-gray-800 p-3 rounded-lg hover:bg-orange-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 p-3 rounded-lg hover:bg-orange-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 p-3 rounded-lg hover:bg-orange-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Jay Gopal Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
