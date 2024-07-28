import mongoose from "mongoose";
import { Student } from "./students.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { UserModel } from "../users/users.model";
import { TStudent } from "./students.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

// get all students
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      })
      .populate("admissionSemester"),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};

// update single student
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, school, collage, payment, ...remainingStudentData } =
    payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (school && Object.keys(school).length) {
    for (const [key, value] of Object.entries(school)) {
      modifiedUpdatedData[`school.${key}`] = value;
    }
  }

  if (collage && Object.keys(collage).length) {
    for (const [key, value] of Object.entries(collage)) {
      modifiedUpdatedData[`collage.${key}`] = value;
    }
  }

  if (payment && Object.keys(payment).length) {
    for (const [key, value] of Object.entries(payment)) {
      modifiedUpdatedData[`payment.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete student
const deleteOneStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteOneStudentFromDB,
  updateStudentIntoDB,
};
