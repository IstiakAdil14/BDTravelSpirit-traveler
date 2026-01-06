import { NextRequest } from "next/server";
import { vi } from "vitest";

// Mock the database and models
vi.mock("@/lib/mongo");
vi.mock("@/models/tour.model");
vi.mock("@/models/tour_reviews.model");
vi.mock("@/models/tour_faqs.model");
vi.mock("@/models/tour_guides.model");
vi.mock("@/models/tour_reports.model");

// Mock next/cache
vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

// Import the mocked models
import { TourModel } from "@/models/tour.model";
import { TourReviewModel } from "@/models/tour_reviews.model";
import { TourFAQModel } from "@/models/tour_faqs.model";
import { TourGuideModel } from "@/models/tour_guides.model";

describe("Integration Tests", () => {
  describe("Tour Details API Routes", () => {
    test("GET /tours/[tourId] should return tour metadata", async () => {
      // Mock the TourModel
      const mockTour = {
        _id: "507f1f77bcf86cd799439011",
        title: "Dhaka City Tour",
        slug: "dhaka-city-tour",
        summary: "Explore the vibrant capital of Bangladesh",
        heroImage: "hero.jpg",
        gallery: ["img1.jpg", "img2.jpg"],
        averageRating: 4.5,
        reviewCount: 25,
      };

      const { TourModel } = require("@/models/tour.model");
      TourModel.findById = vi.fn().mockResolvedValue(mockTour);

      // Import the handler after mocking
      const { GET } = require("@/app/tours/[tourId]/route");

      const request = new NextRequest("http://localhost:3000/tours/507f1f77bcf86cd799439011");
      const response = await GET(request, { params: { tourId: "507f1f77bcf86cd799439011" } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.id).toBe("507f1f77bcf86cd799439011");
      expect(data.title).toBe("Dhaka City Tour");
      expect(data.averageRating).toBe(4.5);
    });

    test("GET /tours/[tourId]/reviews should return paginated reviews", async () => {
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

      TourReviewModel.find = vi.fn().mockReturnValue({
        sort: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue(mockReviews),
        }),
      });

      const { GET } = require("@/app/tours/[tourId]/reviews/route");

      const request = new NextRequest("http://localhost:3000/tours/507f1f77bcf86cd799439011/reviews");
      const response = await GET(request, { params: { tourId: "507f1f77bcf86cd799439011" } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.items).toHaveLength(1);
      expect(data.hasMore).toBe(false);
    });

    test("POST /tours/[tourId]/reviews should create review and revalidate", async () => {
      const reviewData = {
        author: "Jane Smith",
        rating: 4,
        text: "Great experience!",
      };

      const { TourReviewModel } = require("@/models/tour_reviews.model");
      TourReviewModel.prototype.save = vi.fn().mockResolvedValue({
        _id: "507f1f77bcf86cd799439013",
        ...reviewData,
        tourId: "507f1f77bcf86cd799439011",
      });

      // Mock revalidateTag
      const { revalidateTag } = require("next/cache");
      revalidateTag.mockImplementation(vi.fn());

      const { POST } = require("@/app/tours/[tourId]/reviews/route");

      const request = new NextRequest("http://localhost:3000/tours/507f1f77bcf86cd799439011/reviews", {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: { "Content-Type": "application/json" },
      });

      const response = await POST(request, { params: { tourId: "507f1f77bcf86cd799439011" } });

      expect(response.status).toBe(201);
      expect(revalidateTag).toHaveBeenCalledWith("tour-507f1f77bcf86cd799439011");
    });

    test("GET /tours/[tourId]/faqs should return paginated FAQs", async () => {
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

      TourFAQModel.find = vi.fn().mockReturnValue({
        sort: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue(mockFAQs),
        }),
      });

      const { GET } = require("@/app/tours/[tourId]/faqs/route");

      const request = new NextRequest("http://localhost:3000/tours/507f1f77bcf86cd799439011/faqs");
      const response = await GET(request, { params: { tourId: "507f1f77bcf86cd799439011" } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.items).toHaveLength(1);
      expect(data.items[0].helpful).toBe(15);
    });

    test("GET /tours/[tourId]/recommendate-guides should return guides", async () => {
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

      const { TourGuideModel } = require("@/models/tour_guides.model");
      TourGuideModel.find = vi.fn().mockResolvedValue(mockGuides);

      const { GET } = require("@/app/tours/[tourId]/recommendate-guides/route");

      const request = new NextRequest("http://localhost:3000/tours/507f1f77bcf86cd799439011/recommendate-guides");
      const response = await GET(request, { params: { tourId: "507f1f77bcf86cd799439011" } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe("Ahmed Rahman");
    });

    test("POST /tours/[tourId]/encode should return encoded string", async () => {
      // Mock the encode function
      vi.mock("@/lib/encode", () => ({
        encode: vi.fn().mockReturnValue("SGVsbG8gV29ybGQ="),
      }));

      const { POST } = require("@/app/tours/[tourId]/encode/route");

      const request = new NextRequest("http://localhost:3000/tours/507f1f77bcf86cd799439011/encode", {
        method: "POST",
        body: JSON.stringify({ text: "Hello World" }),
        headers: { "Content-Type": "application/json" },
      });

      const response = await POST(request, { params: { tourId: "507f1f77bcf86cd799439011" } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.encoded).toBeDefined();
      expect(typeof data.encoded).toBe("string");
    });
  });
});
