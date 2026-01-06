import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface ITourReport extends Document {
  tourId: Types.ObjectId;
  issue: string;
  details?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TourReportSchema = new Schema<ITourReport>(
  {
    tourId: { type: Schema.Types.ObjectId, required: true, index: true },
    issue: { type: String, required: true, trim: true },
    details: { type: String, trim: true },
  },
  { timestamps: true }
);

// Indexes for filtering by tour and sorting by creation date
TourReportSchema.index({ tourId: 1, createdAt: -1 });

export const TourReportModel =
  (models.TourReport as mongoose.Model<ITourReport>) ||
  model<ITourReport>("TourReport", TourReportSchema);
