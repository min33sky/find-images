import Gallery from '@/components/Gallery';
import { Metadata } from 'next';
import React from 'react';

interface Props {
  params: {
    search: (string | undefined)[];
  };
}

export function generateMetadata({ params: { search } }: Props): Metadata {
  const keyword = search?.[0] ?? 'curated';
  const page = search?.[1] ?? '1';

  return {
    title: `Results for ${keyword} - Page ${page}`,
  };
}

export default function SearchResultsPage({ params: { search } }: Props) {
  const keyword = search?.[0] ?? 'curated';
  const page = search?.[1] ?? '1';

  return <Gallery keyword={keyword} page={page} />;
}
