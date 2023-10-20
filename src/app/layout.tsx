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
      <body className="h-full">
        <Navbar />
        <main className={'h-full max-w-7xl mx-auto mt-24'}>{children}</main>
      </body>
    </html>
  );
}
