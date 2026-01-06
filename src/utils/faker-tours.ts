import { faker } from '@faker-js/faker';
import type { TourFull, TourSummary, FAQ, Review, Guide } from '../types/tour';

// Seed for deterministic results
faker.seed(12345);

export function generateTour(id: string): TourFull {
  const title = faker.lorem.words(3);
  const shortDescription = faker.lorem.sentences(2);
  const heroImage = faker.image.url();
  const priceFrom = faker.number.int({ min: 100, max: 5000 });
  const rating = faker.number.float({ min: 3, max: 5, fractionDigits: 1 });

  const durationDays = faker.number.int({ min: 1, max: 14 });
  const totalReviews = faker.number.int({ min: 10, max: 500 });
  const groupSizeMin = faker.number.int({ min: 2, max: 10 });
  const groupSizeMax = faker.number.int({ min: groupSizeMin + 1, max: 20 });

  return {
    id,
    encodedId: Buffer.from(id).toString('base64url'),
    title,
    shortDescription,
    heroImage,
    priceFrom,
    rating,
    reviews: totalReviews,
    duration: `${durationDays} days`,
    groupSize: `${groupSizeMin}-${groupSizeMax} people`,
    slug: faker.helpers.slugify(title),
    gallery: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => ({
      url: faker.image.url(),
      type: 'image' as const,
      alt: faker.lorem.words(2),
    })),
    short: faker.lorem.sentences(3),
    description: faker.lorem.paragraphs(5),
    highlights: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => faker.lorem.sentence()),
    itinerary: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, (_, i) => ({
      day: i + 1,
      title: faker.lorem.words(2),
      description: faker.lorem.paragraph(),
    })),
    inclusions: Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () => faker.lorem.sentence()),
    exclusions: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.lorem.sentence()),
    durationDays,
    location: {
      country: faker.location.country(),
      region: faker.location.state(),
      coords: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
    },
    hostGuideId: faker.string.uuid(),
    stats: {
      totalReviews,
      averageRating: rating,
      participants: faker.number.int({ min: 50, max: 1000 }),
    },
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export function generateTours(count: number): TourSummary[] {
  return Array.from({ length: count }, () => {
    const id = faker.string.uuid();
    const tour = generateTour(id);
    return {
      id: tour.id,
      encodedId: tour.encodedId,
      title: tour.title,
      shortDescription: tour.shortDescription,
      heroImage: tour.heroImage,
      priceFrom: tour.priceFrom,
      rating: tour.rating,
      reviews: tour.reviews,
      duration: tour.duration,
      groupSize: tour.groupSize,
    };
  });
}

export function generateFAQs(tourId: string, count: number): FAQ[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    question: faker.lorem.sentence().replace('.', '?'),
    answer: faker.lorem.paragraph(),
    likes: faker.number.int({ min: 0, max: 100 }),
    liked: faker.datatype.boolean(),
  }));
}

export function generateReviews(tourId: string, count: number): Review[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
    rating: faker.number.int({ min: 1, max: 5 }),
    title: faker.lorem.words(3),
    body: faker.lorem.paragraphs(2),
    createdAt: faker.date.past().toISOString(),
  }));
}

export function generateGuides(count: number): Guide[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    experienceYears: faker.number.int({ min: 1, max: 20 }),
    languages: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.location.country()),
    profileImage: faker.image.avatar(),
  }));
}
