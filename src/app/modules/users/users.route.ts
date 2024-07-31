import express from "express";
import { UserControllers } from "./users.controller";
import validateRequest from "../../middleware/validateRequest";
import { createStudentValidationSchema } from "../students/students.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

export const UserRoutes = router;
