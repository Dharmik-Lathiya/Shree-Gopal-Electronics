import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products - Shree Gopal Electronics | TVs, Home Theater, Music Players & More',
  description: 'Browse our complete range of electronics including Smart TVs, Home Theater Systems, Music Players, and Flour Mills. Quality products for every home.',
};

export default function Products() {
  const productCategories = [
    {
      title: 'Smart TVs',
      description: 'Experience entertainment like never before with our range of smart televisions',
      icon: '📺',
      features: ['4K Ultra HD Resolution', 'Smart OS Integration', 'HDR Support', 'Multiple Connectivity Options'],
      href: '/products/tv'
    },
    {
      title: 'Home Theater Systems',
      description: 'Transform your living room into a cinema with premium sound systems',
      icon: '🎵',
      features: ['Surround Sound', 'Wireless Connectivity', 'Multiple Input Options', 'Remote Control'],
      href: '/products/home-theater'
    },
    {
      title: 'Music Players',
      description: 'High-fidelity audio players for the ultimate music experience',
      icon: '🎧',
      features: ['High-Quality Audio', 'Bluetooth Connectivity', 'Long Battery Life', 'Portable Design'],
      href: '/products/music-player'
    },
    {
      title: 'Flour Mills',
      description: 'Efficient and durable flour mills for home and commercial use',
      icon: '⚙️',
      features: ['High Efficiency Motor', 'Easy to Clean', 'Durable Construction', 'Safety Features'],
      href: '/products/flour-mill'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of premium electronics and appliances, 
            carefully selected to enhance your modern lifestyle.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {productCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-5xl mr-4">{category.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {category.title}
                      </h2>
                      <p className="text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h3>
                    <ul className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    href={category.href}
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Details
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Our Products?
            </h2>
            <p className="text-xl text-gray-600">
              We carefully select only the best products for our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Carefully Selected</h3>
              <p className="text-gray-600">Every product is chosen for quality and reliability</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Latest Technology</h3>
              <p className="text-gray-600">Modern features and cutting-edge technology</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest materials and construction</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Reliable Support</h3>
              <p className="text-gray-600">Comprehensive support and guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-xl mb-8">
            Our experts are here to help you find the perfect electronics for your needs
          </p>
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Expert Advice
          </Link>
        </div>
      </section>
    </div>
  );
}
