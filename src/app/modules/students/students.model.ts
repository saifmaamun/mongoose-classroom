import { Schema } from "mongoose";

const SchoolCollageSchema = new Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  group: {
    type: String,
    enum: ["Science", "Commerce", "Arts", "Vocational"],
  },
  section: { type: String },
});

const GuardianSchema = new Schema({
  fathersName: { type: String, required: true },
  fathersOccupation: { type: String, required: true },
  fathersContactNumber: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccupation: { type: String, required: true },
  mothersContactNumber: { type: String, required: true },
});

const PaymentSchema = new Schema({
  month: { type: String, required: true },
  paidAmount: { type: Number, required: true },
  dueAmount: { type: Number, required: true },
  advanceAmount: { type: Number, required: true },
  receiversName: { type: String, required: true },
});

const PaymentInfoSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  tutionFee: { type: Number, required: true },
  paymentInfo: { type: [PaymentSchema], required: true },
});

const StudentSchema = new Schema({
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollNo: { type: String, required: true },
  school: { type: SchoolCollageSchema, required: true },
  collage: { type: SchoolCollageSchema },
  contactNumber: { type: String },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String },
  guardian: { type: GuardianSchema, required: true },
  email: { type: String },
  payment: { type: PaymentInfoSchema, required: true },
  isActive: { type: Boolean, required: true },
});
