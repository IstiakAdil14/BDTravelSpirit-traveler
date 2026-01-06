import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/connect";
import { UserModel } from "@/models/user.model";
import { TempUserModel } from "@/models/tempUser.model";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find temp user
    const tempUser = await TempUserModel.findOne({ email, verificationCode: code });
    if (!tempUser) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Check if expired
    if (tempUser.expiresAt < new Date()) {
      await TempUserModel.deleteOne({ _id: tempUser._id });
      return NextResponse.json(
        { error: "Verification code has expired" },
        { status: 400 }
      );
    }

    // Check if user already exists (in case of race condition)
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      await TempUserModel.deleteOne({ _id: tempUser._id });
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create the actual user
    const newUser = await UserModel.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      role: "traveler",
      isVerified: true,
      accountStatus: "active",
    });

    // Delete temp user
    await TempUserModel.deleteOne({ _id: tempUser._id });

    return NextResponse.json(
      {
        message: "Account verified successfully",
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
