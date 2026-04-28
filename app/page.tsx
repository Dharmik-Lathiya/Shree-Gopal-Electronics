import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Truck, Wrench, Smartphone, Tv, Speaker, Fan } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />

      {/* Featured Categories */}
      <Section className="bg-[#0f0f0f]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Premium Collections</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our wide range of top-tier electronics from the world's best brands.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Smart TV", icon: Tv, desc: "4K & 8K OLED Displays" },
            { title: "Home Audio", icon: Speaker, desc: "Immersive Sound Systems" },
            { title: "Smart Home", icon: Smartphone, desc: "Connected Living" },
            { title: "Appliances", icon: Fan, desc: "Premium Home Comfort" }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl group hover:bg-white/5 cursor-pointer">
              <div className="w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-6">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{item.desc}</p>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                Box Open <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
              Why Choice <br />
              <span className="text-gradient">Jay Gopal Electronics?</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We don't just sell electronics; we provide a complete lifestyle upgrade. With over 15 years of experience, we guarantee the best prices, authentic products, and unmatched after-sales service.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: "100% Authentic Products", desc: "Direct partnerships with global brands." },
                { icon: Wrench, title: "Expert Installation", desc: "Certified technicians for perfect setup." },
                { icon: Truck, title: "Fast Delivery", desc: "Safe and secure shipping across Gujarat." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button href="/about" className="mt-4">Learn More About Us</Button>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 relative overflow-hidden glass-card">
              {/* Abstract decorative elements */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-0">
        <div className="bg-blue-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold font-display">Ready for an Upgrade?</h2>
            <p className="text-blue-100 text-lg">
              Visit our store today to experience the latest technology firsthand. Our experts are ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" className="bg-white text-slate-900 hover:bg-gray-100 hover:shadow-xl shadow-none">
                <span className="text-slate-900 font-bold">Get Directions</span>
              </Button>
              <Button href="/products" variant="outline" className="border-blue-400/30 hover:bg-blue-800 text-white">
                View Catalog
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
