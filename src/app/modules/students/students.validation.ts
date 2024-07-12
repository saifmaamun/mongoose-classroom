import { z } from "zod";

// Define Zod schema for TSchoolCollage
const SchoolCollageValidationSchema = z.object({
  name: z.string().nonempty(),
  class: z.string().nonempty(),
  group: z.enum(["Science", "Commerce", "Arts", "Vocational"]).optional(),
  section: z.string().optional(),
});

// Define Zod schema for TGuardian
const GuardianValidationSchema = z.object({
  fathersName: z.string().nonempty(),
  fathersOccupation: z.string().nonempty(),
  fathersContactNumber: z.string().nonempty(),
  mothersName: z.string().nonempty(),
  mothersOccupation: z.string().nonempty(),
  mothersContactNumber: z.string().nonempty(),
});

// Define Zod schema for TPayment
const PaymentValidationSchema = z.object({
  month: z.string().nonempty(),
  paidAmount: z.number().positive(),
  dueAmount: z.number().optional(),
  advanceAmount: z.number().optional(),
  receiversName: z.string().nonempty(),
});

// Define Zod schema for TStudent
const createStudentValidationSchema = z.object({
  body: z.object({
    studentData: z.object({
      name: z.object({
        firstName: z.string().nonempty(),
        middleName: z.string().optional(),
        lastName: z.string().nonempty(),
      }),
      gender: z.string().nonempty(),
      dateOfBirth: z.string().nonempty(),
      email: z.string().email().optional(),
      contactNo: z.string().nonempty(),
      emergencyContactNo: z.string().nonempty(),
      presentAddress: z.string().nonempty(),
      permanentAddress: z.string().nonempty(),
      guardian: GuardianValidationSchema,
      profileImage: z.string().nonempty(),
      school: SchoolCollageValidationSchema,
      collage: SchoolCollageValidationSchema.optional(),
      class: z.string().nonempty(),
      payment: z.object({
        name: z.string().nonempty(),
        id: z.string().nonempty(),
        tutionFee: z.number().positive(),
        paymentInfo: z.array(PaymentValidationSchema),
      }),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
};
