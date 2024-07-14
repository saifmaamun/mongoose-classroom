import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemesters.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemesters.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  { timestamps: true }
);

AcademicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester is already exists !");
  }
  next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
