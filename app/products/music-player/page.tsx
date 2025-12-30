import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Players - Shree Gopal Electronics | High-Quality Audio Players',
  description: 'Discover premium music players with high-fidelity audio, Bluetooth connectivity, and portable design. Perfect for music enthusiasts.',
};

export default function MusicPlayerProducts() {
  const features = [
    'High-Fidelity Audio',
    'Bluetooth Connectivity',
    'Long Battery Life',
    'Portable Design',
    'Multiple Format Support',
    'Touch Controls',
    'Memory Card Support',
    'Premium Build Quality'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎧</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Music Players
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience music the way it was meant to be heard with our premium collection of 
              high-fidelity music players. Perfect for audiophiles and music enthusiasts.
            </p>
          </div>
          
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Music Players</span>
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
              Advanced technology for the ultimate music experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center card-hover">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600">🎵</span>
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
              Pure Music, Anywhere You Go
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-8 text-white">
                <div className="text-center">
                  <div className="w-32 h-40 bg-white bg-opacity-20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">🎵</span>
                  </div>
                  <p className="text-green-100">Premium Music Player</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Studio-Quality Sound</h3>
                <p className="text-gray-600">
                  Experience your music with exceptional clarity and detail. High-resolution audio 
                  support ensures you hear every nuance of your favorite tracks.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Wireless Freedom</h3>
                <p className="text-gray-600">
                  Connect wirelessly to headphones, speakers, and other devices via Bluetooth 
                  for complete freedom of movement while enjoying your music.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">All-Day Battery</h3>
                <p className="text-gray-600">
                  Extended battery life ensures your music never stops. Enjoy hours of continuous 
                  playback on a single charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Find Your Perfect Player
            </h2>
            <p className="text-xl text-gray-600">
              From portable players to high-end audiophile systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Portable Players</h3>
              <p className="text-gray-600 mb-4">Compact and lightweight for on-the-go</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ultra-portable design</li>
                <li>• Long battery life</li>
                <li>• Memory card support</li>
                <li>• Bluetooth connectivity</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center border-2 border-green-500">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
                Best Value
              </div>
              <div className="text-4xl mb-4">🎧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hi-Fi Players</h3>
              <p className="text-gray-600 mb-4">Premium audio quality and features</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• High-resolution audio</li>
                <li>• Premium DAC</li>
                <li>• Multiple formats</li>
                <li>• Advanced controls</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Audiophile Systems</h3>
              <p className="text-gray-600 mb-4">Ultimate sound quality for enthusiasts</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Studio-grade components</li>
                <li>• Lossless audio support</li>
                <li>• Premium materials</li>
                <li>• Professional features</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Formats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Supported Audio Formats
            </h2>
            <p className="text-xl text-gray-600">
              Play all your favorite music formats with perfect quality
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['MP3', 'FLAC', 'WAV', 'AAC', 'OGG', 'DSD'].map((format, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🎵</div>
                <h3 className="font-semibold text-gray-800">{format}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Dedicated Music Players?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dedicated Audio</h3>
              <p className="text-gray-600 text-sm">Optimized specifically for music playback</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Long Battery Life</h3>
              <p className="text-gray-600 text-sm">Extended playback without frequent charging</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Superior Quality</h3>
              <p className="text-gray-600 text-sm">Better audio components than smartphones</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Large Storage</h3>
              <p className="text-gray-600 text-sm">Store thousands of songs locally</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Music Experience?
          </h2>
          <p className="text-xl mb-8">
            Discover the difference premium music players make to your favorite songs
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact" 
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Try Before You Buy
            </Link>
            <Link 
              href="/products" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
