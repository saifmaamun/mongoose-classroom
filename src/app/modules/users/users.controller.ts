/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { UserServices } from "./users.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, studentData } = req.body;
  // const zodParsedData = StudentValidationSchema.parse(studentData);

  const result = await UserServices.createStudentInToDB(password, studentData);
  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created succesfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
