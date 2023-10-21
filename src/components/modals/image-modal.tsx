'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { PexelImage } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

interface ImageModalProps {
  image: PexelImage;
}

export default function ImageModal({ image }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        router.back();
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-bold">
            {image.alt || 'Untitled'}
          </DialogTitle>
        </DialogHeader>
        <div className="relative w-[400px] h-[400px] rounded-xl overflow-hidden mx-auto">
          <Image
            src={image.src.large}
            alt={image.alt}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button variant={'link'} className="text-lg" asChild>
            <Link href={image.url} target="_blank" rel="noopener noreferrer">
              원본 이미지 링크
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
