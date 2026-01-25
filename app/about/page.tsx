import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Users, History, Award, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Decades of Trust <br />
            <span className="text-gradient">& Excellence</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Jay Gopal Electronics has been a cornerstone of quality technology in Gujarat for over 15 years. 
            We started with a simple mission: to bring the world's best technology to your doorstep with 
            unmatched service and integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: History, title: "Est. 2008", desc: "Serving our community for over 15 years with consistent quality." },
            { icon: Users, title: "10k+ Happy Customers", desc: "Building relationships that last beyond the sale." },
            { icon: Award, title: "Premium Brands", desc: "Authorized dealers for Sony, Samsung, LG, and more." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mb-6">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <Section className="py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-[#111] p-10 md:p-16 rounded-3xl border border-white/5">
             <div className="space-y-6">
                <h2 className="text-3xl font-bold font-display">Our Mission</h2>
                <p className="text-gray-400 leading-relaxed">
                  We believe that technology should enhance your life, not complicate it. That's why we focus heavily on:
                </p>
                <ul className="space-y-4">
                  {[
                    "Honest Advice: We recommend what you need, not just what's expensive.",
                    "After-Sales Support: Our relationship doesn't end at the checkout.",
                    "Quality Assurance: We only stock products we would use ourselves."
                  ].map((point, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
             </div>
             <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                <span className="text-gray-600 font-display text-xl">Store Interior Showreel</span>
             </div>
          </div>
        </Section>
      </div>

      <Footer />
    </main>
  );
}
