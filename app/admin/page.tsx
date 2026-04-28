import { Users, ShoppingBag, FileText, TrendingUp } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import Product from '@/lib/models/Product';
import Blog from '@/lib/models/Blog';

// Mock data fetcher function
async function getStats() {
    await connectToDatabase();
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const blogCount = await Blog.countDocuments();
    
    return { userCount, productCount, blogCount };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Users" value={stats.userCount} icon={Users} color="bg-blue-500" />
        <StatsCard title="Products" value={stats.productCount} icon={ShoppingBag} color="bg-amber-500" />
        <StatsCard title="Blog Posts" value={stats.blogCount} icon={FileText} color="bg-green-500" />
      </div>
      
      {/* Recent Activity Mockup */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
        <p className="text-gray-500">No recent activity.</p>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shadow-lg`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-gray-400 text-sm">{title}</p>
                <h4 className="text-2xl font-bold font-display">{value}</h4>
            </div>
        </div>
    )
}
