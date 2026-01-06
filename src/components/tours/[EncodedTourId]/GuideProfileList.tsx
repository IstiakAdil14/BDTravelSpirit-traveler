// app/tours/[EncodedTourId]/components/GuideProfileList.tsx
import { Guide } from '@/types/tour';
import React from 'react';

type Props = { guides: Guide[]; showContact?: boolean };

export default function GuideProfileList({ guides, showContact = false }: Props) {
  return (
    <section id="guides" className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Your guides</h3>
      <ul className="space-y-3">
        {guides.map((g) => (
          <li key={g.id} className="flex items-center gap-3">
            <img src={g.profileImage} alt={g.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="font-medium">{g.name}</div>
              <div className="text-xs text-slate-500">{g.rating} • {g.experienceYears} yrs • {g.languages.join(', ')}</div>
            </div>
            {showContact && <a className="ml-auto text-sm text-emerald-600 hover:underline" href={`/guides/${g.id}`}>Contact</a>}
          </li>
        ))}
      </ul>
    </section>
  );
}
