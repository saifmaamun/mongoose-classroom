import express from "express";

import { StudentControllers } from "./students.controller";

const router = express.Router();

router.post("/create-student", StudentControllers.createStudent);
router.get("/", StudentControllers.getAllStudents);

export const StudentRoutes = router;
