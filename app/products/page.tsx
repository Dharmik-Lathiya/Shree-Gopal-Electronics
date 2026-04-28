import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import connectToDatabase from "@/lib/db";
import Product from "@/lib/models/Product";

async function getProducts() {
  await connectToDatabase();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return products.map(p => ({
    _id: p._id.toString(),
    title: p.title,
    category: p.category,
    features: p.features,
    imageUrl: p.imageUrl
  }));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-16 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
          Our <span className="text-gradient">Collection</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg mb-12">
          Explore our range of premium electronics carefully selected for performance and reliability.
        </p>

        {/* Categories (Simple Filter UI - Visual only for now) */}
        <div className="flex flex-wrap gap-4 mb-12">
          {['All', 'Smart TV', 'Audio', 'Appliances', 'Accessories'].map((cat, i) => (
            <button 
              key={cat}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                i === 0 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available yet.</p>
            <p className="text-gray-600 text-sm mt-2">Add products from the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
