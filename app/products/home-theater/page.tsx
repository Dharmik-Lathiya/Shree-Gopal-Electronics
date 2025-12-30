import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Theater Systems - Shree Gopal Electronics | Premium Sound Systems',
  description: 'Transform your home into a cinema with our premium Home Theater Systems. Surround sound, wireless connectivity, and immersive audio experience.',
};

export default function HomeTheaterProducts() {
  const features = [
    'Surround Sound Technology',
    'Wireless Connectivity',
    'Multiple Input Options',
    'Remote Control',
    'Bluetooth Support',
    'Subwoofer Included',
    'Easy Installation',
    'Premium Audio Quality'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎵</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Home Theater Systems
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your living room into a premium cinema experience with our high-quality 
              home theater systems. Immersive sound that brings movies and music to life.
            </p>
          </div>
          
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Home Theater</span>
          </nav>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Premium Audio Features
            </h2>
            <p className="text-xl text-gray-600">
              Advanced sound technology for the ultimate entertainment experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center card-hover">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600">🎵</span>
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
              Cinema-Quality Sound at Home
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Immersive Surround Sound</h3>
                <p className="text-gray-600">
                  Experience movies, music, and games like never before with multi-channel surround 
                  sound that places you right in the center of the action.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Wireless Convenience</h3>
                <p className="text-gray-600">
                  Connect your devices wirelessly via Bluetooth or WiFi for seamless streaming 
                  from smartphones, tablets, and smart TVs.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Setup & Control</h3>
                <p className="text-gray-600">
                  Simple installation process with comprehensive remote control and mobile app 
                  support for effortless operation.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white">
                <div className="text-center">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="w-16 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🔊</span>
                    </div>
                    <div className="w-16 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🔊</span>
                    </div>
                    <div className="w-16 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🔊</span>
                    </div>
                    <div className="col-span-3 w-24 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-lg">📻</span>
                    </div>
                  </div>
                  <p className="text-purple-100">5.1 Surround Sound System</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Choose Your Perfect System
            </h2>
            <p className="text-xl text-gray-600">
              From compact soundbars to full surround sound systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Soundbars</h3>
              <p className="text-gray-600 mb-4">Compact and sleek audio solution</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Space-saving design</li>
                <li>• Easy installation</li>
                <li>• Wireless subwoofer</li>
                <li>• Multiple connectivity</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center border-2 border-purple-500">
              <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
                Recommended
              </div>
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">5.1 Systems</h3>
              <p className="text-gray-600 mb-4">Complete surround sound experience</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 5 speakers + subwoofer</li>
                <li>• True surround sound</li>
                <li>• Cinema-quality audio</li>
                <li>• Advanced features</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">7.1 Systems</h3>
              <p className="text-gray-600 mb-4">Ultimate home theater experience</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 7 speakers + subwoofer</li>
                <li>• Premium audio quality</li>
                <li>• Advanced processing</li>
                <li>• Professional setup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Invest in a Home Theater System?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Movie Theater Experience</h3>
              <p className="text-gray-600 text-sm">Enjoy cinema-quality sound in the comfort of your home</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Enhanced Gaming</h3>
              <p className="text-gray-600 text-sm">Immersive audio that brings games to life</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎶</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Music Enjoyment</h3>
              <p className="text-gray-600 text-sm">High-fidelity sound for your favorite music</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Home Value</h3>
              <p className="text-gray-600 text-sm">Adds value and appeal to your home</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Home Entertainment?
          </h2>
          <p className="text-xl mb-8">
            Experience our home theater systems in person and hear the difference quality makes
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Schedule Demo
            </Link>
            <Link 
              href="/products" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
