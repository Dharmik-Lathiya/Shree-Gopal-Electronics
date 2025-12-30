import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flour Mills - Shree Gopal Electronics | Efficient & Durable Flour Mills',
  description: 'High-efficiency flour mills for home and commercial use. Durable construction, easy cleaning, and safety features for perfect flour grinding.',
};

export default function FlourMillProducts() {
  const features = [
    'High Efficiency Motor',
    'Easy to Clean',
    'Durable Construction',
    'Safety Features',
    'Multiple Grinding Options',
    'Compact Design',
    'Low Maintenance',
    'Energy Efficient'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚙️</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Flour Mills
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Efficient and durable flour mills designed for both home and commercial use. 
              Perfect grinding solutions for fresh, healthy flour every time.
            </p>
          </div>
          
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Flour Mills</span>
          </nav>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Premium Mill Features
            </h2>
            <p className="text-xl text-gray-600">
              Advanced engineering for efficient and reliable flour grinding
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center card-hover">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600">⚙️</span>
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
              Fresh Flour, Every Time
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Powerful Performance</h3>
                <p className="text-gray-600">
                  High-efficiency motors deliver consistent grinding power for all types of grains, 
                  from wheat and rice to spices and pulses.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Built to Last</h3>
                <p className="text-gray-600">
                  Robust construction with premium materials ensures years of reliable service 
                  with minimal maintenance requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Safety First</h3>
                <p className="text-gray-600">
                  Advanced safety features including overload protection, secure locking mechanisms, 
                  and non-slip base for worry-free operation.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-8 text-white">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">⚙️</span>
                  </div>
                  <p className="text-orange-100">Premium Flour Mill</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mill Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Choose the Right Mill for Your Needs
            </h2>
            <p className="text-xl text-gray-600">
              From home kitchens to commercial operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Home Mills</h3>
              <p className="text-gray-600 mb-4">Perfect for family kitchens</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Compact design</li>
                <li>• Easy to use</li>
                <li>• Low noise operation</li>
                <li>• Easy cleaning</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center border-2 border-orange-500">
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
                Most Popular
              </div>
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Commercial Mills</h3>
              <p className="text-gray-600 mb-4">For small businesses and shops</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Higher capacity</li>
                <li>• Continuous operation</li>
                <li>• Durable construction</li>
                <li>• Professional grade</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Industrial Mills</h3>
              <p className="text-gray-600 mb-4">Heavy-duty for large operations</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• High capacity</li>
                <li>• 24/7 operation</li>
                <li>• Advanced features</li>
                <li>• Service support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grinding Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Can You Grind?
            </h2>
            <p className="text-xl text-gray-600">
              Versatile grinding for all your kitchen needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Wheat', icon: '🌾' },
              { name: 'Rice', icon: '🍚' },
              { name: 'Corn', icon: '🌽' },
              { name: 'Spices', icon: '🌶️' },
              { name: 'Pulses', icon: '🫘' },
              { name: 'Nuts', icon: '🥜' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
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
              Benefits of Fresh Ground Flour
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Freshness</h3>
              <p className="text-gray-600 text-sm">Grind fresh flour as needed for maximum nutrition</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cost Savings</h3>
              <p className="text-gray-600 text-sm">Save money by grinding your own flour at home</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality Control</h3>
              <p className="text-gray-600 text-sm">Control the fineness and quality of your flour</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Convenience</h3>
              <p className="text-gray-600 text-sm">Grind flour at home whenever you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Easy Maintenance Tips
            </h2>
            <p className="text-xl text-gray-600">
              Keep your flour mill running smoothly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Care</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Clean after each use</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Check for any grain residue</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Wipe exterior with dry cloth</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Periodic Maintenance</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Lubricate moving parts monthly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Check belt tension regularly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Professional service annually</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Grinding Fresh Flour?
          </h2>
          <p className="text-xl mb-8">
            Discover our range of flour mills and find the perfect one for your needs
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              See Demonstration
            </Link>
            <Link 
              href="/products" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
