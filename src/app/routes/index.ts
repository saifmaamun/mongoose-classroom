import { Router } from "express";
import { StudentRoutes } from "../modules/students/students.route";
import { UserRoutes } from "../modules/users/users.route";
import { AcademicSemesterRoutes } from "../modules/academicSemesters/academicSemesters.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";

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
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/academic-semester",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
];

// accessing routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
