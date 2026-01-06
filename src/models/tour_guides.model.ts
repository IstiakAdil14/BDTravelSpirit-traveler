import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface ITourGuide extends Document {
  tourId: Types.ObjectId;
  guideId: Types.ObjectId;
  name: string;
  bio?: string;
  rating?: number;
  experience?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TourGuideSchema = new Schema<ITourGuide>(
  {
    tourId: { type: Schema.Types.ObjectId, required: true, index: true },
    guideId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5 },
    experience: { type: String, trim: true },
  },
  { timestamps: true }
);

// Index for filtering by tour
TourGuideSchema.index({ tourId: 1 });

export const TourGuideModel =
  (models.TourGuide as mongoose.Model<ITourGuide>) ||
  model<ITourGuide>("TourGuide", TourGuideSchema);
