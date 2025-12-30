import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart TVs - Shree Gopal Electronics | 4K Ultra HD Televisions',
  description: 'Discover our range of Smart TVs with 4K Ultra HD resolution, HDR support, and smart features. Premium television experience at Shree Gopal Electronics.',
};

export default function TVProducts() {
  const tvFeatures = [
    '4K Ultra HD Resolution',
    'Smart OS Integration',
    'HDR10+ Support',
    'Multiple HDMI Ports',
    'Built-in WiFi',
    'Voice Control',
    'Streaming Apps',
    'Energy Efficient'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📺</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Smart TVs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience entertainment like never before with our premium collection of Smart TVs. 
              From stunning 4K visuals to seamless streaming, discover the perfect TV for your home.
            </p>
          </div>
          
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Smart TVs</span>
          </nav>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Premium TV Features
            </h2>
            <p className="text-xl text-gray-600">
              Advanced technology for the ultimate viewing experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tvFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center card-hover">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600">✓</span>
                </div>
                <h3 className="font-semibold text-gray-800">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Our Smart TVs?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-white">
                <div className="text-center">
                  <div className="w-32 h-20 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📺</span>
                  </div>
                  <p className="text-gray-300">Premium Smart TV Display</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Crystal Clear 4K Resolution</h3>
                <p className="text-gray-600">
                  Experience every detail with stunning 4K Ultra HD resolution that brings your 
                  content to life with incredible clarity and vibrant colors.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Entertainment Hub</h3>
                <p className="text-gray-600">
                  Access your favorite streaming services, apps, and content with built-in smart 
                  features and seamless connectivity options.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Immersive Audio Experience</h3>
                <p className="text-gray-600">
                  Enhanced audio technology delivers rich, clear sound that complements the 
                  stunning visuals for a complete entertainment experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Available Sizes
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect size for your space
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">32" - 43"</h3>
              <p className="text-gray-600 mb-4">Perfect for bedrooms and small spaces</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Compact design</li>
                <li>• Energy efficient</li>
                <li>• Smart features</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center border-2 border-blue-500">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">50" - 65"</h3>
              <p className="text-gray-600 mb-4">Ideal for living rooms and family spaces</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Premium picture quality</li>
                <li>• Advanced smart features</li>
                <li>• Multiple connectivity</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">70" - 85"</h3>
              <p className="text-gray-600 mb-4">Ultimate home theater experience</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cinema-like experience</li>
                <li>• Premium audio</li>
                <li>• Advanced HDR</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Upgrade Your TV Experience?
          </h2>
          <p className="text-xl mb-8">
            Visit our showroom to see our Smart TVs in action and find the perfect one for your home
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Visit Showroom
            </Link>
            <Link 
              href="/products" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
