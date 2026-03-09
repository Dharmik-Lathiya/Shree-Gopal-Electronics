'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    const sendOtpPromise = fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
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
        loading: 'Sending OTP to your email...',
        success: (data) => {
          if (data.devOTP) {
            return `OTP Sent! Dev OTP: ${data.devOTP}`;
          }
          return 'OTP sent to your email! Check your inbox.';
        },
        error: (err) => err.message || 'Failed to send OTP',
      },
      {
        success: {
          duration: 8000,
          icon: '📧',
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
        email,
        otp,
        redirect: false,
      });

      setLoading(false);

      if (result?.error) {
        toast.error(result.error || 'Invalid OTP. Please try again.');
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
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold font-display">
              {step === 'email' ? 'Login / Register' : 'Verify OTP'}
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              {step === 'email' 
                ? 'Enter your email to receive a one-time password' 
                : 'Enter the 6-digit code sent to your email'}
            </p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !isValidEmail(email)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                We'll send a 6-digit code to your email address. The code expires in 10 minutes.
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  required
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Sent to <span className="text-blue-400">{email}</span> • 
                  <button 
                    type="button" 
                    onClick={() => setStep('email')} 
                    className="text-blue-400 hover:underline ml-1"
                  >
                    Change
                  </button>
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
                onClick={() => { setStep('email'); setOtp(''); }}
                className="w-full py-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Back to Email
              </button>
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-center text-gray-400">
                  💡 Didn't receive the code? Check your spam folder or 
                  <button 
                    type="button"
                    onClick={() => { setStep('email'); handleSendOtp(new Event('submit') as any); }}
                    className="text-blue-400 hover:underline ml-1"
                  >
                    resend
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
