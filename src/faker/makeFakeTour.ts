import { faker } from "@faker-js/faker";
import connectToDatabase from "@/lib/mongo";
import { TourModel } from "@/models/tour.model";
import { TourReviewModel } from "@/models/tour_reviews.model";
import { TourFAQModel } from "@/models/tour_faqs.model";
import { TourGuideModel } from "@/models/tour_guides.model";
import { Types } from "mongoose";

async function makeFakeTour() {
  await connectToDatabase();

  // Clear existing data
  await Promise.all([
    TourModel.deleteMany({}),
    TourReviewModel.deleteMany({}),
    TourFAQModel.deleteMany({}),
    TourGuideModel.deleteMany({}),
  ]);

  // Create a fake tour
  const tour = new TourModel({
    title: faker.lorem.words(5),
    slug: faker.lorem.slug(),
    status: "published",
    summary: faker.lorem.paragraph(),
    heroImage: new Types.ObjectId(), // Fake ObjectId for asset
    gallery: [new Types.ObjectId(), new Types.ObjectId()],
    averageRating: 0,
    reviewCount: 0,
    authorId: new Types.ObjectId(), // Fake user ID
    publishedAt: new Date(),
  });

  await tour.save();

  // Generate 30-100 reviews
  const reviewCount = faker.number.int({ min: 30, max: 100 });
  const reviews = [];
  let totalRating = 0;

  for (let i = 0; i < reviewCount; i++) {
    const rating = faker.number.int({ min: 1, max: 5 });
    totalRating += rating;

    reviews.push({
      tourId: tour._id,
      author: faker.person.fullName(),
      rating,
      text: faker.lorem.paragraph(),
    });
  }

  await TourReviewModel.insertMany(reviews);

  // Update tour rating
  tour.averageRating = totalRating / reviewCount;
  tour.reviewCount = reviewCount;
  await tour.save();

  // Generate 10-20 FAQs
  const faqCount = faker.number.int({ min: 10, max: 20 });
  const faqs = [];

  for (let i = 0; i < faqCount; i++) {
    faqs.push({
      tourId: tour._id,
      question: faker.lorem.sentence(),
      answer: faker.lorem.paragraph(),
      helpful: faker.number.int({ min: 0, max: 100 }),
    });
  }

  await TourFAQModel.insertMany(faqs);

  // Generate 6 guides
  const guides = [];
  for (let i = 0; i < 6; i++) {
    guides.push({
      tourId: tour._id,
      guideId: new Types.ObjectId(),
      name: faker.person.fullName(),
      bio: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
      experience: `${faker.number.int({ min: 1, max: 10 })} years`,
    });
  }

  await TourGuideModel.insertMany(guides);

  console.log(`Seeded tour: ${tour._id}`);
  console.log(`Created ${reviewCount} reviews`);
  console.log(`Created ${faqCount} FAQs`);
  console.log(`Created 6 guides`);

  return tour._id;
}

export default makeFakeTour;

// For CLI usage
if (require.main === module) {
  makeFakeTour()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
