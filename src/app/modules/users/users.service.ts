/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSemesters/academicSemesters.model";

import { TStudent } from "../students/students.interface";
import { Student } from "../students/students.model";
import { TUser } from "./users.interface";
import { UserModel } from "./users.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./users.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../Faculty/faculty.model";
import { Admin } from "../Admin/admin.model";

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

const createFacultyInToDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminInToDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserServices = {
  createStudentInToDB,
  createFacultyInToDB,
  createAdminInToDB,
};
