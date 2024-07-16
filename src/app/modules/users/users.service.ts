import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSemesters/academicSemesters.model";

import { TStudent } from "../students/students.interface";
import { Student } from "../students/students.model";
import { TUser } from "./users.interface";
import { UserModel } from "./users.model";
import { generateStudentId } from "./users.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// create a single student
const createStudentInToDB = async (password: string, payload: TStudent) => {
  // create a user object
  const user: Partial<TUser> = {};

  // if password is not provided then use  default password
  user.password = password || (config.default_password as string);

  // set student role
  user.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );
  // checking if admissionSemester exists
  if (!admissionSemester) {
    throw new Error("Admission semester not found");
  }

  // session created
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();
    //set  generated id

    user.id = await generateStudentId(admissionSemester);

    // create a User transaction-1
    const newUser = await UserModel.create([user], { session });
    // console.log("new user fast", newUser);

    // crate a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create User");
    }
    // set id, _id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    // create a student transection-2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Student");
    }

    // ending transaction
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Student");
  }
  return user;
};

export const UserServices = {
  createStudentInToDB,
};
