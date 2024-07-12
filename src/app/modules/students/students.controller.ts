/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import { StudentServices } from "./students.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrived succesfully",
    data: result,
  });
});

//get single student by id
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student found succesfully",
    data: result,
  });
});
//delete single student by id
const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteOneStudentFromDB(studentId);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted succesfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
