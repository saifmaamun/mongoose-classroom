import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./users.interface";
import config from "../../config";

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
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      required: true,
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  // for creation and update time
  {
    timestamps: true,
  }
);

// to hash the user password
UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// set '' after saving password
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Create and export the Mongoose model for TUser
export const UserModel = model<TUser>("User", UserSchema);
