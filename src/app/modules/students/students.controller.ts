import { Request, Response } from "express";
import { StudentServices } from "./students.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const result = await StudentServices.createStudentInToDB(studentData);
    res.status(200).json({
      status: true,
      message: "Student created successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Student creation failed",
      data: err || err.message,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB();
  try {
    res.status(200).json({
      status: true,
      message: "Students were successfully retrieved",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Students were failed to retrieve",
      err: err || err.message,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
};
