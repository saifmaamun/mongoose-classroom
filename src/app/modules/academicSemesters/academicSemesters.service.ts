import { TAcademicSemesterCode } from "./academicSemesters.interface";
import { AcademicSemesterModel } from "./academicSemesters.model";

const createAcademicSemesterInToDB = async (payload: TAcademicSemesterCode) => {
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterInToDB,
};
