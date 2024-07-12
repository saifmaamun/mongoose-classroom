import express from "express";
import { AcademicSemesterControllers } from "./academicSemesters.controller";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterValidations } from "./academicSemesters.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

// router.get("/:userId", StudentControllers.getSingleStudent);
// router.delete("/:userId", StudentControllers.deleteSingleStudent);
// router.get("/", StudentControllers.getAllStudents);

export const AcademicSemesterRoutes = router;
