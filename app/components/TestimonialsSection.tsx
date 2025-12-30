'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Patel',
      location: 'Junagadh, Gujarat',
      rating: 5,
      text: 'Excellent service and premium quality products! Bought a 65" Smart TV and home theater system. The installation was professional and the after-sales support is outstanding.',
      product: 'Smart TV & Home Theater'
    },
    {
      name: 'Priya Sharma',
      location: 'Bhesan, Junagadh',
      rating: 5,
      text: 'Amazing experience with Shree Gopal Electronics. Their flour mill has been running perfectly for 2 years. Great build quality and very efficient grinding.',
      product: 'Commercial Flour Mill'
    },
    {
      name: 'Amit Joshi',
      location: 'Veraval, Gujarat',
      rating: 5,
      text: 'Best electronics store in the region! Competitive prices, genuine products, and excellent customer service. Highly recommend for all electronics needs.',
      product: 'Music System'
    },
    {
      name: 'Meera Desai',
      location: 'Somnath, Gujarat',
      rating: 5,
      text: 'Professional team with deep product knowledge. They helped me choose the perfect home theater setup within my budget. Very satisfied with the purchase.',
      product: 'Home Theater System'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const testimonialCards = containerRef.current?.querySelectorAll('.testimonial-card');
    
    if (testimonialCards) {
      gsap.fromTo(testimonialCards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from satisfied customers across Gujarat
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                ))}
              </div>
              <blockquote className="text-2xl text-gray-700 italic leading-relaxed mb-6">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].location}
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {testimonials[currentTestimonial].product}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                "{testimonial.text.substring(0, 120)}..."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏆</span>
              <span className="font-semibold">Authorized Dealer</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✅</span>
              <span className="font-semibold">Genuine Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🛡️</span>
              <span className="font-semibold">Warranty Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📞</span>
              <span className="font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
