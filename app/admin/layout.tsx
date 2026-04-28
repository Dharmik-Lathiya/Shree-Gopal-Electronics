import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, FileText, Users, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth'; // Ensure this works or use client-side signOut
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Basic role check
  if (!session || (session.user as any).role !== 'admin') {
     // For development/demo, you might want to comment this out or seed a user
     // redirect('/auth/login'); 
     // Un-comment the above line in real production
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/5 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/5">
           <h2 className="font-display font-bold text-xl text-white">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
            {[
                { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
                { name: 'Products', href: '/admin/products', icon: ShoppingBag },
                { name: 'Blogs', href: '/admin/blogs', icon: FileText },
                { name: 'Users', href: '/admin/users', icon: Users },
            ].map((item) => (
                <Link 
                    key={item.name} 
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors"
                >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                </Link>
            ))}
        </nav>

        <div className="p-4 border-t border-white/5">
             <form action={async () => {
                 'use server';
                 await signOut();
             }}>
                <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 w-full rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
             </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-[#111] border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
            <h1 className="font-bold text-white">Overview</h1>
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {(session?.user?.name?.[0] || 'A')}
                </div>
            </div>
        </header>
        <div className="p-6">
            {children}
        </div>
      </main>
    </div>
  );
}
