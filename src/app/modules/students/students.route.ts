import express from "express";

import { StudentControllers } from "./students.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from "./students.validation";

const router = express.Router();

router.get("/:studentId", StudentControllers.getSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(StudentValidations.UpdateStudentValidationSchema),
  StudentControllers.updateStudent
);

router.delete("/:studentId", StudentControllers.deleteSingleStudent);
router.get("/", StudentControllers.getAllStudents);

export const StudentRoutes = router;
