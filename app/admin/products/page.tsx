'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import { Trash2, Edit, Plus, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  title: string;
  category: string;
  description?: string;
  features?: string[];
  specifications?: Record<string, string>;
  imageUrl?: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    features: '',
    specifications: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description || undefined,
        features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(Boolean) : [],
        specifications: formData.specifications ? JSON.parse(formData.specifications) : {},
        imageUrl: formData.imageUrl || undefined
      };

      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const savePromise = fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(res => {
        if (!res.ok) throw new Error('Failed to save product');
        return res.json();
      });

      toast.promise(savePromise, {
        loading: editingProduct ? 'Updating product...' : 'Creating product...',
        success: editingProduct ? 'Product updated successfully!' : 'Product added successfully!',
        error: 'Failed to save product'
      });

      await savePromise;
      closeModal();
      fetchProducts();
    } catch (error: any) {
      // Error already handled by toast.promise
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      description: product.description || '',
      features: product.features?.join(', ') || '',
      specifications: product.specifications ? JSON.stringify(product.specifications, null, 2) : '',
      imageUrl: product.imageUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    // Custom confirmation using toast
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">Are you sure you want to delete this product?</p>
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
    const deletePromise = fetch(`/api/products/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete product');
        return res.json();
      });

    toast.promise(deletePromise, {
      loading: 'Deleting product...',
      success: 'Product deleted successfully!',
      error: 'Failed to delete product'
    });

    try {
      await deletePromise;
      fetchProducts();
    } catch (error) {
      // Error already handled by toast.promise
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      features: '',
      specifications: '',
      imageUrl: ''
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold font-display">Manage Products</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus size={16} /> Add Product
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Features</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{product.title}</td>
                  <td className="p-4 text-gray-400 text-sm">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {product.features?.length || 0} features
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    {searchTerm ? 'No products found matching your search.' : 'No products yet. Add your first product!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Product Name *</label>
                <input
                  type="text"
                  placeholder="e.g., LED TV 55 inch"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Category *</label>
                <input
                  type="text"
                  placeholder="e.g., Television, Refrigerator"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Description</label>
                <textarea
                  placeholder="Product description..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <ImageUpload
                label="Product Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder="products"
                aspectRatio="aspect-square"
              />
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Features (comma separated)</label>
                <textarea
                  placeholder="4K Display, Smart TV, HDR Support"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Specifications (JSON format)</label>
                <textarea
                  placeholder='{"Screen Size": "55 inches", "Resolution": "4K UHD"}'
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 font-mono text-sm focus:outline-none focus:border-blue-500"
                  rows={4}
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Enter valid JSON format</p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                <Button type="button" onClick={closeModal} variant="secondary" className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
