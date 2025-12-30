import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Shree Gopal Electronics | Your Trusted Electronics Partner',
  description: 'Learn about Shree Gopal Electronics and our owner Rajeshbhai Lathiya. Located in Bhesan, Junagadh, we provide premium electronics and exceptional service.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Shree Gopal Electronics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for premium electronics and appliances in Junagadh, Gujarat
          </p>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold">RL</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Rajeshbhai Lathiya</h2>
                  <p className="text-blue-100">Owner & Founder</p>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Meet Our Founder</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  With years of experience in the electronics industry, Rajeshbhai Lathiya founded 
                  Shree Gopal Electronics with a vision to provide premium quality electronics and 
                  exceptional customer service to the people of Junagadh and surrounding areas.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Our Mission</h4>
                    <p className="text-gray-600 text-sm">
                      To provide high-quality electronics that enhance modern living while 
                      maintaining the highest standards of customer service.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Our Vision</h4>
                    <p className="text-gray-600 text-sm">
                      To be the most trusted electronics retailer in Gujarat, known for 
                      quality products and exceptional customer relationships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Visit Our Showroom</h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Bhesan, Junagadh
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Store Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-blue-600 text-sm">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">
                      Grampanchayat Shopping Center C-5<br/>
                      Bhesan, Junagadh - 362020<br/>
                      Gujarat, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-blue-600 text-sm">🕒</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 8:00 PM<br/>
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-blue-600 text-sm">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Contact</h4>
                    <p className="text-gray-600">
                      Phone: +91 XXXXX XXXXX<br/>
                      Email: info@lathiyaelectronics.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="https://maps.google.com/?q=Grampanchayat+Shopping+Center+C-5+Bhesan+Junagadh+362020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View on Google Maps
                  <span className="ml-2">🗺️</span>
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Quality Assurance</h4>
                    <p className="text-gray-600 text-sm">
                      Every product is carefully selected and tested for quality and reliability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Expert Guidance</h4>
                    <p className="text-gray-600 text-sm">
                      Our knowledgeable team helps you choose the right products for your needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Local Service</h4>
                    <p className="text-gray-600 text-sm">
                      Proudly serving the Junagadh community with personalized service.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Trusted Reputation</h4>
                    <p className="text-gray-600 text-sm">
                      Years of satisfied customers and positive relationships in the community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Trust</h3>
              <p className="text-gray-600">
                Building lasting relationships through honest business practices and reliable service.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                Striving for the highest standards in product quality and customer service.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Embracing new technologies and modern solutions for better living.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
