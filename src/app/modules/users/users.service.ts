import config from "../../config";
import { TStudent } from "../students/students.interface";
import { Student } from "../students/students.model";
import { TUser } from "./users.interface";
import { UserModel } from "./users.model";

// create a single student
const createStudentInToDB = async (password: string, student: TStudent) => {
  // create a user object
  const user: Partial<TUser> = {};

  // if password is not provided then use  default password
  user.password = password || (config.default_password as string);

  // set student role
  user.role = "student";

  // auto generated ID
  user.id = "20301234";

  // create a User
  const newUser = await UserModel.create(user);
  // console.log("new user fast", newUser);

  // crate a student
  if (Object.keys(newUser).length) {
    // set id, _id
    student.id = newUser.id;
    student.user = newUser._id; // reference _id

    const newStudent = await Student.create(student);
    // console.log("new Student", newStudent);
    return newStudent;
  }
  // console.log("new user last", newUser);

  return newUser;
};

export const UserServices = {
  createStudentInToDB,
};
