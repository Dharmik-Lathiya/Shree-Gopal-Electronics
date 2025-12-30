'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: '✨',
      title: 'Premium Quality',
      description: 'Handpicked electronics from world-renowned brands, ensuring exceptional performance and longevity for your investment.',
      stats: '99.9% Quality Rating'
    },
    {
      icon: '🏆',
      title: 'Expert Service',
      description: 'Over 15 years of experience in electronics retail with certified technicians and comprehensive after-sales support.',
      stats: '15+ Years Experience'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Same-day delivery within Junagadh city limits and express shipping across Gujarat with professional installation services.',
      stats: 'Same Day Delivery'
    },
    {
      icon: '🛡️',
      title: 'Warranty Protection',
      description: 'Extended warranty options and comprehensive protection plans to safeguard your electronics investment.',
      stats: '5 Year Warranty'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with flexible EMI options, seasonal discounts, and exclusive member benefits.',
      stats: 'Up to 30% Off'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round-the-clock customer support with dedicated helpline and on-site technical assistance when needed.',
      stats: '24/7 Available'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Product Categories' },
    { number: '15+', label: 'Years in Business' },
    { number: '99%', label: 'Customer Satisfaction' }
  ];

  useEffect(() => {
    const featureCards = containerRef.current?.querySelectorAll('.feature-card');
    const statItems = statsRef.current?.querySelectorAll('.stat-item');

    if (featureCards) {
      featureCards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    if (statItems) {
      statItems.forEach((stat, index) => {
        gsap.fromTo(stat,
          { scale: 0, rotation: 180 },
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Features Grid */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Why Choose Shree Gopal Electronics?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our commitment to quality, service, and customer satisfaction
          </p>
        </div>
        
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="text-center">
                  <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {feature.stats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Success in Numbers</h3>
            <p className="text-xl opacity-90">Trusted by thousands of customers across Gujarat</p>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
