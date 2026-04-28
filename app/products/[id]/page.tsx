import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectToDatabase from "@/lib/db";
import Product from "@/lib/models/Product";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id } = await params;
  const product = await Product.findById(id);

  if (!product) return notFound();

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 font-display text-4xl font-bold">
                {product.category}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{product.title}</h1>
              {product.description && (
                <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="glass-card p-6 rounded-2xl space-y-3">
                <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-gray-400">{key}</span>
                    <span className="text-white font-medium">{value as string}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="pt-6">
              <a
                href="/contact"
                className="inline-block w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-center"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
