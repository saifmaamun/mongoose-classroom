import { model, Schema } from "mongoose";
import { TUser } from "./users.interface";

// mongoose schema for user
const UserSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true, minLength: 8 },
    needsPasswordChange: { type: Boolean, default: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    role: {
      type: String,
      enum: ["admin", "faculty", "student"],
      required: true,
    },
    status: { type: String, enum: ["in-progress", "blocked"], required: true },
    isDeleted: { type: Boolean, required: true },
  },
  // for creation and update time
  {
    timestamps: true,
  }
);

// Create and export the Mongoose model for TUser
export const UserModel = model<TUser>("User", UserSchema);
