'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function BlogsAdmin() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
      });
      setLoading(false);
      toast.success('Blog Published Successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      setLoading(false);
      toast.error('Failed to publish blog');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold font-display mb-6">Write a Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
             type="text"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder="Post Title"
             required
             className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-3xl font-bold placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
        />
        
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here... (HTML supported)"
            required
            rows={15}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">Tip: You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, etc.</p>
        </div>

        <Button disabled={loading} className="w-full md:w-auto">
            {loading ? 'Publishing...' : 'Publish Post'}
        </Button>
      </form>
    </div>
  );
}
