'use client';

import { useState, useEffect } from 'react';
import { Shield, Trash2, Search, Download, Filter } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone?.includes(searchTerm)
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await res.json();
      // Handle new API format with pagination
      const usersList = data.users || data;
      setUsers(usersList);
      setFilteredUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    const updatePromise = fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    }).then(res => {
      if (!res.ok) throw new Error('Failed to update role');
      return res.json();
    });

    toast.promise(updatePromise, {
      loading: 'Updating user role...',
      success: 'User role updated successfully!',
      error: 'Failed to update user role'
    });

    try {
      await updatePromise;
      fetchUsers();
    } catch (error) {
      // Error already handled by toast.promise
    }
  };

  const handleDelete = async (userId: string) => {
    // Custom confirmation using toast
    const confirmToast = toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">Are you sure you want to delete this user?</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performDelete(userId);
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

  const performDelete = async (userId: string) => {
    const deletePromise = fetch(`/api/users/${userId}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete user');
        return res.json();
      });

    toast.promise(deletePromise, {
      loading: 'Deleting user...',
      success: 'User deleted successfully!',
      error: 'Failed to delete user'
    });

    try {
      await deletePromise;
      fetchUsers();
    } catch (error) {
      // Error already handled by toast.promise
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.size === 0) {
      toast.error('No users selected');
      return;
    }

    // Custom confirmation using toast
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">Are you sure you want to delete {selectedUsers.size} user(s)?</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performBulkDelete();
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
            >
              Delete All
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

  const performBulkDelete = async () => {
    setLoading(true);
    
    const bulkDeletePromise = Promise.all(
      Array.from(selectedUsers).map(id =>
        fetch(`/api/users/${id}`, { method: 'DELETE' })
          .then(res => {
            if (!res.ok) throw new Error('Failed to delete user');
            return res.json();
          })
      )
    );

    toast.promise(bulkDeletePromise, {
      loading: `Deleting ${selectedUsers.size} user(s)...`,
      success: `${selectedUsers.size} user(s) deleted successfully!`,
      error: 'Failed to delete some users'
    });

    try {
      await bulkDeletePromise;
      setSelectedUsers(new Set());
      fetchUsers();
    } catch (error) {
      // Error already handled by toast.promise
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u._id)));
    }
  };

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email/Phone', 'Role', 'Joined'];
    const rows = filteredUsers.map(u => [
      u.name || 'N/A',
      u.email || u.phone || 'N/A',
      u.role,
      new Date(u.createdAt).toLocaleDateString()
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Users exported to CSV!');
  };

  const exportToJSON = () => {
    const data = JSON.stringify(filteredUsers, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Users exported to JSON!');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold font-display">User Management</h2>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download size={16} /> CSV
          </Button>
          <Button onClick={exportToJSON} variant="outline" size="sm">
            <Download size={16} /> JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.size > 0 && (
        <div className="glass-card p-4 rounded-xl mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {selectedUsers.size} user(s) selected
          </span>
          <Button onClick={handleBulkDelete} variant="outline" size="sm" disabled={loading}>
            <Trash2 size={16} /> Delete Selected
          </Button>
        </div>
      )}

      {/* Users Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-blue-600"
                  />
                </th>
                <th className="p-4">Name</th>
                <th className="p-4">Email/Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user._id)}
                      onChange={() => toggleUserSelection(user._id)}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-blue-600"
                    />
                  </td>
                  <td className="p-4 font-medium">{user.name || 'N/A'}</td>
                  <td className="p-4 text-gray-400 text-sm">{user.email || user.phone}</td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin')}
                      className={`px-3 py-1 rounded-full text-xs font-bold border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        user.role === 'admin'
                          ? 'bg-amber-500/20 text-amber-500'
                          : 'bg-blue-500/20 text-blue-500'
                      }`}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    {searchTerm || roleFilter !== 'all'
                      ? 'No users found matching your filters.'
                      : 'No users found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="glass-card p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Admins</p>
          <p className="text-2xl font-bold text-amber-500">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Regular Users</p>
          <p className="text-2xl font-bold text-blue-500">
            {users.filter(u => u.role === 'user').length}
          </p>
        </div>
      </div>
    </div>
  );
}
