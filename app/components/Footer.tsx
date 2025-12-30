import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl">Shree Gopal Electronics</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium home electronics and appliances. 
              Quality products for modern living.
            </p>
            <div className="text-gray-300">
              <p>Grampanchayat Shopping Center C-5</p>
              <p>Bhesan, Junagadh - 362020</p>
              <p>Gujarat, India</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/products/tv" className="text-gray-300 hover:text-white transition-colors">Televisions</Link></li>
              <li><Link href="/products/home-theater" className="text-gray-300 hover:text-white transition-colors">Home Theater</Link></li>
              <li><Link href="/products/music-player" className="text-gray-300 hover:text-white transition-colors">Music Players</Link></li>
              <li><Link href="/products/flour-mill" className="text-gray-300 hover:text-white transition-colors">Flour Mills</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Shree Gopal Electronics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
