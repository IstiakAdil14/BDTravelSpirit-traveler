// src/stores/recentViews.ts
'use client';
import { TourSummary } from '@/types/tour';
import { create } from 'zustand';
const KEY = 'recentViews_v1';

type State = {
  views: TourSummary[];
  addRecentView: (t: TourSummary) => void;
  getRecentViews: () => TourSummary[];
  clear: () => void;
};

const read = (): TourSummary[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as TourSummary[];
  } catch {
    return [];
  }
};

const useStore = create<State>((set, get) => ({
  views: read(),
  addRecentView: (t) => {
    const cur = get().getRecentViews().filter((v) => v.id !== t.id);
    const next = [t, ...cur].slice(0, 8);
    localStorage.setItem(KEY, JSON.stringify(next));
    set({ views: next });
  },
  getRecentViews: () => read(),
  clear: () => {
    localStorage.removeItem(KEY);
    set({ views: [] });
  }
}));

export default function useRecentViews() {
  return {
    addRecentView: useStore((s) => s.addRecentView),
    getRecentViews: useStore((s) => s.getRecentViews),
    clear: useStore((s) => s.clear),
    subscribe: useStore.subscribe
  };
}
