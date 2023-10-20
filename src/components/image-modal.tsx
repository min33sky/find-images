'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { PexelImage } from '@/lib/types';
import Image from 'next/image';

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>이미지 모달</DialogTitle>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={image.src.large}
              alt={image.alt}
              fill
              // width={image.width}
              // height={image.height}
              // sizes="250px"
              // placeholder="blur"
              // blurDataURL={photo.blurredDataUrl}
              className=" object-cover"
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
