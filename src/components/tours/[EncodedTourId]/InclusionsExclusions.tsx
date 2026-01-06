// app/tours/[EncodedTourId]/components/InclusionsExclusions.tsx
import React from 'react';

type Props = { inclusions: string[]; exclusions: string[] };

export default function InclusionsExclusions({ inclusions, exclusions }: Props) {
  return (
    <section className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold mb-2">What's included</h4>
        <ul className="list-disc pl-5 text-sm text-slate-700">
          {inclusions.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-2">What's not included</h4>
        <ul className="list-disc pl-5 text-sm text-slate-700">
          {exclusions.map((e, idx) => <li key={idx}>{e}</li>)}
        </ul>
      </div>
    </section>
  );
}
