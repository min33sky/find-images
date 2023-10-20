import { LoaderIcon } from 'lucide-react';
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <LoaderIcon className="w-20 h-20 animate-spin text-primary" />
    </div>
  );
}
