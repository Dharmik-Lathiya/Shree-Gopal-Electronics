'use client';

import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TestAuthPage() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Auth Verification
        </h1>

        <div className="glass-card p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">Status</h2>
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white capitalize">
              {status}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">Session Data</h2>
            <pre className="bg-black/50 p-6 rounded-2xl border border-white/10 overflow-auto text-sm text-gray-300">
              {session ? JSON.stringify(session, null, 2) : 'No session active'}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-400">JWT Check</h2>
            <p className="text-gray-400">
              {session 
                ? 'JWT is working! The session data above is decoded from your JWT.' 
                : 'JWT is not active. Please sign in to verify.'}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
