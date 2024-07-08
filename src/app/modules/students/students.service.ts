import { TStudent } from "./students.interface";
import { StudentModel } from "./students.model";

// create a single student
const createStudentInToDB = async (student: TStudent) => {
  const result = await StudentModel.create(student);
  return result;
};

// get all students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id });
  return result;
};

// delete student
const deleteOneStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ _id: id });
  return result;
};

export const StudentServices = {
  createStudentInToDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteOneStudentFromDB,
};
