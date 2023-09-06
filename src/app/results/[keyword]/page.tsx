import Gallery from '@/components/Gallery';
import { Metadata } from 'next';
import React from 'react';

interface Props {
  params: {
    keyword: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Search Results for ${params.keyword}`,
  };
}

export default function SearchResultsPage({ params: { keyword } }: Props) {
  return <Gallery keyword={keyword} />;
}
