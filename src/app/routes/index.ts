import { Router } from "express";
import { StudentRoutes } from "../modules/students/students.route";
import { UserRoutes } from "../modules/users/users.route";
import { AcademicSemesterRoutes } from "../modules/academicSemesters/academicSemesters.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";

const router = Router();

// all routes
const moduleRoutes = [
  {
    path: "/student",
    route: StudentRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/academic-semester",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
];

// accessing routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
