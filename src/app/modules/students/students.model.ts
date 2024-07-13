import { Schema, model } from "mongoose";
import {
  StudentModel,
  TGuardian,
  TPayment,
  TSchoolCollage,
  TStudent,
} from "./students.interface";

// Mongoose schema for TSchoolCollage
const SchoolCollageSchema = new Schema<TSchoolCollage>({
  name: { type: String, required: true },
  class: { type: String, required: true },
  group: { type: String, enum: ["Science", "Commerce", "Arts", "Vocational"] },
  section: { type: String },
});

// Mongoose schema for TGuardian
const GuardianSchema = new Schema<TGuardian>({
  fathersName: { type: String, required: true },
  fathersOccupation: { type: String, required: true },
  fathersContactNumber: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccupation: { type: String, required: true },
  mothersContactNumber: { type: String, required: true },
});

// Mongoose schema for TPayment
const PaymentSchema = new Schema<TPayment>({
  month: { type: String, required: true },
  paidAmount: { type: Number, required: true },
  dueAmount: { type: Number },
  advanceAmount: { type: Number },
  receiversName: { type: String, required: true },
});

// Mongoose schema for TStudent
const StudentSchema = new Schema<TStudent>({
  id: { type: String, required: [true, "ID is required"], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    unique: true,
    ref: "User",
  },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  gender: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  profileImage: { type: String, required: true },
  school: { type: SchoolCollageSchema, required: true },
  collage: { type: SchoolCollageSchema },
  class: { type: String, required: true },
  admissionSemester: { type: Schema.ObjectId, ref: "AcademicSemester" },

  payment: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    tutionFee: { type: Number, required: true },
    paymentInfo: { type: [PaymentSchema], required: true },
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
});

//
//creating a custom static method
StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// Create and export the Mongoose model for TStudent
export const Student = model<TStudent, StudentModel>("Student", StudentSchema);
