'use client';

import { useState, useEffect } from 'react';
import { Activity, Filter, Download, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface ActivityLog {
  _id: string;
  userName?: string;
  userEmail?: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout';
  resource: 'product' | 'blog' | 'user' | 'auth';
  resourceId?: string;
  details?: string;
  createdAt: string;
}

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [resourceFilter, setResourceFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    let filtered = logs;

    if (resourceFilter !== 'all') {
      filtered = filtered.filter(log => log.resource === resourceFilter);
    }

    if (actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action === actionFilter);
    }

    setFilteredLogs(filtered);
  }, [resourceFilter, actionFilter, logs]);

  const fetchLogs = async () => {
    setLoading(true);
    
    const fetchPromise = fetch('/api/activity-logs?limit=100')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch logs');
        return res.json();
      });

    toast.promise(fetchPromise, {
      loading: 'Loading activity logs...',
      success: 'Activity logs loaded!',
      error: 'Failed to fetch activity logs'
    });

    try {
      const data = await fetchPromise;
      setLogs(data);
      setFilteredLogs(data);
    } catch (error) {
      // Error already handled by toast.promise
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'text-green-500 bg-green-500/10';
      case 'update': return 'text-blue-500 bg-blue-500/10';
      case 'delete': return 'text-red-500 bg-red-500/10';
      case 'login': return 'text-purple-500 bg-purple-500/10';
      case 'logout': return 'text-gray-500 bg-gray-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getResourceIcon = (resource: string) => {
    const icons: any = {
      product: '📦',
      blog: '📝',
      user: '👤',
      auth: '🔐'
    };
    return icons[resource] || '📋';
  };

  const exportToCSV = () => {
    const headers = ['Date', 'User', 'Action', 'Resource', 'Details'];
    const rows = filteredLogs.map(log => [
      new Date(log.createdAt).toLocaleString(),
      log.userName || log.userEmail || 'Unknown',
      log.action,
      log.resource,
      log.details || ''
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Activity logs exported!');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Activity className="text-blue-400" size={28} />
          <h2 className="text-2xl font-bold font-display">Activity Logs</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchLogs} variant="outline" size="sm" disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </Button>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download size={16} /> Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Resources</option>
            <option value="product">Products</option>
            <option value="blog">Blogs</option>
            <option value="user">Users</option>
            <option value="auth">Authentication</option>
          </select>
        </div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="login">Login</option>
          <option value="logout">Logout</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="glass-card p-4 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Total</p>
          <p className="text-2xl font-bold">{logs.length}</p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Creates</p>
          <p className="text-2xl font-bold text-green-500">
            {logs.filter(l => l.action === 'create').length}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Updates</p>
          <p className="text-2xl font-bold text-blue-500">
            {logs.filter(l => l.action === 'update').length}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Deletes</p>
          <p className="text-2xl font-bold text-red-500">
            {logs.filter(l => l.action === 'delete').length}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Logins</p>
          <p className="text-2xl font-bold text-purple-500">
            {logs.filter(l => l.action === 'login').length}
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="p-4">Time</th>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Resource</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log._id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 text-sm text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-sm">{log.userName || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{log.userEmail}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-sm">
                      <span>{getResourceIcon(log.resource)}</span>
                      <span className="capitalize">{log.resource}</span>
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 max-w-md truncate">
                    {log.details || '-'}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    {loading ? 'Loading...' : 'No activity logs found.'}
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
