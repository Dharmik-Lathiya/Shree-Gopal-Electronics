import { Users, ShoppingBag, FileText, TrendingUp, Activity, Calendar } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import Product from '@/lib/models/Product';
import Blog from '@/lib/models/Blog';
import Link from 'next/link';

async function getStats() {
  await connectToDatabase();
  
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    totalProducts,
    totalBlogs,
    newUsersThisMonth,
    newProductsThisWeek,
    recentUsers,
    recentProducts,
    recentBlogs
  ] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Blog.countDocuments(),
    User.countDocuments({ createdAt: { $gte: lastMonth } }),
    Product.countDocuments({ createdAt: { $gte: lastWeek } }),
    User.find().sort({ createdAt: -1 }).limit(5).select('name email phone createdAt'),
    Product.find().sort({ createdAt: -1 }).limit(5).select('title category createdAt'),
    Blog.find().sort({ createdAt: -1 }).limit(5).select('title createdAt')
  ]);

  return {
    totalUsers,
    totalProducts,
    totalBlogs,
    newUsersThisMonth,
    newProductsThisWeek,
    recentUsers,
    recentProducts,
    recentBlogs
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          change={`+${stats.newUsersThisMonth} this month`}
          icon={Users}
          color="bg-blue-500"
          trend="up"
        />
        <StatsCard
          title="Products"
          value={stats.totalProducts}
          change={`+${stats.newProductsThisWeek} this week`}
          icon={ShoppingBag}
          color="bg-amber-500"
          trend="up"
        />
        <StatsCard
          title="Blog Posts"
          value={stats.totalBlogs}
          change="Published"
          icon={FileText}
          color="bg-green-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Activity size={20} className="text-blue-400" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
          >
            <ShoppingBag size={24} className="text-amber-500 mb-2" />
            <h4 className="font-medium">Add Product</h4>
            <p className="text-sm text-gray-400">Create new product listing</p>
          </Link>
          <Link
            href="/admin/blogs"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
          >
            <FileText size={24} className="text-green-500 mb-2" />
            <h4 className="font-medium">Write Blog</h4>
            <p className="text-sm text-gray-400">Publish a new blog post</p>
          </Link>
          <Link
            href="/admin/users"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
          >
            <Users size={24} className="text-blue-500 mb-2" />
            <h4 className="font-medium">Manage Users</h4>
            <p className="text-sm text-gray-400">View and edit user roles</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Users size={20} className="text-blue-400" />
            Recent Users
          </h3>
          <div className="space-y-3">
            {stats.recentUsers.map((user: any) => (
              <div key={user._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium">{user.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-400">{user.email || user.phone}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {stats.recentUsers.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No recent users</p>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-400" />
            Recent Products
          </h3>
          <div className="space-y-3">
            {stats.recentProducts.map((product: any) => (
              <div key={product._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-xs text-gray-400">{product.category}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {stats.recentProducts.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No recent products</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Blogs */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <FileText size={20} className="text-green-400" />
          Recent Blog Posts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.recentBlogs.map((blog: any) => (
            <div key={blog._id} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-medium mb-2 line-clamp-2">{blog.title}</h4>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={12} />
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {stats.recentBlogs.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4 col-span-full">No blog posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, icon: Icon, color, trend }: any) {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp size={14} className={trend === 'down' ? 'rotate-180' : ''} />
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <h4 className="text-3xl font-bold font-display mb-1">{value}</h4>
        <p className="text-xs text-gray-500">{change}</p>
      </div>
    </div>
  );
}
