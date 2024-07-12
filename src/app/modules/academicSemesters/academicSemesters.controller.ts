/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemesters.service";

const createAcademicSemester = catchAsync(async (req, res, next) => {
  //   const { password, studentData } = req.body;

  const result = await AcademicSemesterServices.createAcademicSemesterInToDB(
    req.body
  );
  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is created succesfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
