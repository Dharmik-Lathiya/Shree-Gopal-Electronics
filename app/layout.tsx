import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/AuthProvider';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jay Gopal Electronics | Premium Electronics & Service",
  description: "Your trusted destination for premium electronics, professional installation, and expert repairs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#0a0a0a] text-[#ededed] min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster position="top-right" />
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
