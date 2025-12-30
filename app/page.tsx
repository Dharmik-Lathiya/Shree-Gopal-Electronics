import { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export const metadata: Metadata = {
  title: 'Shree Gopal Electronics | Premium Electronics & Appliances in Junagadh, Gujarat',
  description: 'Transform your home with premium Smart TVs, Home Theater Systems, Music Players, and Commercial Flour Mills. Expert service, competitive prices, and 15+ years of trust in Junagadh, Gujarat.',
  keywords: 'electronics, smart tv, home theater, music players, flour mills, junagadh, gujarat, lathiya electronics',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProductShowcase />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
