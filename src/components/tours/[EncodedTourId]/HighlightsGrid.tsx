// app/tours/[EncodedTourId]/components/HighlightsGrid.tsx
import React from 'react';

type Props = { highlights: string[]; theme?: 'compact'|'card' };

export default function HighlightsGrid({ highlights, theme = 'compact' }: Props) {
  return (
    <section className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Highlights</h3>
      <div className={`grid ${theme === 'compact' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'} gap-3 text-sm`}>
        {highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 text-emerald-600">•</div>
            <div>{h}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
