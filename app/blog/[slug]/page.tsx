import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectToDatabase from "@/lib/db";
import Blog from "@/lib/models/Blog";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  const { slug } = await params;
  const blog = await Blog.findOne({ slug });

  if (!blog) return <div>Post not found</div>;

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      <article className="pt-32 pb-20 container mx-auto px-6 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
            {blog.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-400 mb-8 pb-8 border-b border-white/10">
            <span>By {blog.author}</span>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-blue-400"
            dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      <Footer />
    </main>
  );
}
