import { z } from "zod";

// Define Zod schema for TBloodGroup
const BloodGroupValidationSchema = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

// Define Zod schema for TUser
const UserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .nonempty()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional(),

  bloodGroup: BloodGroupValidationSchema.optional(), // since enum values are optional in the Mongoose schema
});

export const UserZodValidationSchema = {
  UserValidationSchema,
};
