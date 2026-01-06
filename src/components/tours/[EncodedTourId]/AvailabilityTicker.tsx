// app/tours/[EncodedTourId]/components/AvailabilityTicker.tsx
'use client';
import React, { useEffect, useState } from 'react';

type Props = { nextDepartures?: string[]; seatsLeft?: number };

export default function AvailabilityTicker({ nextDepartures = [], seatsLeft }: Props) {
  useEffect(() => {
    // Interval for potential future use, but currently not using 'now'
  }, []);

  const next = nextDepartures[0];
  return (
    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded text-sm text-emerald-800">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{next ? `Next departure: ${new Date(next).toLocaleDateString()}` : 'No upcoming dates'}</div>
          {typeof seatsLeft === 'number' && <div className="text-xs text-emerald-700 mt-1">{seatsLeft <= 5 ? `Only ${seatsLeft} spots left` : `${seatsLeft} seats available`}</div>}
        </div>
        <div className="text-xs">{next ? 'Book soon' : 'Check dates'}</div>
      </div>
    </div>
  );
}
