'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Trash2, Edit, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      title: '', category: '', features: '', imageUrl: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                features: formData.features.split(',').map(f => f.trim())
            })
        });
        toast.success('Product added successfully!');
        setIsModalOpen(false);
        setFormData({ title: '', category: '', features: '', imageUrl: '' });
        fetchProducts();
      } catch (error) {
        toast.error('Failed to add product');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-display">Manage Products</h2>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus size={16} /> Add Product
        </Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400">
                <tr>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product: any) => (
                    <tr key={product._id} className="border-t border-white/5 hover:bg-white/5">
                        <td className="p-4 font-medium">{product.title}</td>
                        <td className="p-4 text-gray-400 text-sm">{product.category}</td>
                        <td className="p-4 flex gap-2 justify-end">
                            <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg">
                                <Edit size={16} />
                            </button>
                            <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                                <Trash2 size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="glass-card w-full max-w-lg p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Add New Product</h3>
                      <button onClick={() => setIsModalOpen(false)}><X /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Product Name" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="Category" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      />
                      <input 
                        type="url" 
                        placeholder="Image URL (optional)" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      />
                      <textarea 
                        placeholder="Features (comma separated)" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2"
                        rows={3}
                        value={formData.features}
                        onChange={(e) => setFormData({...formData, features: e.target.value})}
                      />
                      <Button className="w-full" disabled={loading}>
                          {loading ? 'Saving...' : 'Create Product'}
                      </Button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}
