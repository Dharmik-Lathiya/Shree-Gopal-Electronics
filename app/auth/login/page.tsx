'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone.length < 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    setLoading(true);
    
    const sendOtpPromise = fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    }).then(async (response) => {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }
      
      setStep('otp');
      setLoading(false);
      
      return data;
    }).catch((error) => {
      setLoading(false);
      throw error;
    });

    toast.promise(
      sendOtpPromise,
      {
        loading: 'Sending OTP...',
        success: (data) => {
          if (data.devOtp) {
            return `OTP Sent! Dev OTP: ${data.devOtp}`;
          }
          return 'OTP sent to your phone!';
        },
        error: (err) => err.message || 'Failed to send OTP',
      },
      {
        success: {
          duration: 8000,
          icon: '📱',
        },
        error: {
          duration: 4000,
        },
      }
    );
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await signIn('credentials', {
        phone,
        otp,
        redirect: false,
      });

      setLoading(false);

      if (result?.error) {
        toast.error('Invalid OTP. Please try 123456');
      } else {
        toast.success('Login successful! Redirecting...', {
          icon: '✅',
        });
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-md glass-card p-8 rounded-2xl">
          <h2 className="text-2xl font-bold font-display mb-6 text-center">
            {step === 'phone' ? 'Login / Register' : 'Verify OTP'}
          </h2>

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit phone number"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Sent to {phone} • <button type="button" onClick={() => setStep('phone')} className="text-blue-400 hover:underline">Change</button>
                </p>
              </div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => { setStep('phone'); setOtp(''); }}
                className="w-full py-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Back to Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
