import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shree Gopal Electronics - Premium Home Electronics & Appliances",
  description: "Discover premium TVs, Home Theaters, Music Players, and Flour Mills at Shree Gopal Electronics. Quality electronics for modern homes in Junagadh, Gujarat.",
  keywords: "TV, Home Theater, Music Player, Flour Mill, Electronics, Junagadh, Gujarat, Appliances",
  authors: [{ name: "Shree Gopal Electronics" }],
  openGraph: {
    title: "Shree Gopal Electronics - Premium Home Electronics",
    description: "Quality electronics and appliances for modern homes",
    type: "website",
  },
  verification: {
    google: 'gqiz9wgVSaaX2rEB4UVkQZ6T2zPNG1c5Z2NDaykCnCo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
