import { NextFunction, Request, Response } from "express";
import { UserServices } from "./users.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, studentData } = req.body;
    // const zodParsedData = StudentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentInToDB(
      password,
      studentData
    );
    // sending response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is created succesfully",
      data: result,
    });
  } catch (err) {
    // handelling the error using global error handler
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
