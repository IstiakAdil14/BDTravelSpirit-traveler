import { NextRequest, NextResponse } from "next/server";
import { decodeTourId } from "@/utils/encodeTourId";
import { faker } from "@faker-js/faker";

// Mock data generator for reviews
function generateMockReviews(tourId: string, page: number, limit: number) {
  const reviews = [];
  const totalReviews = faker.number.int({ min: 50, max: 200 });

  // Generate rating distribution
  const ratingDistribution = {
    5: faker.number.int({ min: 20, max: 50 }),
    4: faker.number.int({ min: 15, max: 40 }),
    3: faker.number.int({ min: 10, max: 30 }),
    2: faker.number.int({ min: 5, max: 15 }),
    1: faker.number.int({ min: 2, max: 10 }),
  };

  // Generate reviews for current page
  for (let i = 0; i < limit; i++) {
    const rating = faker.helpers.weightedArrayElement([
      { weight: ratingDistribution[5], value: 5 },
      { weight: ratingDistribution[4], value: 4 },
      { weight: ratingDistribution[3], value: 3 },
      { weight: ratingDistribution[2], value: 2 },
      { weight: ratingDistribution[1], value: 1 },
    ]);

    reviews.push({
      id: faker.string.uuid(),
      rating,
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      comment: faker.lorem.paragraphs({ min: 1, max: 3 }),
      user: {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      images: faker.helpers.arrayElements(
        [
          faker.image.url({ width: 400, height: 300 }),
          faker.image.url({ width: 400, height: 300 }),
          faker.image.url({ width: 400, height: 300 }),
        ],
        { min: 0, max: 3 }
      ),
      tripType: faker.helpers.arrayElement(["solo", "couple", "family", "friends"]),
      travelDate: faker.date.past({ years: 2 }),
      isVerified: faker.datatype.boolean({ probability: 0.7 }),
      helpfulCount: faker.number.int({ min: 0, max: 50 }),
      replies: faker.helpers.arrayElements(
        [
          {
            employee: faker.person.fullName(),
            message: faker.lorem.sentences({ min: 1, max: 3 }),
            createdAt: faker.date.recent({ days: 30 }),
          },
        ],
        { min: 0, max: 2 }
      ),
      createdAt: faker.date.past({ years: 1 }),
    });
  }

  return {
    reviews,
    pagination: {
      page,
      limit,
      total: totalReviews,
      pages: Math.ceil(totalReviews / limit),
    },
    ratingDistribution,
  };
}

async function getReviewsHandler(request: NextRequest, { params }: { params: Promise<{ tourId: string }> }) {
  try {
    const { tourId } = await params;
    const decodedTourId = decodeTourId(tourId);

    if (!decodedTourId) {
      return NextResponse.json({ error: "Invalid tour ID" }, { status: 400 });
    }

    // Parse query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    // Generate mock data instead of database query
    const result = generateMockReviews(decodedTourId, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = getReviewsHandler;
