import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-amber-400 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                JG
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Jay Gopal <span className="text-amber-400">Electronics</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Your premium destination for high-end electronics, expert repairs, and professional installation services. Quality you can trust.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 hover:scale-110 flex items-center justify-center transition-all text-white/60 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Products', 'Services', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-') === '/home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Our Services</h3>
            <ul className="space-y-4">
              {['TV Installation', 'AC Repair', 'Home Audio Setup', 'Appliance Maintenance', 'Custom Wiring'].map((item) => (
                <li key={item} className="text-gray-400 text-sm hover:text-white transition-colors cursor-default">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Visit Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 text-sm">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
                <span>123 Electronics Avenue, Tech District,<br />Gujarat, India 360001</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Phone size={20} className="text-blue-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Mail size={20} className="text-blue-500 shrink-0" />
                <span>contact@jaygopal.com</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <Clock size={20} className="text-blue-500 shrink-0" />
                <span>Mon - Sat: 10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Jay Gopal Electronics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
