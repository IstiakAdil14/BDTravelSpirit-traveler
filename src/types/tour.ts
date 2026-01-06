// src/types/tour.ts
export type ID = string;

export type TourSummary = {
  id: ID;
  encodedId: string;
  title: string;
  shortDescription: string;
  heroImage: string;
  priceFrom: number;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
};

export type Media = {
  url: string;
  type: 'image' | 'video';
  alt?: string;
  width?: number;
  height?: number;
};

export type ItineraryItem = {
  day: number;
  title: string;
  description: string;
  media?: Media[];
  location?: string;
  duration?: string;
  highlights?: string[];
};

export type TourFull = TourSummary & {
  slug: string;
  gallery: Media[];
  short: string;
  description: string; // HTML
  highlights: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  durationDays: number;
  location: { country: string; region?: string; coords?: { lat: number; lng: number } };
  hostGuideId?: ID;
  stats: { totalReviews: number; averageRating: number; participants: number };
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: ID;
  author: { id: ID; name: string; avatar?: string };
  rating: number;
  title?: string;
  body: string;
  createdAt: string;
};

export type FAQ = {
  id: ID;
  question: string;
  answer: string;
  likes: number;
  liked?: boolean;
};

export type Guide = {
  id: ID;
  name: string;
  rating: number;
  experienceYears: number;
  languages: string[];
  profileImage?: string;
};
