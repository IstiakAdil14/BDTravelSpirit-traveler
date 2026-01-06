#!/usr/bin/env tsx

/**
 * Script to generate deterministic mock data for BD Travel Spirit
 * Run with: npx tsx scripts/generateMock.ts
 */

import { faker } from '@faker-js/faker';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Set seed for deterministic results
faker.seed(12345);

// Types
interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image: string;
  location: string;
  duration: string;
  rating: number;
  reviews: number;
  operator: string;
  validUntil: string;
}

interface Category {
  id: string;
  name: string;
  nameBn: string;
  icon: string;
  tripCount: number;
  description: string;
  color: string;
}

interface TourOperator {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  verified: boolean;
  experience: string;
  location: string;
}

interface RecommendedTrip {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
  operator: string;
  highlights: string[];
  category: string;
}

interface EditorialArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: number;
  category: string;
  image: string;
  views: number;
  location: string;
}

// Generate mock data
function generateDeals(): Deal[] {
  const locations = ['Cox\'s Bazar', 'Sylhet', 'Bandarban', 'Dhaka', 'Chittagong', 'Saint Martin\'s Island'];
  const operators = ['Bangladesh Tours Ltd', 'Local Explorer', 'Heritage Travels', 'Adventure BD', 'Cultural Journeys'];

  return Array.from({ length: 8 }, (_, i) => {
    const originalPrice = faker.number.int({ min: 3000, max: 15000 });
    const discountPercentage = faker.number.int({ min: 15, max: 40 });
    const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));

    return {
      id: `deal-${i + 1}`,
      title: faker.lorem.words({ min: 3, max: 6 }),
      description: faker.lorem.sentences(2),
      originalPrice,
      discountedPrice,
      discountPercentage,
      image: `/images/deals/deal-${i + 1}.jpg`,
      location: faker.helpers.arrayElement(locations),
      duration: `${faker.number.int({ min: 2, max: 7 })} Days`,
      rating: Number(faker.number.float({ min: 4.0, max: 5.0 }).toFixed(1)),
      reviews: faker.number.int({ min: 50, max: 500 }),
      operator: faker.helpers.arrayElement(operators),
      validUntil: faker.date.future().toISOString().split('T')[0],
    };
  });
}

function generateCategories(): Category[] {
  const categories = [
    { name: 'Beach Tours', nameBn: 'সৈকত ভ্রমণ', icon: '🏖️', color: 'bg-blue-500' },
    { name: 'Hill Tracking', nameBn: 'পাহাড় ট্র্যাকিং', icon: '🏔️', color: 'bg-green-500' },
    { name: 'Cultural Tours', nameBn: 'সাংস্কৃতিক ভ্রমণ', icon: '🏛️', color: 'bg-purple-500' },
    { name: 'Adventure Sports', nameBn: 'অ্যাডভেঞ্চার স্পোর্টস', icon: '🏃‍♂️', color: 'bg-orange-500' },
    { name: 'Wildlife Safari', nameBn: 'বন্যপ্রাণী সাফারি', icon: '🦌', color: 'bg-emerald-500' },
    { name: 'Tea Garden Tours', nameBn: 'চা বাগান ভ্রমণ', icon: '🍵', color: 'bg-teal-500' },
    { name: 'Historical Sites', nameBn: 'ঐতিহাসিক স্থান', icon: '🏰', color: 'bg-amber-500' },
    { name: 'Island Hopping', nameBn: 'দ্বীপ ভ্রমণ', icon: '🏝️', color: 'bg-cyan-500' },
  ];

  return categories.map((cat, i) => ({
    id: `cat-${i + 1}`,
    ...cat,
    tripCount: faker.number.int({ min: 50, max: 200 }),
    description: faker.lorem.sentences(1),
  }));
}

function generateOperators(): TourOperator[] {
  const specialties = [
    'Beach Tours', 'Hill Tracking', 'Cultural Tours', 'Adventure Sports',
    'Wildlife Safari', 'Tea Gardens', 'Historical Sites', 'Island Tours'
  ];

  return Array.from({ length: 6 }, (_, i) => ({
    id: `op-${i + 1}`,
    name: faker.company.name() + ' Tours',
    logo: `/images/operators/op-${i + 1}.png`,
    rating: Number(faker.number.float({ min: 4.2, max: 5.0 }).toFixed(1)),
    reviewCount: faker.number.int({ min: 100, max: 1000 }),
    specialties: faker.helpers.arrayElements(specialties, { min: 2, max: 4 }),
    verified: faker.datatype.boolean({ probability: 0.8 }),
    experience: `${faker.number.int({ min: 5, max: 15 })} years`,
    location: faker.helpers.arrayElement(['Dhaka', 'Chittagong', 'Sylhet', 'Cox\'s Bazar']),
  }));
}

function generateRecommendedTrips(): RecommendedTrip[] {
  const locations = [
    'Cox\'s Bazar Beach', 'Sylhet Tea Gardens', 'Bandarban Hills',
    'Dhaka Old Town', 'Chittagong Hill Tracts', 'Saint Martin\'s Island'
  ];
  const categories = ['Beach', 'Adventure', 'Cultural', 'Nature', 'Historical'];

  return Array.from({ length: 12 }, (_, i) => {
    const hasDiscount = faker.datatype.boolean({ probability: 0.3 });
    const originalPrice = faker.number.int({ min: 2500, max: 12000 });
    const price = hasDiscount
      ? Math.round(originalPrice * faker.number.float({ min: 0.7, max: 0.9 }))
      : originalPrice;

    return {
      id: `trip-${i + 1}`,
      title: faker.lorem.words({ min: 4, max: 8 }),
      location: faker.helpers.arrayElement(locations),
      price,
      originalPrice: hasDiscount ? originalPrice : undefined,
      rating: Number(faker.number.float({ min: 4.0, max: 5.0 }).toFixed(1)),
      reviewCount: faker.number.int({ min: 20, max: 300 }),
      duration: `${faker.number.int({ min: 1, max: 5 })} Days`,
      image: `/images/trips/trip-${i + 1}.jpg`,
      operator: faker.company.name() + ' Tours',
      highlights: Array.from({ length: 3 }, () => faker.lorem.words({ min: 2, max: 4 })),
      category: faker.helpers.arrayElement(categories),
    };
  });
}

function generateEditorialContent(): EditorialArticle[] {
  const categories = ['Travel Tips', 'Local Culture', 'Adventure Stories', 'Hidden Gems', 'Food & Cuisine'];
  const locations = ['Dhaka', 'Cox\'s Bazar', 'Sylhet', 'Bandarban', 'Chittagong'];

  return Array.from({ length: 6 }, (_, i) => ({
    id: `article-${i + 1}`,
    title: faker.lorem.words({ min: 6, max: 12 }),
    excerpt: faker.lorem.sentences(2),
    author: faker.person.fullName(),
    publishDate: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    readTime: faker.number.int({ min: 3, max: 8 }),
    category: faker.helpers.arrayElement(categories),
    image: `/images/articles/article-${i + 1}.jpg`,
    views: faker.number.int({ min: 500, max: 5000 }),
    location: faker.helpers.arrayElement(locations),
  }));
}

// Generate and save data
function generateMockData() {
  const mockData = {
    DEALS: generateDeals(),
    CATEGORIES: generateCategories(),
    TOUR_OPERATORS: generateOperators(),
    RECOMMENDED_TRIPS: generateRecommendedTrips(),
    EDITORIAL_CONTENT: generateEditorialContent(),
  };

  // Ensure data directory exists
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Write to file
  const filePath = join(dataDir, 'mockData.ts');
  const content = `// Auto-generated mock data - Do not edit manually
// Generated on: ${new Date().toISOString()}
// Run 'npx tsx scripts/generateMock.ts' to regenerate

export const DEALS = ${JSON.stringify(mockData.DEALS, null, 2)};

export const CATEGORIES = ${JSON.stringify(mockData.CATEGORIES, null, 2)};

export const TOUR_OPERATORS = ${JSON.stringify(mockData.TOUR_OPERATORS, null, 2)};

export const RECOMMENDED_TRIPS = ${JSON.stringify(mockData.RECOMMENDED_TRIPS, null, 2)};

export const EDITORIAL_CONTENT = ${JSON.stringify(mockData.EDITORIAL_CONTENT, null, 2)};
`;

  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Mock data generated successfully at ${filePath}`);
  console.log(`📊 Generated ${mockData.DEALS.length} deals, ${mockData.CATEGORIES.length} categories, ${mockData.TOUR_OPERATORS.length} operators, ${mockData.RECOMMENDED_TRIPS.length} trips, ${mockData.EDITORIAL_CONTENT.length} articles`);
}

// Run if called directly
if (require.main === module) {
  generateMockData();
}

export { generateMockData };
