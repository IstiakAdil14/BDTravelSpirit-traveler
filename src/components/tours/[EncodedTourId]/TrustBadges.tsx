// app/tours/[EncodedTourId]/components/TrustBadges.tsx
import React from 'react';

type Badge = { id: string; title: string; description?: string; icon?: React.ReactNode };

type Props = { badges?: Badge[] };

export default function TrustBadges({ badges = [{ id: 'v1', title: 'Verified Operator' }, { id: 'v2', title: 'Secure Payment' }] }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <div key={b.id} className="text-xs bg-slate-100 px-3 py-1 rounded text-slate-700" title={b.description}>
          {b.icon ?? null} {b.title}
        </div>
      ))}
    </div>
  );
}
