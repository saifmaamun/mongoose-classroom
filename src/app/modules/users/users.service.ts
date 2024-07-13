import config from "../../config";
import { AcademicSemesterModel } from "../academicSemesters/academicSemesters.model";

import { TStudent } from "../students/students.interface";
import { Student } from "../students/students.model";
import { TUser } from "./users.interface";
import { UserModel } from "./users.model";
import { generateStudentId } from "./users.utils";

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

  //set  generated id
  user.id = await generateStudentId(admissionSemester);

  // create a User
  const newUser = await UserModel.create(user);
  // console.log("new user fast", newUser);

  // crate a student
  if (Object.keys(newUser).length) {
    // set id, _id
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);
    // console.log("new Student", newStudent);
    return newStudent;
  }
  // console.log("new user last", newUser);

  return newUser;
};

export const UserServices = {
  createStudentInToDB,
};
