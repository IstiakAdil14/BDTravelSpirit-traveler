import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface ITourReview extends Document {
  tourId: Types.ObjectId;
  author: string;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const TourReviewSchema = new Schema<ITourReview>(
  {
    tourId: { type: Schema.Types.ObjectId, required: true, index: true },
    author: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Indexes for cursor pagination and filtering
TourReviewSchema.index({ tourId: 1, _id: -1 });

export const TourReviewModel =
  (models.TourReview as mongoose.Model<ITourReview>) ||
  model<ITourReview>("TourReview", TourReviewSchema);
