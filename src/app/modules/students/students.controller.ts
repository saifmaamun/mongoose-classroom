/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import { StudentServices } from "./students.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

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
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student found succesfully",
    data: result,
  });
});

// update single student
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated succesfully",
    data: result,
  });
});

//delete single student by id
const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.deleteOneStudentFromDB(id);

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
  updateStudent,
};
