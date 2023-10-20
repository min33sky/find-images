import './globals.css';
import Navbar from '@/components/navbar';
import type { Metadata } from 'next';

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: '이미지 찾기',
  description: 'find images from Pexels',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="h-full bg-slate-100">
        <Navbar />
        <main className={'h-full max-w-7xl mx-auto'}>{children}</main>
      </body>
    </html>
  );
}
