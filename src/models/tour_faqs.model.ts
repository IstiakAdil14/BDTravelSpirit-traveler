import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface ITourFAQ extends Document {
  tourId: Types.ObjectId;
  question: string;
  answer?: string;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

const TourFAQSchema = new Schema<ITourFAQ>(
  {
    tourId: { type: Schema.Types.ObjectId, required: true, index: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, trim: true },
    helpful: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Indexes for sorting by helpful and cursor pagination
TourFAQSchema.index({ tourId: 1, helpful: -1 });

export const TourFAQModel =
  (models.TourFAQ as mongoose.Model<ITourFAQ>) ||
  model<ITourFAQ>("TourFAQ", TourFAQSchema);
