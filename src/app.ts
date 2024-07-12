import express, { Request } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

app.get("/", (req: Request, res) => {
  res.send("Hello Practising World");
});

// global error handler
app.use(globalErrorHandler);
// not found route
app.use(notFound);

export default app;
