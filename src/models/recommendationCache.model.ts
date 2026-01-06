import { Schema, model, models, Document, Types } from "mongoose";

export interface IRecommendationCache extends Document {
  tourId: Types.ObjectId;
  recommendations: {
    tourId: Types.ObjectId;
    score: number;
    rank: number;
  }[];
  type: "tour" | "guide";
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RecommendationCacheSchema = new Schema<IRecommendationCache>(
  {
    tourId: { type: Schema.Types.ObjectId, ref: "Tour", required: true, index: true },
    recommendations: [
      {
        tourId: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
        score: { type: Number, required: true },
        rank: { type: Number, required: true },
      },
    ],
    type: { type: String, enum: ["tour", "guide"], required: true },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

// TTL index to auto-delete expired caches
RecommendationCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RecommendationCacheModel =
  models.RecommendationCache || model<IRecommendationCache>("RecommendationCache", RecommendationCacheSchema);
