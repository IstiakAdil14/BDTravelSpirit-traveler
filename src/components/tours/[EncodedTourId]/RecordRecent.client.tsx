// src/app/tours/[EncodedTourId]/components/RecordRecent.client.tsx
'use client';
import { useEffect } from 'react';
import { addView, type RecentItem } from '@/utils/recentViews';

export default function RecordRecent({ item }: { item: RecentItem }) {
  useEffect(() => {
    addView(item);
  }, [item.id]); // run on mount / when id changes
  return null;
}
