import { Button } from '@/components/ui/button';
import { ImageOffIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <ImageOffIcon className="w-24 h-24" />
      <p className="font-bold text-lg">요청한 이미지를 찾을 수 없습니다.</p>
      <Button asChild>
        <Link href="/">메인으로</Link>
      </Button>
    </div>
  );
}
