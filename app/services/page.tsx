import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Settings, Truck, HeadphonesIcon } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Expert <span className="text-gradient">Services</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We go beyond selling products. Our team of certified experts ensures your appliances run perfectly for years to come.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
            { 
                icon: Wrench, 
                title: "Repair & Maintenance", 
                desc: "Quick and reliable repair services for all major electronics brands. We use genuine parts to ensure longevity." 
            },
            { 
                icon: Settings, 
                title: "Professional Installation", 
                desc: "Hassle-free installation for TVs, ACs, and home theater systems. We handle the wiring and setup so you don't have to." 
            },
            { 
                icon: Truck, 
                title: "Delivery & Relocation", 
                desc: "Safe transportation of your heavy appliances. Moving? We can help uninstall and reinstall at your new place." 
            },
            { 
                icon: HeadphonesIcon, 
                title: "Technical Support", 
                desc: "Confused about features? Our support team is available to guide you through the functionality of your new devices." 
            }
            ].map((service, i) => (
            <div key={i} className="glass-card p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-start group hover:bg-white/5 transition-colors">
                <div className="w-16 h-16 bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                    <service.icon size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{service.desc}</p>
                </div>
            </div>
            ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
