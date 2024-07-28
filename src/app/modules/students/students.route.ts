import express from "express";

import { StudentControllers } from "./students.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from "./students.validation";

const router = express.Router();

router.get("/:id", StudentControllers.getSingleStudent);
router.patch(
  "/:id",
  validateRequest(StudentValidations.UpdateStudentValidationSchema),
  StudentControllers.updateStudent
);

router.delete("/:id", StudentControllers.deleteSingleStudent);
router.get("/", StudentControllers.getAllStudents);

export const StudentRoutes = router;
