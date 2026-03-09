'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, X, FileText } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingBlog ? `/api/blogs/${editingBlog._id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const savePromise = fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl })
      }).then(res => {
        if (!res.ok) throw new Error('Failed to save blog');
        return res.json();
      });

      toast.promise(savePromise, {
        loading: editingBlog ? 'Updating blog...' : 'Publishing blog...',
        success: editingBlog ? 'Blog updated successfully!' : 'Blog published successfully!',
        error: 'Failed to save blog'
      });

      await savePromise;
      closeEditor();
      fetchBlogs();
    } catch (error) {
      // Error already handled by toast.promise
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setImageUrl(blog.imageUrl || '');
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    // Custom confirmation using toast
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">Are you sure you want to delete this blog post?</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performDelete(id);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const performDelete = async (id: string) => {
    const deletePromise = fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete blog');
        return res.json();
      });

    toast.promise(deletePromise, {
      loading: 'Deleting blog...',
      success: 'Blog deleted successfully!',
      error: 'Failed to delete blog'
    });

    try {
      await deletePromise;
      fetchBlogs();
    } catch (error) {
      // Error already handled by toast.promise
    }
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingBlog(null);
    setTitle('');
    setContent('');
    setImageUrl('');
    setShowPreview(false);
  };

  if (showEditor) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-display">
            {editingBlog ? 'Edit Blog Post' : 'Write a Blog Post'}
          </h2>
          <div className="flex gap-3">
            <Button onClick={() => setShowPreview(!showPreview)} variant="secondary" size="sm">
              <Eye size={16} /> {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button onClick={closeEditor} variant="secondary" size="sm">
              <X size={16} /> Cancel
            </Button>
          </div>
        </div>
        
        {showPreview ? (
          <div className="glass-card p-8 rounded-2xl">
            <h1 className="text-4xl font-bold mb-6">{title || 'Untitled Post'}</h1>
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-3xl font-bold placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            
            <ImageUpload
              label="Featured Image"
              value={imageUrl}
              onChange={setImageUrl}
              folder="blogs"
              aspectRatio="aspect-video"
            />
            
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here... (HTML supported)"
                required
                rows={20}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Tip: You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
              </p>
            </div>

            <Button disabled={loading} className="w-full md:w-auto">
              {loading ? 'Saving...' : editingBlog ? 'Update Post' : 'Publish Post'}
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-display">Manage Blogs</h2>
        <Button onClick={() => setShowEditor(true)} size="sm">
          <Plus size={16} /> Write New Post
        </Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-gray-400" />
                      <span className="font-medium">{blog.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit blog"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete blog"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    No blog posts yet. Write your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
