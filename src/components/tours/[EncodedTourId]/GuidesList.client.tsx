'use client';
import React, { useRef, useState } from 'react';
import type { Guide } from '@/types/tour';

type Props = {
  guides: Guide[];
  initialVisible?: number;
};

export default function GuidesList({ guides, initialVisible = 3 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!guides || guides.length === 0) return null;

  const visible = expanded ? guides : guides.slice(0, initialVisible);

  function handleToggle() {
    setExpanded((prev) => {
      const next = !prev;
      if (!prev && containerRef.current) {
        // wait a tick so the content has rendered, then scroll into view
        setTimeout(() => containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
      }
      return next;
    });
  }

  return (
    <div className="bg-white p-4 rounded shadow" ref={containerRef}>
      <h4 className="text-sm font-semibold mb-2">Top guides</h4>

      <div className="space-y-3 mb-2">
        {visible.map((g) => (
          <div key={g.id} className="flex items-center gap-3 py-2">
            <img
              src={g.profileImage ?? '/placeholder-avatar.png'}
              alt={g.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-sm">{g.name}</div>
              <div className="text-xs text-slate-500">
                {g.experienceYears} yrs • {g.languages?.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {guides.length > initialVisible && (
        <button
          type="button"
          onClick={handleToggle}
          className="text-sm text-emerald-600 hover:underline mt-2"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : `See all guides (${guides.length})`}
        </button>
      )}
    </div>
  );
}
