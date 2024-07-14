import httpStatus from "http-status";
import { academicSemesterNameCodeMapper } from "./academicSemesters.constant";
import { TAcademicSemester } from "./academicSemesters.interface";
import { AcademicSemesterModel } from "./academicSemesters.model";
import AppError from "../../errors/AppError";

// create a new semester
const createAcademicSemesterInToDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, "invalid semester code");
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

// get all semesters
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

// get semester by id
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findOne({ _id: id });
  return result;
};

// update semester
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterInToDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
