export type DestinationCategory = 'beach' | 'mountain' | 'cultural' | 'adventure' | 'urban' | 'nature';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  stats: {
    hotelCount: number;
    avgPrice: number;
    rating: number;
    reviewCount: number;
    popularityScore: number;
  };
  season: {
    bestSeason: string;
    months: string[];
  };
  tags: string[];
  category: DestinationCategory;
  featured: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface DestinationFilters {
  category?: DestinationCategory;
  sortBy?: 'popularity' | 'rating' | 'price';
  limit?: number;
  offset?: number;
}

export interface DestinationShowcaseProps {
  variant: 'hero' | 'strip' | 'grid' | 'featured';
  limit?: number;
  category?: DestinationCategory;
  sortBy?: 'popularity' | 'rating' | 'price';
  locale?: 'en' | 'bn';
}

export interface DestinationCardProps {
  destination: Destination;
  variant?: 'default' | 'loading';
  locale?: 'en' | 'bn';
  onClick?: (destination: Destination) => void;
}

export interface AnalyticsEvent {
  event: string;
  variant: string;
  destinationId: string;
  index: number;
  timestamp: number;
}
