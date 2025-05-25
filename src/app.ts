import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/taskRoute";
import authRouter from "./routes/authRoute";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

app.use("/tasks", taskRouter);
app.use("/auth", authRouter);

export default app;
