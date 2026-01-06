

// app/tours/[EncodedTourId]/components/PriceBreakdown.tsx
'use client';
import React, { useState } from 'react';

type Line = { label: string; amount: number };

type Props = { priceFrom: number; breakdown?: Line[]; currency?: string };

export default function PriceBreakdown({ priceFrom, breakdown = [], currency = 'USD' }: Props) {
  const [open, setOpen] = useState(false);
  const total = breakdown.reduce((s, b) => s + b.amount, priceFrom);

  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">Starting from</div>
          <div className="text-xl font-semibold">{new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(priceFrom)}</div>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="text-sm text-slate-600 px-3 py-1 rounded bg-slate-100">{open ? 'Hide' : 'Price details'}</button>
      </div>

      {open && (
        <div className="mt-3 text-sm text-slate-700">
          <ul className="space-y-1">
            {breakdown.map((b, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{b.label}</span>
                <span>{new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(b.amount)}</span>
              </li>
            ))}
            <li className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>{new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(total)}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
