import express from "express";

import { StudentControllers } from "./students.controller";

const router = express.Router();

router.get("/:userId", StudentControllers.getSingleStudent);
router.delete("/:userId", StudentControllers.deleteSingleStudent);
router.get("/", StudentControllers.getAllStudents);

export const StudentRoutes = router;
