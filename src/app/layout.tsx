import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Jerry & Krista's Recipe Book",
  description: "A collection of our favorite family recipes — from quick weeknight dinners to weekend bakes.",
  openGraph: {
    title: "Jerry & Krista's Recipe Book",
    description: "A collection of our favorite family recipes.",
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFBF5' }}>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
