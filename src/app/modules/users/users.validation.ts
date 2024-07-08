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

// Define Zod schema for TRole
const RoleValidationSchema = z.enum(["admin", "faculty", "student"]);

// Define Zod schema for TUser
const UserValidationSchema = z.object({
  id: z.string().nonempty(),
  password: z
    .string()
    .nonempty()
    .min(8, { message: "Password must be at least 8 characters" }),
  needsPasswordChange: z.boolean().default(true).optional(),
  bloodGroup: BloodGroupValidationSchema.optional(), // since enum values are optional in the Mongoose schema
  role: RoleValidationSchema,
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().optional().default(false),
});

export const UserZodValidationSchema = {
  UserValidationSchema,
};
