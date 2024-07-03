import express, { Request } from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res) => {
  res.send("Hello Practising World");
});

export default app;
