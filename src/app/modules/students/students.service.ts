import { Student } from "./students.model";

// get all students
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};

// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ _id: id })
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("admissionSemester");
  return result;
};

// delete student
const deleteOneStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteOneStudentFromDB,
};
