import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./students.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await StudentServices.getAllStudentsFromDB();
  try {
    // sending response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student retrived succesfully",
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    // handelling the error using global error handler
    next(err);
  }
};

//get single student by id
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // sending response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student found succesfully",
      data: result,
    });
  } catch (err) {
    // handelling the error using global error handler
    next(err);
  }
};
//delete single student by id
const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteOneStudentFromDB(studentId);

    // sending response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted succesfully",
      data: result,
    });
  } catch (err) {
    // handelling the error using global error handler
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
