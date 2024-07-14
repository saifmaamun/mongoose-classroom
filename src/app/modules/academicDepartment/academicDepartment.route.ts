import express from "express";

import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartmemt
);

router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDeartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
