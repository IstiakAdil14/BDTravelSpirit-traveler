// app/tours/[EncodedTourId]/components/PoliciesBlock.tsx
import React from 'react';

type Props = { cancellationPolicy?: string; importantNotes?: string[] };

export default function PoliciesBlock({ cancellationPolicy, importantNotes = [] }: Props) {
  return (
    <section className="bg-white p-4 rounded shadow">
      <h4 className="text-lg font-semibold mb-2">Policies & Important information</h4>
      <div className="text-sm text-slate-700">
        {cancellationPolicy ? <p className="mb-2">{cancellationPolicy}</p> : <p className="mb-2">Cancellation policy varies by operator.</p>}
        {importantNotes.length > 0 && (
          <>
            <h5 className="font-medium">Important</h5>
            <ul className="list-disc pl-5 mt-2">
              {importantNotes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
