import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import connectToDatabase from "@/lib/db";
import Blog from "@/lib/models/Blog";

async function getBlogs() {
  await connectToDatabase();
  return await Blog.find({ published: true }).sort({ createdAt: -1 });
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-12">
            Latest <span className="text-gradient">Insights</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
                <Link href={`/blog/${blog.slug}`} key={blog._id} className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform">
                    <div className="aspect-video bg-gray-800">
                        {/* Image placeholder */}
                    </div>
                    <div className="p-6">
                        <div className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                            {blog.title}
                        </h2>
                        <p className="text-gray-400 text-sm line-clamp-3">
                            Click to read more...
                        </p>
                    </div>
                </Link>
            ))}
            
            {blogs.length === 0 && (
                <div className="col-span-3 text-center py-20 bg-white/5 rounded-3xl">
                    <h3 className="text-xl font-bold text-gray-500">No posts yet. Check back soon!</h3>
                </div>
            )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
