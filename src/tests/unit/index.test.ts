import { vi } from "vitest";

// Mock mongoose
vi.mock("mongoose", () => ({
  Schema: vi.fn().mockImplementation(() => ({
    index: vi.fn(),
    Types: {
      ObjectId: vi.fn(),
    },
  })),
  model: vi.fn(),
  models: {},
  Model: vi.fn().mockImplementation((data) => ({
    ...data,
    find: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
  })),
  connect: vi.fn(),
  connection: {
    readyState: 1,
  },
}));

// Mock the models
vi.mock("@/models/tour.model");
vi.mock("@/models/tour_reviews.model");
vi.mock("@/models/tour_faqs.model");
vi.mock("@/models/tour_guides.model");
vi.mock("@/models/tour_reports.model");

// Import the mocked models
import { TourModel } from "@/models/tour.model";
import { TourReviewModel } from "@/models/tour_reviews.model";
import { TourFAQModel } from "@/models/tour_faqs.model";
import { TourGuideModel } from "@/models/tour_guides.model";
import { TourReportModel } from "@/models/tour_reports.model";

describe("Unit Tests", () => {
  describe("Tour Model", () => {
    test("should create a tour instance", () => {
      const tourData = {
        title: "Dhaka City Tour",
        slug: "dhaka-city-tour",
        summary: "Explore the vibrant capital of Bangladesh",
        heroImage: "hero.jpg",
        gallery: ["img1.jpg", "img2.jpg"],
        averageRating: 4.5,
        reviewCount: 25,
      };

      const tour = new TourModel(tourData);

      expect(tour.title).toBe("Dhaka City Tour");
      expect(tour.slug).toBe("dhaka-city-tour");
      expect(tour.averageRating).toBe(4.5);
    });

    test("should find tours by query", async () => {
      const mockTours = [
        {
          _id: "507f1f77bcf86cd799439011",
          title: "Dhaka City Tour",
          slug: "dhaka-city-tour",
          summary: "Explore the vibrant capital of Bangladesh",
          heroImage: "hero.jpg",
          gallery: ["img1.jpg", "img2.jpg"],
          averageRating: 4.5,
          reviewCount: 25,
        },
      ];

      TourModel.find = vi.fn().mockResolvedValue(mockTours);

      const tours = await TourModel.find({});

      expect(tours).toHaveLength(1);
      expect(tours[0].title).toBe("Dhaka City Tour");
    });
  });

  describe("Tour Review Model", () => {
    test("should create a review instance", () => {
      const reviewData = {
        tourId: "507f1f77bcf86cd799439011",
        author: "John Doe",
        rating: 5,
        text: "Amazing tour!",
        createdAt: new Date(),
      };

      const review = new TourReviewModel(reviewData);

      expect(review.author).toBe("John Doe");
      expect(review.rating).toBe(5);
      expect(review.text).toBe("Amazing tour!");
    });

    test("should find reviews by tourId", async () => {
      const mockReviews = [
        {
          _id: "507f1f77bcf86cd799439012",
          tourId: "507f1f77bcf86cd799439011",
          author: "John Doe",
          rating: 5,
          text: "Amazing tour!",
          createdAt: new Date(),
        },
      ];

      TourReviewModel.find = vi.fn().mockResolvedValue(mockReviews);

      const reviews = await TourReviewModel.find({ tourId: "507f1f77bcf86cd799439011" });

      expect(reviews).toHaveLength(1);
      expect(reviews[0].author).toBe("John Doe");
    });
  });

  describe("Tour FAQ Model", () => {
    test("should create a FAQ instance", () => {
      const faqData = {
        tourId: "507f1f77bcf86cd799439011",
        question: "How long is the tour?",
        answer: "It's 3 days long.",
        helpful: 15,
        createdAt: new Date(),
      };

      const faq = new TourFAQModel(faqData);

      expect(faq.question).toBe("How long is the tour?");
      expect(faq.answer).toBe("It's 3 days long.");
      expect(faq.helpful).toBe(15);
    });

    test("should find FAQs by tourId", async () => {
      const mockFAQs = [
        {
          _id: "507f1f77bcf86cd799439014",
          tourId: "507f1f77bcf86cd799439011",
          question: "How long is the tour?",
          answer: "It's 3 days long.",
          helpful: 15,
          createdAt: new Date(),
        },
      ];

      TourFAQModel.find = vi.fn().mockResolvedValue(mockFAQs);

      const faqs = await TourFAQModel.find({ tourId: "507f1f77bcf86cd799439011" });

      expect(faqs).toHaveLength(1);
      expect(faqs[0].question).toBe("How long is the tour?");
    });
  });

  describe("Tour Guide Model", () => {
    test("should create a guide instance", () => {
      const guideData = {
        tourId: "507f1f77bcf86cd799439011",
        guideId: "507f1f77bcf86cd799439016",
        name: "Ahmed Rahman",
        bio: "Experienced tour guide",
        rating: 4.8,
        experience: "5 years",
      };

      const guide = new TourGuideModel(guideData);

      expect(guide.name).toBe("Ahmed Rahman");
      expect(guide.rating).toBe(4.8);
      expect(guide.experience).toBe("5 years");
    });

    test("should find guides by tourId", async () => {
      const mockGuides = [
        {
          _id: "507f1f77bcf86cd799439015",
          tourId: "507f1f77bcf86cd799439011",
          guideId: "507f1f77bcf86cd799439016",
          name: "Ahmed Rahman",
          bio: "Experienced tour guide",
          rating: 4.8,
          experience: "5 years",
        },
      ];

      TourGuideModel.find = vi.fn().mockResolvedValue(mockGuides);

      const guides = await TourGuideModel.find({ tourId: "507f1f77bcf86cd799439011" });

      expect(guides).toHaveLength(1);
      expect(guides[0].name).toBe("Ahmed Rahman");
    });
  });

  describe("Tour Report Model", () => {
    test("should create a report instance", () => {
      const reportData = {
        tourId: "507f1f77bcf86cd799439011",
        issue: "Inappropriate content",
        details: "The tour description contains offensive language.",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const report = new TourReportModel(reportData);

      expect(report.issue).toBe("Inappropriate content");
      expect(report.details).toBe("The tour description contains offensive language.");
    });

    test("should find reports by tourId", async () => {
      const mockReports = [
        {
          _id: "507f1f77bcf86cd799439018",
          tourId: "507f1f77bcf86cd799439011",
          issue: "Inappropriate content",
          details: "The tour description contains offensive language.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      TourReportModel.find = vi.fn().mockResolvedValue(mockReports);

      const reports = await TourReportModel.find({ tourId: "507f1f77bcf86cd799439011" });

      expect(reports).toHaveLength(1);
      expect(reports[0].issue).toBe("Inappropriate content");
    });
  });
});
