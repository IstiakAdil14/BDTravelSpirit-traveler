import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITempUser extends Document {
  name: string;
  email: string;
  password: string; // hashed
  verificationCode: string;
  expiresAt: Date;
  createdAt: Date;
}

const TempUserSchema = new Schema<ITempUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    verificationCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for expiration
TempUserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const TempUserModel = models.TempUser || model<ITempUser>("TempUser", TempUserSchema);
