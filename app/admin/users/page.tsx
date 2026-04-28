import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getUsers() {
    await connectToDatabase();
    return await User.find({}).sort({ createdAt: -1 });
}

export default async function UsersAdmin() {
    const users = await getUsers();

    return (
        <div>
            <h2 className="text-2xl font-bold font-display mb-6">User Management</h2>
            
            <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Phone/Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user._id} className="border-t border-white/5 hover:bg-white/5">
                                <td className="p-4 font-medium">{user.name || 'N/A'}</td>
                                <td className="p-4 text-gray-400 text-sm">{user.email || user.phone}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                         {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
