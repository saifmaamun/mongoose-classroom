import express from "express";
import { UserControllers } from "./users.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from "../students/students.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
