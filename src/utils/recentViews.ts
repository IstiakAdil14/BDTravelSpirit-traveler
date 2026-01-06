// src/utils/recentViews.ts
const KEY = 'recentViews_v1';
const MAX = 24;

export type RecentItem = {
  id: string;
  encodedId: string;
  title: string;
  heroImage?: string;
  priceFrom?: number;
};

export function getRecentViews(): RecentItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as RecentItem[]) : [];
  } catch {
    return [];
  }
}

export function saveRecentViews(items: RecentItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX)));
    // notify other listeners/tabs
    window.dispatchEvent(new CustomEvent('recent-views-updated'));
  } catch {}
}

export function addView(item: RecentItem) {
  try {
    const arr = getRecentViews().filter((x) => x.id !== item.id);
    arr.unshift(item);
    saveRecentViews(arr);
  } catch {}
}

export function clearViews() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent('recent-views-updated'));
  } catch {}
}
