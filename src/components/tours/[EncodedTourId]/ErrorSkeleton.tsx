// app/tours/[EncodedTourId]/components/ErrorSkeleton.tsx
import React from 'react';

type Props = { message?: string; onRetry?: () => void };

export default function ErrorSkeleton({ message = 'Something went wrong. Please try again later.', onRetry }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <div className="text-xl font-semibold mb-2">Oops</div>
      <div className="text-sm text-slate-600 mb-4">{message}</div>
      {onRetry && <button onClick={onRetry} className="px-4 py-2 bg-emerald-600 text-white rounded">Retry</button>}
    </div>
  );
}
