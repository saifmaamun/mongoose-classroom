import express, { Request } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/students/students.route";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// student routes
app.use("/api/v1/student", StudentRoutes);

app.get("/", (req: Request, res) => {
  res.send("Hello Practising World");
});

export default app;
